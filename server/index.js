const express = require("express");
const moongose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./routes/auth");

const dbname = "mern-stack-app";
const connectDB = () => {
  try {
    moongose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ztamso2.mongodb.net/${dbname}?retryWrites=true&w=majority`,
      {
        // useCreateIndex: true,
        useNewUrlParser: true,
        // useFindAndModify: false,
        useUnifiedTopology: true,
      }
    );
    console.log("connect success");
  } catch (error) {
    console.log("connect err", error);
    process.exit(1);
  }
};
connectDB();
const app = express();
app.get("/", (req, res) => {
  return res.send("hello");
});
app.use("/api/auth", authRoutes);
app.listen(5000, () => {
  console.log("connect success");
});
