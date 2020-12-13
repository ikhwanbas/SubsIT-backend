const db = require('../models')

class CronJobSubs {
    constructor(data) {
        this.data = data
    }
    async autoPayment() {
        // menentukan tanggal hari ini
        const localDate = new Date().toLocaleString().split('/')[1]
        const todayDate = new Date(new Date(new Date().setUTCDate(localDate)).setUTCHours(0, 0, 0, 0))

        //mencari subscription yang jatuh tempo pada hari ini
        const result = await db.subscriptions.findAll({
            raw: true,
            where: {
                dueDate: todayDate,
            }
        }).catch((err) => next(err))
        result.forEach(async (subs) => {
            //bugs 1 card = 2/ lebih subs , saldo berkurang hanya untuk satu subs
            const card = await db.cards.findAll({
                raw: true,
                where: { id: subs.cardId }
            })
            await db.cards.update(
                { saldo: card[0].saldo - subs.payment },
                { where: { id: subs.cardId } }
            )
            console.log(`subscription with id: ${subs.id} have been paid`)
        });
    }

}

module.exports = CronJobSubs
