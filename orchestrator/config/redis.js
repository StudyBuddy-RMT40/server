const Redis = require('ioredis')
const redis = new Redis();

const BASE_URL = 'http://localhost:3000'

module.exports = {
    redis,
    BASE_URL
}