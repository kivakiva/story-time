const express = require("express");
const router = express.Router();
const { RatingsController } = require("../controllers"); // require RatingsController from all controllers (default import - index.js)

// CREATE RATING FOR READER
router.post("/readers", RatingsController.rateReader);

// CREATE RATING FOR LISTENER
router.post("/listeners", RatingsController.rateListener);

module.exports = router;
