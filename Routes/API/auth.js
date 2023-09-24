const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

// Middleware to check if the user is authenticated
function authenticateUser(req, res, next) {
  const authToken = req.cookies.authToken;

  if (authToken === 'your-secret-auth-token') {
    // User is authenticated, proceed to the next middleware or route handler
    next();
  } else {
    // User is not authenticated, redirect to the login page or send an unauthorized response
    res.redirect('/login');
  }
}

// Middleware to set the authentication cookie (for demonstration purposes)
function setAuthToken(req, res, next) {
  // In a real application, you would validate the user's credentials and generate a unique authToken
  // Here, we're setting a simple authToken for demonstration purposes
  const authToken = 'your-secret-auth-token';
  
  // Set the authToken as a cookie (secure: true should be used in production)
  res.cookie('authToken', authToken, { secure: false, httpOnly: true });
  next();
}

module.exports = { authenticateUser, setAuthToken };
