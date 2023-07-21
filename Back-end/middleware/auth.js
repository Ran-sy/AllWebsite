const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
require("dotenv").config();

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const tokenVerify = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findOne({
      _id: tokenVerify._id.toString(),
      tokens: token,
    });
    if (!user) {
      throw new Error("Please login first");
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json(error); 
  }
};

module.exports = auth;
