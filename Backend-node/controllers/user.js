const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
    const {name, nickname, email, password} = req.body;
    const user = await User({
        avatar: '',
        name,
        nickname,
        email,
        password
    })
    try {
        await user.save();
        res.json({success: true, message: "User created successfully", data: user})
    } catch {
        res.json({success: false, message: "Email already exists, try to sign-in"})
    }
}

exports.loginUser = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email: email});

    if (!user) return res.json({success: false, message: "Email not found"});

    const result = await user.comparePassword(password);
    if (!result) return res.json({success: false, message: "Password is incorrect"});

    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'})

    res.json({success: true, message: "User logged in successfully", token: token})
}