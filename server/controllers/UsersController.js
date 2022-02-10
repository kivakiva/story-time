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

//TODO:
// functions getByID, update, destroy

module.exports = {
  getAll,
  create,
};
