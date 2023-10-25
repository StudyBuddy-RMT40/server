const { comparePassword, hashPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const Review = require("../models/review");
const Project = require("../models/project");
const User = require("../models/user");
const Category = require("../models/category");
const Rating = require("../models/rating");
const { OAuth2Client } = require("google-auth-library");
const { ObjectId } = require("mongodb");
const { getDbSession } = require("../config/mongo");
const TodoList = require("../models/todolist");
const Specialist = require("../models/specialist");
const Like = require("../models/like");
const midtransClient = require("midtrans-client");
const Storage = require("../models/storage");
const Wallet = require("../models/wallet");
const cloudinary = require("cloudinary").v2;

const openai = require("openai");
const apiKey = "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";
const client = new openai({ apiKey });

cloudinary.config({
  cloud_name: "ddp528yjf",
  api_key: "979463692446595",
  api_secret: "fEKu7qz8PieEtuonw-3Bo3fyLkM",
});

class Controller {
  static async getLandingPage(req, res, next) {
    try {
      let dataSlider = [];
      let top5 = [];

      res.status({ slider: dataSlider, top5: dataTop5 });
    } catch (error) {
      next(error);
    }
  }
  static async home(req, res, next) {
    try {
      res.status(200).send({ message: "StudyBuddy is in da haaaussse" });
    } catch (err) {
      next(err);
    }
  }

  static async getLocation(req, res, next) {
    try {
      let province_list = [
        "Aceh",
        "Bali",
        "Bangka Belitung",
        "Banten",
        "Bengkulu",
        "Jawa Tengah",
        "Kalimantan Tengah",
        "Sulawesi Tengah",
        "Jawa Timur",
        "Kalimantan Timur",
        "Nusa Tenggara Timur",
        "Gorontalo",
        "Daerah Khusus Ibukota Jakarta",
        "Jambi",
        "Lampung",
        "Maluku",
        "Kalimantan Utara",
        "Maluku Utara",
        "Sulawesi Utara",
        "Sumatera Utara",
        "Papua",
        "Riau",
        "Kepulauan Riau",
        "Kalimantan Selatan",
        "Sulawesi Selatan",
        "Sumatera Selatan",
        "Sulawesi Tenggara",
        "Jawa Barat",
        "Kalimantan Barat",
        "Nusa Tenggara Barat",
        "Papua Barat",
        "Sulawesi Barat",
        "Sumatera Barat",
        "Daerah Istimewa Yogyakarta",
      ];
      res.status(200).json(province_list)
    } catch (error) {
      next(error)
    }
  }

  static async getPubCategories(req, res, next) {
    try {
      let getCategories = await Category.findAll();

      getCategories.map(el => {
        delete el.groupBy
        return el
      })

      res.status(200).json(getCategories);
    } catch (err) {
      next(err);
    }
  }

  static async register(req, res, next) {
    try {
      let { username, email, password, phoneNumber, address } = req.body;
      if (!username) {
        throw { name: "empty_username" };
      }
      if (!email) {
        throw { name: "empty_email" };
      }
      if (!password) {
        throw { name: "empty_password" };
      }
      if (!phoneNumber) {
        throw { name: "empty_phoneNumber" };
      }
      if (!address) {
        throw { name: "empty_address" };
      }

      // validation phone number length
      if (phoneNumber.length === 12) {
        phoneNumber;
      } else {
        throw { name: "phone_length" };
      }

      // validation email format
      function validateEmail(email) {
        const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        return emailRegex.test(email);
      }

      if (email) {
        let cek_email = validateEmail(email);
        if (cek_email === true) {
          email = email;
        } else {
          throw { name: "email_format" };
        }
      }

      // validate address
      let province_list = [
        "Aceh",
        "Bali",
        "Bangka Belitung",
        "Banten",
        "Bengkulu",
        "Jawa Tengah",
        "Kalimantan Tengah",
        "Sulawesi Tengah",
        "Jawa Timur",
        "Kalimantan Timur",
        "Nusa Tenggara Timur",
        "Gorontalo",
        "Daerah Khusus Ibukota Jakarta",
        "Jambi",
        "Lampung",
        "Maluku",
        "Kalimantan Utara",
        "Maluku Utara",
        "Sulawesi Utara",
        "Sumatera Utara",
        "Papua",
        "Riau",
        "Kepulauan Riau",
        "Kalimantan Selatan",
        "Sulawesi Selatan",
        "Sumatera Selatan",
        "Sulawesi Tenggara",
        "Jawa Barat",
        "Kalimantan Barat",
        "Nusa Tenggara Barat",
        "Papua Barat",
        "Sulawesi Barat",
        "Sumatera Barat",
        "Daerah Istimewa Yogyakarta",
      ];

      let targetProvince = address;
      targetProvince = targetProvince.replace(/\b\w/g, (match) =>
        match.toUpperCase()
      );

      if (province_list.includes(targetProvince)) {
        address = targetProvince;
      } else {
        throw { name: "address_not_in_list" };
      }

      const users = await User.findAll();
      const even = (el) => el.email === email;
      const isRegisteredEmail = users.some(even);
      if (isRegisteredEmail) {
        throw { name: "unique_email" };
      }

      const user = await User.create({
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
      res.status(200).json({ access_token: access_token, role: findUser.role });
    } catch (err) {
      next(err);
    }
  }

  static async getUser(req, res, next) {
    try {
      const user = await User.findAll();
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  static async getUserById(req, res, next) {
    try {
      const id = req.params;
      const userbyId = await User.findByPk(id);
      if (!userbyId) {
        throw { name: "user_not_found" };
      }
      res.status(200).json(userbyId);
    } catch (err) {
      next(err);
    }
  }

  static async getStudentProfile(req, res, next) {
    try {
      const { id } = req.user;
      const userbyId = await User.findDataProfileStudent(id);
      if (!userbyId) {
        throw { name: "user_not_found" };
      }
      res.status(200).json(userbyId);
    } catch (err) {
      next(err);
    }
  }

  static async getBuddyProfile(req, res, next) {
    try {
      const { id } = req.user;
      const userbyId = await User.findDataProfileTeacher(id);
      if (!userbyId) {
        throw { name: "user_not_found" };
      }
      res.status(200).json(userbyId);
    } catch (err) {
      next(err);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const id = req.user.id;
      let { username, email, phoneNumber, address } = req.body;
      if (!username) {
        throw { name: "empty_username" };
      }
      if (!email) {
        throw { name: "empty_email" };
      }
      if (!phoneNumber) {
        throw { name: "empty_phoneNumber" };
      }
      if (!address) {
        throw { name: "empty_address" };
      }
      const updateReview = await User.findOneAndUpdate(id, {
        $set: { username, email, phoneNumber, address },
      });
      res
        .status(200)
        .json({ message: "Update user has success", id: updateReview._id });
    } catch (err) {
      next(err);
    }
  }

  static async updateRoleUser(req, res, next) {
    try {
      const { id } = req.user;
      const { role } = req.body;
      if (!role) {
        throw { name: "empty_role" };
      }
      let updateRoleUser = await User.findOneAndUpdate(id, { $set: { role } });
      res.json({
        message: "Role updated successfully",
        id: updateRoleUser._id,
      });
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
        userId: req.user.id,
        projectId: new ObjectId(projectId),
      });
      res.status(201).json({
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
        teacherId,
        description,
        categoryId,
        goals,
        userMessage,
        rawData,
      } = req.body;

      let {id} = req.user

      if (!name) {
        throw { name: "empty_name/project" };
      }
      if (!description) {
        throw { name: "empty_description/project" };
      }
      if (!categoryId) {
        throw { name: "empty_categoryId/project" };
      }
      if (!goals) {
        throw { name: "empty_goals/project" };
      }

      const { session } = getDbSession();

      try {
        await session.withTransaction(async () => {
          const response = await Project.create({
            name: `Pembuatan ${name}`,
            studentId: new ObjectId(id),
            teacherId: new ObjectId(teacherId),
            startDate: new Date(),
            endDate: null,
            status: "Submitted",
            likes: 0,
            description,
            categoryId: new ObjectId(categoryId),
            published: false,
            goals,
            feedback: "",
          });

          console.log(response.insertedId);

          const responseAi = await client.chat.completions.create({
            messages: [
              {
                role: "system",
                content: `Buat 5 daftar tugas untuk pembuatan ${name} dalam format JSON seperti contoh ini:[{'tugas':''},{'tugas':''}].`,
              },
            ],
            model: "gpt-3.5-turbo",
          });

    
          console.log(responseAi.choices[0].message.content, '<<< AI')
          // Attempt to parse the AI response, or handle the error gracefully
          let parsedData;
          try {
            parsedData = await JSON.parse(
              responseAi.choices[0].message.content
            );
            console.log(parsedData);
          } catch (err) {
            console.error("Error parsing AI response:", err);
            parsedData = responseAi.choices[0].message.content;
          }

          parsedData.forEach(async (item) => {
            await TodoList.create({
              projectId: response.insertedId,
              lectureUrl: "",
              isFinished: false,
              name: item.tugas,
            });
          });
          

          res.status(201).json({
            message: "Project has been successfully created",
            id: response.insertedId,
            parsedData
          });
        });
      } catch (err) {
        next(err);
      } finally {
        session.endSession();
      }
    } catch (error) {
      next(error);
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
      let checkProject = await Project.findBy(id);
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
      const { name, description, categoryId } = req.body;
      if (!name) {
        throw { name: "empty_name/project" };
      }
      if (!description) {
        throw { name: "empty_description/project" };
      }
      if (!categoryId) {
        throw { name: "empty_categoryId/project" };
      }

      const nameProject = await Project.findOneAndUpdate(id, {
        $set: { name },
      });

      const descriptionProject = await Project.findOneAndUpdate(id, {
        $set: { description },
      });

      const categoryIdProject = await Project.findOneAndUpdate(id, {
        $set: { categoryId },
      });

      if (!nameProject || !descriptionProject || !categoryIdProject) {
        throw { name: "empty_updated" };
      }

      res.status(200).json({ message: "update successfully" });
    } catch (err) {
      next(err);
    }
  }

  static async updateStatusProject(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const validStatusValues = [
        "Accepted", 
        "Paid", 
        "On Progress", 
        "Finished",
        "To Review"
      ];

      if (!status || !validStatusValues.includes(status)) {
        throw { name: "invalid_status/status" };
      }

      const updatedProject = await Project.findOneAndUpdate(id, {
        $set: { status },
      });

      if (!updatedProject) {
        throw { name: "not_found/project" };
      }

      res
        .status(200)
        .json({ message: `Status updated successfully to ${status}` });
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

  static async addRatingStudent(req, res, next) {
    try {
      let { rating, studentId, projectId } = req.body;

      console.log(typeof rating, rating, studentId, projectId, '>>>> con')
      if (!rating) {
        return res.status(400).json({ message: "Rating is required" });
      }

      if (!studentId) {
        return res.status(400).json({ message: "Student ID is required" });
      }

      if (!projectId) {
        return res.status(400).json({ message: "Project ID is required" });
      }

      rating = parseFloat(rating);

      if (isNaN(rating) || rating < 0 || rating > 5) {
        return res
          .status(400)
          .json({ message: "Rating must be a number between 0 and 5" });
      }

      let existingRating = await Rating.findStudentId(studentId, projectId);

      if (existingRating) {
        return res.status(403).json({ message: "already have rating" });
      }

      let studentRating = await Rating.create({
        studentId: new ObjectId(studentId),
        projectId: new ObjectId(projectId),
        rating,
      });

      res
        .status(201)
        .json({ message: "Add rating success", id: studentRating.insertedId });
    } catch (err) {
      next(err);
    }
  }

  static async addRatingBuddy(req, res, next) {
    try {
      let { rating, teacherId, projectId } = req.body;

      if (!rating) {
        return res.status(400).json({ message: "Rating is required" });
      }

      if (!teacherId) {
        return res.status(400).json({ message: "Student ID is required" });
      }

      if (!projectId) {
        return res.status(400).json({ message: "Project ID is required" });
      }

      rating = parseFloat(rating);

      if (isNaN(rating) || rating < 0 || rating > 5) {
        return res
          .status(400)
          .json({ message: "Rating must be a number between 0 and 5" });
      }

      let existingRating = await Rating.findTeacherId(teacherId, projectId);

      if (existingRating) {
        return res.status(403).json({ message: "already have rating" });
      }

      await Rating.create({
        teacherId: new ObjectId(teacherId),
        projectId: new ObjectId(projectId),
        rating,
      });

      res.status(201).json({ message: "Add rating success" });
    } catch (err) {
      next(err);
    }
  }

  static async updateRating(req, res, next) {
    try {
      const { id } = req.params;
      const { rating } = req.body;
      if (!rating) {
        throw { name: "empty_rating" };
      }
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
        throw { name: "name/categories" };
      }
      let checkCategory = await Category.findByName(name);
      if (checkCategory) {
        throw { name: "unique/categories" };
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

  static async getCategoriesByName(req, res, next) {
    try {
      let { name } = req.params;
      let { address } = req.query;
      let getCategories = await Category.findByName(name, address);
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
        throw { name: "not_found/category" };
      }
      await Category.delete(id);
      res
        .status(200)
        .json({ message: `${checkCategory.name} has been success deleted` });
    } catch (err) {
      next(err);
    }
  }

  static async getAllSpecialist(req, res, next) {
    try {
      let getAllSpecialist = await Specialist.findAll({});
      res.status(200).json(getAllSpecialist);
    } catch (error) {
      next(error);
    }
  }

  static async getSpecialistById(req, res, next) {
    try {
      let { id } = req.params;
      let getSpecialis = await Specialist.findById(id);
      res.status(200).json(getSpecialis);
    } catch (error) {
      next(error);
    }
  }

  static async addSpecialist(req, res, next) {
    try {
      let { id } = req.user;
      let { specialist } = req.body;

      specialist.forEach((e) => {
        e.teacherId = id;
        e.categoryId = new ObjectId(e.categoryId);
      });

      let temp = [];
      for (const data of specialist) {
        let getSpecialisId = await Specialist.create(data);
        temp.push(getSpecialisId.insertedId);
      }

      res.status(201).json({ message: "data successful add", id: temp });
    } catch (error) {
      next(error);
    }
  }

  static async deleteSpecialistById(req, res, next) {
    try {
      let { id } = req.params;
      let response = await Specialist.delete(id);
      if (response.deletedCount === 0) {
        return res.status(404).json({ message: "Not Found" });
      }
      res.status(200).json({ message: "Successfully deleted specialist" });
    } catch (error) {
      next(error);
    }
  }
  static async getAllLike(req, res, next) {
    try {
      let likes = await Like.findAll();
      res.status(200).json(likes);
    } catch (error) {
      next(error);
    }
  }

  static async addLike(req, res, next) {
    try {
      let { id } = req.user;
      let { projectId } = req.body;
      if (!projectId) {
        throw { name: "empty_projectId" };
      }
      let data = {
        projectId: new ObjectId(projectId),
        userId: id,
      };

      let { insertedId } = await Like.create(data);

      res
        .status(201)
        .json({ message: "Thanks to like this project", id: insertedId });
    } catch (error) {
      next(error);
    }
  }

  static async deleteLike(req, res, next) {
    try {
      let { id } = req.user;
      let { projectId } = req.body;
      if (!projectId) {
        throw { name: "empty_projectId" };
      }
      let response = await Like.delete(id, projectId);

      console.log(response, ">>>");
      if (response.deletedCount === 0) {
        throw { name: "like_authorize" };
      }

      res.status(200).json({ message: "Your not love me anymore" });
    } catch (error) {
      next(error);
    }
  }

  static async getTodos(req, res, next) {
    try {
      const todos = await TodoList.findAll({});
      res.status(200).json(todos);
    } catch (error) {
      next(error);
    }
  }

  static async getTodosById(req, res, next) {
    try {
      const { id } = req.params;
      const todos = await TodoList.findById(id);
      if (!todos) {
        throw { name: "todos_not_found" };
      }
      res.status(200).json(todos);
    } catch (error) {
      next(error);
    }
  }

  static async updateTodos(req, res, next) {
    try {
      const { id } = req.params;
      const { name, learningUrl, isFinished } = req.body;
      if (!name) {
        throw { name: "name_todos" };
      }
      if (!learningUrl) {
        throw { name: "learning_todos" };
      }
      if (!isFinished) {
        throw { name: "isFinished_todos" };
      }
      const todos = await TodoList.findOneAndUpdate(id, {
        $set: { name, learningUrl, isFinished },
      });
      res.status(200).json({ message: "todos updated successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async deleteTodos(req, res, next) {
    try {
      const { id } = req.params;
      let checkTodos = await TodoList.findById(id);
      if (!checkTodos) {
        throw { name: "todos_not_found" };
      }
      const todos = await TodoList.delete(id);
      res.status(200).json({ message: `todos has been success deleted` });
    } catch (error) {
      next(error);
    }
  }

  static async generateMidtrans(req, res, next) {
    try {
      const { price } = req.body;
      if (!price) {
        throw { name: "empty_price" };
      }

      const { projectId } = req.params;
      const project = await Project.findByPk(projectId);

      if (
        project.status !== "Submitted"
      ) {
        throw { name: "cannot_access_payment" };
      }

      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      let parameter = {
        transaction_details: {
          order_id: "TRANSACTION_" + Math.floor(1000 + Math.random() * 2000),
          gross_amount: Number(price),
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: project.Student.username,
          email: project.Student.email,
          phone: project.Student.phoneNumber,
        },
      };

      const midtransToken = await snap.createTransaction(parameter);
      res.status(201).json(midtransToken);
    } catch (error) {
      next(error);
    }
  }

  // media
  static async addMediaDocumentation(req, res, next) {
    console.log('MASUK MEDIA')
    try {
      let { projectId } = req.body;
      // Check if 'image' and 'video' files exist in req.files
      const imageFile =
        req.files && req.files["image"] ? req.files["image"][0].buffer : null; // Image buffer
      const videoFile =
        req.files && req.files["video"] ? req.files["video"][0].buffer : null; // Video buffer

        console.log(req.files, 'reqfiles')
      let tempImageUrl;
      let tempVideoUrl;

      if (!projectId) {
        return res.status(400).json({ message: "project id is empty" });
      }

      let checkProject = await Storage.findById(projectId);

      if (checkProject) {
        return res
          .status(400)
          .json({ message: "already have image and video" });
      }

      console.log(imageFile, 'imagefile')
      if (imageFile) {
        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(async (error, res) => {
              if (error) {
                reject(error);
              } else {
                resolve(res);
              }
            })
            .end(imageFile);
        });
        tempImageUrl = await result.secure_url;
        console.log(tempImageUrl, 'tempimage')
      }

      if (videoFile) {
        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                resource_type: "video",
              },
              async (error, res) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(res);
                }
              }
            )
            .end(videoFile);
        });
        tempVideoUrl = await result.secure_url;
        console.log(tempVideoUrl, 'tempvideo')
      }

      let value = {
        projectId: new ObjectId(projectId),
        videoUrl: tempVideoUrl,
        imageUrl: tempImageUrl,
      };

      await Storage.create(value);

      console.log(value, 'controler')
      res.status(201).json({
        message: "Your product has been added",
        imgUrl: tempImageUrl,
        videoUrl: tempVideoUrl,
      });
    } catch (error) {
      // console.log(error);
      next(error)
      // res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async addWallet(req, res, next) {
    try {
      let { amount, projectId, teacherId } = req.body;
      if (!amount) {
        throw {name: 'Amount is required/wallet' }
      }
      amount = parseFloat(amount);
      if (!Number(amount)) {
        throw {name: 'Amount should be number' }
      }
      let response = await Wallet.create({
        amount,
        projectId: new ObjectId(projectId),
        teacherId: new ObjectId(teacherId),
        status: "paid",
      });

      res
        .status(201)
        .json({ message: "Add amount success", id: response.insertedId });
    } catch (error) {
      next(error);
    }
  }

  static async getAllWalletByUserId(req, res, next) {
    try {
      const { id } = req.user;
      const wallets = await Wallet.getAllMyWallet(id);
      res.status(200).json({ myWallet: wallets });
    } catch (error) {
      next(error);
    }
  }

  static async changeStatusWalletToFinish(req, res, next) {
    try {
      const { projectId } = req.params;
      let status = "finished";
      const updatedStatusWallet = await Wallet.findOneAndUpdateStatus(
        projectId,
        {
          $set: { status },
        }
      );

      if (!updatedStatusWallet) {
        throw {name: 'data not found/wallet'}
      }
      res.status(200).json({ message: "status has changed to finish" });
    } catch (error) {
      next(error);
    }
  }

  static async withdrawWallet(req, res, next) {
    try {
      const { id: teacherId } = req.user;

      const finishedWallets = await Wallet.getWalletsByStatus(
        teacherId,
        "finished"
      );

      if (finishedWallets.length === 0) {
        throw {name: 'No finished wallets found/wallet'}
      }

      for (const e of finishedWallets) {
        const response = await Wallet.findOneAndUpdate(e._id, {
          $set: { status: "withdraw", amount: 0 },
        });
        console.log(`Updated wallet: ${e._id}`, response);
      }

      res
        .status(200)
        .json({ message: "Amount has been withdrawn from finished wallets" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
