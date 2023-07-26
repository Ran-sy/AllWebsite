const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) return next(createError(401, "You are not authenticated!"));

    jwt.verify(token, "secretKey", (err, user) => {
      if (err) return next(createError(403, "Token is not valid!"));
      req.user = user;
    });
    next();
  } catch (error) {
    res.status(401).send(error.message);
  }
};
module.exports = auth;
