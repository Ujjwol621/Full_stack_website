const userModel = require("../models/user.models");
const bcrypt = require("bcryptjs");

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
    res.status(201).json({
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
module.exports = userRegister;
