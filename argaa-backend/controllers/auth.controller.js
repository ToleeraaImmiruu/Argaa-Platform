// controllers/auth.controller.js
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper function to generate a JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // 1. Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10); // 10 rounds is the recommended default
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create the new user in the database
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role
    });

    // 4. If user created successfully, generate a token and send it back
    if (user) {
      const token = generateToken(user._id);
      res.status(201).json({
        message: 'User registered successfully',
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          email: user.email,
        },
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Authenticate a user & get token
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // 2. Compare the entered password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (user && isMatch) {
      // 3. Passwords match, generate token and send response
      const token = generateToken(user._id);
      res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          email: user.email,
          role: user.role
        },
      });
    } else {
      // Passwords do not match
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

