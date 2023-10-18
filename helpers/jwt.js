const jwt = require('jsonwebtoken');
const JWT_SECRET = 'hayo_siapa_yang_tau?'

function signToken(data) {
    return jwt.sign(data, JWT_SECRET)
}

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET)
}

module.exports = {
    signToken,
    verifyToken
}