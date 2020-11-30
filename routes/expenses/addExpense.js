const express = require('express')
const { v4 } = require('uuid')
const db = require('../../models')
const app = express.Router()
const auth = require('../../middleware/authorizationMiddleware')
const mysqlErrorHandler = require('../../middleware/errorMiddleware')


app.post('/expense', auth.authenticate('bearer', { session: true }), async (req, res, next) => {
    const userId = req.session.passport.user.id

    // ambil input expense dari user :
    const body = req.body
    body.userId = userId
    const total = parseInt(req.body.total)
    const cardId = req.body.cardId

    // mengambil data saldo di kartu 
    const getSaldo = await db.cards.findAll({
        raw: true,
        attributes: ['saldo'],
        where: { id: cardId }
    })
        .catch((err) => next(err))
    const cardSaldo = parseInt(getSaldo[0].saldo)

    // kondisi jika saldo di kartu kurang dari biaya layanan
    if (cardSaldo < req.body.total) {
        return res.status(402).send('your saldo is not enough to pay this services')
    }
    // melakukan update saldo
    const updatedSaldo = (cardSaldo - total)
    console.log(updatedSaldo);

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
    }
    res.send(body)

})
app.use(mysqlErrorHandler)

module.exports = app