const express = require('express')
const PagesController = require('../../../controllers/pagesController')
const app = express.Router()
const mysqlErrorHandler = require('../../../middleware/errorMiddleware')

app.get('/service', PagesController.services)

app.use(mysqlErrorHandler)
module.exports = app