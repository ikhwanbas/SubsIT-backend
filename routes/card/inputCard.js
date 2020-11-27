const express = require('express')
const app = express.Router()
const db = require('../../models')
const humps = require('humps')
const mysqlErrorHandler = require('../../middleware/errorMiddleware')
const { v4 } = require('uuid')


app.post('/card', async (req, res, next) => {
    let body = humps.decamelizeKeys(req.body)
    body.id = v4()
    const check = await db.cards.findAll({
        where: {
            card_numer: body.card_numer
        }
    })
        .catch((err) => next(err))
    try {
        if (check.length > 0) {
            return res.status(409).send('card already add')
        }
        else {
            const result = await db.cards.create(body)
                .catch(err => res.status(400).send(err))
            res.send(result)
        }
    } catch (err) {
        next(err)
    }
})

app.use(mysqlErrorHandler)
module.exports = app