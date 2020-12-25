const express = require('express')
const app = express.Router()
const mysqlErrorHandler = require('../../../middleware/errorMiddleware')
const passport = require('../../../middleware/authorizationMiddleware')
const CardController = require('../../../controllers/cardsController')

app.patch('/card', passport.authenticate('bearer', { session: false }), CardController.editCard)

app.use(mysqlErrorHandler)
module.exports = app