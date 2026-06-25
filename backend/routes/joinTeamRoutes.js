const express = require("express");
const JoinTeamRequest = require("../models/JoinTeamRequest");

const router = express.Router();

function sendStoredFile(res, request, type) {
  const fileName = request[`${type}FileName`];
  const contentType = request[`${type}ContentType`] || "application/octet-stream";
  const data = request[`${type}Data`];

  if (!fileName || !data) {
    return res.status(404).json({
      success: false,
      message: "File not found"
    });
  }

  const safeFileName = fileName.replace(/["\r\n]/g, "");
  const disposition = contentType.startsWith("image/") || contentType === "application/pdf" ? "inline" : "attachment";

  res.setHeader("Content-Type", contentType);
  res.setHeader("Content-Disposition", `${disposition}; filename="${safeFileName}"`);
  return res.send(Buffer.from(data, "base64"));
}

router.post("/", async (req, res) => {
  try {
    const request = await JoinTeamRequest.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Join team request stored successfully",
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
    const requests = await JoinTeamRequest.find().sort({ createdAt: -1 });

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

router.get("/:id/photo", async (req, res) => {
  try {
    const request = await JoinTeamRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Join team request not found"
      });
    }

    return sendStoredFile(res, request, "photo");
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.get("/:id/cv", async (req, res) => {
  try {
    const request = await JoinTeamRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Join team request not found"
      });
    }

    return sendStoredFile(res, request, "cv");
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
