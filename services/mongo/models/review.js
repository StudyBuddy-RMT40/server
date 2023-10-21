const { ObjectId } = require('mongodb')
const { getDb } = require('../config/mongo')

class Review {
    static reviewCollection() {
        return getDb().collection('reviews')
    }

    static async create(data) {
        const newReview = await this.reviewCollection().insertOne(data)
        return newReview
    }

    static async findAll() {
        const reviews = await this.reviewCollection().find().toArray()
        return reviews
    }

    static async findOneAndUpdate(id, projection) {
        const updatedReview = await this.reviewCollection().findOneAndUpdate({ _id: new ObjectId(id) }, projection)
        return updatedReview
    }

    static async findOneAndDelete(id) {
        const deletedReview = await this.reviewCollection().findOneAndDelete({ _id: new ObjectId(id) })
        return deletedReview
    }
}

module.exports = Review