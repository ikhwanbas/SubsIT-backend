const express = require('express')
const db = require('../../../models')
const app = express.Router()
const auth = require('../../../middleware/authorizationMiddleware')
const mysqlErrorHandler = require('../../../middleware/errorMiddleware')

app.delete('/subscription/:serviceId', auth.authenticate('bearer', { session: true }), async (req, res, next) => {
    const userId = req.session.passport.user.id
    const serviceId = req.params.serviceId

    // cek dulu apakah bisa ditemukan service id dari params
    const getCost = await db.services.findAll({
        raw: true,
        attributes: ['cost'],
        where: { id: serviceId }
    })
        .catch((err) => next(err))

    //cek apakah service id ditemukan atau tidak
    if (getCost.length <= 0) {
        res.status(404).send('services not found')
    } else {
        const getSubscription = await db.subscriptions.findAll({
            raw: true,
            where: {
                userId,
                serviceId,
                status: 'subscribed'
            }
        })

        if (!getSubscription || getSubscription.length <= 0) {
            return res.status(404).send('you do not subscribe this services')
        } else {
            // melakukan update status data into database
            const deleteSubscription = await db.subscriptions.update(
                { status: 'unsubscribed' },
                {
                    where: {
                        userId,
                        serviceId,
                        status: 'subscribed'
                    }
                })
                .catch(err => res.status(400).send(err))
            return res.status(200).send('you have succesfully unsubscribe this service')
        }
    }
})

app.use(mysqlErrorHandler)
module.exports = app