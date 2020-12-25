const express = require('express')
const UserController = require('../../controllers/usersController')
const app = express.Router()
const mysqlErrorHandler = require('../../middleware/errorMiddleware')

app.post('/auth/register', UserController.register)

app.use(mysqlErrorHandler)
module.exports = app