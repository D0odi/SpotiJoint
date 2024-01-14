const User = require("../models/user");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const qs = require("qs");
const cloudinary = require("../helper/imageUpload");

exports.createUser = async (req, res) => {
  const { name, nickname, email, password } = req.body;
  const user = await User({
    avatar: "",
    friends: [],
    friends_req_out: [],
    friends_req_in: [],
    spotify_refresh_token: "",
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
    friends: user.friends,
    friends_req_out: user.friends_req_out,
    friends_req_in: user.friends_req_in,
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

exports.getTokens = async (req, res) => {
  const { code } = req.body;
  const user = req.user;

  console.log("User", user);
  console.log("Code", code);

  const requestBody = {
    grant_type: "authorization_code",
    code: code,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    client_id: process.env.SPOTIFY_CLIENT_ID,
    client_secret: process.env.SPOTIFY_CLIENT_SECRET,
  };

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      qs.stringify(requestBody),
      config
    );
    const { access_token, refresh_token } = response.data;

    // console.log("Access token", access_token);
    // console.log("Refresh token", refresh_token);

    const dbResponse = await User.findByIdAndUpdate(user._id, {
      spotify_refresh_token: refresh_token,
    });

    res.json({
      success: true,
      message: "Token exchange successful",
      access_token: access_token,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Token exchange failed",
      error: error.message,
    });
  }
};

exports.addFriend = async (req, res) => {
  const { _id } = req.body;
  const user = req.user;

  try {
    const outgoingUpdate = await User.findByIdAndUpdate(user._id, {
      $push: { friends_req_out: _id },
    });
    const incomingUpdate = await User.findByIdAndUpdate(_id, {
      $push: { friends_req_in: user._id.toString() },
    });
    console.log("Outgoing update", outgoingUpdate);
    console.log("Incoming update", incomingUpdate);
    res.json({
      success: true,
      message: `${user.name} added ${_id} successfully`,
    });
  } catch (error) {
    res.json({ success: false, message: "Failed to add friend" });
  }
};

exports.applyFilter = async (req, res) => {
  const users = req.users;
  const user = req.user;
  const friends = user.friends;
  const friends_req_in = user.friends_req_in;
  const friends_req_out = user.friends_req_out;

  let filteredUsers;

  if (!req.headers.filter)
    return res.json({
      success: false,
      message: "Filter type not provided",
    });

  const filterType = req.headers.filter;

  if (filterType === "search-screen") {
    filteredUsers = users.filter((dbUser) => {
      if (
        dbUser._id.toString() === user._id.toString() ||
        friends.includes(dbUser._id.toString()) ||
        friends_req_in.includes(dbUser._id.toString()) ||
        friends_req_out.includes(dbUser._id.toString())
      ) {
        return false;
      } else {
        return true;
      }
    });
  } else if (filterType === "notifications-screen") {
    filteredUsers = users.filter((dbUser) => {
      return (
        friends_req_in.includes(dbUser._id.toString()) &&
        dbUser._id.toString() !== user._id.toString()
      );
    });
  } else {
    res.json({
      success: false,
      message: "Invalid filter type",
    });
  }

  res.json({ success: true, filtered_users: filteredUsers });
};
