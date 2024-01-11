const express = require("express");
const multer = require("multer");
const sharp = require("sharp");

const {
  createUser,
  loginUser,
  uplaodProfilePicture,
  getTokens,
} = require("../controllers/user.js");
const {
  userValidation_signup,
  userValidation_result,
  userValidation_login,
} = require("../middleware/validations/user.js");
const { isAuth } = require("../middleware/auth.js");
const User = require("../models/user.js");
const { retrieveUsers } = require("../controllers/db.js");

const router = express.Router();
const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Invalid image file!", false);
  }
};

const upload = multer({ storage, fileFilter });

router.post(
  "/sign-up",
  userValidation_signup,
  userValidation_result,
  createUser
);
router.post("/login", userValidation_login, userValidation_result, loginUser);
router.post(
  "/upload-profile-pic",
  isAuth,
  upload.single("profile"),
  uplaodProfilePicture
);
router.get("/users", isAuth, retrieveUsers);
router.post("/exchange", isAuth, getTokens);

module.exports = router;
