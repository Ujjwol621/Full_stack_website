const express = require('express');
const { userRegister, userLogin, userLogout, getUser } = require('../controllers/users.controller');
const verifyToken = require('../middlewares/auth.middleware');

const userRouter = express.Router();

userRouter.route('/register').post(userRegister);
userRouter.route('/login').post(userLogin);
userRouter.route('/logout').post(userLogout);
userRouter.route('/getuser').get(verifyToken, getUser);
module.exports = userRouter;
