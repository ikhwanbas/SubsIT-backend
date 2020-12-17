const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express.Router()
const db = require('../../../models')
const passport = require('../../../middleware/authorizationMiddleware')
const mysqlErrorHandler = require('../../../middleware/errorMiddleware')

app.delete('/files', passport.authenticate('bearer', { session: false }), (req, res, next) => {
    fs.unlink(path.resolve('uploads', req.query.file), async (err) => {

        try {
            const fileName = `${process.env.HOSTNAME}/files/defaultFotoProfile.jpg`
            await db.users.update({
                photo: fileName
            },
                {
                    where: { id: req.user.id }
                })
            res.send('File deleted')
        } catch (err) {
            next(err)

        }
        // if (err)
        //     res.status(404).send('Not Found')
        // else

    })
})

app.use(mysqlErrorHandler)
module.exports = app
