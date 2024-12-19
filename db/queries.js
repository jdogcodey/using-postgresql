const pool = require("./pool");
const main = require("./populatedb");

async function getAllUsernames() {
  const { rows } = await pool.query("SELECT * FROM usernames");
  return rows;
}

async function insertUsername(username) {
  await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username]);
}

async function searchUsernames(username) {
  const { rows } = await pool.query(
    "SELECT * FROM usernames WHERE username ILIKE ($1)",
    [`%${username}%`]
  );
  return rows;
}

async function emptyDB() {
  await pool.query("DROP TABLE usernames;");
  await main();
  return;
}

module.exports = {
  getAllUsernames,
  insertUsername,
  searchUsernames,
  emptyDB,
};
