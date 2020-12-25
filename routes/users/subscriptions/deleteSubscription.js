const express = require('express')
const app = express.Router()
const passport = require('../../../middleware/authorizationMiddleware')
const mysqlErrorHandler = require('../../../middleware/errorMiddleware')
const SubscriptionsController = require('../../../controllers/subscriptionsController')

app.delete('/subscription/:serviceId', passport.authenticate('bearer', { session: true }), SubscriptionsController.deleteSubscription)

app.use(mysqlErrorHandler)
module.exports = app