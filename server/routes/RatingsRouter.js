const express = require("express");
const router = express.Router();
const { RatingsController } = require("../controllers"); // require RatingsController from all controllers (default import - index.js)

// GET RATING FOR READER FOR A SINGLE SESSION
router.get("/readers/listens/:request_id", RatingsController.getReaderRating);

// GET RATING FOR LISTENER FOR A SINGLE SESSION
router.get(
  "/listeners/listens/:request_id",
  RatingsController.getListenerRating
);

// CREATE RATING FOR READER FOR A SINGLE SESSION
router.post("/readers", RatingsController.rateReader);

// CREATE RATING FOR LISTENER FOR A SINGLE SESSION
router.post("/listeners", RatingsController.rateListener);

module.exports = router;
