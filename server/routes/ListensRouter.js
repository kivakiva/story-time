const express = require("express");
const router = express.Router();
const { ListensController } = require("../controllers"); // require ListensController from all controllers (default import - index.js)

// CREATE READ_REQUEST
router.post("/", ListensController.create);

// READ ALL READ_REQUESTS
router.get("/", ListensController.getAll);

// READ ONE
router.get("/:id", ListensController.getByID);

// UPDATE ONE
router.put("/:id", ListensController.update);

module.exports = router;
