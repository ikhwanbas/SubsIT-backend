const db = require('../models')




class CronJobSubs {
    constructor(data) {
        this.data = data
    }
    async autoPayment() {
        const localDate = new Date().toLocaleString().split('/')[1]
        const todayDate = new Date(new Date(new Date().setUTCDate(localDate)).setUTCHours(0, 0, 0, 0))
        const result = await db.subscriptions.findAll({
            raw: true,
            where: { dueDate: todayDate }
        }).catch((err) => next(err))

        result.forEach(async (subscription) => {
            const card = await db.cards.findAll({
                raw: true,
                where: { userId: subscription.userId }
            })
            await db.cards.update(
                { saldo: card[0].saldo - subscription.payment },
                { where: { id: subscription.cardId } }
            )
            console.log(`subscription with id: ${subscription.id} have been paid`)
        });
    }

}

module.exports = CronJobSubs
