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
  console.log(email);
  console.log(password);
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

    const updateddUser = await User.findByIdAndUpdate(user._id, {
      avatar: result.url,
    });

    console.log(updateddUser);

    res.status(201).json({
      success: true,
      message: "Profile avatar uploaded successfully",
      user: updateddUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error, try after some time" });
  }
};

exports.getTokens = async (req, res) => {
  const { code } = req.params;
  const user = req.user;

  console.log("Get tokens - code: ", code);

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

    console.log("Get tokens - Access Token: ", access_token);
    console.log("Get tokens - Refresh Token: ", refresh_token);

    const dbResponse = await User.findByIdAndUpdate(user._id, {
      spotify_refresh_token: refresh_token,
    });

    console.log("Get tokens - DB Response: ", dbResponse);

    res.json({
      success: true,
      message: "Exchange route",
      access_token: access_token,
    });
  } catch (error) {
    console.error(error.response.data);
    console.log("Get tokens - Error: ", error.message);
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
  } else if (filterType === "home-screen") {
    filteredUsers = users.filter((dbUser) => {
      return (
        friends.includes(dbUser._id.toString()) &&
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

exports.respondToRequest = async (req, res) => {
  const user = req.user;
  const { _id } = user;
  const user_id_str = _id.toString();
  const { action, req_user_id } = req.body;

  // console.log(`_id: ${_id}`);
  // console.log(`req_user_id: ${req_user_id}`);

  if (!action)
    return res.json({
      success: false,
      message: "Action not provided",
    });

  try {
    await User.findByIdAndUpdate(user_id_str, {
      $pull: { friends_req_in: req_user_id },
    });
    await User.findByIdAndUpdate(req_user_id, {
      $pull: { friends_req_out: user_id_str },
    });

    if (action === "accept") {
      await User.findByIdAndUpdate(user_id_str, {
        $push: { friends: req_user_id },
      });
      await User.findByIdAndUpdate(req_user_id, {
        $push: { friends: user_id_str },
      });
    } else if (action === "decline") {
    }
    res.json({ success: true, message: "Friend request responded" });
  } catch (error) {
    res.json({
      success: false,
      message: "Failed to respond to friend request",
      error: error.message,
    });
  }
};
