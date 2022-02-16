const db = require("../db"); // default import - index.js

const getAllByPartnerID = (sender_id, recipient_id) => {
  return db
    .query(
      "SELECT * FROM messages WHERE (recipient_id = $1 AND sender_id = $2) OR (recipient_id = $2 AND sender_id = $1)",
      [recipient_id, sender_id]
    )
    .then((results) => results.rows);
};

const create = (sender_id, recipient_id, message) => {
  const date_created = new Date();
  console.log(sender_id, recipient_id, message)
  return db
    .query("INSERT INTO messages (message_text, sender_id, recipient_id, created_at) VALUES ($1, $2, $3, $4)", [
      message,
      sender_id,
      recipient_id,
      date_created,
    ])
    .then((results) => results.rows);
};

module.exports = {
  getAllByPartnerID,
  create,
};
