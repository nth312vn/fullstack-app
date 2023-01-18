const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const tokenHeader = req.header("Authorization");
  const token = tokenHeader && tokenHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token is not found",
    });
  }
  const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRETKEY);
  req.userId = decode.userId;
  next();
  try {
  } catch (e) {
    console.log(e);
    res.status(403).json({
      message: "invalid token",
    });
  }
};
module.exports = verifyToken;
