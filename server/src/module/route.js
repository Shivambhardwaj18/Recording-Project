const express = require("express");
const router = express.Router();
const multer = require("multer");

const controller = require("./route.controller");

// Set up Multer storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Assuming you have a folder named 'uploads' to store the voice recordings
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Define routes
router.post(
  "/save",
  upload.single("voiceRecording"),
  controller.createCallRecord
);
router.get("/fetch", controller.getCallRecords);

module.exports = router;
