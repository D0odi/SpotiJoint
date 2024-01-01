const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

module.exports = mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log(err);
})