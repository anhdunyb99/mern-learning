const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  idCourse: {
    type: String,
    required: true,
  },
  idTeacher: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("notification", NotificationSchema);
