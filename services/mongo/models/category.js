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

  static async delete(id) {
    const deleteCategory = await this.projectCollection().deleteOne({
      _id: new ObjectId(id),
    });
    return deleteCategory;
  }

  static async findByName(name, address) {
    const category = await this.projectCollection().findOne({ name: name });

    if (category) {
      const categoryId = category._id;
      const specialists = await getDb()
        .collection("specialists")
        .aggregate([
          {
            $match: { categoryId: categoryId },
          },
          {
            $lookup: {
              from: "users",
              localField: "teacherId",
              foreignField: "_id",
              as: "Teacher",
            },
          },
          {
            $unwind: "$Teacher",
          },
          {
            $project: {
              categoryId: 0, // Exclude categoryId from the result
            },
          },
          {
            $project: {
              "Teacher._id": 1,
              "Teacher.username": 1,
              "Teacher.email": 1,
              "Teacher.phoneNumber": 1,
              "Teacher.role": 1,
              "Teacher.address": 1,
            },
          },
          {
            $match: { "Teacher.address": address },
          },
        ])
        .toArray();

      category.specialists = specialists;
    }

    return category;
  }
}

module.exports = Category;
