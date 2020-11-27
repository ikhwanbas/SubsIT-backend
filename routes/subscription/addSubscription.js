const express = require('express')
const { v4 } = require('uuid')
const db = require('../../models')
const app = express.Router()
const auth = require('../../middleware/authorizationMiddleware')

app.post('/subscription/:id', auth.authenticate('bearer', { session: true }), async (req, res, next) => {
    // cek dulu paramnya apakah bisa ditemukan service id
    // {checking params under construction}

    // ambil user id dari passport 
    const insertBody = {
        id: v4(),
        userId: req.session.passport.user.id,
        repeat: 'monthly',
        serviceId: req.params.id,
        cardId: req.query.cardId,
        createdAt: new Date(),
        startDate: new Date(),
        dueDate: new Date(),
        cost: 30000,
        payment: 20000
    }

    // melakukan insert data into database
    const subscription = await db.subscriptions.create(insertBody)
        .catch(err => res.status(400).send(err))

    res.send(subscription)
})

module.exports = app