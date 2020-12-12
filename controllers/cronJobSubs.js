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
                { where: { cardId: subscription.cardId } }
            )
            console.log(`subscription with id: ${subscription.id} have been paid`)
        });
    }

}

module.exports = CronJobSubs

//tes-----------------
// async todayAutoExpense() {
//     const localDate = new Date().toLocaleString().split('/')[1]
//     const todayDate = new Date(new Date(new Date().setUTCDate(localDate)).setUTCHours(0, 0, 0, 0))
//     const result = await db.expenses.findAll({
//         raw: true,
//         where: { status: "pending", dueDate: todayDate }
//     }).catch(err => {
//         throw new CustomError(500, "ERROR_GET_EXPENSES_DATA", err)
//     })
//     result.forEach(async (expense) => {
//         const card = await db.wallets.findAll({
//             raw: true,
//             where: { userId: expense.userId }
//         })
//         await db.wallets.update(
//             { amount: wallet[0].amount - expense.cost },
//             { where: { userId: expense.userId } }
//         )
//         await db.expenses.update(
//             { status: "paid" },
//             { where: { id: expense.id } }
//         )
//         const subscriptions = await db.subscriptions.findAll({
//             raw: true,
//             where: { id: expense.subscriptionId }
//         })
//         console.log(`expense with id: ${expense.id} have been paid`)
//         if (subscriptions[0].typeExpense == "periodic") {
//             const dueDate = new Date(new Date(setDueDate(subscriptions[0].dueDate)).setMonth(new Date().getUTCMonth() + 1))

//             //** check expense from due date month */
//             await budgetLimitChecker(dueDate, subscriptions.cost, expense.userId)

//             const nextExpense = {
//                 userId: subscriptions[0].userId,
//                 subscriptionId: subscriptions[0].id,
//                 dueDate,
//                 cost: subscriptions[0].cost
//             }
//             await db.expenses.create(nextExpense)
//                 .catch(err => {
//                     throw new CustomError(400, "ERR_ADD_EXPENSES", err.errors[0].message)
//                 })
//             console.log(`subscriptions id: ${subscriptions[0].id} next expense have been set`)
//         }
//     });
// }
