const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const Course = require("../models/Courses");

// get all course
router.get("/", verifyToken, async (req, res) => {
  try {
    const course = await Course.find();
    res.json({ success: true, course });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// create course
router.post("/", verifyToken, async (req, res) => {
  const { name, description, files, listStudent, user, courseDetail } =
    req.body;
  /* console.log("req.body", req.body); */
  /* let thumbnail =
    "http://localhost:5000/uploads/" + thumbnails.replace("C:\\fakepath\\", ""); */
  //simple vadilation
  /* console.log("thumbnail", thumbnail); */
  if (!name)
    return res.status(400).json({ success: false, message: "Name is missing" });
  try {
    const newCourse = new Course({
      name,
      description,
      files,
      listStudent,
      user,
      courseDetail,
    });
    await newCourse.save();
    console.log("newCourse", newCourse);
    res.json({
      success: true,
      message: "Create course successfully",
      course: newCourse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//delete course
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const courseDeleteCondition = { _id: req.params.id };
    const deletedCourse = await Course.findOneAndDelete(courseDeleteCondition);
    
    // User not authorised or post not found
    if (!deletedCourse)
      return res.status(401).json({
        success: false,
        message: "Course not found or user not authorised",
      });

    res.json({ success: true, course: deletedCourse });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
// get course by id
router.get("/get-course/:id", verifyToken, async (req, res) => {
  try {
    console.log(req.params.id);
    const course = await Course.findById(req.params.id);
    res.json({ success: true, data: course });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
// update course
router.put("/:id", verifyToken, async (req, res) => {
  const { name, description, files, listStudent } = req.body;
  /* console.log("req.body", req.body.thumbnail);
  console.log(
    'req.body.thumbnail.indexOf("fakepath")',
    req.body.thumbnail.indexOf("fakepath")
  ); */
  if (req.body.thumbnail && req.body.thumbnail.indexOf("fakepath") != -1) {
    var thumbnails =
      "http://localhost:5000/uploads/" +
      req.body.thumbnail.replace("C:\\fakepath\\", "");
    console.log("1");
  }

  //simple vadilation
  if (thumbnails) {
    var thumbnail = thumbnails;
  }

  if (!name)
    return res
      .status(400)
      .json({ success: false, message: "Course is missing" });

  try {
    let updateCourse = {
      name,
      description,
      files,
      thumbnail,
      listStudent,
    };
    const condition = {
      _id: req.params.id,
    };

    updateCourse = await Course.findOneAndUpdate(condition, updateCourse, {
      new: true,
    });

    // user not authorized
    if (!updateCourse) {
      return res
        .status(400)
        .json({ success: false, message: "Course not found" });
    }
    res.json({ success: true, message: "PUT SUCCES", course: updateCourse });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
