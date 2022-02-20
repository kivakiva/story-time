const db = require("../db"); // default import - index.js

const create = ({ user_id, request_text, book_title, online, in_person }) => {
  return db
    .query(
      "INSERT INTO requests (listener_id, request_text, book_title, online, in_person) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [user_id, request_text, book_title, online, in_person]
    )
    .then((result) => result.rows[0]);
};

const findAll = () => {
  return db.query("SELECT * FROM requests").then((result) => result.rows);
};

const findByID = (id) => {
  return db
    .query("SELECT * FROM requests WHERE id = $1", [id])
    .then((result) => result.rows[0]);
};

const completeReadRequest = (id) => {
  return db
    .query(
      "UPDATE requests SET completed_at = current_timestamp WHERE id = $1 RETURNING *",
      [id]
    )
    .then((result) => result.rows[0]);
};

const acceptReadRequest = (request_id, request_offer_id) => {
  return db
    .query(
      "UPDATE requests SET accepted_at = current_timestamp, request_offer_id = $1, reader_id = (SELECT reader_id FROM request_offers WHERE id = $1) WHERE id = $2 RETURNING *",
      [request_offer_id, request_id]
    )
    .then((result) => result.rows[0]);
};

const cancelReadRequest = (request_id, who_cancelled_id) => {
  return db
    .query(
      "UPDATE requests SET cancelled_at = current_timestamp, who_cancelled_id = $1 WHERE id = $2 RETURNING *",
      [who_cancelled_id, request_id]
    )
    .then((result) => result.rows[0]);
};

const findAcceptedOffersByReaderID = (id) => {
  return db
    .query(
      "SELECT * FROM requests WHERE reader_id = $1 AND accepted_at IS NOT NULL",
      [id]
    )
    .then((result) => result.rows);
};

const findAcceptedRequestsByReaderID = (id) => {
  return db
    .query(
      "SELECT * FROM requests WHERE listener_id = $1 AND accepted_at IS NOT NULL",
      [id]
    )
    .then((result) => result.rows);
};

const findAllByListenerID = (id) => {
  return db
    .query("SELECT * FROM requests WHERE listener_id = $1", [id])
    .then((result) => result.rows);
};

const updateReadRequest = (id, request_text, book_title, online, in_person) => {
  return db
    .query(
      `
      UPDATE requests SET
      request_text = COALESCE($1, request_text),
      book_title = COALESCE($2, book_title),
      online = COALESCE($3, online),
      in_person = COALESCE($4, in_person)
      WHERE id = $5
      RETURNING *
    `,
      [request_text, book_title, online, in_person, id]
    )
    .then((result) => result.rows[0]);
};

const destroy = (id) => {
  return db
    .query("DELETE FROM requests WHERE id = $1 RETURNING *", [id])
    .then((result) => result.rows[0]);
};

module.exports = {
  create,
  findAll,
  findByID,
  completeReadRequest,
  acceptReadRequest,
  cancelReadRequest,
  findAcceptedOffersByReaderID,
  findAcceptedRequestsByReaderID,
  findAllByListenerID,
  updateReadRequest,
  destroy,
};
