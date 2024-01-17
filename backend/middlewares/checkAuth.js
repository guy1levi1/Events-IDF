const jwt = require("jsonwebtoken");

const HttpError = require("../models/httpError");

module.exports = (req, res, next) => {

  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const secretKey = process.env.SECRET_KEY;
    console.log("checkauth: " + secretKey);
  
    console.log("req.headers.authorization:");

    console.log(req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error("Authentication failed!");
    }
    const decodedToken = jwt.verify(token, secretKey);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new HttpError("Authentication failed!", 403);
    return next(error);
  }
};