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

async function getHomepage(req, res) {
  const usernames = await showUsers();
  res.render("index", { usernames: usernames, searchResult: null });
}

async function showUsers() {
  const usernames = await db.getAllUsernames();
  return usernames;
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

async function search(req, res) {
  const { searchTerm } = req.query;
  const searchResult = await db.searchUsernames(searchTerm);
  console.log(searchResult);
  const usernames = await showUsers();
  res.render("index", {
    usernames: usernames,
    searchResult: searchResult,
  });
}

module.exports = { showUsers, showForm, submitUser, getHomepage, search };
