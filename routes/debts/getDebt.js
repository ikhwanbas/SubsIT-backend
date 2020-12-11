const express = require('express')
const db = require('../../models')
const app = express.Router()
const auth = require('../../middleware/authorizationMiddleware')
const mysqlErrorHandler = require('../../middleware/errorMiddleware')


app.get('/debts', auth.authenticate('bearer', { session: true }), async (req, res, next) => {
    const check = await db.debts.findAll({
        where: { userId: req.user.id },
        include: {
            model: db.users,
            attributes: ['fullName', 'email']
        }
    })
        .catch((err) => next(err))
    //validasi card tersedia/tidak
    if (!check.length) {
        return res.status(204).send('expense not found')
    }
    else {
        res.send(check)
    }
})
app.use(mysqlErrorHandler)


module.exports = app