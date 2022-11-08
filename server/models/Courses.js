const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  files: [
    {
      // Các file đi kèm comments
      name: {
        type: String,
      },
      contenType: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  thumbnail: {
    type: String,
    require: true,
  },
  listStudent: [
    {
      // Các file đi kèm comments
      student: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    },
  ],
  user: {
    //người tạo
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("courses", CourseSchema);
