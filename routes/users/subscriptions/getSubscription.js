const express = require('express')
const SubscriptionsController = require('../../../controllers/subscriptionsController')
const app = express.Router()
const passport = require('../../../middleware/authorizationMiddleware')
const mysqlErrorHandler = require('../../../middleware/errorMiddleware')

app.get('/subscription', passport.authenticate('bearer', { session: true }), SubscriptionsController.getSubscription)

app.use(mysqlErrorHandler)
module.exports = app