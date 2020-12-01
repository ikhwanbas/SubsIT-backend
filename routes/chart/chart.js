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

        res.status(200).send(weekCharts)

    } else if (req.params.type == 'monthly') {
        // ambil data sevara bulanan. 
        const chart = await sequelize.query(
            `SELECT CONCAT(YEAR(startDate), "-", MONTH(startDate)) AS dates, SUM(payment) as 'totalPayment' 
        FROM subscriptions 
        WHERE userId = '${userId}'
        GROUP BY dates 
        ORDER BY dates DESC`,
            { raw: true, type: sequelize.QueryTypes.SELECT })
            .catch((err) => next(err))

        const charts = chart.map(obj => {
            let robj = {}
            robj[obj.key] = obj.value
            return { dates: new Date(obj.dates).toLocaleString('default', { month: 'long', year: 'numeric' }), totalPayment: obj.totalPayment }
        })

        res.status(200).send(charts)

    } else {
        res.status(400).send('bad request')
    }
})

app.use(mysqlErrorHandler)

module.exports = app