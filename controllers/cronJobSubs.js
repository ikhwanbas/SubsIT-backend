const db = require('../models')
const moment = require('moment')

class CronJobSubs {
    constructor(data) {
        this.data = data
    }
    async autoPayment() {
        // menentukan tanggal hari ini
        const today = moment().format("YYYY-MM-DD");
        const then = moment(moment().add(30, 'days')).format("YYYY-MM-DD");
        //mencari subscription yang jatuh tempo pada hari ini
        const result = await db.subscriptions.findAll({
            raw: true,
            where: {
                status: 'subscribed',
                dueDate: today,
            }
        })

        if (result.length) {
            const card = await db.cards.findAll({
                raw: true,
                attributes: ['saldo'],
                where: { id: result[0].cardId }
            })

            const saldo = card[0].saldo
            const payment = result[0].payment
            //--------------------------
            if (saldo >= payment) {
                await db.cards.update(
                    { saldo: saldo - payment },
                    { where: { id: result[0].cardId } }
                )
                await db.subscriptions.update(
                    {
                        startDate: today,
                        dueDate: then
                    },
                    { where: { id: result[0].id } }
                )
                return console.log(`subscription with id: ${result[0].id} have been paid`)
            }

            await db.subscriptions.update(
                {
                    status: 'unsubscribed',
                },
                { where: { id: result[0].id } }
            )
            return console.log(`your subscription with id: ${result[0].id} have been unsubscribed because your saldo is not enough`)

        } else {
            return console.log('no subscription with due date is today');
        }

    }

}
module.exports = CronJobSubs
