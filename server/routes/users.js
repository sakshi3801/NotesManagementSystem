const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { verifyToken } = require("./verifyToken");
//Update

router.put("/star/:id",  async (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  // console.log(req.user.id);
  // if (req.user.id === req.params.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        {_id: req.params.id},
        {
          $push: { starredFiles: req.body.fileId },
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
      console.log(req.body.fileId + "is starred");
    } catch (err) {
      res.status(500).json(err);
    }
  // } else {
  //   res.status(401).json("You are not authenticated");
  // }
});

router.put("/unstar/:id",  async (req, res) => {
  // if (req.user.id === req.params.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $pull: { starredFiles: req.body.fileId },
        },
        { new: true }
      );
      console.log(req.body.fileId + "is unstarred");
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  // } else {
  //   res.status(401).json("You are not authenticated");
  // }
});

router.get("/:id", async (req, res) => {
  // if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      const user = await User.findById(req.params.id);
      res.send(user);
    } catch (err) {
      res.status(500).json(err);
    }
  // } else {
  //   res.status(403).json("You can delete only your account!");
  // }
});

//Delete
router.delete("/:id", verifyToken, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can delete only your account!");
  }
});

// router.put("/:id", verifyToken, async (req, res) => {
//   if (req.user.id === req.params.id || req.user.isAdmin) {
//     if (req.body.password) {
//       const salt = await bcrypt.genSalt(10);
//       req.body.password = await bcrypt.hash(req.body.password, salt);
//     }
//     try {
//       const updatedUser = await User.findByIdAndUpdate(
//         req.params.id,
//         {
//           $set: req.body,
//         },
//         { new: true }
//       );
//       res.status(200).json(updatedUser);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   } else {
//     res.status(401).json("You can update only your account!");
//   }
// });

module.exports = router;