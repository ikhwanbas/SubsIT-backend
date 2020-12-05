const express = require('express')
const { v4 } = require('uuid')
const db = require('../../models')
const app = express.Router()
const auth = require('../../middleware/authorizationMiddleware')
const mysqlErrorHandler = require('../../middleware/errorMiddleware')


app.post('/subscription/:serviceId', auth.authenticate('bearer', { session: true }), async (req, res, next) => {
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
        res.status(400).send('services not found')
    } else {

        const serviceCost = parseInt(getCost[0].cost)

        // mengambil data saldo di kartu 
        const getSaldo = await db.cards.findAll({
            raw: true,
            attributes: ['saldo'],
            where: { id: cardId }
        })
            .catch((err) => next(err))
        const cardSaldo = parseInt(getSaldo[0].saldo)

        // kondisi jika user sudah mensubscribe service ini
        const checkUserSubscribe = await db.subscriptions.findAll({
            raw: true,
            where: {
                serviceId,
                userId
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

        // ambil user id dari passport 
        const insertBody = {
            id: v4(),
            userId: userId,
            repeat: 'Monthly',
            serviceId: serviceId,
            cardId: req.query.cardId,
            startDate: new Date().toLocaleDateString(),
            dueDate: new Date(new Date().setDate(new Date().getDate() + 30)).toLocaleDateString(),
            payment: serviceCost
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
                })//update service subscribed
                && await db.services.update({ subscribed: 'true' },
                    {
                        where: {
                            id: serviceId
                        }
                    })

        }
        res.send(subscription)
    }
})
app.use(mysqlErrorHandler)

module.exports = app