const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuizzSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  typeCourse: {
    type: String,
    required: true,
  },
  isStart: {
    type: Boolean,
    required: true,
  },
  difficulty: {
    type: Boolean,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  correct_answer: {
    type: String,
    required: true,
  },
  answers: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("quizz", QuizzSchema);
