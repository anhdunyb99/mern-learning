const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TestSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  courseId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  question: {
    type: Array,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("test", TestSchema);
