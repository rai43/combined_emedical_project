const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    console.log(req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error("Authentication failed!");
    }
    const decodedToken = jwt.verify(token, "supersecret_dont_share");
    req.userData = {
      userId: decodedToken.userId,
      email: decodedToken.email,
      id_number: decodedToken.id_number,
    };
    next();
  } catch (err) {
    const error = new HttpError("Authentication failed!", 403);
    return next(error);
  }
};
