// db queries
const UsersModel = require("../models/UsersModel");
const ReadsModel = require("../models/ReadsModel");
const ListensModel = require("../models/ListensModel");

const create = (req, res) => {
  const { request_text, book_title, online, in_person } = req.body;
  const { userID } = req.session;

  if (!userID) {
    return res.status(400).send({
      message: "Must be logged in!",
    });
  }

  if (!book_title || !online || !in_person) {
    return res.status(400).send({
      message: "Missing required information (book_title, online, in_person)!",
    });
  }

  ListensModel.create(userID, request_text, book_title, online, in_person)
    .then((request) => {
      return res
        .status(201)
        .send({ message: "Read request created!", request });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Could not create read request", error: err.message });
    });
};

const getAll = (req, res) => {
  ListensModel.getAll()
    .then((readRequests) => {
      return res.status(200).send({ message: "Read requests", readRequests });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not retrieve read requests",
        error: err.message,
      });
    });
};

const getByID = (req, res) => {
  const { id } = req.params;
  const { userID } = req.session;
  const response = {};

  if (!userID) {
    return res.status(400).send({
      message: "Must be logged in!",
    });
  }

  ListensModel.findByID(id)
    .then((request) => {
      if (!request) {
        res.status(404).send({ message: "Read request not found" });
        return;
      }
      if (userID !== request.listener_id) {
        res
          .status(400)
          .send({ message: "User not authorised to view this read request" });
        return;
      }
      response.request = request;
      console.log("response", response);
      return ReadsModel.getAllByRequestID(request.id);
    })
    .then((offers) => {
      if (!offers) return;
      response.offers = offers;
      return res.status(200).send({ message: `Read request ${id}`, response });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not retrieve read request data",
        error: err.message,
      });
    });
};

const update = (req, res) => {
  const { action } = req.body;

  if (!userID) {
    return res.status(400).send({
      message: "Must be logged in!",
    });
  }

  if (!action) {
    return res.status(400).send({
      message: "Missing action",
    });
  }
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
