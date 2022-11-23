require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");
const courseRouter = require("./routes/courses");
const userRouter = require("./routes/users");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
const io = new Server({
  cors: true,
});

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://anhdungyb99:ngunguyet608@cluster0.frfis4c.mongodb.net/?retryWrites=true&w=majority`,
      {
        //useCreateIndex : true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useFindAndModify : false
      }
    );
    console.log("MongoDb connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
const emailToSocketMapping = new Map();
const socketToEmailMapping = new Map();
io.on("connection", (socket) => {
  console.log("New Connection");
  socket.on("join-room", (data) => {
    const { roomId, emailId } = data;
    console.log("User", emailId, "Joined Room", roomId);
    emailToSocketMapping.set(emailId, socket.id);
    socketToEmailMapping.set(socket.id, emailId);
    socket.join(roomId);
    socket.emit("joined-room", { roomId });
    socket.broadcast.to(roomId).emit("user-joined", { emailId });
  });

  socket.on("call-user", (data) => {
    const { emailId, offer } = data;
    const fromEmail = socketToEmailMapping.get(socket.id);
    const socketId = emailToSocketMapping.get(emailId);
    socket.to(socketId).emit("incomming-call", { from: fromEmail, offer });
  });

  socket.on("call-accepted", (data) => {
    const { emailId, ans } = data;
    const socketId = emailToSocketMapping.get(emailId);
    socket.to(socketId).emit("call-accepted", { ans });
  });
});
app.get("/", (req, res) => res.send("Hello world"));

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/courses", courseRouter);
app.use("/api/users", userRouter);
app.use("/uploads", express.static("./uploads"));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server start on ${PORT}`));
io.listen(5001);
