const express = require('express')
const app = express.Router()
const db = require('../../models')
const mysqlErrorHandler = require('../../middleware/errorMiddleware')
const { v4 } = require('uuid')
const passport = require('../../middleware/authorizationMiddleware')



app.post('/card', passport.authenticate('bearer', { session: false }), async (req, res, next) => {
    let body = req.body
    body.id = v4()
    body.userId = req.user.id
    const check = await db.cards.findAll({
        where: {
            cardNumber: body.cardNumber
        }
    })
        .catch((err) => next(err))
    if (check.length > 0) {
        return res.status(409).send('card already add')
    }
    else {
        const result = await db.cards.create(body)
            .catch((err) => next(err))
        res.send(result)
    }
})

app.use(mysqlErrorHandler)
module.exports = app