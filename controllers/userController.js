const showUsers = (req, res) => {
  console.log("Usernames will be logged here - wip");
  res.send("Usernames to be shown here");
};

const showForm = (req, res) => {
  res.render("inputUsername");
};

module.exports = { showUsers, showForm };
