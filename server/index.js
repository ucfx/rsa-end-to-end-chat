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
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
