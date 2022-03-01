// db queries
const MessagesModel = require("../models/MessagesModel");

const getAllByUserID = (req, res) => {
  const userID = req.session.userID;

  if (!userID) {
    return res.status(400).send({ message: "User not logged in" });
  }

  MessagesModel.getAllByUserID(userID)
    .then((result) => {
      // console.log(result);
      return res.status(200).send(result);
    })
    .catch((err) => {
      console.log({ err, message: "Could not get all messages from userID" });
      return res
        .status(400)
        .send({ err, message: "Could not get all messages from userID" });
    });
};

const create = (req, res) => {
  const message = req.body.message_text;
  const recipient_id = req.body.recipient_id;
  const sender_id = req.body.sender_id;
  const customization = req.body.customization ? req.body.customization : null;
  MessagesModel.create({ sender_id, recipient_id, message, customization })
    .then(() => {
      return res.status(201).send("message created!");
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getAllByPartnerID = (req, res) => {
  const recipient_id = req.params.partnerID;
  const sender_id = req.session.userID;
  console.log("Recipient & Sender IDs: ", recipient_id, sender_id);

  MessagesModel.getAllByPartnerID(sender_id, recipient_id)
    .then((result) => {
      // console.log(result); // log entire message history in current chat
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
  getAllByPartnerID,
  destroy,
  getAllByUserID,
};
