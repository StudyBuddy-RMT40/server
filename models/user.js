const { ObjectId } = require('mongodb')
const { getDb } = require('../config/mongo')
const { hashPassword } = require('../helpers/bcrypt')

class User {
    static userCollection() {
        return getDb().collection('users')
    }

    static async create(data) {
        const value = {
            ...data,
            password: hashPassword(data.password)
        }

        const newUser = await this.userCollection().insertOne(value)
        return newUser
    }

    static async findAll(query, projection, options) {
        const users = await this.userCollection().find(query, projection, options).toArray()
        return users
    }
}

module.exports = User