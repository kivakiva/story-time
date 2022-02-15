// db queries
const UsersModel = require("../models/UsersModel");
const MessagesModel = require("../models/MessagesModel");

const getAllByUserID = (req, res) => {
  return res
    .status(200)
    .send({ message: "It was the best of times, it was the worst of times" });
};

const create = (req, res) => {
  const message = req.body.message_text;
  const recipient_id = req.body.recipient_id;
  const sender_id = req.body.sender_id;
  MessagesModel.create(sender_id, recipient_id, message)
    .then((result) => {
      console.log(result)
      return res.status(201).send("message created!");
    })
    .catch((err) => console.log(err.message));
};

const getConversation = (req, res) => {
  const recipient_id = req.body.recipient_id;
  const sender_id = req.body.sender_id
  console.log(recipient_id, sender_id, req.params.partnerID)
  MessagesModel.getConversation(sender_id, recipient_id)
    .then((result) => {
      return res.status(200).send(result);
    })
    .catch((err) => err.message);
};

const destroy = (req, res) => {
  // res.status(204).send();
  res.status(200).send({
    message:
      "Tomorrow I’ll think of some way to get him back. After all, tomorrow is another day.",
  });
};

module.exports = {
  getAllByUserID,
  create,
  getConversation,
  destroy,
};
