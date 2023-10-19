const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const Review = require("../models/review");
const Project = require("../models/project");
const User = require("../models/user");
const Category = require("../models/category");

class Controller {
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
      // console.log(findUser, '<<<<<')
      if (!findUser) {
        throw { name: "invalid_email/password" };
      }
      // console.log(password, findUser.password, '<<<<<<<<<')
      const isPassValid = comparePassword(password, findUser.password);
      // console.log(isPassValid, '<<<<<')
      if (!isPassValid) {
        throw { name: "invalid_email/password" };
      }
      const access_token = signToken({ id: findUser._id });
      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    }
  }

  static async updateRoleUser(req, res, next) {
    try {
      const { id } = req.user;
      const { role } = req.body;
      const user = await User.findOneAndUpdate(id, { $set: { role } });
      if (!user) {
        throw { name: "user_not_found" };
      }
      res.json({ message: "Role updated successfully" });
    } catch (err) {
      next(err);
    }
  }

  static async createReview(req, res, next) {
    try {
      const { comment } = req.body;
      const { projectId } = req.params;
      if (comment.length < 1) {
        throw { name: "minimum_comment" };
      }
      await Review.createReview({
        comment,
        UserId: req.user.id,
        ProjectId: projectId,
      });
      res.status(201).json({ message: "Review created successfully" });
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
      if (comment.length < 1) {
        throw { name: "minimum_comment" };
      }
      await Review.findOneAndUpdate(id, { $set: { comment } });
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
        categoryId,
      } = req.body;
      if (!name) {
        throw { name: "empty_name/project" };
      }
      if (!description) {
        throw { name: "empty_description/project" };
      }
      if (!categoryId) {
        throw { name: "empty_categoryId/project" };
      }
      await Project.create({
        name,
        studentId,
        teacherId,
        startDate,
        endDate,
        isFinished,
        likes,
        description,
        categoryId,
      });
      res.status(201).json({ message: `Project has been success created` });
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

  static async deleteProject(req, res, next) {
    try {
      const { id } = req.params;
      const project = await Project.delete(id);
      if (!project) {
        throw { name: "not_found/project" };
      }
      res.status(200).json({ message: `Project has been success deleted` });
    } catch (err) {
      next(err);
    }
  }

  static async addCategories(req, res, next) {
    try {
      const { name } = req.body;

      if (!name || name === "") {
        return res.status(400).json({ message: "Name category is required!" });
      }

      let checkCategory = await Category.findByName(name);
      if (checkCategory) {
        return res.status(400).json({ message: `Category must be unique` });
      }
      console.log("sampe sini <=======");

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
      console.log("kepanggil ora ?");
      let getCategories = await Category.findAll();
      res.status(200).json(getCategories);
    } catch (err) {
      next(err);
    }
  }

  static async deleteCategories(req, res, next) {
    try {
      let { id } = req.params;

      if (!/^[0-9a-fA-F]{24}$/.test(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      let checkCategory = await Category.findById(id);

      if (!checkCategory) {
        return res.status(404).json({ message: `id not found` });
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
