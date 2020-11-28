const express = require('express')
const app = express.Router()
const db = require('../../models')
const mysqlErrorHandler = require('../../middleware/errorMiddleware')
const { v4 } = require('uuid')
const passport = require('../../middleware/authorizationMiddleware')



app.delete('/card', passport.authenticate('bearer', { session: false }), async (req, res, next) => {
    let body = req.body
    body.userId = req.user.id
    const check = await db.cards.findAll({
        where: {
            id: req.query.id
        }
    })
        .catch((err) => next(err))
    if (check.length == 0) {
        return res.status(404).send('card not found')
    }
    else {
        const result = await db.cards.destroy({
            where: {
                id: req.query.id
            }
        })
            .catch((err) => next(err))
        if (result == 1) {
            res.send("delete success")
        } else {
            res.send("delete failed")
        }

    }
})

app.use(mysqlErrorHandler)
module.exports = app