const express = require('express')
const app = express.Router()
const db = require('../../models')
const jwt = require('jsonwebtoken')
const jwtConfig = require('../../config/jwtConfig')
//const salt = require('../../helpers/bcryptHelper')
const mysqlErrorHandler = require('../../middleware/errorMiddleware')
const { salt } = require('../../helpers/bcryptHelper')


app.post('/auth/register', async (req, res, next) => {
    const email = req.body.email
    const user = await db.users.findAll({
        where: {
            email: req.body.email
        }
    })
        .catch((err) => next(err))
    try {
        if (user.length > 0) {
            return res.status(409).send('Email already used')
        }
        else {
            const password = req.body.password
            let body = req.body
            const hashedPassword = await salt(password)
                .catch((err) => next(err))
            body.password = hashedPassword
            const addUserResult = await db.users.create(req.body)
                .catch(err => res.send(400).send(err))
            //console.log(addUserResult);
            if (addUserResult) {
                const token = jwt.sign(body, process.env.JWT_SECRET, jwtConfig.options)
                body.token = token
                delete addUserResult.password
                res.send(body)
            }
        }
    } catch (err) {
        next(err)
    }
})

app.use(mysqlErrorHandler)
module.exports = app