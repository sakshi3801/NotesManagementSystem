const path = require("path");
const express = require("express");
const multer = require("multer");
const File = require("../models/File");
const Router = express.Router();
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "./files");
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 1000000, // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
      return cb(
        new Error(
          "only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format."
        )
      );
    }
    cb(undefined, true); // continue with upload
  },
});

Router.post(
  "/upload",
  upload.single("file"),
  async (req, res) => {
    try {
      const { title, fileName, subjectName, userName, userId } = req.body;
      const { path, mimetype } = req.file;
      const file = new File({
        title,
        fileName,
        subjectName,
        userName,
        userId,
        file_path: path,
        file_mimetype: mimetype,
      });
      await file.save();
      res.send("file uploaded successfully.");
    } catch (error) {
      res.status(400).send("Error while uploading file. Try again later.");
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);

Router.delete("/delete/:id", async (req, res) => {
  try {
    const file = await File.findByIdAndDelete({ _id: req.params.id });
    await unlinkAsync(file.file_path);
    console.log("File deleted successfully");
  } catch (err) {
    res.status(400).send(err);
  }
});

Router.get("/download/:id", async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    res.set({
      "Content-Type": file.file_mimetype,
    });
    res.sendFile(path.join(__dirname, "..", file.file_path));
  } catch (error) {
    res.status(400).send("Error while downloading file. Try again later.");
  }
});

Router.get("/:subjectName", async (req, res) => {
  try {
    const files = await File.find({ subjectName: req.params.subjectName });
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send("Error while getting list of files. Try again later.");
  }
});

Router.get("/byUserId/:userId", async (req, res) => {
  try {
    const files = await File.find({ userId: req.params.userId });
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send("Error while getting list of files. Try again later.");
  }
});

Router.get("/starred/:id", async (req, res) => {
  try {
    const file = await File.find({ _id: req.params.id });
    
    res.send(file);
  } catch (error) {
    res.status(400).send("Error while getting list of files. Try again later.");
  }
});

Router.put("/star/:fileId", async (req, res) => {
  try {
    const updatedFile = await File.findByIdAndUpdate(
      { _id: req.params.fileId },
      {
        $push: { likedBy: req.body.userId },
      },
      { new: true }
    );
    res.status(200).json(updatedFile);
    console.log(req.body.userId + " starred " + req.params.fileId);
  } catch (err) {
    console.log(err);
  }
});

Router.put("/unstar/:fileId", async (req, res) => {
  try {
    const updatedFile = await File.findByIdAndUpdate(
      { _id: req.params.fileId },
      {
        $pull: { likedBy: req.body.userId },
      },
      { new: true }
    );
    res.status(200).json(updatedFile);
    console.log(req.body.userId + " unstarred " + req.params.fileId);
  } catch (err) {
    console.log(err);
  }
});

module.exports = Router;