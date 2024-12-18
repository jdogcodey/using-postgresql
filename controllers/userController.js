const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

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

async function showUsers(req, res) {
  const usernames = await db.getAllUsernames();
  console.log("Usernames: ", usernames);
  res.send("Usernames: " + usernames.map((user) => user.username).join(", "));
}

const showForm = (req, res) => {
  res.render("inputUsername");
};

const submitUser = [
  validateUser,
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("inputUsername", {
        errors: errors.array(),
      });
    }
    const { username } = req.body;
    await db.insertUsername(username);
    res.redirect("/");
  },
];

module.exports = { showUsers, showForm, submitUser };
