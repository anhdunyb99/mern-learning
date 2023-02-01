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
  const {
    name,
    description,
    files,
    listStudent,
    user,
    courseDetail,
    idTeacher,
    code,
  } = req.body;
  console.log("req.body", req.body);
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
      idTeacher,
      code,
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
    const course = await Course.findById(req.params.id);
    res.json({ success: true, data: course });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
//get document by id
router.get("/get-document/:id", verifyToken, async (req, res) => {
  try {
    /* console.log("req.query", req.query.idCourse); */
    /* const data = await Course.findById(req.params.id); */
    /* const data = await Course.findById("63749ab637d2e5426639b915"); */
    /* const data = await Course.findOne({
      files: { $elemMatch: { _id: req.params.id } },
    }); */
    const course = await Course.findOne(
      { _id: req.query.idCourse },
      { files: { $elemMatch: { _id: req.params.id } } },
      { "files.$": 1 }
    );

    let data = course.files[0];
    /* console.log("data", data); */
    /* let file = data.files;
    console.log("file", file); */
    res.json({ success: true, data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
// edit file of course
router.put("/edit-document/:id", verifyToken, async (req, res) => {
  try {
    /* console.log(req.params.id);
    console.log(req.body); */
    const { name, contenType, url, description } = req.body;
    let updateFile = {
      name,
      contenType,
      url,
      description,
    };
    /* console.log("updateFile", updateFile); */
    const data = await Course.findOneAndUpdate(
      { "files._id": req.body._id },
      { $set: { "files.$": updateFile } }
    );
    const course = await Course.findById(req.params.id);
    /* console.log("course", course); */
    res.json({ success: true, data: course });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
//delete file
// edit file of course
router.delete("/delete-document/:id", verifyToken, async (req, res) => {
  try {
    console.log(req.params.id);
    console.log(req.query);
    const course = await Course.updateOne(
      { _id: req.query.idCourse },
      {
        $pull: {
          files: {
            _id: req.params.id,
          },
        },
      }
    );
    console.log("course", course);
    const data = await Course.findById(req.query.idCourse);
    console.log("data", data);
    res.json({ success: true, data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
// join course
router.post("/join-course/:id", verifyToken, async (req, res) => {
  try {
    const course = await Course.findOne({ code: req.body.code });
    if (course) {
      await Course.updateOne(
        { _id: course._id },
        {
          $push: {
            listStudent: req.params.id,
          },
        }
      );
    } else {
      console.log("Code khong dung");
    }
    const courseUpdate = await Course.find({ listStudent: req.params.id });

    res.json({ success: true, data: courseUpdate });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
// get course by user id
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const course = await Course.find({ listStudent: req.params.id });

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
