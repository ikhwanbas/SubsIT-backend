const express = require('express')
const app = express.Router()
const UserController = require('../../controllers/usersController')

app.post('/auth/login', UserController.login)

module.exports = app