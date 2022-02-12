// db queries
const UsersModel = require("../models/UsersModel");
const ReadsModel = require("../models/ReadsModel");

const create = (req, res) => {
  return res.status(201).send({
    message:
      "All human wisdom is summed up in these two words – ‘Wait and hope.",
  });
};

const getAll = (req, res) => {
  return res.status(200).send({
    message:
      "The creatures outside looked from pig to man, and from man to pig, and from pig to man again; but already it was impossible to say which was which.",
  });
};

const getByID = (req, res) => {
  return res.status(200).send({
    message:
      "It is only with the heart that one can see rightly; what is essential is invisible to the eye.",
  });
};

const update = (req, res) => {
  return res.status(200).send({
    message:
      "Isn’t it nice to think that tomorrow is a new day with no mistakes in it yet?",
  });
};

module.exports = {
  create,
  getAll,
  getByID,
  update,
};
