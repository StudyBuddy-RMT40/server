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
}

module.exports = Controller