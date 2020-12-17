const express = require('express')
const app = express.Router()
const db = require('../../../models')
const mysqlErrorHandler = require('../../../middleware/errorMiddleware')
const { salt } = require('../../../helpers/bcryptHelper')
const passport = require('../../../middleware/authorizationMiddleware')

app.patch('/auth/update', passport.authenticate('bearer', { session: false }), async (req, res, next) => {
    let body = req.body
    // let query = req.query
    const user = await db.users.findAll({
        where: { id: req.user.id }
    })
        .catch((err) => next(err))
    if (!user.length) {
        return res.status(404).send('user not found')
    }
    else {

        if ('password' in body) {
            const password = body.password
            const hashedPassword = await salt(password)
                .catch((err) => next(err))
            body.password = hashedPassword
            const result = await db.users.update(
                body,
                {
                    where: { id: req.user.id }
                })
                .catch(err => res.next(err))
            if (result == 1) {
                res.send("your data updated")
            } else {
                res.send("update failed")
            }
        }
        const result = await db.users.update(
            body,
            {
                where: { id: req.user.id }
            })
            .catch(err => res.next(err))

        const updatedUser = await db.users.findAll({
            where: { id: req.user.id }
        })
            .catch((err) => next(err))
        if (result == 1) {
            res.send(updatedUser)
        } else {
            res.send("update failed")
        }
    }
})

app.use(mysqlErrorHandler)
module.exports = app