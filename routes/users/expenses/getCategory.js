const express = require('express')
const app = express.Router()
const mysqlErrorHandler = require('../../../middleware/errorMiddleware')
const ExpensesController = require('../../../controllers/expensesController')

app.get('/categories', ExpensesController.getCategory)

app.use(mysqlErrorHandler)
module.exports = app