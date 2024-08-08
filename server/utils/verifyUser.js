const jwt = require("jsonwebtoken");
const errorHandler = require("./error.js");

const verifyToken = (req, res, next) => {
  // console.log("Cookies:", req.cookies); // Log cookies to debug
  // console.log(typeof req.cookies); // Log cookies to debug
  // const token = req.cookies.access_token;
  // console.log("token from varifytoken", token);

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  // console.log("token from verifyToken", token);

  if (!token) {
    return next(errorHandler(401), "Unauthorized");
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return next(errorHandler(401, "Unauthorized"));
    }
    req.user = user;
    next();
  });
};

module.exports = verifyToken;
