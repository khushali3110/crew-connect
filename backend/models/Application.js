const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    source: {
      type: String,
      default: "event-application",
      trim: true
    },
    eventTitle: {
      type: String,
      trim: true
    },
    eventSlug: {
      type: String,
      trim: true
    },
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    role: {
      type: String,
      required: true,
      trim: true
    },
    portfolioUrl: {
      type: String,
      trim: true
    },
    intro: {
      type: String,
      trim: true
    },
    pageUrl: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Application", applicationSchema);
