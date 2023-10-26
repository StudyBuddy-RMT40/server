const { getDb } = require("../config/mongo");
const { ObjectId } = require("mongodb");

class Like {
  static likeCollection() {
    return getDb().collection("likes");
  }

  static async create(data) {
    const newCategory = await this.likeCollection().insertOne(data);
    return newCategory;
  }

  static async findAll() {
    const categories = await this.likeCollection().find().toArray();
    return categories;
  }

  static async delete(id, projectId) {
    const deleteCategory = await this.likeCollection().deleteOne({
      $and: [{ userId: new ObjectId(id) }, { projectId: new ObjectId(projectId) }],
    });
    return deleteCategory;
  }
}

module.exports = Like;
