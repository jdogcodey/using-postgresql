const { body, validationResult } = require("express-validator");

const validateUser = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Must input a username")
    .isLength({ min: 8 })
    .withMessage("Username must be at least 8 characters")
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage("Username can only contain letters, numbers, _ - and ."),
];

const showUsers = (req, res) => {
  console.log("Usernames will be logged here - wip");
  res.send("Usernames to be shown here");
};

const showForm = (req, res) => {
  res.render("inputUsername");
};

const submitUser = [
  validateUser,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("inputUsername", {
        errors: errors.array(),
      });
    }
    console.log("username to be saved: ", req.body.username);
  },
];

module.exports = { showUsers, showForm, submitUser };
