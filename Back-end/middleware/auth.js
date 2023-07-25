const jwt = require("jsonwebtoken");
require('dotenv').config()
const User = require("../Models/userModel");
const createError = require("../utils/createError");

const auth = (req, res, next) => {
  const token = req.cookies?.accessToken;
    console.log(req.cookies)
  if (!token) return next(createError(401, "You are not authenticated!"));

  jwt.verify(token, process.env.SECRET_KEY, async (err, obj) => {
    if (err) return next(createError(403, "Token is not valid!"));

    const user = await User.findById(obj.id)
    if(!user) return next(createError(404, "Token is not valid!"));
    req.user = user;
    req.token = token
    next();
  });
};

module.exports = auth;