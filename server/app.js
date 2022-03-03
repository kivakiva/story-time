// load .env data into process.env
require("dotenv").config();

const cookieSession = require("cookie-session");

// Web server config
const SERVER_PORT = process.env.PORT || 80;
const morgan = require("morgan");
const express = require("express");

// WebSocket imports
const http = require("http");
const cors = require("cors");
const socketIO = require("socket.io");

// initial express
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "session",
    keys: ["veryImportantKey1", "veryImportantKey2"],
  })
);
app.use(express.json());

// Separated Routes for each Resource
const usersRoutes = require("./routes/UsersRouter");
const messagesRoutes = require("./routes/MessagesRouter");
const ratingsRoutes = require("./routes/RatingsRouter");
const readsRoutes = require("./routes/ReadsRouter");
const listensRoutes = require("./routes/ListensRouter");

// Mount all resource routes
app.use("/api/users", usersRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/ratings", ratingsRoutes);
app.use("/api/reads", readsRoutes);
app.use("/api/listens", listensRoutes);

// P2P chat server via Socket IO
const server = http.createServer(app);

app.use(cors());
const io = socketIO(server, {
  cors: {
    origin: `*`, // allows access from anywhere
    methods: ["GET", "POST"],
  },
});

// ON CONNECTION TO SERVER...
io.on("connection", (client) => {
  // join a room
  client.on("join_room", (room) => {
    client.join(room);
    console.log(`User with ID: ${client.id} joined room: ${room}`);
  });

  // send to all chat members (except sender)
  client.on("send_message", (data) => {
    client.to(data.room).emit("receive_message", data);
  });

  // disconnect
  client.on("disconnect", () => {
    console.log("User Disconnected", client.id);
  });
});

// because we're using WebSockets, we can replace our typical "app.listen" with the new server we created:
server.listen(SERVER_PORT, () => {
  console.log(`WebSocket listening on PORT ${SERVER_PORT}`);
});
