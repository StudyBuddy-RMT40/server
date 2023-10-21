const { getDb } = require("../config/mongo");
const { ObjectId } = require("mongodb");

class Like {
  static projectCollection() {
    return getDb().collection("likes");
  }

  static async create(data) {
    const newCategory = await this.projectCollection().insertOne(data);
    return newCategory;
  }

  static async findAll() {
    const categories = await this.projectCollection().find().toArray();
    return categories;
  }

  static async findById(id) {
    const category = await this.projectCollection().findOne({
      _id: new ObjectId(id),
    });
    return category;
  }

  static async delete(id, projectId) {
    const deleteCategory = await this.projectCollection().deleteOne({
      $and: [{ _id: new ObjectId(id) }, { projectId: projectId }],
    });
    return deleteCategory;
  }
}

module.exports = Like;
