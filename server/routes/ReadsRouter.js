const express = require("express");
const router = express.Router();
const { ReadsController } = require("../controllers"); // require ReadsController from all controllers (default import - index.js)

// CREATE READ_REQUEST OFFER
router.post("/", ReadsController.create);

// READ ALL READ_REQUEST OFFERS
router.get("/", ReadsController.getAll);

// READ ONE
router.get("/:id", ReadsController.getByID);

// UPDATE ONE
router.put("/:id", ReadsController.update);

module.exports = router;
