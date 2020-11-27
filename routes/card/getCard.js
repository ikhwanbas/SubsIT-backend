const express = require('express')
const app = express.Router()
const db = require('../../models')
const mysqlErrorHandler = require('../../middleware/errorMiddleware')
const passport = require('../../middleware/authorizationMiddleware')



app.get('/card', passport.authenticate('bearer', { session: false }), async (req, res, next) => {
    const check = await db.cards.findAll({
        where: req.query
    })
        .catch((err) => next(err))
    try {
        if (check.length == 0) {
            return res.status(409).send('card not found')
        }
        else {
            res.send(check)
        }
    } catch (err) {
        next(err)
    }
})

app.use(mysqlErrorHandler)
module.exports = app