const { v4 } = require("uuid")
const db = require("../models")


class CardController {
    static async addCard(req, res, next) {
        let body = req.body
        body.id = v4()
        body.userId = req.user.id
        const check = await db.cards.findAll({
            where: {
                cardNumber: body.cardNumber
            }
        })
            .catch((err) => next(err))
        if (check.length > 0) {
            return res.status(409).send('card already add')
        }
        else {
            const result = await db.cards.create(body)
                .catch((err) => next(err))
            res.send(result)
        }
    }
    static async getCard(req, res, next) {
        const check = await db.cards.findAll({
            where: { userId: req.user.id },
            include: {
                model: db.users,
                attributes: ['fullName', 'email']
            }
        })
            .catch((err) => next(err))
        //validasi card tersedia/tidak
        if (!check.length) {
            return res.status(404).send('card not found')
        }
        else {
            res.send(check)
        }
    }
    static async editCard(req, res, next) {
        let body = req.body
        const check = await db.cards.findAll({
            where: {
                cardNumber: req.query.cardNumber
            }
        })
            .catch((err) => next(err))
        if (check.length == 0) {
            return res.status(404).send('card not found')
        }
        else {
            const result = await db.cards.update(
                body,
                {
                    where: {
                        cardNumber: req.query.cardNumber
                    }
                })
                .catch(err => next(err))
            if (result == 1) {
                const check1 = await db.cards.findAll({
                    where: {
                        cardNumber: req.query.cardNumber
                    }
                })
                    .catch((err) => next(err))
                res.send(check1)
            } else {
                res.send("update failed")
            }

        }
    }
    static async deleteCard(req, res, next) {
        let query = req.query
        const check = await db.cards.findAll({
            where: {
                cardNumber: query.cardNumber
            }
        })
            .catch((err) => next(err))
        if (!check.length) {
            return res.status(404).send('card not found')
        }
        else {
            const result = await db.cards.destroy({
                where: {
                    cardNumber: query.cardNumber
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
    static async topUpCard(req, res, next) {
        let body = req.body
        const check = await db.cards.findAll({
            raw: true,
            where: {
                cardNumber: req.query.cardNumber
            }
        })
            .catch((err) => next(err))
        if (check.length == 0) {
            return res.status(404).send('card not found')
        }
        else {
            const cardSaldo = parseInt(check[0].saldo)
            const topUp = (cardSaldo + body.saldo)
            const result = await db.cards.update({
                saldo: topUp
            },
                {
                    where: { cardNumber: req.query.cardNumber }
                })

                .catch((err) => next(err))
            if (result == 1) {
                res.send("your top up suscescfull")
            } else {
                res.send("top up failed")
            }

        }
    }
}

module.exports = CardController