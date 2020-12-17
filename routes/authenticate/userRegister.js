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
    const getStatus = await db.users.findAll({
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

        if (addUserResult) {
            const token = jwt.sign({ id: body.id }, process.env.JWT_SECRET, jwtConfig.options)
            addUserResult.dataValues.token = token
            delete addUserResult.dataValues.password
            res.send(addUserResult.dataValues)
        }
    }

    let getStatuss = getStatus[0]
    if (getStatuss.dataValues.status == 'active') {
        return res.status(409).send('Email already used')
    }

    else if (getStatuss.dataValues.status == 'inactive') {
        await db.users.update({
            status: 'active'
        },
            {
                where: { email: body.email }
            })
            .catch((err) => next(err))
        res.send('Account activation is succesfull, please log in')
    }
})

app.use(mysqlErrorHandler)
module.exports = app