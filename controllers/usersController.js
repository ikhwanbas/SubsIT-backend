const { salt, checkPassword } = require('../helpers/bcryptHelper')
const db = require('../models')
const jwt = require('jsonwebtoken')
const jwtConfig = require('../config/jwtConfig')
const { v4 } = require('uuid')


class UserController {
    static async register(req, res, next) {
        let body = req.body
        body.id = v4()
        body.photo = `${process.env.HOSTNAME}/files/defaultFotoProfile.jpg`
        try {
            const getStatus = await db.users.findAll({
                raw: true,
                where: {
                    email: body.email

                }
            })
                .catch((err) => next(err))
            if (!getStatus.length) {

                const password = body.password
                body.status = 'active'
                const hashedPassword = await salt(password)
                    .catch((err) => next(err))
                body.password = hashedPassword

                const addUserResult = await db.users.create(body)
                    .catch(err => next(err))
                const result = addUserResult.get({ plain: true })

                if (result) {
                    const token = jwt.sign({ id: body.id }, process.env.JWT_SECRET, jwtConfig.options)
                    result.token = token
                    delete result.password
                    res.send(result)
                }
            } else if (getStatus[0].status == 'active') {
                return res.status(409).send('Email already used')
            } else (getStatus[0].status == 'inactive')
            await db.users.update({
                status: 'active'
            },
                {
                    where: { email: body.email }
                })
                .catch((err) => next(err))
            res.send('Account activation is succesfull, please log in')
        } catch (err) {
            console.log('minor err when register but its okay!');
        }

    }
    static async login(req, res, next) {
        let body = req.body
        try {
            let user = await db.users.findAll({
                where: {
                    email: body.email,
                    status: 'active'
                }
            })
                .catch((err) => next(err))
            if (!user.length) {
                return res.status(404).send('User not available or inactive , pls register')
            }
            else {
                user = user[0]
                const isPassMatch = await checkPassword(body.password, user.password)
                if (!isPassMatch) {
                    return res.status(400).send('Password not match')
                }
                else {
                    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, jwtConfig.options)
                    user.dataValues.token = token
                    delete user.dataValues.password
                    res.send(user.dataValues)
                }
            }
        } catch (err) {
            next(err)
        }
    }
    static async getUser(req, res, next) {
        const user = await db.users.findAll(
            {
                where: { id: req.user.id }
            })
            .catch((err) => next(err))
        if (!user.length) {
            return res.status(404).send('User not available, pls register')
        }
        else {
            res.send(user)
        }
    }
    static async updateUser(req, res, next) {
        let body = req.body
        // let query = req.query
        const user = await db.users.findAll({
            where: { id: req.user.id }
        })
            .catch((err) => next(err))
        if (!user.length) {
            return res.status(404).send('user not found')
        }
        else {

            if ('password' in body) {
                const password = body.password
                const hashedPassword = await salt(password)
                    .catch((err) => next(err))
                body.password = hashedPassword
                const result = await db.users.update(
                    body,
                    {
                        where: { id: req.user.id }
                    })
                    .catch(err => res.next(err))
                if (result == 1) {
                    res.send("your data updated")
                } else {
                    res.send("update failed")
                }
            }
            const result = await db.users.update(
                body,
                {
                    where: { id: req.user.id }
                })
                .catch(err => res.next(err))

            const updatedUser = await db.users.findAll({
                where: { id: req.user.id }
            })
                .catch((err) => next(err))
            if (result == 1) {
                res.send(updatedUser)
            } else {
                res.send("update failed")
            }
        }
    }
    static async deleteUser(req, res, next) {
        let id = req.user.id
        let user = await db.users.findAll({
            where: {
                id: id,
                status: 'active'
            }
        })
        if (user.length) {
            await db.users.update({
                status: 'inactive'
            },
                {
                    where: { id: id }
                })
                .catch((err) => next(err))
            res.send('user deleted')
        } else {
            res.send("user not found,login pls")
        }
    }
}

module.exports = UserController