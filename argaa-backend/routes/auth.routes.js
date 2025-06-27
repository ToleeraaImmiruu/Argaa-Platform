// routes/auth.routes.js
const express = require('express');
const router = express.Router();
const yup = require('yup');
const { signup, login } = require('../controllers/auth.controller');
const validate = require('../middleware/validation.middleware'); // Import our new middleware



// Schema for the signup route
const signupSchema = yup.object({
  firstName: yup
    .string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters long'),
  lastName: yup
    .string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters long'),
  email: yup
    .string()
    .email('Must be a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is required'),
  role: yup
    .string()
    .oneOf(["guide", 'tourist', 'hotel-manager'], 'Role must be either guide or tourist or hotel-manager')
    .default('tourist') 
    .required('Role is required'),
});

// Schema for the login route
const loginSchema = yup.object({
  email: yup
    .string()
    .email('Must be a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required'),
});




router.post('/signup', validate(signupSchema), signup);

router.post('/login', validate(loginSchema), login);

module.exports = router;