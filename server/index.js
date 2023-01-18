const express = require("express");
const moongose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const postRouter = require("./routes/post");
const usename = "nth3122000";
const password = "zingme1234";
const dbname = "mern-stack-app";
console.log(process.env.DB_USERNAME);
const connectDB = () => {
  try {
    moongose.connect(
      `mongodb+srv://${usename}:${password}@cluster0.ztamso2.mongodb.net/${dbname}?retryWrites=true&w=majority`,
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
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRouter);

app.listen(process.env.PORT, () => {
  console.log("connect success");
});
