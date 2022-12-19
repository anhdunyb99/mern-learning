const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const Quizz = require("../models/Quizz");

// create course
router.post("/", verifyToken, async (req, res) => {
  /* console.log("req.body", req.body); */
  const {
    category,
    typeCourse,
    isStart,
    difficulty,
    question,
    correct_answer,
    answers,
  } = req.body;
  try {
    const newQuizz = new Quizz({
      category,
      typeCourse,
      isStart,
      difficulty,
      question,
      correct_answer,
      answers,
    });
    await newQuizz.save();
    res.json({
      success: true,
      message: "Create course successfully",
      quizz: newQuizz,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//get all quizz
router.get("/:id", verifyToken, async (req, res) => {
  try {
    /* console.log(req.params.id); */
    const quizz = await Quizz.find({ typeCourse: req.params.id });
    
    res.json({ success: true, quizz });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
