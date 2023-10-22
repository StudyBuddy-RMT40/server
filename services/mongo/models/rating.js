const { ObjectId } = require("mongodb");
const { getDb } = require("../config/mongo");

class Rating {
  static ratingCollection() {
    return getDb().collection("ratings");
  }

  static async create(data) {
    const newReview = await this.ratingCollection().insertOne(data);
    return newReview;
  }

  static async findOneAndUpdate(id, projection) {
    const updatedRating = await this.ratingCollection().findOneAndUpdate(
      { _id: new ObjectId(id) },
      projection
    );
    return updatedRating;
  }

  static async findAll() {
    const rating = await this.ratingCollection().find().toArray();
    return rating;
  }

  static async findStudentId(studentId, projectId) {
    const ratings = await this.ratingCollection().findOne({
      projectId: new ObjectId(projectId),
      studentId: new ObjectId(studentId),
    });
    return ratings;
  }  

  static async findTeacherId(teacherId, projectId) {
    const ratings = await this.ratingCollection().findOne({
      projectId: new ObjectId(projectId),
      teacherId: new ObjectId(teacherId),
    });
    return ratings;
  }
}

module.exports = Rating;
