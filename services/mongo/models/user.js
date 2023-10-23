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
      ])
      .toArray();

    if (result.length === 0) {
      return null;
    }

    const tempProjecId = result[0].Projects.map((project) => project._id);

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
      ])
      .toArray();

    if (result.length === 0) {
      return null;
    }

    const tempProjecId = result[0].Projects.map((project) => project._id);

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
          $match: { projectId: { $in: tempProjecId }, teacherId: id },
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
