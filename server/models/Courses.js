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
      description: {
        type: String,
        default: "description",
      },
    },
  ],
  thumbnail: {
    type: String,
    require: true,
  },
  listStudent: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  user: {
    //người tạo
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  courseDetail: {
    type: String,
  },
  idTeacher: {
    type: String,
  },
  code: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("courses", CourseSchema);
