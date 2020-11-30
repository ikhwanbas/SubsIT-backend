const express = require('express')
const db = require('../../models')
const app = express.Router()
const auth = require('../../middleware/authorizationMiddleware')
const mysqlErrorHandler = require('../../middleware/errorMiddleware')


app.get('/subscription', auth.authenticate('bearer', { session: true }), async (req, res, next) => {
    // ambil user id dari passport 
    const userId = req.session.passport.user.id
    // mencari data subscription dari database
    const subscription = await db.subscriptions.findAll({
        include: [{
            model: db.users,
            required: true,
            include: [{
                model: db.cards,
                required: true
            }]
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
})

app.use(mysqlErrorHandler)
module.exports = app