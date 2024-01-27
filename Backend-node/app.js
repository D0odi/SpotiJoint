require("./models/database.js");
const express = require("express");
const http = require("http");
const cors = require("cors");
const userRouter = require("./routes/user.js");

const PORT = 8000;

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`Socket ${socket.id} connected`);

  socket.on("currently-playing", (data, socket_id, user_id) => {
    console.log(data);
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
