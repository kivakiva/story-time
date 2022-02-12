const express = require("express");
const router = express.Router();
const { MessagesController } = require("../controllers"); // require MessagesController from all controllers (default import - index.js)

// CREATE
router.post("/", MessagesController.create);

// READ ALL
router.get("/", MessagesController.getAllByUserID);

// READ ONE
router.get("/:partnerID", MessagesController.getAllByPartnerID);

// DELETE ONE
router.delete("/:id", MessagesController.destroy);

module.exports = router;
