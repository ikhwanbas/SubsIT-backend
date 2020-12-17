const express = require('express')
const app = express.Router()
const db = require('../../../models')
const mysqlErrorHandler = require('../../../middleware/errorMiddleware')
const { v4 } = require('uuid')
const passport = require('../../../middleware/authorizationMiddleware')



app.delete('/debts/delete', passport.authenticate('bearer', { session: false }), async (req, res, next) => {
    let query = req.query
    const check = await db.debts.findAll({
        where: {
            id: query.id
        }
    })
        .catch((err) => next(err))
    if (!check.length) {
        return res.status(404).send('debts not found')
    }
    else {
        const result = await db.debts.destroy({
            where: {
                id: query.id
            }
        })
            .catch((err) => next(err))
        if (result == 1) {
            res.send("delete success")
        } else {
            res.send("delete failed")
        }

    }
})

app.use(mysqlErrorHandler)
module.exports = app