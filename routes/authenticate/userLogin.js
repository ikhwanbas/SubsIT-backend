const express = require('express')
const app = express.Router()
const db = require('../../models')
const jwt = require('jsonwebtoken')
const jwtConfig = require('../../config/jwtConfig')
const { checkPassword } = require('../../helpers/bcryptHelper')

app.post('/auth/login', async (req, res, next) => {
    let body = req.body
    try {
        let user = await db.users.findAll({
            where: {
                email: body.email,
                status: 'active'
            }
        })
            .catch((err) => next(err))
        if (!user.length) {
            return res.status(404).send('User not available or inactive , pls register')
        }
        else {
            user = user[0]
            const isPassMatch = await checkPassword(body.password, user.password)
            if (!isPassMatch) {
                return res.status(400).send('Password not match')
            }
            else {
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, jwtConfig.options)
                user.dataValues.token = token
                delete user.dataValues.password
                res.send(user.dataValues)
                //cek user subscriptions
                let subs = await db.subscriptions.findAll({
                    raw: true,
                    where: {
                        userId: user.id
                    }
                })
            }
        }
    } catch (err) {
        next(err)
    }
})

module.exports = app