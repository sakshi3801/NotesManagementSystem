const mongoose = require("mongoose");

const fileSchema = mongoose.Schema(
  {
    // title: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },
    // description: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },
    title: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userId:{
      type: String,
      required: true,
    },
    subjectName: {
      type: String,
      required: true,
    },
    likedBy: {
      type: Array,
      default: [],
    },
    file_path: {
      type: String,
      required: true,
    },
    file_mimetype: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const File = mongoose.model("File", fileSchema);

module.exports = File;