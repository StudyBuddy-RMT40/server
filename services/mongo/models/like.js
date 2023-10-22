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

  static async findById(id) {
    const category = await this.likeCollection().findOne({
      _id: new ObjectId(id),
    });
    return category;
  }

  static async delete(id, projectId) {
    const deleteCategory = await this.likeCollection().deleteOne({
      $and: [{ _id: new ObjectId(id) }, { projectId: projectId }],
    });
    return deleteCategory;
  }
}

module.exports = Like;
