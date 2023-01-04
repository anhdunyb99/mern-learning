const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const User = require("../models/User");
const Course = require("../models/Courses");
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
// get all teacher
router.get("/teacher", verifyToken, async (req, res) => {
  try {
    const teacher = await User.find({ role: "TEACHER" });

    res.json({ success: true, teacher });
  } catch (error) {}
});
//get student by id
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const student = await User.findById(req.params.id);
    res.json({ success: true, student: student });
  } catch (error) {}
});
//update student infomation
router.put("/:id", verifyToken, async (req, res) => {
  const { username, password, email, fullName, role } = req.body;
  try {
    const checkName = await User.findOne({username})
    if(checkName){
      return res
        .status(400)
        .json({ success: false, message: "Username has already exist"});
    }
    let updateStudent = {
      username,
      password,
      email,
      fullName,
      role,
    };
    const condition = {
      _id: req.params.id,
    };
    data = await User.findOneAndUpdate(condition, updateStudent, {
      new: true,
    });
    console.log("data", data);
    res.json({ success: true, data: data });
  } catch (error) {}
});
// delete
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const condition = { _id: req.params.id };
    console.log("condition", condition);
    const deleteStudent = await User.findOneAndDelete(condition);
    
    res.json({ success: true , data : deleteStudent});
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
//select student to course
router.post("/:id", verifyToken, async (req, res) => {
  try {
    let updateStudent = {
      listStudent: [],
    };
    const condition = {
      _id: req.params.id,
    };
    if (req.body && req.params) {
      req.body.map((x) => {
        updateStudent.listStudent.push(x.value);
        console.log(x.value);
      });
    }
    console.log("updateStudent", updateStudent);
    /* const  data = await Course.findOneAndUpdate(condition, updateStudent, {
      new: true
    });
    console.log('data',data); */
    await Course.updateOne(
      { _id: req.params.id },
      {
        $push: {
          listStudent: updateStudent.listStudent,
        },
      }
    );
    const data = await Course.findById(req.params.id);
    console.log("data", data);
    res.json({ success: true, data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
