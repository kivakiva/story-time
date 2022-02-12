// db queries
const UsersModel = require("../models/UsersModel");
const ListensModel = require("../models/ListensModel");

const create = (req, res) => {
  return res.status(201).send({
    message:
      "I am not afraid of storms, for I am learning how to sail my ship.",
  });
};

const getAll = (req, res) => {
  return res.status(200).send({
    message:
      "All happy families are alike; each unhappy family is unhappy in its own way.",
  });
};

const getByID = (req, res) => {
  return res.status(200).send({
    message:
      "Memories warm you up from the inside. But they also tear you apart.",
  });
};

const update = (req, res) => {
  return res.status(200).send({
    message:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
  });
};

module.exports = {
  create,
  getAll,
  getByID,
  update,
};
