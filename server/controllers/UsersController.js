const UsersModel = require("../models/UsersModel"); // db queries

const getAll = (req, res) => {
  UsersModel.getAll()
    .then((users) => {
      return res.status(200).send({ message: "Users", users });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Could not retrieve users", error: err.message });
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
  const { email } = req.body;

  if (!email) {
    return res.status(400).send({ message: "Missing email" });
  }

  UsersModel.findByEmail(email)
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: "User with this email does not exist" });
      }
      console.log("user", user);
      req.session.userID = user.userID;
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

  // if (user.password !== password) {
  //   return res.status(400).send({ message: "Wrong password" });
  // }
};

const getByID = (req, res) => {
  const { id } = req.params;

  //TODO: If id matches logged in users id => full info
  //      if id does not match logged in users id => basic info

  // const user = UsersModel.getByID(id);
  // if (!user) {
  //   return res.status(404).send({ message: "User not found" });
  // }

  return res.status(200).send({
    message:
      "And so we beat on, boats against the current, borne back ceaselessly into the past.",
  });
};

module.exports = {
  getAll,
  create,
  login,
  getByID,
};
