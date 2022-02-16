const express = require("express");
const router = express.Router();
const { UsersController } = require("../controllers"); // require UsersController from all controllers (default import - index.js)

// CREATE
router.post("/signup", UsersController.create);

// DEVELOPMENT LOGIN
router.get("/devlog/:id", UsersController.devlog);

// LOGIN
router.post("/login", UsersController.login);

// LOGOUT
router.post("/logout", UsersController.logout);

// READ ALL
router.get("/", UsersController.getAll);

// READ ONE
router.get("/:id", UsersController.getByID);

// UPDATE ONE
router.put("/:id", UsersController.update);

// DELETE ONE
// router.delete("/:id", UsersController.destroy);

module.exports = router;
