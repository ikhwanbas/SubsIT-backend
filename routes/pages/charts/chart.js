const express = require('express')
const PagesController = require('../../../controllers/pagesController')
const app = express.Router()
const passport = require('../../../middleware/authorizationMiddleware')
const mysqlErrorHandler = require('../../../middleware/errorMiddleware')

app.get('/chart/:type', passport.authenticate('bearer', { session: true }), PagesController.charts)

app.use(mysqlErrorHandler)

module.exports = app