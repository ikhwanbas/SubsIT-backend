const express = require('express')
const db = require('../../models')
const app = express.Router()

app.get('/subscription/:id', async (req, res, next) => {


    const subscription = await db.subscriptions.findAll({})
    res.send(subscription)
})

module.exports = app