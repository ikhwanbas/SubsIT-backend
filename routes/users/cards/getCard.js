const express = require('express')
const app = express.Router()
const mysqlErrorHandler = require('../../../middleware/errorMiddleware')
const passport = require('../../../middleware/authorizationMiddleware')
const CardController = require('../../../controllers/cardsController')

app.get('/card', passport.authenticate('bearer', { session: false }), CardController.getCard)

app.use(mysqlErrorHandler)
module.exports = app