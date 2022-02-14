// db queries
const ListensModel = require("../models/ListensModel");
const ReadsModel = require("../models/ReadsModel");

const create = async (req, res) => {
  const { request_id, offer_text } = req.body;
  const { userID } = req.session;

  if (!userID) {
    return res.status(400).send({
      message: "Must be logged in!",
    });
  }

  if (!request_id) {
    return res.status(400).send({
      message: "Missing request_id!",
    });
  }

  try {
    const request = await ListensModel.findByID(request_id);
    if (!request) {
      return res.status(404).send({ message: "Read request not found!" });
    }

    if (request.listener_id === userID) {
      return res.status(400).send({
        message: "Read request author and offer author cannot be the same user",
      });
    }

    if (request.accepted_at || request.cancelled_at) {
      return res.status(400).send({
        message: "Cannot create offer for accepted or cancelled read request",
      });
    }

    // check if user has already created offer for this read request
    const offer = await ReadsModel.findByReaderIDAndRequestID(
      userID,
      request_id
    );
    if (offer) {
      return res.status(400).send({
        message: `User has already created offer for read request id:${request_id}`,
      });
    }

    const newOffer = await ReadsModel.create(userID, request_id, offer_text);
    return res
      .status(201)
      .send({ message: "Request offer created!", offer: newOffer });
  } catch (err) {
    res.status(500).send({
      message: "Could not create request offer",
      error: err.message,
    });
  }
};

const getAll = (req, res) => {
  return res.status(200).send({
    message:
      "The creatures outside looked from pig to man, and from man to pig, and from pig to man again; but already it was impossible to say which was which.",
  });
};

const getByID = async (req, res) => {
  const { id } = req.params;
  const { userID } = req.session;

  if (!userID) {
    return res.status(400).send({
      message: "Must be logged in!",
    });
  }

  try {
    const offer = await ReadsModel.findOneByID(id);
    if (!offer) {
      return res.status(404).send({
        message: "Request offer not found",
      });
    }

    const request = await ListensModel.findByID(offer.request_id);
    // Allow only creator of offer or creator of read request
    if (userID !== offer.reader_id && userID !== request.listener_id) {
      return res
        .status(400)
        .send({ message: "User not authorized to view this offer" });
    }

    // set offer state
    if (request.request_offer_id === offer.id) {
      offer.state = "accepted";
    } else if (!request.request_offer_id && !request.cancelled_at) {
      offer.state = "pending";
    } else {
      offer.state = "cancelled";
    }

    return res.status(200).send({
      message: `Request offer id:${id}`,
      offer,
    });
  } catch (err) {
    res.status(500).send({
      message: "Could not retrieve request offer",
      error: err.message,
    });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { offer_text } = req.body;
  const { userID } = req.session;

  if (!userID) {
    return res.status(400).send({
      message: "Must be logged in!",
    });
  }

  if (!offer_text) {
    return res.status(400).send({
      message: "Missing offer_text!",
    });
  }

  try {
    const offer = await ReadsModel.findOneByID(id);
    if (!offer) {
      return res.status(404).send({
        message: "Request offer not found",
      });
    }

    // Allow only creator of offer:
    if (userID !== offer.reader_id) {
      return res
        .status(400)
        .send({ message: "User not authorized to update this offer" });
    }

    const request = await ListensModel.findByID(offer.request_id);
    if (request.accepted_at || request.cancelled_at) {
      return res.status(400).send({
        message: "Cannot edit an offer for accepted or cancelled read request",
      });
    }

    const updatedOffer = await ReadsModel.update(id, offer_text);
    return res.status(200).send({
      message: `Request offer id:${id} updated!`,
      offer: { ...updatedOffer, state: "pending" },
    });
  } catch (err) {
    res.status(500).send({
      message: "Could not retrieve request offer",
      error: err.message,
    });
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;
  const { userID } = req.session;

  if (!userID) {
    return res.status(400).send({
      message: "Must be logged in!",
    });
  }

  try {
    const offer = await ReadsModel.findOneByID(id);
    if (!offer) {
      return res.status(404).send({
        message: "Request offer not found",
      });
    }

    // Allow only creator of offer:
    if (userID !== offer.reader_id) {
      return res
        .status(400)
        .send({ message: "User not authorized to delete this offer" });
    }

    const request = await ListensModel.findByID(offer.request_id);
    if (request.accepted_at || request.cancelled_at) {
      return res.status(400).send({
        message:
          "Cannot delete an offer for accepted or cancelled read request",
      });
    }

    await ReadsModel.destroy(id);
    return res.status(200).send({
      message: `Request offer id:${id} deleted!`,
    });
  } catch (err) {
    res.status(500).send({
      message: "Could not retrieve request offer",
      error: err.message,
    });
  }
};

module.exports = {
  create,
  getAll,
  getByID,
  update,
  destroy,
};
