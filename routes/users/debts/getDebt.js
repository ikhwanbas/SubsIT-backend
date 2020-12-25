const express = require('express')
const DebtsController = require('../../../controllers/debtsController')
const app = express.Router()
const passport = require('../../../middleware/authorizationMiddleware')
const mysqlErrorHandler = require('../../../middleware/errorMiddleware')


app.get('/debts/notes', passport.authenticate('bearer', { session: true }), DebtsController.getDebts)
app.use(mysqlErrorHandler)


module.exports = app