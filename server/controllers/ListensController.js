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
      return ReadsModel.getAllByRequestID(request.id);
    })
    .then((offers) => {
      if (!offers) return;
      response.offers = offers;
      return res
        .status(200)
        .send({ message: `Read request id:${id}`, response });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not retrieve read request data",
        error: err.message,
      });
    });
};

const update = async (req, res) => {
  const { id } = req.params;
  const { action, reader_id, who_cancelled_id, request_offer_id } = req.body;
  const { userID } = req.session;

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

  let readRequest;
  // get info about the read request
  try {
    readRequest = await ListensModel.findByID(id);
  } catch (err) {
    return res.status(500).send({
      message: "Could not retrieve read request data",
      error: err.message,
    });
  }

  if (!readRequest) {
    res.status(404).send({ message: "Read request not found" });
    return;
  }

  switch (action) {
    case "COMPLETE":
      if (userID !== readRequest.listener_id) {
        res.status(400).send({
          message: "User not authorized to complete this read request",
        });
        return;
      }
      if (readRequest.completed_at) {
        return res.status(400).send({
          message: `Read request ${id} has already been completed`,
          completed_at: readRequest.completed_at,
        });
      }

      if (readRequest.cancelled_at) {
        return res.status(400).send({
          message: "Cannot complete a cancelled read request",
          cancelled_at: readRequest.cancelled_at,
        });
      }

      if (!readRequest.accepted_at) {
        return res.status(400).send({
          message: "Cannot complete a read request that has not been accepted",
        });
      }

      try {
        const updatedRequest = await ListensModel.completeReadRequest(id);
        return res.status(200).send({
          message: "Read request completed!",
          updatedRequest,
        });
      } catch (err) {
        return res.status(500).send({
          message: "Could not retrieve read request data",
          error: err.message,
        });
      }

    case "ACCEPT":
      if (userID !== readRequest.listener_id) {
        res.status(400).send({
          message: "User not authorized to start this read request session",
        });
        return;
      }
      if (readRequest.accepted_at) {
        return res.status(400).send({
          message: `Read request ${id} has already been accepted`,
          accepted_at: readRequest.accepted_at,
        });
      }

      if (readRequest.cancelled_at) {
        return res.status(400).send({
          message: "Cannot accept a cancelled read request",
          cancelled_at: readRequest.cancelled_at,
        });
      }

      if (!request_offer_id) {
        return res.status(400).send({
          message: "Missing request_offer_id",
        });
      }

      try {
        const correctOffer = await ReadsModel.getOneByID(request_offer_id);
        if (!correctOffer) {
          return res.status(404).send({
            message: "Request offer not found",
          });
        }

        if (correctOffer.request_id !== Number(id)) {
          return res.status(400).send({
            message:
              "Request id does not match with request id in request offer",
          });
        }

        const updatedRequest = await ListensModel.acceptReadRequest(
          id,
          request_offer_id
        );
        return res.status(200).send({
          message: "Read request accepted!",
          updatedRequest,
        });
      } catch (err) {
        return res.status(500).send({
          message: "Could not retrieve read request data",
          error: err.message,
        });
      }

    case "CANCEL":
      if (
        userID !== readRequest.listener_id &&
        userID !== readRequest.reader_id
      ) {
        res
          .status(400)
          .send({ message: "User not authorized to cancel this read request" });
        return;
      }

      if (readRequest.cancelled_at) {
        return res.status(400).send({
          message: `Read request ${id} has already been cancelled`,
          cancelled_at: readRequest.cancelled_at,
        });
      }

      if (readRequest.completed_at) {
        return res.status(400).send({
          message: "Cannot cancel a completed read request",
          completed_at: readRequest.completed_at,
        });
      }

      if (!readRequest.accepted_at && userID !== readRequest.listener_id) {
        return res.status(400).send({
          message:
            "Only listener can cancel a request that has not been accepted",
        });
      }

      if (!who_cancelled_id) {
        return res.status(400).send({
          message: "Missing who_cancelled_id!",
        });
      }

      if (
        Number(who_cancelled_id) !== readRequest.listener_id &&
        Number(who_cancelled_id) !== readRequest.reader_id
      ) {
        return res.status(400).send({
          message:
            "Wrong who_cancelled_id. Must match with request's reader_id or listener_id",
        });
      }

      try {
        const updatedRequest = await ListensModel.cancelReadRequest(
          id,
          who_cancelled_id
        );
        return res.status(200).send({
          message: "Read request cancelled!",
          updatedRequest,
        });
      } catch (err) {
        return res.status(500).send({
          message: "Could not retrieve read request data",
          error: err.message,
        });
      }
    default:
      res.send({ message: "Wrong action" });
  }
};

module.exports = {
  create,
  getAll,
  getByID,
  update,
};
