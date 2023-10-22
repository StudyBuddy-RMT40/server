const Controller = require("../controller/controller");
const authentication = require("../middlewares/authentication");
const authorizationBuddy = require("../middlewares/authorization");

const router = require("express").Router();

router.get("/", Controller.home);

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.post("/google-login", Controller.googleLogin);

router.use(authentication);

router.get("/users", Controller.getUser);
router.get("/users/:id", Controller.getUserById);
router.put("/users", Controller.updateUser);
router.patch("/users", Controller.updateRoleUser);

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
router.post("/ratings", Controller.addRating);
router.put("/ratings/:id", Controller.updateRating);

router.get("/categories", Controller.getCategories);
router.get("/categories/:name", Controller.getCategoriesByName);
router.post("/categories", Controller.addCategories);
router.delete("/categories/:id", Controller.deleteCategories);

router.get("/specialist", Controller.getAllSpecialist);
router.get("/specialist/:id", Controller.getSpecialistById);
router.post("/specialist", authorizationBuddy, Controller.addSpecialist);
// router.delete("/specialist/:id");

router.get("/likes", Controller.getAllLike);
router.post("/likes", Controller.addLike);
router.delete("/likes", Controller.deleteLike);

router.get("/todos", Controller.getTodos)
router.get("/todos/:id", Controller.getTodosById)
router.put("/todos/:id", Controller.updateTodos)
router.delete("/todos/:id", Controller.deleteTodos)

module.exports = router;
