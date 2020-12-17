const express = require('express')
const db = require('../../../models')
const app = express.Router()
const auth = require('../../../middleware/authorizationMiddleware')
const mysqlErrorHandler = require('../../../middleware/errorMiddleware')


app.get('/history', auth.authenticate('bearer', { session: true }), async (req, res, next) => {
    const dates = req.query.dates
    // ambil user id dari passport 
    const userId = req.session.passport.user.id

    // cek kalau ada query dates 
    if (req.query.dates) {
        // ambil data subscription search berdasarkan tanggal
        const subscriptionByDates = await db.subscriptions.findAll({
            raw: true,
            include: [{
                model: db.services,
                required: true
            }],
            where: {
                userId,
                startDate: dates
            }
        })

        // ambil data expense search berdasarkan tanggal
        const expenseByDate = await db.expenses.findAll({
            raw: true,
            attributes: ['id', 'title', 'purchaseDate', ["total", "payment"], 'cardId', 'userId'],
            include: [{
                model: db.categories,
                required: true
            }],
            where: {
                userId,
                purchaseDate: dates
            }
        })

        // rumus untuk menjumlahkan nilai total payment antara expense dan subscription
        const total = Object.values([...subscriptionByDates, ...expenseByDate])
        const c = total.map(sobj => {
            let robj = {}
            robj[sobj.key] = sobj.value
            return { total: parseInt(sobj.payment) }
        })
        const sumByDate = c
            .map(item => item.total)
            .reduce((prev, curr) => prev + curr, 0)

        const resultByDate = { total: sumByDate, subscriptions: subscriptionByDates, expenses: expenseByDate }
        res.status(200).send(resultByDate)

    } else {
        // mencari data subscription dari database
        const subscription = await db.subscriptions.findAll({
            raw: true,
            include: [{
                model: db.services,
                required: true
            }],
            where: {
                userId
            }
        })

        // mencari data expense dari database
        const expense = await db.expenses.findAll({
            raw: true,
            attributes: ['id', 'title', 'purchaseDate', ["total", "payment"], 'cardId', 'userId'],
            include: [{
                model: db.categories,
                required: true
            }],
            where: {
                userId
            }
        })

        // rumus untuk menjumlahkan nilai total payment antara expense dan subscription
        const total = Object.values([...subscription, ...expense])
        const c = total.map(sobj => {
            let robj = {}
            robj[sobj.key] = sobj.value
            return { total: parseInt(sobj.payment) }
        })
        const sum = c
            .map(item => item.total)
            .reduce((prev, curr) => prev + curr, 0)

        const result = { total: sum, subscriptions: subscription, expenses: expense }
        res.status(200).send(result)
    }
})

app.use(mysqlErrorHandler)
module.exports = app