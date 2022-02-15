const express = require("express");
const router = express.Router();
const { MessagesController } = require("../controllers"); // require MessagesController from all controllers (default import - index.js)

// CREATE
router.post("/", MessagesController.create);

// READ ALL BY USER
router.get("/", MessagesController.getAllByUserID);

// READ ALL BY USER AND PARTNER
router.get("/:partnerID", MessagesController.getConversation);

// DELETE ONE
router.delete("/:id", MessagesController.destroy);

module.exports = router;
