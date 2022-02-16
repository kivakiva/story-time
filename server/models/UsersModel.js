const db = require("../db"); // default import - index.js

const create = (name, email, phone, image_url, in_person, password_digest) => {
  if (!in_person) {
    in_person = false;
  }
  //TODO: Check if user with the given email already exists in the db, then:
  return db
    .query(
      "INSERT INTO users (name, email, phone, image_url, in_person, password_digest) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, email, phone, image_url, in_person, password_digest]
    )
    .then((result) => result.rows[0]);
};

const findAll = () => {
  return db.query("SELECT * FROM users").then((result) => result.rows);
};

const findByEmail = (email) => {
  return db
    .query("SELECT * FROM users WHERE email = $1", [email])
    .then((result) => result.rows[0]);
};

const findByID = (id) => {
  return db
    .query("SELECT * FROM users WHERE id = $1", [id])
    .then((result) => result.rows[0]);
};

const update = ({ id, image_url, name, email }) => {
  return db
    .query(
      `
  UPDATE users
  SET image_url = $1, name = $2, email = $3
  WHERE id = $4
  RETURNING *
  `,
      [image_url, name, email, id]
    )
    .then((result) => {
      return result.rows[0];
    });
};

module.exports = {
  create,
  findAll,
  findByEmail,
  findByID,
  update,
};
