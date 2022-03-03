// PG database connection setup
const { Pool } = require("pg");
const dbParams = require("../lib/db.js");
const db = new Pool(dbParams);

db.connect(() => {
  console.log("Connected to the database");
});

module.exports = db;
// postgres://szlhlslwusxekw:eaf6d1f1a381cf40cddfbf09b72c414e77aa582355469e4cccd6e8da7650f1ab@ec2-52-73-149-159.compute-1.amazonaws.com:5432/d9l7qs4ajiq2ui