const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const User = require("../models/User");
const Course = require('../models/Courses')
//
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.find();
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// get all student
router.get("/student", verifyToken, async (req, res) => {
  try {
    const student = await User.find({ role: "STUDENT" });
    
    res.json({ success: true, student });
  } catch (error) {}
});

//select student to course
router.post("/:id", verifyToken, async (req, res) => {
  try {
    console.log("req.body", req.body);
    console.log('req.params',req.params);
    let updateStudent = {
      listStudent : []
    }
    const  condition = {
      _id : req.params.id
    }
    if(req.body && req.params){
      req.body.map((x) => {
        updateStudent.listStudent.push(x.value)
        console.log(x.value);
      })
    }
    console.log('updateStudent',updateStudent);
    const  data = await Course.findOneAndUpdate(condition, updateStudent, {
      new: true
    });
    console.log('data',data);
    res.json({ success: true , data : data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
