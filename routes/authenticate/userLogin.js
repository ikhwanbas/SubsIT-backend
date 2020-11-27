const express = require('express')
const app = express.Router()
const db = require('../../models')
const jwt = require('jsonwebtoken')
const jwtConfig = require('../../config/jwtConfig')
const humps = require('humps')
const { checkPassword } = require('../../helpers/bcryptHelper')


app.post('/auth/login', async (req, res, next) => {
    let body = humps.decamelizeKeys(req.body)
    try {
        let user = await db.users.findAll({
            where: {
                email: body.email
            }
        })
            .catch((err) => next(err))
        if (!user.length) {
            return res.status(404).send('User not available, pls register')
        }
        else {
            user = user[0]
            const isPassMatch = await checkPassword(body.password, user.password)
            if (!isPassMatch) {
                return res.status(400).send('Password not match')
            }
            else {
                let users = { user }
                const token = jwt.sign(users, process.env.JWT_SECRET, jwtConfig.options)
                body.fullName = user.full_name
                body.token = token
                delete body.password
                res.send(body)
            }
        }

    } catch (err) {
        next(err)
    }

})

module.exports = app