const express = require('express')
const app = express.Router()
const mysqlErrorHandler = require('../../../middleware/errorMiddleware')
const passport = require('../../../middleware/authorizationMiddleware')
const CardController = require('../../../controllers/cardsController')

app.delete('/card', passport.authenticate('bearer', { session: false }), CardController.deleteCard)

app.use(mysqlErrorHandler)
module.exports = app