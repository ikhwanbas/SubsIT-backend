const express = require('express')
const { v4 } = require('uuid')
const db = require('../../../models')
const app = express.Router()
const auth = require('../../../middleware/authorizationMiddleware')
const mysqlErrorHandler = require('../../../middleware/errorMiddleware')


app.post('/debts/add', auth.authenticate('bearer', { session: true }), async (req, res, next) => {
    let body = req.body
    body.id = v4()
    body.userId = req.user.id
    const result = await db.debts.create(body)
        .catch((err) => next(err))
    res.send(result)
})
app.use(mysqlErrorHandler)

module.exports = app