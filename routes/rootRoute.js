const express = require('express')
const app = express.Router()

app.get('/', (req, res) => {
  res.send("Hello world, SubsIt API is Runing!")
})

module.exports = app