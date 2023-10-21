const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const Review = require("../models/review");
const Project = require("../models/project");
const User = require("../models/user");
const Category = require("../models/category");
const Rating = require("../models/rating");

class Controller {

  static async home(req, res, next) {
    try {
      res.status(200).send({message: 'StudyBuddy is in da haaaussse'})
    } catch (err) {
      next(err)
    }
  }
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      if (!username) {
        throw { name: "empty_username" };
      }
      if (!email) {
        throw { name: "empty_email" };
      }
      if (!password) {
        throw { name: "empty_password" };
      }
      const users = await User.findAll();
      const even = (el) => el.email === email;
      const isRegisteredEmail = users.some(even);
      if (isRegisteredEmail) {
        throw { name: "unique_email" };
      }

      await User.create({
        username,
        email,
        password,
        phoneNumber,
        role: null,
        address,
      });
      res.status(201).json({
        message: `User with username ${username} successfully created`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: "empty_email" };
      }
      if (!password) {
        throw { name: "empty_password" };
      }
      const findUser = await User.findBy({ email });
      if (!findUser) {
        throw { name: "invalid_email/password" };
      }
      const isPassValid = comparePassword(password, findUser.password);
      if (!isPassValid) {
        throw { name: "invalid_email/password" };
      }
      const access_token = signToken({ id: findUser._id });
      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    }
  }

  static async getUser(req, res, next) {
    try {
      const user = await User.findAll()
      res.status(200).json(user);
    } catch (err) {
      next(err)
    }
  }

  // untuk keperluan testing
  static async getUserById(req, res, next) {
    try {
      const id  = req.params
      const userbyId = await User.findByPk(id)
      console.log(userbyId, 'asdasd')
      res.status(200).json(userbyId);
    } catch (err) {
      next(err)
    }
  }

  static async updateUser(req, res, next) {
    try {
      const id  = req.user.id
      const { username, phoneNumber, address } = req.body;
      const updateReview = await User.findOneAndUpdate(id, {
        $set: { username, phoneNumber, address },
      });
      res.status(200).json({ message: "Update user has success" });
    } catch (err) {
      next(err)
    }
  }

  static async updateRoleUser(req, res, next) {
    try {
      const { id } = req.user;
      const { role } = req.body;
      await User.findOneAndUpdate(id, { $set: { role } });
      res.json({ message: "Role updated successfully" });
    } catch (err) {
      next(err);
    }
  }

  static async createReview(req, res, next) {
    try {
      const { comment } = req.body;
      const { projectId } = req.params;
      if (comment.length < 1 || comment === "" || !comment) {
        throw { name: "minimum_comment" };
      }
      const response = await Review.create({
        comment,
        UserId: req.user.id,
        ProjectId: projectId,
      });
      res
        .status(201)
        .json({
          message: "Review created successfully",
          id: response.insertedId,
        });
    } catch (err) {
      next(err);
    }
  }

  static async getReviews(req, res, next) {
    try {
      const reviews = await Review.findAll();
      res.json(reviews);
    } catch (err) {
      next(err);
    }
  }

  static async deleteReview(req, res, next) {
    try {
      const { id } = req.params;
      const review = await Review.findOneAndDelete(id);
      if (!review) {
        throw { name: "review_not_found" };
      }
      res.json({ message: "Comment deleted successfully" });
    } catch (err) {
      next(err);
    }
  }

  static async editReview(req, res, next) {
    try {
      const { id } = req.params;
      const { comment } = req.body;
      if (comment.length < 1 || comment === "" || !comment) {
        throw { name: "minimum_comment" };
      }
      const updateReview = await Review.findOneAndUpdate(id, {
        $set: { comment },
      });
      res.json({ message: "Comment edited" });
    } catch (err) {
      next(err);
    }
  }

  static async addProject(req, res, next) {
    try {
      const {
        name,
        studentId,
        teacherId,
        startDate,
        endDate,
        isFinished,
        description,
        likes,
        CategoryId,
        published,
        goals,
        feedback
      } = req.body;
      if (!name) {
        throw { name: "empty_name/project" };
      }
      if (!description) {
        throw { name: "empty_description/project" };
      }
      if (!CategoryId) {
        throw { name: "empty_categoryId/project" };
      }
      if (!goals) {
        throw { name: "empty_goals/project" };
      }
      const response = await Project.create({
        name,
        studentId,
        teacherId,
        startDate,
        endDate,
        isFinished,
        likes,
        description,
        CategoryId,
        published,
        goals,
        feedback
      });
      res
        .status(201)
        .json({
          message: `Project has been success created`,
          id: response.insertedId,
        });
    } catch (err) {
      next(err);
    }
  }

  static async getProject(req, res, next) {
    try {
      const getProject = await Project.findAll({});
      res.status(200).json(getProject);
    } catch (err) {
      next(err);
    }
  }

  static async getProjectbyId(req, res, next) {
    try {
      const { id } = req.params;
      const getProjectById = await Project.findByPk(id);
      if (!getProjectById) {
        throw { name: "not_found/project" };
      }
      res.status(200).json(getProjectById);
    } catch (err) {
      next(err);
    }
  }

  static async deleteProject(req, res, next) {
    try {
      const { id } = req.params;
      let checkProject = await Project.findByPk(id);
      if (!checkProject) {
        throw { name: "not_found/project" };
      }
      const project = await Project.delete(id);
      res.status(200).json({ message: `Project has been success deleted` });
    } catch (err) {
      next(err);
    }
  }

  static async updateProject(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description, isFinished, CategoryId } = req.body;
      if (name) {
        console.log(name, "<<<< Name");
        const nameProject = await Project.findOneAndUpdate(id, {
          $set: { name },
        });
        res.status(200).json({ message: "Name updated successfully" });
      }
      if (description) {
        console.log(description, "<<<< Description");
        const descriptionProject = await Project.findOneAndUpdate(id, {
          $set: { description },
        });
        res.status(200).json({ message: "Description updated successfully" });
      }
      if (isFinished) {
        console.log(isFinished, "<<<< finishes");
        const isFinishedProject = await Project.findOneAndUpdate(id, {
          $set: { isFinished },
        });
        res.status(200).json({ message: "isFinished updated successfully" });
      }
      if (CategoryId) {
        console.log(CategoryId, "<<<< category");
        const categoryIdProject = await Project.findOneAndUpdate(id, {
          $set: { CategoryId },
        });
        res.status(200).json({ message: "Category id updated successfully" });
      }
    } catch (err) {
      next(err);
    }
  }

  static async getRating(req, res, next) {
    try {
      const getRating = await Rating.findAll();
      res.status(200).json(getRating);
    } catch (err) {
      next(err);
    }
  }

  static async addRating(req, res, next) {
    try {
      const { rating } = req.body;
      const newRating = await Rating.create({ UserId: req.user.id, rating });
      res
        .status(201)
        .json({ message: "add rating success", id: newRating.insertedId });
    } catch (err) {
      next(err);
    }
  }

  static async updateRating(req, res, next) {
    try {
      const { id } = req.params;
      const { rating } = req.body;
      const newRating = await Rating.findOneAndUpdate(id, { $set: { rating } });
      res.status(200).json({ message: "update rating success" });
    } catch (err) {
      next(err);
    }
  }

  static async addCategories(req, res, next) {
    try {
      const { name } = req.body;
      if (!name || name === "") {
        throw {name: 'name/categories'}
      }
      let checkCategory = await Category.findByName(name);
      if (checkCategory) {
        throw {name: 'unique/categories'}
      }
      let response = await Category.create({ name: name });
      res.status(201).json({
        message: `${name} has been successfully added!`,
        id: response.insertedId,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getCategories(req, res, next) {
    try {
      let getCategories = await Category.findAll();
      res.status(200).json(getCategories);
    } catch (err) {
      next(err);
    }
  }

  static async deleteCategories(req, res, next) {
    try {
      let { id } = req.params;
      let checkCategory = await Category.findById(id);
      if (!checkCategory) {
        throw {name: 'not_found/category'}
      }
      await Category.delete(id);
      res
        .status(200)
        .json({ message: `${checkCategory.name} has been success deleted` });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
