const express = require('express');
const userRouter = require('./routes/user.routes');
const verifyToken = require('./middlewares/auth.middleware');
const cookieParser = require('cookie-parser')
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies
app.use('/api/v1/users',userRouter); // Mount the user router at the /api/v1/users path

module.exports = app;