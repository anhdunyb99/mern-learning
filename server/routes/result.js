const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const Result = require("../models/TestResult");
//create result
router.post("/", verifyToken, async (req, res) => {
  console.log("req.body", req.body);
  console.log("result");
  const { name, typeCourse, score, wrongAnswer, date } = req.body;
  try {
    const newResult = new Result({
      name,
      score,
      typeCourse,
      wrongAnswer,
      date,
    });
    await newResult.save();
    res.json({
      success: true,
      message: "Create result successfully",
      result: newResult,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//get quizz result
router.get("/:id", verifyToken, async (req, res) => {
  try {
    
    const result = await Result.findById(req.params.id);
    console.log('result',result);
    res.json({ success: true ,result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
module.exports = router;
