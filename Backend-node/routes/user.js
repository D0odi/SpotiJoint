const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const { createUser, loginUser } = require('../controllers/user.js');
const { userValidation_signup, userValidation_result, userValidation_login } = require('../middleware/validations/user.js');
const { isAuth } = require('../middleware/auth.js');
const User = require('../models/user.js');

const router = express.Router();
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb("Invalid image file!", false);
    }
}

const upload = multer({storage, fileFilter});

router.post('/signup', userValidation_signup, userValidation_result, createUser);
router.post('/login', userValidation_login, userValidation_result, loginUser)
router.post('/upload-profile', isAuth, upload.single('profile'), async (req, res) => {
    const user = req;
    if (!user) return res.status(401).json({success: false, message: "Unauthorized access"});

    try {
        const profileBuffer = req.file.buffer;
        const {height, width} = await sharp(profileBuffer).metadata();
        const avatar = await sharp(profileBuffer).resize({height: Math.round(height * 0.5), width: Math.round(width * 0.5)}).png().toBuffer()

        console.log(avatar)
    
        await User.findByIdAndUpdate(user._id, {avatar: avatar});
        res.status(201).json({success: true, message: "Profile avatar uploaded successfully"})
    } catch (error) {
        res.status(500).json({success: false, message: "Server error, try after some time"});
        console.log("Error while uploading profile avatar", error.message);
    }
})

module.exports = router;
