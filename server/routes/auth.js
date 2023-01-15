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
    const newUser = {
      username,
      password: passwordHashed,
    };
    await newUser.save();
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRETKEY
    );
  } catch (e) {
    console.log("----", e);
  }
});
module.exports = authRoutes;
