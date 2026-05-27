const jwt = require("jsonwebtoken");
const userModel = require("../models/user.models");

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Token not provided",
      success: false,
    });
  }
  try {
    const decoded = jwt.verify(token, "ajaksdfjddkjba");
    const user = await userModel.findById(decoded.id);
    console.log(user);
    req.user = user; // Attach the user object to the request for further use
    next(); // Proceed to the next middleware or route handler

} catch (error) {
    return res.status(403).json({
      message: "Invalid token",
      success: false,
    });
  }
};
module.exports = verifyToken;
