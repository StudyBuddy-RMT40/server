const { getDb } = require("../config/mongo");
const { ObjectId } = require("mongodb");

class Category {
  static projectCollection() {
    return getDb().collection("categories");
  }

  static async create(data) {
    try {
      const newCategory = await this.projectCollection().insertOne(data);
      return newCategory;
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  }

  static async findAll() {
    try {
      const categories = await this.projectCollection().find().toArray();
      return categories;
    } catch (error) {
      console.error("Error finding categories:", error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const category = await this.projectCollection().findOne({
        _id: new ObjectId(id),
      });
      return category;
    } catch (error) {
      console.error("Error finding category by ID:", error);
      throw error;
    }
  }

  static async findByName(name) {
    try {
      const category = await this.projectCollection().findOne({ name: name });
      return category;
    } catch (error) {
      console.error("Error finding category by name:", error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      const deleteCategory = await this.projectCollection().deleteOne({
        _id: new ObjectId(id),
      });
      return deleteCategory;
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
  }
}

module.exports = Category;
