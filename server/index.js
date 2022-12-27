require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");
const courseRouter = require("./routes/courses");
const quizzRouter = require("./routes/quizz");
const userRouter = require("./routes/users");
const resultRouter = require("./routes/result");
const PORT = 5000;
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

//New imports

const io = new Server({
  cors: true,
});

io.on("connection", (socket) => {
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("callUser", { signal: signalData, from, name });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
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
app.use(express.json());

app.get("/", (req, res) => res.send("Hello world"));

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/courses", courseRouter);
app.use("/api/users", userRouter);
app.use("/api/quizz", quizzRouter);
app.use("/api/result", resultRouter);
app.use("/uploads", express.static("./uploads"));

app.listen(PORT, () => console.log(`Server start on ${PORT}`));
io.listen(5001);

