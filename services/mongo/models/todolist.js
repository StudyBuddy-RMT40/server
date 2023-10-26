const { getDb } = require("../config/mongo");
const { ObjectId } = require("mongodb");

class TodoList {
  static todosCollection() {
    return getDb().collection("todolists");
  }

  static async create(data) {
    const newTodos = await this.todosCollection().insertOne(data);
    return newTodos;
  }

  static async findAll() {
    const todos = await this.todosCollection().find().toArray();
    return todos;
  }

  static async findById(id) {
    const todos = await this.todosCollection().findOne({
      _id: new ObjectId(id),
    });
    return todos;
  }

  static async delete(id) {
    const deleteTodos = await this.todosCollection().deleteOne({
      _id: new ObjectId(id),
    });
    return deleteTodos;
  }

  static async findOneAndUpdate(id, projection) {
    const updatedTodos = await this.todosCollection().findOneAndUpdate(
      { _id: new ObjectId(id) },
      projection
    );
    return updatedTodos;
  }
}

module.exports = TodoList;
