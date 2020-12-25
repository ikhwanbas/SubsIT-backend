const express = require('express')
const app = express.Router()
const passport = require('../../../middleware/authorizationMiddleware')
const mysqlErrorHandler = require('../../../middleware/errorMiddleware')
const ExpensesController = require('../../../controllers/expensesController')

app.delete('/expense/:expenseId', passport.authenticate('bearer', { session: true }), ExpensesController.deleteExpense)
app.use(mysqlErrorHandler)
module.exports = app