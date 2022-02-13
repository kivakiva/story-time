const db = require("../db"); // default import - index.js

const getAllByRequestID = (id) => {
  return db
    .query("SELECT * FROM request_offers WHERE request_id = $1", [id])
    .then((result) => result.rows);
};

const getOneByID = (id) => {
  return db
    .query("SELECT * FROM request_offers WHERE id = $1", [id])
    .then((result) => result.rows[0]);
};

module.exports = { getAllByRequestID, getOneByID };
