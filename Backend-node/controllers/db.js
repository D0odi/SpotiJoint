const User = require("../models/user");

exports.retrieveUsers = async (req, res) => {
  try {
    const searchQuery = req.query.search;

    let query = {};
    if (searchQuery) {
      query = {
        $or: [
          { name: { $regex: searchQuery, $options: "i" } },
          { nickname: { $regex: searchQuery, $options: "i" } },
        ],
      };
    }
    const users = await User.find(query).select("name nickname avatar");

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
