const express = require('express')
const app = express.Router()
const mysqlErrorHandler = require('../../../middleware/errorMiddleware')
const passport = require('../../../middleware/authorizationMiddleware')
const DebtsController = require('../../../controllers/debtsController')



app.patch('/debts/update', passport.authenticate('bearer', { session: false }), DebtsController.editDebts)

app.use(mysqlErrorHandler)
module.exports = app