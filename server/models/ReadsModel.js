const db = require("../db"); // default import - index.js

const create = (user_id, request_id, offer_text) => {
  return db
    .query(
      "INSERT INTO request_offers (reader_id, request_id, offer_text) VALUES($1, $2, $3) RETURNING *",
      [user_id, request_id, offer_text]
    )
    .then((result) => result.rows[0]);
};

const findAllByRequestID = (id) => {
  return db
    .query("SELECT * FROM request_offers WHERE request_id = $1", [id])
    .then((result) => result.rows);
};

const findOneByID = (id) => {
  return db
    .query("SELECT * FROM request_offers WHERE id = $1", [id])
    .then((result) => result.rows[0]);
};

const findAllByReaderID = (id) => {
  return db
    .query(
      "SELECT * FROM request_offers WHERE reader_id = $1 ORDER BY created_at DESC",
      [id]
    )
    .then((result) => result.rows);
};

const findByReaderIDAndRequestID = (reader_id, request_id) => {
  return db
    .query(
      "SELECT * FROM request_offers WHERE reader_id = $1 AND request_id = $2",
      [reader_id, request_id]
    )
    .then((result) => result.rows[0]);
};

const update = (id, offer_text) => {
  return db
    .query(
      "UPDATE request_offers SET offer_text = $1 WHERE id = $2 RETURNING *",
      [offer_text, id]
    )
    .then((result) => result.rows[0]);
};

const destroy = (id) => {
  return db
    .query("DELETE FROM request_offers WHERE id = $1 RETURNING *", [id])
    .then((result) => result.rows[0]);
};

module.exports = {
  create,
  findAllByRequestID,
  findOneByID,
  findAllByReaderID,
  findByReaderIDAndRequestID,
  update,
  destroy,
};
