const { Server } = require("socket.io");
const http = require("http");

const server = http.createServer();
const port = process.env.PORT || 5000;

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

const usersMap = {};

io.on("connection", async (socket) => {
  console.log("userConnected", socket.id);
  const user = socket.handshake.auth.user;

  if (user) {
    usersMap[socket.id] = user;
    socket.broadcast.emit("users", usersMap);
  }

  socket.on("sendMessage", (msg) => {
    console.log("message", msg);
    io.to(msg.to).emit("newMessage", msg.text);
  });

  socket.on("disconnect", () => {
    console.log("userDisconnected", socket.id);
    delete usersMap[socket.id];
    socket.broadcast.emit("users", usersMap);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
