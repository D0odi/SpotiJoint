const User = require("../models/user");

exports.retrieveUsers = async (req, res, next) => {
  try {
    let users = null;
    if (req.query.search) {
      const searchQuery = req.query.search;

      let query = {};
      if (searchQuery) {
        query = { username: { $regex: searchQuery, $options: "i" } };
      }
      users = await User.find(query).select(
        "username avatar friends_req_in friends_req_out friends"
      );
    } else {
      users = await User.find().select("username avatar");
    }

    if (!users) return res.json({ success: false, message: "No users found!" });
    else req.users = users;
    next();
  } catch (error) {
    console.log("Error while retrieving users!", error.message);
    res.json({ success: false, message: "Error while retrieving users!" });
  }
};
