const express = require('express')
const DebtsController = require('../../../controllers/debtsController')
const app = express.Router()
const passport = require('../../../middleware/authorizationMiddleware')
const mysqlErrorHandler = require('../../../middleware/errorMiddleware')


app.post('/debts/add', passport.authenticate('bearer', { session: true }), DebtsController.addDebts)
app.use(mysqlErrorHandler)

module.exports = app