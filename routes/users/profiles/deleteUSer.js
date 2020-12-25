const express = require('express')
const app = express.Router()
const mysqlErrorHandler = require('../../../middleware/errorMiddleware')
const passport = require('../../../middleware/authorizationMiddleware')
const UserController = require('../../../controllers/usersController')

app.delete('/auth/delete', passport.authenticate('bearer', { session: false }), UserController.deleteUser)

app.use(mysqlErrorHandler)
module.exports = app