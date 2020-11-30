const express = require('express')
const { v4 } = require('uuid')
const db = require('../../models')
const app = express.Router()
const auth = require('../../middleware/authorizationMiddleware')

app.delete('/subscription/:serviceId', auth.authenticate('bearer', { session: true }), async (req, res, next) => {
    // cek dulu apakah bisa ditemukan service id dari params
    const getCost = await db.services.findAll({
        raw: true,
        attributes: ['cost'],
        where: { id: serviceId }
    })
        .catch((err) => next(err))

    //cek apakah service id ditemukan atau tidak
    if (getCost.length <= 0) {
        res.status(400).send('services not found')
    } else {

        const userId = req.session.passport.user.id
        const serviceId = req.params.serviceId

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

module.exports = app