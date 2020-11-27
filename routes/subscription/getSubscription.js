const express = require('express')
const db = require('../../models')
const app = express.Router()
const auth = require('../../middleware/authorizationMiddleware')


app.get('/subscription', auth.authenticate('bearer', { session: true }), async (req, res, next) => {
    // ambil user id dari passport 
    const userId = req.session.passport.user.id

    // mencari data subscription dari database
    //masih perlu melakukan join
    const subscription = await db.subscriptions.findAll({
        where: {
            userId
        }
    })
    // kondisi kalau tidak ditemukan subscription
    if (subscription.length <= 0) { res.status(404).send('subscription is not found') }

    // kalau ditemukan tampilkan hasilnya
    res.send(subscription)
})

module.exports = app