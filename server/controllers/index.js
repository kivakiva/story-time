// require and export all controllers
const UsersController = require("./UsersController");
const MessagesController = require("./MessagesController");
const RatingsController = require("./RatingsController");
const ReadsController = require("./ReadsController");
const ListensController = require("./ListensController");

module.exports = {
  UsersController,
  MessagesController,
  RatingsController,
  ReadsController,
  ListensController,
};
