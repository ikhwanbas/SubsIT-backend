const cron = require('node-cron');
const db = require('../models');

const monthName = [

    '',
    'Jan',
    'Feb',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec'
];

const getMonthName = month => {
    return monthName[month];
};

const scheduleJob = async id => {
    var d = new Date;
    var min = d.getMinutes();
    var date = d.getDate();
    var seconds = d.getSeconds();
    var month = d.getMonth();
    var year = d.getFullYear();
    var hour = d.getHours();

    try {
        cron.schedule(
            `${seconds >= 59 ? 1 : seconds} ${min + 1} ${hour} ${date} ${month + 1} *`,

            async () => {
                let subs = await db.subscriptions.findOne({
                    id: id,
                });

                if (!subs) {
                    return true;
                }
                await db.card.update(saldo, {
                    where: {
                        cardId: req.query.cardId
                    }

                });
                console.log(`Task completed for ${id} at ${date} / ${hour}:${min}`);
                scheduleJob(id);
            }, {
            scheduled: true,
            timezone: 'Asia/Jakarta'
        }
        );
    } catch (err) {
        console.log(err);
    }

}


module.exports = {
    getMonthName,
    scheduleJob
}