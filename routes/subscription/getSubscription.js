const express = require('express')
const db = require('../../models')
const app = express.Router()
const auth = require('../../middleware/authorizationMiddleware')
const mysqlErrorHandler = require('../../middleware/errorMiddleware')


app.get('/subscription', auth.authenticate('bearer', { session: true }), async (req, res, next) => {
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
                serviceId
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
                userId
            }
            // , include: {
            //     model: db.cards,
            //     attributes: ['saldo']
            // }
        })
        // kondisi kalau tidak ditemukan subscription
        if (subscription.length <= 0) {
            res.status(404).send('subscription is not found')
        } else {
            // kalau ditemukan tampilkan hasilnya
            res.send(subscription)
        }
    }
})

app.use(mysqlErrorHandler)
module.exports = app