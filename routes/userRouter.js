const { Router } = require("express");
const userRouter = Router();
const userController = require("../controllers/userController");

userRouter.get("/", userController.showUsers);
userRouter.get("/new", userController.showForm);

module.exports = userRouter;
