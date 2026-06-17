const express = require("express");
const Application = require("../models/Application");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const application = await Application.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Application stored successfully",
      data: application
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

router.get("/", async (_req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
