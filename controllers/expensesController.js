const { v4 } = require("uuid")
const db = require("../models")

class ExpensesController {
    static async addExpense(req, res, next) {
        const userId = req.session.passport.user.id

        // ambil input expense dari user :
        const body = req.body
        const total = parseInt(req.body.total)
        const cardId = req.body.cardId
        body.userId = userId
        body.id = v4()

        // mengambil data saldo di kartu 
        const getSaldo = await db.cards.findAll({
            raw: true,
            attributes: ['saldo'],
            where: { id: cardId }
        })
            .catch((err) => next(err))

        // cek apakah ada card
        if (!getSaldo || getSaldo.length <= 0) { return res.status(404).send('card is not found') }

        const cardSaldo = parseInt(getSaldo[0].saldo)

        // kondisi jika saldo di kartu kurang dari biaya layanan
        if (cardSaldo < req.body.total) {
            return res.status(402).send('your saldo is not enough to pay this services')
        }
        // menghitung nilai saldo terupdate
        const updatedSaldo = (cardSaldo - total)

        // cek apakah category Id ditemukan atau tidak
        const checkCategory = await db.categories.findAll({
            raw: true,
            attributes: ['id'],
            where: { id: body.categoryId }
        })
            .catch((err) => next(err))

        if (!checkCategory || checkCategory.length <= 0) { return res.status(404).send('categoryId is not found, please input correct Category Id') }
        // melakukan insert data into database
        const expense = await db.expenses.create(body)
            .catch((err) => next(err))

        if (expense) {
            // mengupdate saldo di table card
            await db.cards.update({ saldo: updatedSaldo },
                {
                    where: {
                        userId,
                        id: cardId
                    }
                })
            res.send(body)
        }
    }
    static async getExpense(req, res, next) {
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
    }
    static async getCategory(req, res, next) {
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

    }
    static async deleteExpense(req, res, next) {
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

}

module.exports = ExpensesController