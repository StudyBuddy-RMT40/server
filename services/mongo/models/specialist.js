const { getDb } = require("../config/mongo");
const { ObjectId } = require("mongodb");

class Specialist {
  static specialistCollection() {
    return getDb().collection("specialists");
  }

  static async create(data) {
    const newSpecialist = await this.specialistCollection().insertOne(data);
    return newSpecialist;
  }

  static async findAll() {
    return await this.specialistCollection()
      .aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "categoryId",
            foreignField: "_id",
            as: "Category",
          },
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
            Category: 1,
            Teacher: {
              _id: 1,
              username: 1,
              email: 1,
              phoneNumber: 1,
              role: 1,
              address: 1,
            },
          },
        },
      ])
      .toArray();
  }

  static async findById(id) {
    const query = { _id: new ObjectId(id) };

    return await this.specialistCollection()
      .aggregate([
        {
          $match: query,
        },
        {
          $lookup: {
            from: "categories",
            localField: "categoryId",
            foreignField: "_id",
            as: "Category",
          },
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
            Category: 1,
            Teacher: {
              _id: 1,
              username: 1,
              email: 1,
              phoneNumber: 1,
              role: 1,
              address: 1,
            },
          },
        },
      ])
      .toArray();
  }

  static async delete(id) {
    const specialist = await this.specialistCollection().deleteOne({
      _id: new ObjectId(id),
    });
    return specialist;
  }
}

module.exports = Specialist;
