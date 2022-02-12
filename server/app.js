// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8079;
const morgan = require("morgan");
const express = require("express");
const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Separated Routes for each Resource
const usersRoutes = require("./routes/UsersRouter");
const messagesRoutes = require("./routes/MessagesRouter");
const ratingsRoutes = require("./routes/RatingsRouter");

// Mount all resource routes
app.use("/api/users", usersRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/ratings", ratingsRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
