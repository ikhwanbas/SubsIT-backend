const express = require('express')
const db = require('../../models')
const app = express.Router()
const auth = require('../../middleware/authorizationMiddleware')
const mysqlErrorHandler = require('../../middleware/errorMiddleware')

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

        // melakukan insert data into database
        const deleteSubscription = await db.subscriptions.destroy({
            where: {
                userId,
                serviceId
            }
        })
            .catch(err => res.status(400).send(err))
        if (deleteSubscription) {
            res.send('you have succesfully unsubscribe this service')
        }
        res.status(404).send('there is no subscription with this service')
    }
})

app.use(mysqlErrorHandler)
module.exports = app