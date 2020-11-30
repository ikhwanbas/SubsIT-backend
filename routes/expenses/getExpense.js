const express = require('express')
const db = require('../../models')
const app = express.Router()
const auth = require('../../middleware/authorizationMiddleware')


app.get('/expense', auth.authenticate('bearer', { session: true }), async (req, res, next) => {
    // ambil user id dari passport 
    const userId = req.session.passport.user.id

    // mencari data subscription dari database
    const expense = await db.expenses.findAll({
        include: [{
            model: db.users,
            required: true,
            include: [{
                model: db.cards,
                required: true
            }]
        }],
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
})

module.exports = app