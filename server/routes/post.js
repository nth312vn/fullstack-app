const express = require("express");
const verifyToken = require("../middleware/auth");
const Posts = require("../models/Posts");
const postRouter = express.Router();

postRouter.post("/add", verifyToken, async (req, res) => {
  const { title, description, status, url } = req.body;
  if (!title || !description || !status) {
    return res.status(400).json({
      success: false,
      message: "Missing parameter",
    });
  }
  try {
    const newPost = new Posts({
      title,
      description,
      status: status || "TO LEARN",
      url: url.startsWith("https://") || `https://${url}`,
      user: req.userId,
    });
    await newPost.save();
    return res.status(200).json({
      success: true,
      message: "create post success",
      post: newPost,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "internal server error",
    });
  }
});
postRouter.get("/get", verifyToken, async (req, res) => {
  try {
    const posts = await Posts.find({ user: req.userId }).populate("user", [
      "username",
    ]);
    return res.status(200).json({
      success: true,
      message: "get posts success",
      posts,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "internal server error",
    });
  }
});
postRouter.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const conditionDelete = {
      _id: req.params.id,
      user: req.userId,
    };
    const deletePost = await Posts.findOneAndDelete(conditionDelete);
    if (!deletePost) {
      return res.status(401).json({
        success: false,
        message: "delete error",
      });
    }
    return res.status(200).json({
      success: true,
      message: "delete success",
      post: deletePost,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "internal server error",
    });
  }
});
postRouter.put("/update/:id", verifyToken, async (req, res) => {
  console.log("update");
  const { title, description, status, url } = req.body;
  if (!title) {
    return res.status(400).json({
      success: false,
      message: "Missing parameter",
    });
  }
  try {
    let postUpdate = {
      title,
      description,
      status: status || "TO LEARN",
      url: url.startsWith("https://") || `https://${url}`,
      user: req.userId,
    };
    const conditionUpdate = { _id: req.params.id, user: req.userId };
    postUpdate = await Posts.findOneAndUpdate(conditionUpdate, postUpdate, {
      new: true,
    });
    if (!postUpdate) {
      return res.status(401).json({
        success: false,
        message: "update error",
      });
    }

    return res.status(200).json({
      success: true,
      message: "update success",
      post: postUpdate,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "internal server error",
    });
  }
});
module.exports = postRouter;
