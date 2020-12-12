const CronJobSubs = require("../../controllers/cronJobSubs");

async function autoPaysubs() {
    const autoPay = new CronJobSubs()
    await autoPay.autoPayment()
}

module.exports = autoPaysubs