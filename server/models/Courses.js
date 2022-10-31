const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("courses", CourseSchema);
