const db = require("../db"); // default import - index.js

const create = (user_id, request_text, book_title, online, in_person) => {
  return db
    .query(
      "INSERT INTO requests (listener_id, request_text, book_title, online, in_person) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [user_id, request_text, book_title, online, in_person]
    )
    .then((result) => result.rows[0]);
};

const getAll = () => {
  return db.query("SELECT * FROM requests").then((result) => result.rows);
};

const findByID = (id) => {
  return db
    .query("SELECT * FROM requests WHERE id = $1", [id])
    .then((result) => result.rows[0]);
};

module.exports = { create, getAll, findByID };
