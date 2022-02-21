const db = require("../db"); // default import - index.js

const avgReaderRating = (id) => {
  return db
    .query(
      "SELECT AVG(rating) FROM requests JOIN reader_ratings ON request_id = requests.id WHERE reader_id = $1;",
      [id]
    )
    .then((result) => result.rows[0]);
};

const avgListenerRating = (id) => {
  return db
    .query(
      "SELECT AVG(rating) FROM requests JOIN listener_ratings ON request_id = requests.id WHERE listener_id = $1;",
      [id]
    )
    .then((result) => result.rows[0]);
};

const findReaderRatingByRequestID = (request_id) => {
  return db
    .query("SELECT * FROM reader_ratings WHERE request_id = $1", [request_id])
    .then((result) => result.rows[0]);
};

const createReaderRating = (rating, request_id) => {
  return db
    .query(
      "INSERT INTO reader_ratings (rating, request_id) VALUES($1, $2) RETURNING *",
      [rating, request_id]
    )
    .then((result) => result.rows[0]);
};

const findListenerRatingByRequestID = (request_id) => {
  return db
    .query("SELECT * FROM listener_ratings WHERE request_id = $1", [request_id])
    .then((result) => result.rows[0]);
};

const createListenerRating = (rating, request_id) => {
  return db
    .query(
      "INSERT INTO listener_ratings (rating, request_id) VALUES($1, $2) RETURNING *",
      [rating, request_id]
    )
    .then((result) => result.rows[0]);
};

module.exports = {
  avgReaderRating,
  avgListenerRating,
  findReaderRatingByRequestID,
  createReaderRating,
  findListenerRatingByRequestID,
  createListenerRating,
};
