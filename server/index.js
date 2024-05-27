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
  // console.log("userConnected", socket.id);
  const user = socket.handshake.auth.user;

  if (user) {
    usersMap[socket.id] = user;
    io.emit("users", usersMap);
  }

  socket.on("sendMessage", ({ to, text }) => {
    console.log(`- ${usersMap[socket.id].username} send`,  `\x1b[36m"${text}"\x1b[0m`, `to ${usersMap[to].username}`);
    io.to(to).emit("newMessage", { from: socket.id, text });
  });

  socket.on("disconnect", () => {
    // console.log("userDisconnected", socket.id);
    delete usersMap[socket.id];
    socket.broadcast.emit("users", usersMap);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
