const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.isAuth = async (req, res, next) => {
  console.log(req.headers);
  if (req.headers && req.headers.auth) {
    const token = req.headers.auth.split(" ")[1];
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decode.userId);

      if (!user) {
        res.json({ success: false, message: "Unauthorized access" });
      }

      req.user = user;
      next();
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        res.json({
          success: false,
          message: "Unauthorized access",
          error: error.message,
        });
      }
      if (error.name === "TokenExpiredError") {
        res.json({
          success: false,
          message: "Token expired, try to login again",
        });
      }

      res.json({ success: false, message: "Unauthorized access 3" });
    }
  } else {
    res.json({ success: false, message: "Unauthorized access 4" });
  }
};
