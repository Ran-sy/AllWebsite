const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
require("dotenv").config();

const auth =  async(req, res, next) => {
  try{
    authHeader = req.header('authorization') || req.header('Authorization')
    const token = authHeader.replace("Bearer ", "").trim();
    console.log(`token:${token}`);
    if (!token) return next(createError(401, "You are not authenticated!"));

    const tokenVerify = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({
    _id: tokenVerify.id.toString()});
    if (!user) {
    throw new Error("Please login first");
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
  res.status(401).send(error.message);
}
};
module.exports = auth;
