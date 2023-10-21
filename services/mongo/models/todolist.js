const { getDb } = require("../config/mongo");
const { ObjectId } = require("mongodb");

class TodoList {
  static projectCollection() {
    return getDb().collection("todolists");
  }

  static async create(data) {
    const newTodos = await this.projectCollection().insertOne(data);
    return newTodos;
  }

  static async findAll() {
    const todos = await this.projectCollection().find().toArray();
    return todos;
  }

  static async findById(id) {
    const todos = await this.projectCollection().findOne({
      _id: new ObjectId(id),
    });
    return todos;
  }

  static async delete(id) {
    const deleteCategory = await this.projectCollection().deleteOne({
      _id: new ObjectId(id),
    });
    return deleteCategory;
  }
}

module.exports = TodoList;
