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

  static calculateAverageRating(ratings) {
    if (ratings.length === 0) {
      return 0.0; // Default value when there are no ratings
    }

    const totalRatings = ratings.reduce(
      (sum, rating) => sum + rating.rating,
      0
    );
    return parseFloat((totalRatings / ratings.length).toFixed(1)); // Adjust the precision to one decimal place
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
          $lookup: {
            from: "todolists",
            localField: "_id",
            foreignField: "projectId",
            as: "Todos",
          },
        },
        {
          $lookup: {
            from: "mediaUrls",
            localField: "_id",
            foreignField: "projectId",
            as: "mediaUrls",
          },
        },
        {
          $lookup: {
            from: "reviews",
            localField: "_id",
            foreignField: "projectId",
            as: "reviews",
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
            description: 1,
            published: 1,
            goals: 1,
            feedback: 1,
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
            Todos: 1,
            mediaUrls: 1,
            reviews: 1,
          },
        },
      ])
      .toArray();

    if (projectById.length === 0) {
      return null;
    }

    // Calculate likes for the project
    const project = projectById[0];
    project.likes = await getDb()
      .collection("likes")
      .countDocuments({ projectId: project._id });

    // Calculate average rating for Teacher
    const teacherRatings = await getDb()
      .collection("ratings")
      .find({ projectId: project._id, teacherId: project.teacherId })
      .toArray();
    project.Teacher.rating = this.calculateAverageRating(teacherRatings);

    // Calculate average rating for Student
    const studentRatings = await getDb()
      .collection("ratings")
      .find({ projectId: project._id, studentId: project.studentId })
      .toArray();
    project.Student.rating = this.calculateAverageRating(studentRatings);

    return project;
  }

  static async findAll() {
    const getProject = await this.projectCollection()
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
      ])
      .toArray();

    return getProject;
  }

  static async findBy(id, projection) {
    const user = await this.projectCollection().findOne(
      { _id: new ObjectId(id) },
      projection
    );
    return user;
  }
}

module.exports = Project;
