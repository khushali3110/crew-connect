const express = require("express");
const TeamRequest = require("../models/TeamRequest");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const request = await TeamRequest.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Team request stored successfully",
      data: request
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
    const requests = await TeamRequest.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: requests.length,
      data: requests
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
