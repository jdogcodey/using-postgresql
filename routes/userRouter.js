const { Router } = require("express");
const userRouter = Router();
const userController = require("../controllers/userController");

userRouter.get("/", userController.getHomepage);
userRouter.get("/new", userController.showForm);
userRouter.post("/new", userController.submitUser);
userRouter.get("/search", userController.search);
userRouter.get("/delete", userController.delete);

module.exports = userRouter;
