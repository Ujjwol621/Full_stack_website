const userModel = require("../models/user.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userRegister = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const existingUser = await userModel.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    let user = await userModel.create({
      fullName,
      email,
      password: hashpassword,
    });

    const token = jwt.sign({
      id: user._id,
    }, "ajaksdfjddkjba", { expiresIn: "2h" });


    res.status(201).cookie("token",token).json({
      message: "User registered successfully",
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const User = await userModel.findOne({ email: email });

    if (!User) {
      return res.status(400).json({
        message: "User not registered yet",
        success: false,
      });
    }
    const isMatchPassword = await bcrypt.compare(password, User.password);
    if (!isMatchPassword) {
      return res.status(400).json({
        message: "Invalid Password",
        success: false,
      });
    }
    let user = User;

    const token = jwt.sign({
      id: user._id,
    }, "ajaksdfjddkjba", { expiresIn: "2h" });


    res.status(200).cookie("token",token).json({
      message: "User logged in successfully",
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
const userLogout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      message: "User logged out successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
const getUser = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      message: "User data retrieved successfully",
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
module.exports = { userRegister, userLogin, userLogout, getUser };
