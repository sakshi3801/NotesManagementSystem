const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: hashedPass,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(400).json("Wrong credentials");

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("Wrong credentials");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      {expiresIn:"3s"}
    );

    const { password, ...others } = user._doc;
    res.status(200).json({...others, accessToken});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
