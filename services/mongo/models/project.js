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
            as: "Category",
            as: "Category",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "teacherId",
            foreignField: "_id",
            as: "Teacher",
            as: "Teacher",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "studentId",
            foreignField: "_id",
            as: "Student",
          },
        },
        {
          $unwind: "$Category",
        },
        {
          $unwind: "$Teacher",
        },
        {
          $unwind: "$Student",
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
            Category: 1,
            Category: {
              _id: 1,
              name: 1,
            },
            Teacher: {
              _id: 1,
              username: 1,
              email: 1,
              phoneNumber: 1,
              role: 1,
              address: 1,
            },
            Student: {
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
            as: "Todos",
          },
        },
      ])
      .toArray();

    return projectById[0];
  }

  static async findAll() {
    const getProject = await this.projectCollection()
      .aggregate(
      [
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
          $lookup: {
            from: "users",
            localField: "studentId",
            foreignField: "_id",
            as: "Student",
          },
        },
        {
          $unwind: "$Category",
        },
        {
          $unwind: "$Teacher",
        },
        {
          $unwind: "$Student",
        },
        {
          $lookup: {
            from: "todolists",
            localField: "_id",
            foreignField: "projectId",
            as: "Todos",
          },
        },
        {
          $lookup: {
            from: "likes",
            localField: "_id",
            foreignField: "projectId",
            as: "Likes",
          },
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
            description: 1,
            published: 1,
            goals: 1,
            feedback: 1,
            Category: 1,
            Teacher: {
              _id: 1,
              username: 1,
              email: 1,
              phoneNumber: 1,
              role: 1,
              address: 1,
            },
            Student: {
              _id: 1,
              username: 1,
              email: 1,
              phoneNumber: 1,
              role: 1,
              address: 1,
            },
            Todos: 1,
            Likes: { $size: "$Likes" }, 
          },
        },
      ]
    )
      .toArray();

    return getProject;
  }
}

module.exports = Project;
