const express = require('express');
require('./models/database.js')
const userRouter = require('./routes/user.js');
const User = require('./models/user.js');

const app = express();

app.use(express.json())
app.use(userRouter)

// const test = async (email, password) => {
//     const user = await User.findOne({email: email});
//     const result = await user.comparePassword(password);
//     console.log(result);
// }

app.get('/', (req, res) => {
    res.send('<h1>This is a simple HTML web page.</h1>')
})

app.listen(8000)

