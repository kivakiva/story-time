// require and export all controllers
const UsersController = require("./UsersController");
const MessagesController = require("./MessagesController");
const RatingsController = require("./RatingsController");
const ReadsController = require("./ReadsController");

module.exports = {
  UsersController,
  MessagesController,
  RatingsController,
  ReadsController,
};
