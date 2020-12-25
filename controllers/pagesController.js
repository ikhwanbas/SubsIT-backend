const db = require("../models")
const { sequelize } = require('../models')

class PagesController {
    static async charts(req, res, next) {
        // ambil user id dari passport 
        const userId = req.session.passport.user.id

        if (req.params.type == 'weekly') {
            // ambil data secara weekly
            const weekExpenseChart = await sequelize.query(
                `SELECT CONCAT(YEAR(purchaseDate), "-", MONTH (purchaseDate), "-", (WEEK(purchaseDate,5) - 
        WEEK(DATE_SUB(purchaseDate, INTERVAL DAYOFMONTH(purchaseDate) - 1 DAY), 5) + 1)) as weekMonth, SUM(total) as totalPayment
        FROM expenses
        WHERE userId = '${userId}'
        GROUP BY  weekmonth
        ORDER BY CAST(weekmonth AS datetime) DESC`,
                { raw: true, type: sequelize.QueryTypes.SELECT })
                .catch((err) => next(err))

            const weekExpenseCharts = weekExpenseChart.map(sobj => {
                let robj = {}
                robj[sobj.key] = sobj.value
                return { weekMonth: new Date(sobj.weekMonth).toLocaleDateString('default', { day: 'numeric', month: 'long', year: 'numeric' }), totalPayment: sobj.totalPayment }
            })

            // ambil data subscription secara weekly
            const weekChart = await sequelize.query(
                `SELECT CONCAT(YEAR(startDate), "-", MONTH (startDate), "-", (WEEK(startDate,5) - 
        WEEK(DATE_SUB(startDate, INTERVAL DAYOFMONTH(startDate) - 1 DAY), 5) + 1)) as weekMonth, SUM(payment) as totalPayment
        FROM subscriptions
        WHERE userId = '${userId}'
        GROUP BY  weekmonth
        ORDER BY CAST(weekmonth AS datetime) DESC`,
                { raw: true, type: sequelize.QueryTypes.SELECT })
                .catch((err) => next(err))

            const weekCharts = weekChart.map(sobj => {
                let robj = {}
                robj[sobj.key] = sobj.value
                return { weekMonth: new Date(sobj.weekMonth).toLocaleDateString('default', { day: 'numeric', month: 'long', year: 'numeric' }), totalPayment: sobj.totalPayment }
            })

            // hitung jumlah antara keduanya
            const resultWeekly = Object.values([...weekExpenseCharts, ...weekCharts].reduce((acc, { weekMonth, totalPayment }) => {
                let totalPayments = parseInt(totalPayment)
                acc[weekMonth] = { weekMonth, totals: (acc[weekMonth] ? acc[weekMonth].totalPayments : 0) + totalPayments };
                return acc;
            }, {}));

            res.status(200).send(resultWeekly.reverse())

        } else if (req.params.type == 'monthly') {
            // ambil data expense bulanan
            const expenseChart = await sequelize.query(
                `SELECT  CONCAT(YEAR (purchaseDate), "-", MONTH (purchaseDate)) AS MONTHYEARE, SUM(total) as total
	            FROM expenses 
	            WHERE userId='${userId}'
	            GROUP BY MONTHYEARE
                ORDER BY MONTHYEARE DESC`,
                { raw: true, type: sequelize.QueryTypes.SELECT })
                .catch((err) => next(err))

            const expenseCharts = expenseChart.map(obj => {
                let robj = {}
                robj[obj.key] = obj.value
                return { dates: new Date(obj.MONTHYEARE).toLocaleString('default', { month: 'long', year: 'numeric' }), total: obj.total }
            })

            // ambil data sevara bulanan. 
            const subscriptionChart = await sequelize.query(
                `SELECT CONCAT(YEAR(startDate), "-", MONTH(startDate)) AS dates, SUM(payment) as 'total' 
        FROM subscriptions 
        WHERE userId = '${userId}'
        GROUP BY dates 
        ORDER BY dates DESC`,
                { raw: true, type: sequelize.QueryTypes.SELECT })
                .catch((err) => next(err))

            const charts = subscriptionChart.map(obj => {
                let robj = {}
                robj[obj.key] = obj.value
                return { dates: new Date(obj.dates).toLocaleString('default', { month: 'long', year: 'numeric' }), total: obj.total }
            })

            // hitung jumlah antara keduanya
            const result = Object.values([...expenseCharts, ...charts].reduce((acc, { dates, total }) => {
                let totals = parseInt(total)
                acc[dates] = { dates, totals: (acc[dates] ? acc[dates].totals : 0) + totals };
                return acc;
            }, {}));

            res.status(200).send(result.reverse())

        } else {
            res.status(400).send('bad request')
        }
    }
    static async histories(req, res, next) {
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
    }
    static async services(req, res, next) {
        //mencari service berdasarkan query/semua key field
        const check = await db.services.findAll({
            where: req.query
        })
            .catch((err) => next(err))
        //validasi service tersedia/tidak
        if (check.length == 0) {
            return res.status(404).send('service not found')
        }
        else {
            res.send(check)
        }
    }
}
module.exports = PagesController