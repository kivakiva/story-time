// db queries
const UsersModel = require("../models/UsersModel");
const RatingsModel = require("../models/RatingsModel");

const rateReader = (req, res) => {
  return res.status(200).send({
    message:
      "But soft! What light through yonder window breaks? It is the east, and Juliet is the sun.",
  });
};

const rateListener = (req, res) => {
  return res.status(200).send({
    message: "Stay gold, Ponyboy, stay gold.",
  });
};

module.exports = {
  rateReader,
  rateListener,
};
