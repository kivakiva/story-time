// load .env data into process.env
require("dotenv").config();
const cors = require("cors");

const cookieSession = require("cookie-session");

// Web server config
const PORT = process.env.PORT || 80;
const morgan = require("morgan");
const express = require("express");

// P2P server
// const { webSocketComponent } = require("./webSocketComponent");

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

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

// P2P chat server
// webSocketComponent(app);

const server = require("http").createServer(app);
app.use(cors());
const io = require("socket.io")(server, {
  cors: {
    origin: `*`,
    methods: ["GET", "POST"],
  },
});
io.on("connection", (client) => {
  // client.on("event", (data) => {
  //   /* … */
  // });

  client.on("join_room", (room) => {
    client.join(room);
    console.log(`User with ID: ${client.id} joined room: ${room}`);
  });

  // send to all chat members (except sender)
  client.on("send_message", (data) => {
    client.to(data.room).emit("receive_message", data);
  });

  client.on("disconnect", () => {
    /* … */
  });
});
server.listen(3001, () => {
  console.log("WebSocket listening on PORT 3001");
});

// const CLIENT_PORT = process.env.PORT || 3000;
// const WEB_SOCKET_PORT = process.env.PORT || 3001;

// const webSocketComponent = (app) => {
//   app.use(cors());

//   const server = http.createServer(app);

//   // ALLOW INCOMING from Client PORT
//   const io = new Server(server, {
//     cors: {
//       origin: `http://localhost:${CLIENT_PORT}`,
//       methods: ["GET", "POST"],
//     },
//   });

//   // ON CONNECTION TO SERVER...
//   io.on("connection", (socket) => {
//     console.log(`User Connected: ${socket.id}`);

//     // join a room
//     socket.on("join_room", (room) => {
//       socket.join(room);
//       console.log(`User with ID: ${socket.id} joined room: ${room}`);
//     });

//     // send to all chat members (except sender)
//     socket.on("send_message", (data) => {
//       socket.to(data.room).emit("receive_message", data);
//     });

//     // disconnect
//     socket.on("disconnect", () => {
//       console.log("User Disconnected", socket.id);
//     });
//   });

//   // SERVER port
//   server.listen(WEB_SOCKET_PORT, () => {
//     console.log(`Messenger Server Running on PORT ${WEB_SOCKET_PORT}`);
//   });
// };
