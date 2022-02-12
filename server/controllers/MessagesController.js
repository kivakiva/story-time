// db queries
const UsersModel = require("../models/UsersModel");
const MessagesModel = require("../models/MessagesModel");

const getAllByUserID = (req, res) => {
  return res
    .status(200)
    .send({ message: "It was the best of times, it was the worst of times" });
};

const create = (req, res) => {
  return res
    .status(201)
    .send({ message: "Love is or it ain’t. Thin love ain’t love at all." });
};

const getAllByPartnerID = (req, res) => {
  return res.status(200).send({
    message: "Whatever our souls are made of, his and mine are the same.",
  });
};

const destroy = (req, res) => {
  // res.status(204).send();
  res.status(200).send({
    message:
      "Tomorrow I’ll think of some way to get him back. After all, tomorrow is another day.",
  });
};

module.exports = {
  getAllByUserID,
  create,
  getAllByPartnerID,
  destroy,
};
