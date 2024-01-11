const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  avatar: String,
  friends: Array,
  spotify_refresh_token: String,
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  nickname: {
    type: String,
    required: false,
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    minLength: 4,
  },
});

userSchema.methods.comparePassword = async function (password) {
  if (!password) throw new Error("Password is missing");
  try {
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    console.log("Error while comparing passwords!", error.message);
  }
};

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt.hash(this.password, 8, (err, hash) => {
      if (err) return next(err);

      this.password = hash;
      next();
    });
  }
});

module.exports = mongoose.model("User", userSchema);
