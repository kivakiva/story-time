const db = require("../db"); // default import - index.js

const create = ({ name, email, phone, image_url, password }) => {
  //TODO: Check if user with the given email already exists in the db, then:
  console.log('in user models')
  return db
    .query(
      "INSERT INTO users (name, email, phone, image_url, password) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [name, email, phone, image_url, password]
    )
    .then((result) => result.rows[0]).catch(err => console.log(err))
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

const update = ({ id, image_url, name, email, intro }) => {
  return db
    .query(
      `
  UPDATE users
  SET image_url = $1, name = $2, email = $3, intro = $4
  WHERE id = $5
  RETURNING *
  `,
      [image_url, name, email, intro, id]
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
