const express = require('express')
const db = require('../../models')
const app = express.Router()
const auth = require('../../middleware/authorizationMiddleware')
const mysqlErrorHandler = require('../../middleware/errorMiddleware')
const { sequelize } = require('../../models')


app.get('/chart/:type', auth.authenticate('bearer', { session: true }), async (req, res, next) => {
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

        res.status(200).send(resultWeekly)

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

        res.status(200).send(result)

    } else {
        res.status(400).send('bad request')
    }
})

app.use(mysqlErrorHandler)

module.exports = app