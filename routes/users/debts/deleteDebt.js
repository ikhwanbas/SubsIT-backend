const express = require('express')
const app = express.Router()
const mysqlErrorHandler = require('../../../middleware/errorMiddleware')
const passport = require('../../../middleware/authorizationMiddleware')
const DebtsController = require('../../../controllers/debtsController')

app.delete('/debts/delete', passport.authenticate('bearer', { session: false }), DebtsController.deleteDebts)

app.use(mysqlErrorHandler)
module.exports = app