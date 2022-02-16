const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const CLIENT_PORT = 3000;

const webSocketComponent = (app) => {
  app.use(cors());

  const server = http.createServer(app);

  // ALLOW INCOMING from Client PORT
  const io = new Server(server, {
    cors: {
      origin: `http://localhost:${CLIENT_PORT}`,
      methods: ["GET", "POST"],
    },
  });

  // ON CONNECTION TO SERVER...
  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    // join a room
    socket.on("join_room", (room) => {
      socket.join(room);
      console.log(`User with ID: ${socket.id} joined room: ${room}`);
    });

    // send to all chat members (except sender)
    socket.on("send_message", (data) => {
      socket.to(data.room).emit("receive_message", data);
    });

    // disconnect
    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });

  // SERVER port
  server.listen(3001, () => {
    console.log("Messenger Server Running on PORT 3001");
  });
};

module.exports = { webSocketComponent };
