const express = require('express')
const app = express.Router()
const db = require('../../models')
const auth = require('../../middleware/authorizationMiddleware')
const mysqlErrorHandler = require('../../middleware/errorMiddleware')

app.get('/service/subscribed', auth.authenticate('bearer', { session: true }), async (req, res, next) => {

    const check = await db.services.findAll({
        where: req.query
    })
        .catch((err) => next(err))
    //validasi service tersedia/tidak
    if (check.length == 0) {
        return res.status(404).send('service not found')
    }
    else {
        res.send(check)
    }

})

app.use(mysqlErrorHandler)
module.exports = app