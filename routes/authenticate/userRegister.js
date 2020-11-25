const express = require('express')
const app = express.Router()
const UserController = require('../../controllers/userController')

app.post('/register', async (req, res, next) => {
    try {
        const user = new UserController(req.body)
        await user.validate()
            .register()

        delete user.body.password
        res.send(user.body)
    } catch (error) {
        next(error)
    }
})

module.exports = app