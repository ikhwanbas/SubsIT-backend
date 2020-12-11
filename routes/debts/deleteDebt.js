const express = require('express')
const db = require('../../models')
const app = express.Router()
const auth = require('../../middleware/authorizationMiddleware')
const mysqlErrorHandler = require('../../middleware/errorMiddleware')


app.get('/debts', auth.authenticate('bearer', { session: true }), async (req, res, next) => {
    let query = req.query
    const check = await db.debts.findAll({
        where: {
            id: query.id
        }
    })
        .catch((err) => next(err))
    if (!check.length) {
        return res.status(204).send('debts not found')
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