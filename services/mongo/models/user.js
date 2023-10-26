const { ObjectId } = require("mongodb");
const { getDb } = require("../config/mongo");
const { hashPassword } = require("../helpers/bcrypt");

class User {
  static userCollection() {
    return getDb().collection("users");
  }

  static async create(data) {
    const value = {
      ...data,
      password: hashPassword(data.password),
    };

    const newUser = await this.userCollection().insertOne(value);
    return newUser;
  }

  static async findAll(query, projection, options) {
    const users = await this.userCollection()
      .find(query, projection, options)
      .toArray();
    return users;
  }

  static async findBy(query, projection, options) {
    const users = await this.userCollection().findOne(
      query,
      projection,
      options
    );
    return users;
  }

  static async findByPk(id, projection) {
    const user = await this.userCollection().findOne(
      { _id: new ObjectId(id) },
      projection
    );
    return user;
  }

  static async findOneAndUpdate(id, projection) {
    const updatedUser = await this.userCollection().findOneAndUpdate(
      { _id: new ObjectId(id) },
      projection
    );
    return updatedUser;
  }

  static async findDataProfileStudent(id) {
    const result = await this.userCollection()
      .aggregate([
        {
          $match: { _id: id },
        },
        {
          $project: {
            password: 0,
          },
        },
        {
          $lookup: {
            from: "projects",
            localField: "_id",
            foreignField: "studentId",
            as: "Projects",
          },
        },
        {
          $unwind: {
            path: "$Projects",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "Projects.categoryId",
            foreignField: "_id",
            as: "Projects.Category",
          },
        },
        // {
        //   $unwind: "$Projects.Category",
        // },
        {
          $lookup: {
            from: "users",
            localField: "Projects.teacherId",
            foreignField: "_id",
            as: "Projects.Teacher",
          },
        },
        // {
        //   $unwind: "$Projects.Teacher",
        // },
        {
          $lookup: {
            from: "users",
            localField: "Projects.studentId",
            foreignField: "_id",
            as: "Projects.Student",
          },
        },
        // {
        //   $unwind: "$Projects.Student",
        // },
        {
          $lookup: {
            from: "todolists",
            localField: "Projects._id",
            foreignField: "projectId",
            as: "Projects.todos",
          },
        },
        {
          $group: {
            _id: "$_id",
            username: { $first: "$username" },
            email: { $first: "$email" },
            phoneNumber: { $first: "$phoneNumber" },
            role: { $first: "$role" },
            address: { $first: "$address" },
            Projects: { $push: "$Projects" },
          },
        },
      ])
      .toArray();

    if (result.length === 0) {
      return null;
    }

    if (result[0].Projects[0].Category.length > 0) {
      if (result[0].Projects.length > 0) {
        result[0].Projects.forEach(element => {
          delete element.Teacher[0].password
          delete element.Student[0].password
        });
      }
    }
    

    // Calculate the total finished todos in each project
    const projects = result[0].Projects;
    for (const project of projects) {
      project.totalFinished = project.todos.reduce((total, todo) => {
        return total + (todo.isFinished ? 1 : 0);
      }, 0);
    }

    const tempProjecId = projects.map((project) => project._id);

    const resultLike = await getDb()
      .collection("likes")
      .aggregate([
        {
          $match: { projectId: { $in: tempProjecId } },
        },
        {
          $group: {
            _id: null,
            Likes: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            Likes: 1,
          },
        },
      ])
      .toArray();

    const resultRatings = await getDb()
      .collection("ratings")
      .aggregate([
        {
          $match: { projectId: { $in: tempProjecId }, studentId: id },
        },
      ])
      .toArray();

    const user = result[0];
    user.Likes = resultLike[0] ? resultLike[0].Likes : 0;

    const totalRatings = resultRatings.reduce(
      (sum, rating) => sum + rating.rating,
      0
    );
    const averageRating = totalRatings
      ? totalRatings / resultRatings.length
      : 0.0;
    user.Ratings = parseFloat(averageRating.toFixed(2));

    return user;
  }

  static async findDataProfileTeacher(id) {
    const result = await this.userCollection()
      .aggregate([
        {
          $match: { _id: id },
        },
        {
          $project: {
            password: 0,
          },
        },
        {
          $lookup: {
            from: "projects",
            localField: "_id",
            foreignField: "teacherId",
            as: "Projects",
          },
        },
        {
          $unwind: {
            path: "$Projects",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "Projects.categoryId",
            foreignField: "_id",
            as: "Projects.Category",
          },
        },
        // {
        //   $unwind: "$Projects.Category",
        // },
        {
          $lookup: {
            from: "users",
            localField: "Projects.teacherId",
            foreignField: "_id",
            as: "Projects.Teacher",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "Projects.studentId",
            foreignField: "_id",
            as: "Projects.Student",
          },
        },
        {
          $lookup: {
            from: "todolists",
            localField: "Projects._id",
            foreignField: "projectId",
            as: "Projects.todos",
          },
        },
        {
          $group: {
            _id: "$_id",
            username: { $first: "$username" },
            email: { $first: "$email" },
            phoneNumber: { $first: "$phoneNumber" },
            role: { $first: "$role" },
            address: { $first: "$address" },
            Projects: { $push: "$Projects" },
          },
        },
      ])
      .toArray();

    if (result.length === 0) {
      return null;
    }

    if (result[0].Projects[0].Category.length > 0) {
      if (result[0].Projects.length > 0) {
        result[0].Projects.forEach(element => {
          delete element.Teacher[0].password
          delete element.Student[0].password
        });
      }
    }

    const projects = result[0].Projects;

    // Calculate the total finished todos in each project
    for (const project of projects) {
      project.totalFinished = project.todos.reduce((total, todo) => {
        return total + (todo.isFinished ? 1 : 0);
      }, 0);
    }

    const tempProjectId = projects.map((project) => project._id);

    const resultLike = await getDb()
      .collection("likes")
      .aggregate([
        {
          $match: { projectId: { $in: tempProjectId } },
        },
        {
          $group: {
            _id: null,
            Likes: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            Likes: 1,
          },
        },
      ])
      .toArray();

    const resultRatings = await getDb()
      .collection("ratings")
      .aggregate([
        {
          $match: { projectId: { $in: tempProjectId }, teacherId: id },
        },
      ])
      .toArray();

    const user = result[0];
    user.Likes = resultLike[0] ? resultLike[0].Likes : 0;

    const totalRatings = resultRatings.reduce(
      (sum, rating) => sum + rating.rating,
      0
    );
    const averageRating = totalRatings
      ? totalRatings / resultRatings.length
      : 0.0;
    user.Ratings = parseFloat(averageRating.toFixed(2));

    return user;
  }
}

module.exports = User;
