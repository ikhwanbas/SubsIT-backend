const express = require('express')
const db = require('../../models')
const app = express.Router()
const auth = require('../../middleware/authorizationMiddleware')
const mysqlErrorHandler = require('../../middleware/errorMiddleware')


app.get('/debts/update', auth.authenticate('bearer', { session: true }), async (req, res, next) => {
    let body = req.body
    const check = await db.debts.findAll({
        raw: true,
        where: {
            id: req.query.id
        }
    })
        .catch((err) => next(err))
    console.log(check);
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
            res.send("your debts updated")
        } else {
            res.send("update failed")
        }

    }
})
app.use(mysqlErrorHandler)


module.exports = app