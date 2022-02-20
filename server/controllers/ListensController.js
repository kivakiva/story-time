// db queries
const ReadsModel = require("../models/ReadsModel");
const ListensModel = require("../models/ListensModel");

const create = (req, res) => {
  const { request_text, book_title, online, in_person } = req.body;
  const { userID } = req.session;

  if (!userID) {
    console('no userID')
    return res.status(400).send({
      message: "Must be logged in!",
    });
  }

  if (!book_title || (!online && !in_person)) {
    console.log('no book OR neither online nor in person selected')
    return res.status(400).send({
      message: "Missing required information (book_title, online, in_person)!",
    });
  }

  ListensModel.create({
    user_id: userID,
    request_text,
    book_title,
    online,
    in_person,
  })
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
  ListensModel.findAll()
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

  ListensModel.findByID(id)
    .then((request) => {
      if (!request) {
        res.status(404).send({ message: "Read request not found" });
        return;
      }
      response.request = request;
      return ReadsModel.findAllByRequestID(request.id);
    })
    .then(async (offers) => {
      if (!offers) return;

      // send general information if user IS NOT the creator of read request:
      response.request.total_offers = offers.length;
      if (userID !== response.request.listener_id) {
        return res
          .status(200)
          .send({ message: `Read request id:${id}`, response });
      }

      // send full information inlcuding offers if user IS the creator of read request:
      try {
        for (const offer of offers) {
          const request = await ListensModel.findByID(offer.request_id);
          if (request.request_offer_id === offer.id) {
            offer.state = "accepted";
          } else if (!request.request_offer_id && !request.cancelled_at) {
            offer.state = "pending";
          } else {
            offer.state = "cancelled";
          }
        }
      } catch (err) {
        res.status(500).send({
          message: "Could not retrieve read request data",
          error: err.message,
        });
      }

      response.offers = offers;
      return res.status(200).send({
        message: `Read request id:${id} and it's associated offers`,
        response,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not retrieve read request data",
        error: err.message,
      });
    });
};

const update = async (req, res) => {
  console.log('attempting to update....')
  const { id } = req.params;
  const {
    action,
    who_cancelled_id,
    request_offer_id,
    request_text,
    book_title,
    online,
    in_person,
  } = req.body;
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
      message: "Could not retrieve read request",
      error: err.message,
    });
  }

  if (!readRequest) {
    return res.status(404).send({ message: "Read request not found" });
  }

  switch (action) {
    case "COMPLETE":
      if (userID !== readRequest.listener_id) {
        return res.status(400).send({
          message: "User not authorized to complete this read request",
        });
      }
      if (readRequest.completed_at) {
        return res.status(400).send({
          message: `Read request id:${id} has already been completed`,
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
          request: updatedRequest,
        });
      } catch (err) {
        return res.status(500).send({
          message: "Could not update read request",
          error: err.message,
        });
      }

    case "ACCEPT":
      if (userID !== readRequest.listener_id) {
        return res.status(400).send({
          message: "User not authorized to start this read request session",
        });
      }

      if (readRequest.accepted_at) {
        return res.status(400).send({
          message: `Read request id:${id} has already been accepted`,
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
        const correctOffer = await ReadsModel.findOneByID(request_offer_id);
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
          request: updatedRequest,
        });
      } catch (err) {
        return res.status(500).send({
          message: "Could not update read request",
          error: err.message,
        });
      }

    case "CANCEL":
      if (
        userID !== readRequest.listener_id &&
        userID !== readRequest.reader_id
      ) {
        return res
          .status(400)
          .send({ message: "User not authorized to cancel this read request" });
      }

      if (readRequest.cancelled_at) {
        return res.status(400).send({
          message: `Read request id:${id} has already been cancelled`,
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
          request: updatedRequest,
        });
      } catch (err) {
        return res.status(500).send({
          message: "Could not update read request",
          error: err.message,
        });
      }
    case "UPDATE":
      if (userID !== readRequest.listener_id) {
        return res.status(400).send({
          message: "User not authorized to edit this read request",
        });
      }
      if (readRequest.accepted_at || readRequest.cancelled_at) {
        return res.status(400).send({
          message: "Cannot edit accepted or cancelled read_request",
        });
      }

      if (!request_text && !book_title && !online && !in_person) {
        return res.status(400).send({
          message:
            "Must be present at least one of the following: request_text, book_title, online, in_person)",
        });
      }

      try {
        const updatedRequest = await ListensModel.updateReadRequest(
          id,
          request_text,
          book_title,
          online,
          in_person
        );

        return res.status(200).send({
          message: "Read request updated!",
          request: updatedRequest,
        });
      } catch (err) {
        return res.status(500).send({
          message: "Could not update read request",
          error: err.message,
        });
      }
    default:
      res.status(400).send({ message: "Wrong action" });
  }
};

module.exports = {
  create,
  getAll,
  getByID,
  update,
};
