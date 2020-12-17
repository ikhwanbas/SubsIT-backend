const express = require('express')
const app = express.Router()
const db = require('../../../models')
const mysqlErrorHandler = require('../../../middleware/errorMiddleware')
const { v4 } = require('uuid')
const passport = require('../../../middleware/authorizationMiddleware')



app.patch('/debts/update', passport.authenticate('bearer', { session: false }), async (req, res, next) => {
    let body = req.body
    const check = await db.debts.findAll({
        raw: true,
        where: {
            id: req.query.id
        }
    })
        .catch((err) => next(err))
    if (check.length == 0) {
        return res.status(404).send('debts not found')
    }
    else {
        const result = await db.debts.update(
            body,
            {
                where: {
                    id: req.query.id
                }
            })
            .catch(err => next(err))


        if (result == 1) {
            const check1 = await db.debts.findAll({
                raw: true,
                where: {
                    id: req.query.id
                }
            })
                .catch((err) => next(err))
            res.send(check1)
        } else {
            res.send("update failed")
        }

    }
})

app.use(mysqlErrorHandler)
module.exports = app