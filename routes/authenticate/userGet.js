const express = require('express')
const app = express.Router()
const db = require('../../models')



app.get('/auth/user', async (req, res, next) => {
    let query = req.query
    try {
        const user = await db.users.findAll({
            where: query
        })
            .catch((err) => next(err))
        if (!user.length) {
            return res.status(404).send('User not available, pls register')
        }
        else {
            res.send(user)
        }

    } catch (err) {
        next(err)
    }

})

module.exports = app