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

module.exports = { avgReaderRating, avgListenerRating };
