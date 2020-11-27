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
    try {
        if (check.length > 0) {
            return res.status(409).send('card already add')
        }
        else {
            const result = await db.cards.create(body)
                .catch(err => res.status(400).send(err))
            res.send(result)
        }
    } catch (err) {
        next(err)
    }
})

app.use(mysqlErrorHandler)
module.exports = app