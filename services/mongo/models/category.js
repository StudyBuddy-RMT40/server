const { getDb } = require("../config/mongo");
const { ObjectId } = require("mongodb");

class Category {
  static categoryCollection() {
    return getDb().collection("categories");
  }

  static async create(data) {
    const newCategory = await this.categoryCollection().insertOne(data);
    return newCategory;
  }

  static async findAll() {
    const categories = await this.categoryCollection().find().toArray();
    return categories;
  }

  static async findById(id) {
    const category = await this.categoryCollection().findOne({
      _id: new ObjectId(id),
    });
    return category;
  }

  static async delete(id) {
    const deleteCategory = await this.categoryCollection().deleteOne({
      _id: new ObjectId(id),
    });
    return deleteCategory;
  }

  static async findByName(name, address) {
    const category = await this.categoryCollection().findOne({ name: name });
    console.log(category, "<<<<<<");
    if (category) {
      const categoryId = category._id;
      console.log(categoryId, "<<<<<<");
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
            $project: {
              categoryId: 0, // Exclude categoryId from the result
            },
          },
          {
            $project: {
              "Teacher._id": 1,
              "Teacher.username": 1,
              "Teacher.address": 1,
            },
          },
          // {
          //   $match: { "Teacher.address": address },
          // },
        ])
        .toArray();

      category.specialists = specialists;
    }

    return category;
  }
}

module.exports = Category;
