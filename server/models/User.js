const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
    },  
    lname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    starredFiles: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);