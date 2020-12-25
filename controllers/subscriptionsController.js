const { v4 } = require("uuid")
const db = require("../models")
const moment = require('moment')

class SubscriptionsController {
    static async addSubscription(req, res, next) {
        const userId = req.session.passport.user.id
        const serviceId = req.params.serviceId
        const cardId = req.query.cardId

        // ambil nilai dari cost
        const getCost = await db.services.findAll({
            raw: true,
            attributes: ['cost'],
            where: { id: serviceId }
        })
            .catch((err) => next(err))

        //cek apakah service id ditemukan atau tidak
        if (getCost.length <= 0) {
            res.status(404).send('services not found')
        } else {

            const serviceCost = parseInt(getCost[0].cost)

            // mengambil data saldo di kartu 
            const getSaldo = await db.cards.findAll({
                raw: true,
                attributes: ['saldo'],
                where: { id: cardId }
            })
                .catch((err) => next(err))

            //cek apakah card id ditemukan atau tidak
            if (!getSaldo || getSaldo.length <= 0) {
                return res.status(404).send('card is not found')
            } else {

                const cardSaldo = parseInt(getSaldo[0].saldo)

                // kondisi jika user sudah mensubscribe service ini
                const checkUserSubscribe = await db.subscriptions.findAll({
                    raw: true,
                    where: {
                        serviceId,
                        userId,
                        status: 'subscribed'

                    }
                })
                    .catch((err) => next(err))
                // jika sudah subscribe return 409
                if (checkUserSubscribe.length > 0) {
                    return res.status(409).send('you already subscribe this services')
                }

                // kondisi jika saldo di kartu kurang dari biaya layanan
                if (cardSaldo < serviceCost) {
                    return res.status(402).send('your saldo is not enough to pay this services')
                }

                // melakukan update saldo
                const updatedSaldo = (cardSaldo - serviceCost)
                //declare date dengan format UTC
                const today = moment().format("YYYY-MM-DD");
                const then = moment(moment().add(30, 'days')).format("YYYY-MM-DD");
                // ambil user id dari passport 
                const insertBody = {
                    id: v4(),
                    userId: userId,
                    repeat: 'Monthly',
                    serviceId: serviceId,
                    cardId: req.query.cardId,
                    startDate: today,
                    dueDate: then,
                    payment: serviceCost,
                    status: 'subscribed'
                }

                // melakukan insert data into database
                const subscription = await db.subscriptions.create(insertBody)
                    .catch((err) => next(err))
                if (subscription) {
                    // mengupdate saldo di table card
                    await db.cards.update({ saldo: updatedSaldo },
                        {
                            where: {
                                userId,
                                id: cardId
                            }
                        })
                }
                res.send(subscription)
            }
        }
    }
    static async getSubscription(req, res, next) {
        const dates = req.query.dates
        // ambil user id dari passport 
        const userId = req.session.passport.user.id

        // ambil serviceId dari query
        const serviceId = req.query.serviceId

        if (req.query.serviceId) {
            // cari data subscription berdasar user ID ini dan service Id.
            const subscription = await db.subscriptions.findAll({
                where: {
                    userId,
                    serviceId,
                    status: 'subscribed'
                }
            })

            const service = await db.services.findAll({
                where: {
                    id: serviceId
                }
            })
            subscriptions = subscription[0]
            services = service[0]

            // memberikan response kalau tidak ada subscriptions maka respon status unsubscribed 
            if (!subscription || subscription.length <= 0) {
                // ambil data services
                if (!services || services.length <= 0) {
                    return res.status(404).send('service Id is not found in our database')
                } else {
                    services.dataValues.status = 'unsubscribed'
                    return res.status(200).send(services)
                }

            } else {
                services.dataValues.status = 'subscribed'
                return res.status(200).send(services)
            }
        }

        else if (req.query.dates) {
            const subscriptionByDates = await db.subscriptions.findAll({
                include: [{
                    model: db.services,
                    required: true
                }, {
                    model: db.cards,
                    required: true
                }],
                where: {
                    userId,
                    startDate: dates

                }
            })

            // kondisi kalau tidak ditemukan subscription
            if (subscriptionByDates.length <= 0) {
                res.status(404).send('subscription is not found')
            } else {
                // kalau ditemukan tampilkan hasilnya
                res.send(subscriptionByDates)
            }

        } else {
            // mencari data subscription dari database
            const subscription = await db.subscriptions.findAll({
                include: [{
                    model: db.services,
                    required: true
                }, {
                    model: db.cards,
                    required: true
                }],
                where: {
                    userId,
                    status: 'subscribed'
                }
            })
            // kondisi kalau tidak ditemukan subscription
            if (subscription.length <= 0) {
                res.status(404).send('subscription is not found')
            } else {
                // kalau ditemukan tampilkan hasilnya
                res.send(subscription)
            }
        }
    }
    static async deleteSubscription(req, res, next) {
        const userId = req.session.passport.user.id
        const serviceId = req.params.serviceId

        // cek dulu apakah bisa ditemukan service id dari params
        const getCost = await db.services.findAll({
            raw: true,
            attributes: ['cost'],
            where: { id: serviceId }
        })
            .catch((err) => next(err))

        //cek apakah service id ditemukan atau tidak
        if (getCost.length <= 0) {
            res.status(404).send('services not found')
        } else {
            const getSubscription = await db.subscriptions.findAll({
                raw: true,
                where: {
                    userId,
                    serviceId,
                    status: 'subscribed'
                }
            })

            if (!getSubscription || getSubscription.length <= 0) {
                return res.status(404).send('you do not subscribe this services')
            } else {
                // melakukan update status data into database
                const deleteSubscription = await db.subscriptions.update(
                    { status: 'unsubscribed' },
                    {
                        where: {
                            userId,
                            serviceId,
                            status: 'subscribed'
                        }
                    })
                    .catch(err => res.status(400).send(err))
                return res.status(200).send('you have succesfully unsubscribe this service')
            }
        }
    }

}

module.exports = SubscriptionsController