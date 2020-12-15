const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express.Router()

app.delete('/files', (req, res) => {
    fs.unlink(path.resolve('uploads', req.query.file), (err) => {
        if (err)
            res.status(404).send('Not Found')
        else
            res.send('File deleted')
    })
})

module.exports = app
