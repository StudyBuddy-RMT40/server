const Controller = require("../controller/controller");
// const Test = require("../controller/test");
const authentication = require("../middlewares/authentication");
const authorizationBuddy = require("../middlewares/authorization");
const authorizationStudent = require("../middlewares/authorizationStudent");
const upload = require("../middlewares/multer");

const router = require("express").Router();

router.get("/", Controller.home);
// router.post("/add-projectAi", Test.addProject);

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.get("landing-page",Controller.getLandingPage)

router.get('/pub/projects', Controller.getProject)
router.get('/pub/projects/:id', Controller.getProjectbyId)
router.get('/pub/locations', Controller.getLocation)
router.get('/pub/categories', Controller.getPubCategories)


router.use(authentication);

// dijalankan setelah login
router.patch("/users", Controller.updateRoleUser);

// dapetin semua data user
router.get("/users", Controller.getUser);
router.get("/users/:id", Controller.getUserById);
router.put("/users", Controller.updateUser);

router.get("/student_profile", Controller.getStudentProfile);
router.get("/buddy_profile", Controller.getBuddyProfile);

router.post("/reviews/:projectId", Controller.createReview);
router.get("/reviews", Controller.getReviews);
router.delete("/reviews/:id", Controller.deleteReview);
router.put("/reviews/:id", Controller.editReview);

router.post("/projects", Controller.addProject);
router.get("/projects", Controller.getProject);
router.get("/projects/:id", Controller.getProjectbyId);
router.delete("/projects/:id", Controller.deleteProject);
router.put("/projects/:id", Controller.updateProject);
router.patch("/projects/:id", Controller.updateStatusProject);

router.get("/ratings", Controller.getRating);
router.put("/ratings/:id", Controller.updateRating);

// tambahin di tdd + authorize
router.post(
  "/ratings/student",
  authorizationBuddy,
  Controller.addRatingStudent
);
router.post("/ratings/buddy", authorizationStudent, Controller.addRatingBuddy);

router.get("/categories", Controller.getCategories);
router.get("/categories/:name", Controller.getCategoriesByName);
router.post("/categories", Controller.addCategories);
router.delete("/categories/:id", Controller.deleteCategories);

router.get("/specialist", Controller.getAllSpecialist);
router.get("/specialist/:id", Controller.getSpecialistById);
router.post("/specialist", authorizationBuddy, Controller.addSpecialist);
router.delete("/specialist/:id", Controller.deleteSpecialistById);

router.get("/likes", Controller.getAllLike);
router.post("/likes", Controller.addLike);
router.delete("/likes", Controller.deleteLike);

router.get("/todos", Controller.getTodos);
router.get("/todos/:id", Controller.getTodosById);
router.put("/todos/:id", Controller.updateTodos);
router.delete("/todos/:id", Controller.deleteTodos);

// midtrans
router.post("/generate-midtrans-token/:projectId", Controller.generateMidtrans);

// tambahin tdd authorize user
router.post(
    "/upload_docs",
    upload.fields([{ name: "image" }, { name: "video" }]),
    Controller.addMediaDocumentation
);
// router.put(
//   "/upload_docs",
//   upload.fields([{ name: "image" }, { name: "video" }]),
//   Controller.updateMediaDocumentation
// );

// tambahin tdd authorize buddy
router.post("/wallet/add_wallet", Controller.addWallet);
router.get("/wallet/my_wallet", Controller.getAllWalletByUserId);
router.patch(
  "/wallet/finish_job/:projectId",
  Controller.changeStatusWalletToFinish
);
router.put("/wallet/withdraw_wallet/", Controller.withdrawWallet);

module.exports = router;
