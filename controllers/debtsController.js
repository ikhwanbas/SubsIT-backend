const { v4 } = require("uuid")
const db = require("../models")

class DebtsController {
    static async addDebts(req, res, next) {
        let body = req.body
        body.id = v4()
        body.userId = req.user.id
        const result = await db.debts.create(body)
            .catch((err) => next(err))
        res.send(result)
    }
    static async getDebts(req, res, next) {
        const check = await db.debts.findAll({
            where: { userId: req.user.id },
            include: {
                model: db.users,
                attributes: ['fullName', 'email']
            }
        })
            .catch((err) => next(err))
        if (!check.length) {
            return res.status(204).send('debts not found')
        }
        else {
            res.send(check)
        }
    }
    static async editDebts(req, res, next) {
        let body = req.body
        const check = await db.debts.findAll({
            raw: true,
            where: {
                id: req.query.id
            }
        })
            .catch((err) => next(err))
        if (check.length == 0) {
            return res.status(404).send('debts not found')
        }
        else {
            const result = await db.debts.update(
                body,
                {
                    where: {
                        id: req.query.id
                    }
                })
                .catch(err => next(err))


            if (result == 1) {
                const check1 = await db.debts.findAll({
                    raw: true,
                    where: {
                        id: req.query.id
                    }
                })
                    .catch((err) => next(err))
                res.send(check1)
            } else {
                res.send("update failed")
            }

        }
    }
    static async deleteDebts(req, res, next) {
        let query = req.query
        const check = await db.debts.findAll({
            where: {
                id: query.id
            }
        })
            .catch((err) => next(err))
        if (!check.length) {
            return res.status(404).send('debts not found')
        }
        else {
            const result = await db.debts.destroy({
                where: {
                    id: query.id
                }
            })
                .catch((err) => next(err))
            if (result == 1) {
                res.send("delete success")
            } else {
                res.send("delete failed")
            }

        }
    }

}

module.exports = DebtsController