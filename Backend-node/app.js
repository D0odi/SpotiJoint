require("./models/database.js");
const express = require("express");
const http = require("http");
const cors = require("cors");
const userRouter = require("./routes/user.js");

const PORT = 8000;

const userSockets = {};

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("user-connected", (userId) => {
    console.log(`User ${userId} connected, socket id: ${socket.id}`);
    userSockets[userId] = socket.id;
  });

  socket.on("currently-playing", ({ songInfo, friends }) => {
    console.log(`Currently playing ${songInfo}, share to ${friends}`);
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);
  });
});

app.use(cors());
app.use(express.json());
app.use(userRouter);

app.get("/", (req, res) => {
  res.json({ success: true, message: "Welcome to my API" });
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
