const express = require('express')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const app = express.Router()

fs.readdir(path.resolve(), (err, files) => {
    if (err)
        console.log(err)
    else
        if (!files.includes('uploads')) {
            console.log('creating uploads folder');
            fs.mkdir(path.resolve('uploads'), (err) => 1)
        }
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

app.post('/files', upload.single('file'), (req, res) => {
    const fileName = `${process.env.HOSTNAME}/files/${req.file.originalname.replace(' ', "%20")}`
    res.send({ fileName })
})

module.exports = app
