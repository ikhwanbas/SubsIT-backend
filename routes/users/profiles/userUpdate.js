const express = require('express')
const app = express.Router()
const mysqlErrorHandler = require('../../../middleware/errorMiddleware')
const passport = require('../../../middleware/authorizationMiddleware')
const UserController = require('../../../controllers/usersController')

app.patch('/auth/update', passport.authenticate('bearer', { session: false }), UserController.updateUser)

app.use(mysqlErrorHandler)
module.exports = app