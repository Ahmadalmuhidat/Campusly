const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  ID: {
    type: String,
    unique: true,
    required: true,
    default: function () { return uuidv4(); }
  },
  Name: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    unique: true,
    required: true
  },
  Password: {
    type: String,
    required: true
  },
  StudentID: {
    type: String,
    unique: true,
    required: true
  },
  Bio: {
    type: String,
    default: ""
  },
  Phone_Number: {
    type: String,
    default: ""
  },
  Photo: {
    type: String,
    default: ""
  },
  CreatedAt: {
    type: Date,
    default: Date.now
  },

  Society_Count: {
    type: Number,
    default: 0
  },
  Event_Count: {
    type: Number,
    default: 0
  },
  Post_Count: {
    type: Number,
    default: 0
  },

  Notifications: {
    emailNotifications: {
      type: Boolean,
      default: true
    }, // not used yet
    societyUpdates: {
      type: Boolean,
      default: true
    }, // not used yet
  },

  Privacy: {
    profileVisibility: {
      type: String,
      enum: ["public", "members", "private"],
      default: "public"
    }, // not used yet
    showEmail: {
      type: Boolean,
      default: false
    }, // not used yet
    showPhone: {
      type: Boolean,
      default: false
    }, // not used yet
  },
});

module.exports = mongoose.model("User", userSchema);