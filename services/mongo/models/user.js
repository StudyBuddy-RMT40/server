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

    static async findBy(query, projection, options) {
        const users = await this.userCollection().findOne(query, projection, options)
        return users
    }

    static async findByPk(id, projection) {
        const user = await this.userCollection().findOne({ _id: new ObjectId(id) }, projection)
        return user
    }

    static async findOneAndUpdate(id, projection) {
        const updatedUser = await this.userCollection().findOneAndUpdate({ _id: new ObjectId(id) }, projection)
        return updatedUser
    }
}

module.exports = User