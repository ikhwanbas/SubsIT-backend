const CronJobSubs = require("./cronJobSubs");

async function autoPaysubs() {
    const autoPay = new CronJobSubs()
    await autoPay.autoPayment()
};

module.exports = autoPaysubs