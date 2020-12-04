const express = require('express')
const db = require('../../models')
const app = express.Router()
const auth = require('../../middleware/authorizationMiddleware')
const mysqlErrorHandler = require('../../middleware/errorMiddleware')


app.get('/subscription', auth.authenticate('bearer', { session: true }), async (req, res, next) => {
    const dates = req.query.dates
    // ambil user id dari passport 
    const userId = req.session.passport.user.id

    if (req.query.dates) {
        const subscriptionByDates = await db.subscriptions.findAll({
            include: [{
                model: db.services,
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
            }],
            where: {
                userId
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
})

app.use(mysqlErrorHandler)
module.exports = app