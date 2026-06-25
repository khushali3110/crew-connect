const mongoose = require("mongoose");

const lettersOnly = /^[a-zA-Z\s]+$/;
const numbersOnly = /^\d+$/;

const teamRequestSchema = new mongoose.Schema(
  {
    gender: {
      type: String,
      enum: ["Male", "Female", "Any"],
      required: true,
      trim: true
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator(value) {
          return lettersOnly.test(value);
        },
        message: "Company name must contain letters only"
      }
    },
    personName: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator(value) {
          return lettersOnly.test(value);
        },
        message: "Person name must contain letters only"
      }
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator(value) {
          return /^\d{10,12}$/.test(value);
        },
        message: "Phone number must be 10 to 12 digits"
      }
    },
    location: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator(value) {
          return lettersOnly.test(value);
        },
        message: "Location must contain letters only"
      }
    },
    eventDate: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator(value) {
          return /^\d{4}-\d{2}-\d{2}$/.test(value);
        },
        message: "Event date must use a 4 digit year"
      }
    },
    personsRequired: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator(value) {
          return numbersOnly.test(value);
        },
        message: "Persons required must contain numbers only"
      }
    },
    eventType: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator(value) {
          return lettersOnly.test(value);
        },
        message: "Event type must contain letters only"
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
    pageUrl: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("TeamRequest", teamRequestSchema);
