const { comparePassword } = require("../helpers/bcrypt")
const User = require("../models/user")

class Controller {
    static async register(req, res, next) {
        try {
            const { username, email, password, phoneNumber, address } = req.body
            if (!username) {
                throw { name: 'empty_username' }
            }
            if (!email) {
                throw { name: 'empty_email' }
            }
            if (!password) {
                throw { name: 'empty_password' }
            }
            const users = await User.findAll()
            const even = (el) => el.email === email
            const isRegisteredEmail = users.some(even)
            if (isRegisteredEmail) {
                throw { name: "unique_email" }
            }

            await User.create({ username, email, password, phoneNumber, role: null, address })
            res.status(201).json({ message: `User with username ${username} successfully created` })
        } catch (err) {
            next(err)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            if (!email) {
                throw { name: 'empty_email' }
            }
            if (!password) {
                throw { name: 'empty_password' }
            }
            const findUser = await User.findBy({ email })
            console.log(findUser, '<<<<<')
            if (!findUser) {
                throw {name: 'invalid_email'}
            }
            console.log(password, findUser.password, '<<<<<<<<<')
            const isPassValid = await comparePassword(password, findUser.password)
            console.log(isPassValid, '<<<<<')
            if (!isPassValid) {
                throw {name: 'invalid_password'}
            }
            res.status(200).json({message: `User with username ${email} has login`})
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller