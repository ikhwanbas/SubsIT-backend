const express = require('express')
const app = express.Router()
const mysqlErrorHandler = require('../../../middleware/errorMiddleware')
const passport = require('../../../middleware/authorizationMiddleware')
const UserController = require('../../../controllers/usersController')

app.get('/auth/user', passport.authenticate('bearer', { session: false }), UserController.getUser)

app.use(mysqlErrorHandler)
module.exports = app