const express = require('express')
const SubscriptionsController = require('../../../controllers/subscriptionsController')
const app = express.Router()
const passport = require('../../../middleware/authorizationMiddleware')
const mysqlErrorHandler = require('../../../middleware/errorMiddleware')

app.post('/subscription/:serviceId', passport.authenticate('bearer', { session: true }), SubscriptionsController.addSubscription)

app.use(mysqlErrorHandler)

module.exports = app