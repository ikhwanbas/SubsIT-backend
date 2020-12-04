const express = require('express')
const app = express.Router()
const db = require('../../models')
const mysqlErrorHandler = require('../../middleware/errorMiddleware')
const passport = require('../../middleware/authorizationMiddleware')

app.delete('/auth/delete', passport.authenticate('bearer', { session: false }), async (req, res, next) => {
    let id = req.user.id
    let user = await db.users.findAll({
        where: {
            id: id,
            status: 'active'
        }
    })
    if (user.length) {
        await db.users.update({
            status: 'inactive'
        },
            {
                where: { id: id }
            })
            .catch((err) => next(err))
        res.send('user deleted')
    } else {
        res.send("user not found,login pls")
    }

})

app.use(mysqlErrorHandler)
module.exports = app