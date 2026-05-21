const express = require('express');
const userRegister = require('../controllers/users.controller');
const userRouter = express.Router();

userRouter.route('/register').post(userRegister);
module.exports = userRouter;
