const { Router } = require("express");
const userRouter = Router();
const userController = require("../controllers/userController");

userRouter.get("/", userController.showUsers);

module.exports = userRouter;
