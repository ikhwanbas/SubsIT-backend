const express = require('express')
const app = express.Router()
const db = require('../../models')
const jwt = require('jsonwebtoken')
const jwtConfig = require('../../config/jwtConfig')
const mysqlErrorHandler = require('../../middleware/errorMiddleware')
const { salt } = require('../../helpers/bcryptHelper')
const { v4 } = require('uuid')

//masih ada bugs
app.post('/auth/register', async (req, res, next) => {
    let body = req.body
    body.id = v4()
    body.photo = `${process.env.HOSTNAME}/files/defaultFotoProfile.jpg`
    try {
        const getStatus = await db.users.findAll({
            raw: true,
            where: {
                email: body.email

            }
        })
            .catch((err) => next(err))
        if (!getStatus.length) {

            const password = body.password
            body.status = 'active'
            const hashedPassword = await salt(password)
                .catch((err) => next(err))
            body.password = hashedPassword

            const addUserResult = await db.users.create(body)
                .catch(err => next(err))
            const result = addUserResult.get({ plain: true })

            if (result) {
                const token = jwt.sign({ id: body.id }, process.env.JWT_SECRET, jwtConfig.options)
                result.token = token
                delete result.password
                res.send(result)
            }
        } else if (getStatus[0].status == 'active') {
            return res.status(409).send('Email already used')
        } else (getStatus[0].status == 'inactive')
        await db.users.update({
            status: 'active'
        },
            {
                where: { email: body.email }
            })
            .catch((err) => next(err))
        res.send('Account activation is succesfull, please log in')
    } catch (err) {
        console.log('minor err when register but its okay!');
    }


})

app.use(mysqlErrorHandler)
module.exports = app