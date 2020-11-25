const express = require('express')
const app = express.Router()
const loginController = require('../../controllers/loginController')

app.post('/login', async (req, res, next) => {
    try {
        const user = new loginController(req.body)
        await user.validate()
            .login()

        delete user.body.password
        res.send(user.body)
    } catch (error) {
        next(error)
    }
})

module.exports = app