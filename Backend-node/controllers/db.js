const User = require("../models/user");

exports.retrieveUsers = async (req, res) => {
  try {
    const users = await User.find({});

    if (!users) return res.json({ success: false, message: "No users found!" });
    else
      res.json({
        success: true,
        message: "Users retrieved successfully",
        data: users,
      });
  } catch (error) {
    console.log("Error while retrieving users!", error.message);
    res.json({ success: false, message: "Error while retrieving users!" });
  }
};
