const { getDb } = require("../config/mongo");
const { ObjectId } = require("mongodb");

class Category {
  static projectCollection() {
    return getDb().collection("categories");
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

  static async findByName(name) {
    const category = await this.projectCollection().findOne({ name: name });
    return category;
  }

  static async delete(id) {
    const deleteCategory = await this.projectCollection().deleteOne({
      _id: new ObjectId(id),
    });
    return deleteCategory;
  }
}

module.exports = Category;
