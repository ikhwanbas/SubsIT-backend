const express = require('express')
const app = express.Router()
const db = require('../../models')
const mysqlErrorHandler = require('../../middleware/errorMiddleware')
const passport = require('../../middleware/authorizationMiddleware')

app.get('/auth/user', passport.authenticate('bearer', { session: false }), async (req, res, next) => {
    const user = await db.users.findAll(
        {
            where: { id: req.user.id }
        })
        .catch((err) => next(err))
    if (!user.length) {
        return res.status(404).send('User not available, pls register')
    }
    else {
        res.send(user)
    }
})

app.use(mysqlErrorHandler)
module.exports = app