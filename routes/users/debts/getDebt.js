const express = require('express')
const db = require('../../../models')
const app = express.Router()
const auth = require('../../../middleware/authorizationMiddleware')
const mysqlErrorHandler = require('../../../middleware/errorMiddleware')


app.get('/debts/notes', auth.authenticate('bearer', { session: true }), async (req, res, next) => {
    const check = await db.debts.findAll({
        where: { userId: req.user.id },
        include: {
            model: db.users,
            attributes: ['fullName', 'email']
        }
    })
        .catch((err) => next(err))
    if (!check.length) {
        return res.status(204).send('debts not found')
    }
    else {
        res.send(check)
    }
})
app.use(mysqlErrorHandler)


module.exports = app