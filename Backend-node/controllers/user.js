const User = require("../models/user");
const jwt = require("jsonwebtoken");
const cloudinary = require("../helper/imageUpload");

exports.createUser = async (req, res) => {
  const { name, nickname, email, password } = req.body;
  const user = await User({
    avatar: "",
    name,
    nickname,
    email,
    password,
  });
  try {
    await user.save();
    res.json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch {
    res.json({
      success: false,
      message: "Email already exists, try to sign-in",
    });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (!user) return res.json({ success: false, message: "Email not found" });

  const result = await user.comparePassword(password);
  if (!result)
    return res.json({ success: false, message: "Password is incorrect" });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  const userInfo = {
    name: user.name,
    email: user.email,
    avatar: user.avatar ? user.avatar : "",
    nickname: user.nickname,
    _id: user._id,
  };

  res.json({
    success: true,
    message: "User logged in successfully",
    user: userInfo,
    token: token,
  });
};

exports.uplaodProfilePicture = async (req, res) => {
  const { user } = req;
  if (!user)
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized access" });

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      public_id: `${user._id}_profile_pic`,
      width: 500,
      height: 500,
      crop: "fill",
    });

    await User.findByIdAndUpdate(user._id, { avatar: result.url });
    res
      .status(201)
      .json({ success: true, message: "Profile avatar uploaded successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error, try after some time" });
    console.log("Error while uploading profile avatar", error.message);
  }
};

exports.followUser = async (req, res) => {
  const { target_email } = req.body;
};
