const express = require('express')
const { v4 } = require('uuid')
const db = require('../../models')
const app = express.Router()
const auth = require('../../middleware/authorizationMiddleware')
const mysqlErrorHandler = require('../../middleware/errorMiddleware')

app.delete('/expense/:expenseId', auth.authenticate('bearer', { session: true }), async (req, res, next) => {
    const userId = req.session.passport.user.id
    const expenseId = req.params.expenseId

    // cek expenseId dengan ambil dari table expense
    const getExpense = await db.expenses.findAll({
        raw: true,
        attributes: ['id'],
        where: { id: expenseId }
    })
        .catch((err) => next(err))

    //cek apakah expense id ditemukan atau tidak
    if (getExpense.length <= 0) {
        res.status(400).send('expenses not found')
    } else {
        // melakukan insert data into database
        const deleteExpense = await db.expenses.destroy({
            where: {
                userId,
                id: expenseId
            }
        })
            .catch(err => res.status(400).send(err))
        if (deleteExpense) {
            res.send('you have succesfully delete this expense')
        }
    }
}
)
app.use(mysqlErrorHandler)
module.exports = app