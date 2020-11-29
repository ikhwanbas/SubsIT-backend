const express = require('express')
const app = express.Router()
const db = require('../../models')
const mysqlErrorHandler = require('../../middleware/errorMiddleware')
const passport = require('../../middleware/authorizationMiddleware')



app.get('/card', passport.authenticate('bearer', { session: false }), async (req, res, next) => {
    //mencari card by query/semua key field
    const check = await db.cards.findAll({
        where: req.query
    })
        .catch((err) => next(err))
    //validasi card tersedia/tidak
    if (check.length == 0) {
        return res.status(404).send('card not found')
    }
    else {
        res.send(check)
    }
})

app.use(mysqlErrorHandler)
module.exports = app