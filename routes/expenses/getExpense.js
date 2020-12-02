const express = require('express')
const db = require('../../models')
const app = express.Router()
const auth = require('../../middleware/authorizationMiddleware')
const mysqlErrorHandler = require('../../middleware/errorMiddleware')


app.get('/expense', auth.authenticate('bearer', { session: true }), async (req, res, next) => {
    // ambil user id dari passport 
    const userId = req.session.passport.user.id
    const dates = req.query.dates

    if (req.query.dates) {
        const expenseByDate = await db.expenses.findAll({
            where: {
                userId,
                purchaseDate: dates
            }
        })
        // kondisi kalau tidak ditemukan subscription
        if (expenseByDate.length <= 0) {
            res.status(404).send('expense is not found')
        } else {
            // kalau ditemukan tampilkan hasilnya
            res.send(expenseByDate)
        }
    } else {
        // mencari data subscription dari database
        const expense = await db.expenses.findAll({
            where: {
                userId
            }
        })
        // kondisi kalau tidak ditemukan subscription
        if (expense.length <= 0) {
            res.status(404).send('expense is not found')
        } else {
            // kalau ditemukan tampilkan hasilnya
            res.send(expense)
        }
    }
})

app.use(mysqlErrorHandler)
module.exports = app