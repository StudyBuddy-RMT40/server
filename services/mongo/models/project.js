const { getDb } = require("../config/mongo");
const { ObjectId } = require("mongodb");

class Project {
  static projectCollection() {
    return getDb().collection("projects");
  }

  static async create(data) {
    const value = {
      ...data,
    };
    const newProject = await this.projectCollection().insertOne(value);
    return newProject;
  }

  static async delete(id) {
    const deleteProject = await this.projectCollection().deleteOne({
      _id: new ObjectId(id),
    });
    return deleteProject;
  }

  static async findOneAndUpdate(id, projection) {
    const updatedProject = await this.projectCollection().findOneAndUpdate(
      { _id: new ObjectId(id) },
      projection
    );
    return updatedProject;
  }

  static async findByPk(id) {
    const query = { _id: new ObjectId(id) };

    const projectById = await this.projectCollection()
      .aggregate([
        {
          $match: query,
        },
        {
          $lookup: {
            from: "categories",
            localField: "categoryId",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "teacherId",
            foreignField: "_id",
            as: "teacher",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "studentId",
            foreignField: "_id",
            as: "student",
          },
        },
        {
          $unwind: "$category",
        },
        {
          $unwind: "$teacher",
        },
        {
          $unwind: "$student",
        },
        {
          $project: {
            _id: 1,
            name: 1,
            studentId: 1,
            teacherId: 1,
            startDate: 1,
            endDate: 1,
            status: 1,
            likes: 1,
            description: 1,
            published: 1,
            goals: 1,
            feedback: 1,
            category: {
              _id: 1,
              name: 1,
            },
            teacher: {
              _id: 1,
              username: 1,
              email: 1,
              phoneNumber: 1,
              role: 1,
              address: 1,
            },
            student: {
              _id: 1,
              username: 1,
              email: 1,
              phoneNumber: 1,
              role: 1,
              address: 1,
            },
          },
        },
        {
          $lookup: {
            from: "todolists",
            localField: "_id",
            foreignField: "projectId",
            as: "todos",
          },
        },
      ])
      .toArray();

    return projectById[0];
  }
  static async findAll() {
    const getProject = await this.projectCollection()
      .aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "categoryId",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "teacherId",
            foreignField: "_id",
            as: "teacher",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "studentId",
            foreignField: "_id",
            as: "student",
          },
        },
        {
          $unwind: "$category",
        },
        {
          $unwind: "$teacher",
        },
        {
          $unwind: "$student",
        },
        {
          $project: {
            _id: 1,
            name: 1,
            studentId: 1,
            teacherId: 1,
            startDate: 1,
            endDate: 1,
            status: 1,
            likes: 1,
            description: 1,
            published: 1,
            goals: 1,
            feedback: 1,
            category: 1,
            teacher: {
              _id: 1,
              username: 1,
              email: 1,
              phoneNumber: 1,
              role: 1,
              address: 1,
            },
            student: {
              _id: 1,
              username: 1,
              email: 1,
              phoneNumber: 1,
              role: 1,
              address: 1,
            },
          },
        },
        {
          $lookup: {
            from: "todolists",
            localField: "_id",
            foreignField: "projectId",
            as: "todos",
          },
        },
      ])
      .toArray();
    return getProject;
  }

  static async findAll2() {
    const project = await this.projectCollection().find().toArray();
    return project;
  }

  static async findAll3(id) {
    const category = await this.projectCollection().findOne({
      _id: new ObjectId(id),
    });
    return category;
  }
}

module.exports = Project;
