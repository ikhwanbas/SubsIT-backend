const express = require('express')
const app = express.Router()
const db = require('../../../models')
const mysqlErrorHandler = require('../../../middleware/errorMiddleware')


app.get('/categories', async (req, res, next) => {
    //mencari service berdasarkan query/semua key field
    const check = await db.categories.findAll({
        where: req.query
    })
        .catch((err) => next(err))
    //validasi service tersedia/tidak
    if (check.length == 0) {
        return res.status(404).send('categories not found')
    }
    else {
        res.send(check)
    }

})

app.use(mysqlErrorHandler)
module.exports = app