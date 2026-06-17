const mongoose = require("mongoose");

const lettersOnly = /^[a-zA-Z\s]+$/;

const joinTeamRequestSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator(value) {
          return lettersOnly.test(value);
        },
        message: "First name must contain letters only"
      }
    },
    yearsExperience: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator(value) {
          const years = Number(value);
          return Number.isFinite(years) && years >= 0 && years <= 15;
        },
        message: "Years experience must be between 0 and 15"
      }
    },
    city: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator(value) {
          return lettersOnly.test(value);
        },
        message: "City must contain letters only"
      }
    },
    pincode: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator(value) {
          return /^\d{6,7}$/.test(value);
        },
        message: "Pincode must be 6 or 7 digits"
      }
    },
    photoFileName: {
      type: String,
      trim: true
    },
    cvFileName: {
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

module.exports = mongoose.model("JoinTeamRequest", joinTeamRequestSchema);
