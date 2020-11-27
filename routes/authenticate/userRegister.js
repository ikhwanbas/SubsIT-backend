const express = require('express')
const app = express.Router()
const db = require('../../models')
const jwt = require('jsonwebtoken')
const humps = require('humps')
const jwtConfig = require('../../config/jwtConfig')
const mysqlErrorHandler = require('../../middleware/errorMiddleware')
const { salt } = require('../../helpers/bcryptHelper')
const { v4 } = require('uuid')


app.post('/auth/register', async (req, res, next) => {
    let body = humps.decamelizeKeys(req.body)
    body.id = v4()
    const user = await db.users.findAll({
        where: {
            email: body.email
        }
    })
        .catch((err) => next(err))
    try {
        if (user.length > 0) {
            return res.status(409).send('Email already used')
        }
        else {
            const password = body.password
            const hashedPassword = await salt(password)
                .catch((err) => next(err))
            body.password = hashedPassword
            const addUserResult = await db.users.create(body)
                .catch(err => res.status(400).send(err))
            //console.log(addUserResult);
            if (addUserResult) {
                const token = jwt.sign(body, process.env.JWT_SECRET, jwtConfig.options)
                body.token = token
                delete body.password
                res.send(body)
            }
        }
    } catch (err) {
        next(err)
    }
})

app.use(mysqlErrorHandler)
module.exports = app