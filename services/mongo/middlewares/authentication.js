const { verifyToken } = require("../helpers/jwt")
const User = require("../models/user")

const authentication = async (req, res, next) => {
    try {
        const { access_token } = req.headers
        if (!access_token) {
            throw { name: 'unauthenticated' }
        }
        const payload = verifyToken(access_token)
        const user = await User.findByPk(payload.id)
        if (!user) {
            throw { name: 'unauthenticated' }
        }

        req.user = {
            id: user._id,
            username: user.name,
            role: user.role
        }

        next()
    } catch (err) {
        next(err)
    }
}

module.exports = authentication