const express = require('express')
const app = express.Router()
const db = require('../../models')

app.post('/auth/login', async (req, res, next) => {
    const user = await db.users.findAll({
        where: req.body
    })
    res.send(user)
})

module.exports = app