const express = require('express')
const app = express.Router()
const db = require('../../models')
const mysqlErrorHandler = require('../../middleware/errorMiddleware')
const passport = require('../../middleware/authorizationMiddleware')

app.delete('/auth/delete', passport.authenticate('bearer', { session: false }), async (req, res, next) => {
    await db.users.update({
        status: 'inactive'
    },
        {
            where: { id: req.user.id }
        })
        .catch((err) => next(err))
    res.send('user deleted')
})

app.use(mysqlErrorHandler)
module.exports = app