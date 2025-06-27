// middleware/auth.middleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header (format is "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using our secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      
      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }

      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// NEW: Role-based authorization middleware
exports.authorize = (...roles) => {
  return (req, res, next) => {
    // We assume this middleware runs AFTER the 'protect' middleware,
    // so req.user will be available.
    if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
    }
    
    if (!roles.includes(req.user.role)) {
      // User's role is not in the list of allowed roles
      return res.status(403).json({
        message: `Forbidden: User with role '${req.user.role}' is not authorized to access this route.`,
      });
    }
    next();
  };
};

exports.getLoggedInUser = async (req, res, next) => {
  // Check if an authorization header exists and starts with "Bearer"
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      const token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user and attach to request, excluding password
      req.user = await User.findById(decoded.id).select('-password');

    } catch (error) {
      // just move on
    }
  }
  next();
};