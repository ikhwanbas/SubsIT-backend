const express = require('express')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const app = express.Router()
const db = require('../../../models')

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
const passport = require('../../../middleware/authorizationMiddleware')

app.post('/files', upload.single('file'), passport.authenticate('bearer', { session: false }), async (req, res) => {
    const fileName = `${process.env.HOSTNAME}/files/${req.file.originalname.replace(' ', "%20")}`
    await db.users.update({
        photo: fileName
    },
        {
            where: { id: req.user.id }
        })
        .catch((err) => next(err))

    const user = await db.users.findOne({
        where: { id: req.user.id }
    })
        .catch((err) => next(err))
    res.send(user)
})

module.exports = app
