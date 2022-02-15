// load .env data into process.env
require("dotenv").config();

const cookieSession = require("cookie-session");

// Web server config
const PORT = process.env.PORT || 8079;
const morgan = require("morgan");
const express = require("express");

//! WebSocket - START
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
//! WebSocket - END

const app = express();

app.use(cors()); //! for WS
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

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

const server = http.createServer(app);
/** ALLOW INCOMING from Client on PORT 3000 */ 
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

/** ON CONNECTION TO SERVER */
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // JOIN A ROOM */
  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`User with ID: ${socket.id} joined room: ${room}`);
  });


  // SEND TO ALL CHAT MEMBERS (except sender) */
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  // DISCONNECT */
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

/** SERVER PORT */
server.listen(3001, () => {
  console.log("Messenger Server Running on PORT 3001");
});