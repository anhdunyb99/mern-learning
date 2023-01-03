const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const Notification = require("../models/Notifications");
router.post("/", verifyToken, async (req, res) => {
  console.log("req.body", req.body);
  const { title, description, idCourse, idTeacher } = req.body;
  try {
    const newNotification = new Notification({
      title,
      description,
      idCourse,
      idTeacher,
    });
    await newNotification.save();
    res.json({
      success: true,
      message: "Create result successfully",
      data: newNotification,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//get all notification
router.get("/", verifyToken, async (req, res) => {
  try {
    console.log("123");
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
//get course notification
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const notifications = await Notification.find({ idCourse: req.params.id });
    res.json({ success: true, data: notifications });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
module.exports = router;
