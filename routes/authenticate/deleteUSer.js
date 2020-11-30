const express = require('express')
const app = express.Router()
const db = require('../../models')
const mysqlErrorHandler = require('../../middleware/errorMiddleware')
const passport = require('../../middleware/authorizationMiddleware')

app.delete('/auth/delete', passport.authenticate('bearer', { session: false }), async (req, res, next) => {
    let query = req.query
    query.userId = req.user.id
    const user = await db.users.findAll({
        where: {
            id: query.userId
        }
    })
        .catch((err) => next(err))

    const check = await db.cards.findAll({
        where: {
            userId: query.userId
        }
    })
        .catch((err) => next(err))

    if (check) {
        // await db.cards.destroy({ where: { userId: query.userId } }) && db.expenses.destroy({ where: { userId: query.userId } }) && db.subscriptions.destroy({ where: { userId: query.userId } })
        await db.cards && db.expenses && db.subscriptions.destroy({
            where: {
                userId: query.userId
            }
        })
            .catch((err) => next(err))
    }

    await db.users.destroy({
        where: {
            id: query.userId
        }
    })
        .catch((err) => next(err))
    res.send("user hasbeen deleted")

})

app.use(mysqlErrorHandler)
module.exports = app