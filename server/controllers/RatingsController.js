// db queries
const ListensModel = require("../models/ListensModel");
const RatingsModel = require("../models/RatingsModel");

const rateReader = async (req, res) => {
  const { rating, request_id } = req.body;
  const { userID } = req.session;

  if (!userID) {
    return res.status(400).send({
      message: "Must be logged in!",
    });
  }

  if (!rating) {
    return res.status(400).send({
      message: "Missing rating",
    });
  }

  if (!request_id) {
    return res.status(400).send({
      message: "Missing request_id",
    });
  }

  try {
    const readRequest = await ListensModel.findByID(request_id);

    if (!readRequest) {
      return res.status(404).send({ message: "Read request not found" });
    }

    if (readRequest.listener_id !== userID) {
      return res.status(400).send({
        message: "Only the creator of this read request can rate the reader!",
      });
    }

    const ratingExists = await RatingsModel.findReaderRatingByRequestID(
      request_id
    );

    if (ratingExists) {
      return res
        .status(400)
        .send({ message: "You have already left a rating for the reader!" });
    }

    const readerRating = await RatingsModel.createReaderRating(
      rating,
      request_id
    );

    return res.status(200).send({
      message: "Rating for the reader created",
      reader_rating: readerRating,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Could not save the rating",
      error: err.message,
    });
  }
};

const rateListener = async (req, res) => {
  const { rating, request_id } = req.body;
  const { userID } = req.session;

  if (!userID) {
    return res.status(400).send({
      message: "Must be logged in!",
    });
  }

  if (!rating) {
    return res.status(400).send({
      message: "Missing rating",
    });
  }

  if (!request_id) {
    return res.status(400).send({
      message: "Missing request_id",
    });
  }

  try {
    const readRequest = await ListensModel.findByID(request_id);

    if (!readRequest) {
      return res.status(404).send({ message: "Read request not found" });
    }

    if (readRequest.reader_id !== userID) {
      return res.status(400).send({
        message:
          "Only the reader associated with this read request can rate the listener!",
      });
    }

    const ratingExists = await RatingsModel.findListenerRatingByRequestID(
      request_id
    );

    if (ratingExists) {
      return res
        .status(400)
        .send({ message: "You have already left a rating for the listener!" });
    }

    const listenerRating = await RatingsModel.createListenerRating(
      rating,
      request_id
    );

    return res.status(200).send({
      message: "Rating for the listener created",
      listener_rating: listenerRating,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Could not save the rating",
      error: err.message,
    });
  }
};

const getReaderRating = async (req, res) => {
  const { userID } = req.session;
  const { request_id } = req.params;

  if (!userID) {
    return res.status(400).send({
      message: "Must be logged in!",
    });
  }

  try {
    const readRequest = await ListensModel.findByID(request_id);

    if (!readRequest) {
      return res.status(404).send({ message: "Read request not found" });
    }

    if (
      readRequest.listener_id !== userID &&
      readRequest.reader_id !== userID
    ) {
      return res.status(400).send({ message: "Wrong user" });
    }

    const readerRating = await RatingsModel.findReaderRatingByRequestID(
      request_id
    );
    if (!readerRating) {
      return res.status(200).send({ message: "No rating" });
    }
    return res.status(200).send({
      message: "Reader rating",
      reader_rating: readerRating,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Could not retrieve reader rating",
      error: err.message,
    });
  }
};

const getListenerRating = async (req, res) => {
  const { userID } = req.session;
  const { request_id } = req.params;

  if (!userID) {
    return res.status(400).send({
      message: "Must be logged in!",
    });
  }

  try {
    const readRequest = await ListensModel.findByID(request_id);

    if (!readRequest) {
      return res.status(404).send({ message: "Read request not found" });
    }

    if (
      readRequest.listener_id !== userID &&
      readRequest.reader_id !== userID
    ) {
      return res.status(400).send({ message: "Wrong user" });
    }

    const listenerRating = await RatingsModel.findListenerRatingByRequestID(
      request_id
    );
    if (!listenerRating) {
      return res.status(200).send({ message: "No rating" });
    }
    return res.status(200).send({
      message: "Listener rating",
      listener_rating: listenerRating,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Could not retrieve listener rating",
      error: err.message,
    });
  }
};

module.exports = {
  rateReader,
  rateListener,
  getReaderRating,
  getListenerRating,
};
