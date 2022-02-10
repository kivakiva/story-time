// PG database connection setup
const { Pool } = require("pg");
const dbParams = require("../lib/db.js");
const db = new Pool(dbParams);

db.connect(() => {
  console.log("Connected to the database");
});

module.exports = db;
