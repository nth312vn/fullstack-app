const express = require("express");
const User = require("./../models/Users");
const argon2 = require("argon2");
const authRoutes = express.Router();
const jwt = require("jsonwebtoken");
authRoutes.get("/", (req, res) => {
  res.send("hello1");
});
authRoutes.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing username or password",
    });
  }
  try {
    const haveAccount = await User.findOne({ username });
    if (haveAccount) {
      return res.status(400).json({
        success: false,
        message: "user name has already",
      });
    }
    const passwordHashed = await argon2.hash(password);
    const newUser = new User({
      username,
      password: passwordHashed,
    });
    await newUser.save();
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRETKEY
    );
    res.status(200).json({
      success: true,
      message: "user has been created",
      accessToken,
    });
  } catch (e) {
    console.log("----", e);
    return res.status(500).json({
      message: "internal server error",
    });
  }
});
authRoutes.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing username or password",
    });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user name is not exsist",
      });
    }
    const isValidPassword = await argon2.verify(user.password, password);
    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        message: "password is invalid",
      });
    }
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRETKEY
    );
    return res.status(200).json({
      success: true,
      message: "login success",
      accessToken,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "internal server error",
    });
  }
});
module.exports = authRoutes;
