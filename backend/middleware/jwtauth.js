const asynchandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const user = require("../models/userSchema");

const protect = asynchandler(async (req, res, next) => {
  let token;
  console.log(req.headers.authorization);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log(token + "This is the token...");
      const decoded = jwt.verify(token, "noteapp1234");
      req.user = await user.findById(decoded.id).select("-password");
      console.log("Valid Token ");
      next();
    } catch (error) {
      res.status(401).json("TOKEN INVALID");
    }
  }

  if (!token) {
    res.status(401).json("Token Not Found");
    console.log("U");
  }
});

// This code is a function that protects a route from unauthorized access. 
// It checks if the request has an "Authorization" header with a "Bearer" token. 
// If it does, it verifies the token using the JWT library and the secret "noteapp1234". 
// If the token is valid, it sets the user data on the request object and calls the next middleware. 
// If the token is invalid, it sends a 401 response with the message "TOKEN INVALID". 
// If there is no token, it sends a 401 response with the message "Token Not Found". 
// The function is wrapped with asynchandler so it can handle asynchronous code.

module.exports = { protect };
