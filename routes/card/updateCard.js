const express = require('express')
const app = express.Router()
const db = require('../../models')
const mysqlErrorHandler = require('../../middleware/errorMiddleware')
const { v4 } = require('uuid')
const passport = require('../../middleware/authorizationMiddleware')



app.patch('/card', passport.authenticate('bearer', { session: false }), async (req, res, next) => {
    let body = req.body
    const check = await db.cards.findAll({
        where: {
            id: req.query.id
        }
    })
        .catch((err) => next(err))
    try {
        if (check.length == 0) {
            return res.status(409).send('card not found')
        }
        else {
            const result = await db.cards.update(
                body,
                {
                    where: {
                        id: req.query.id
                    }
                })
                .catch(err => res.status(400).send(err))
            if (result == 1) {
                res.send("your card updated")
            } else {
                res.send("update failed")
            }

        }
    } catch (err) {
        next(err)
    }
})

app.use(mysqlErrorHandler)
module.exports = app