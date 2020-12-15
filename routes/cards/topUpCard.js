const express = require('express')
const app = express.Router()
const db = require('../../models')
const mysqlErrorHandler = require('../../middleware/errorMiddleware')
const passport = require('../../middleware/authorizationMiddleware')



app.patch('/payment/topUp', passport.authenticate('bearer', { session: false }), async (req, res, next) => {
    let body = req.body
    const check = await db.cards.findAll({
        raw: true,
        where: {
            cardNumber: req.query.cardNumber
        }
    })
        .catch((err) => next(err))
    if (check.length == 0) {
        return res.status(404).send('card not found')
    }
    else {
        const cardSaldo = parseInt(check[0].saldo)
        const topUp = (cardSaldo + body.saldo)
        const result = await db.cards.update({
            saldo: topUp
        },
            {
                where: { cardNumber: req.query.cardNumber }
            })

            .catch((err) => next(err))
        if (result == 1) {
            res.send("your top up suscescfull")
        } else {
            res.send("top up failed")
        }

    }
})

app.use(mysqlErrorHandler)
module.exports = app