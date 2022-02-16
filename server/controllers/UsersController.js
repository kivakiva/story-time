// db queries
const UsersModel = require("../models/UsersModel");
const ListensModel = require("../models/ListensModel");
const RatingsModel = require("../models/RatingsModel");
const ReadsModel = require("../models/ReadsModel");

const getAll = (req, res) => {
  const { userID } = req.session;

  if (!userID) {
    return res.status(400).send({ message: "Must be logged in!" });
  }

  UsersModel.findByID(userID)
    .then((user) => {
      if (user.email !== "admin@example.com") {
        res.status(403).send({ message: "Forbidden" });
        return;
      }

      return UsersModel.findAll();
    })
    .then((users) => {
      if (!users) return;

      return res.status(200).send({ message: "Users", users });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not retrieve users",
        error: err.message,
      });
    });
};

const create = (req, res) => {
  const { name, email, password, phone, image_url, in_person } = req.body;

  if (!name || !email || !phone || !password) {
    return res.status(400).send({
      message: "Missing required information (name, email, phone, password)!",
    });
  }

  // TODO: hash the password!
  UsersModel.create(name, email, phone, image_url, in_person, password)
    .then((user) => {
      return res.status(201).send({ message: "User created!", user });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Could not create user", error: err.message });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .send({ message: "Missing required data (email, password)" });
  }

  UsersModel.findByEmail(email)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      if (user.password !== password) {
        return res.status(400).send({ message: "Wrong password" });
      }

      req.session.userID = user.id;
      return res
        .status(200)
        .send({ message: "Login successful", cookies: req.session });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not login user",
        error: err.message,
      });
    });
};

// Quick user login for development
const devlog = (req, res) => {
  const { id } = req.params;

  UsersModel.findByID(id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      req.session.userID = user.id;
      return res
        .status(200)
        .send({ message: "Login successful", cookies: req.session });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not login user",
        error: err.message,
      });
    });
};

const logout = (req, res) => {
  req.session = null;

  return res.status(200).send({ message: "User logged out!" });
};

const getByID = async (req, res) => {
  const { id } = req.params;
  const { userID } = req.session;

  try {
    const user = await UsersModel.findByID(id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const acceptedReads = await ListensModel.findAcceptedOffersByReaderID(id);
    const acceptedListens = await ListensModel.findAcceptedRequestsByReaderID(
      id
    );

    const allReadRequests = await ListensModel.findAllByListenerID(id);
    const allRequestOffers = await ReadsModel.findAllByReaderID(id);

    // set state for each offer
    for (const offer of allRequestOffers) {
      const request = await ListensModel.findByID(offer.request_id);
      if (request.request_offer_id === offer.id) {
        offer.state = "accepted";
      } else if (!request.request_offer_id && !request.cancelled_at) {
        offer.state = "pending";
      } else {
        offer.state = "cancelled";
      }
    }

    const readerRating = await RatingsModel.avgReaderRating(id);
    const listenerRating = await RatingsModel.avgListenerRating(id);

    const response = {
      message: `User id:${id}`,
      user: {
        id: user.id,
        name: user.name,
        image_url: user.image_url,
        accepted_reads: acceptedReads.length,
        accepted_listens: acceptedListens.length,
        reader_rating: readerRating.avg,
        listener_rating: listenerRating.avg,
        created_at: user.created_at,
      },
    };
    if (userID !== Number(id)) {
      return res.status(200).send(response);
    }

    response.user = {
      ...response.user,
      email: user.email,
      all_read_requests: allReadRequests,
      all_request_offers: allRequestOffers,
    };
    return res.status(200).send(response);
  } catch (err) {
    res.status(500).send({
      message: "Could not retrieve user",
      error: err.message,
    });
  }
};

const update = (req, res) => {
  const { id } = req.params;
  const { name, email, image_url } = req.body;

  UsersModel.update({ id, image_url, name, email })
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not update user",
        error: err.message,
      });
    });
};

module.exports = {
  getAll,
  create,
  login,
  getByID,
  devlog,
  logout,
  update,
};
