const express = require('express')
const app = express.Router()
const db = require('../controllers/dbController')

app.get('/', (req, res) => {
  res.send("Hello world!")
})

module.exports = app