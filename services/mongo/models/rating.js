const { ObjectId } = require('mongodb')
const { getDb } = require('../config/mongo')

class Rating {
    static ratingCollection() {
        return getDb().collection('ratings')
    }

    static async create(data) {
        const newReview = await this.ratingCollection().insertOne(data)
        return newReview
    }

    static async findOneAndUpdate(id, projection) {
        const updatedRating = await this.ratingCollection().findOneAndUpdate({ _id: new ObjectId(id) }, projection)
        return updatedRating
    }

    static async findAll() {
        const rating = await this.ratingCollection().find().toArray()
        return rating
    }
}

module.exports = Rating