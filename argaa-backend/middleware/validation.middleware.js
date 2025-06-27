// middleware/validation.middleware.js
const yup = require('yup');

const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    
    return next();
  } catch (error) {
    return res.status(400).json({
      type: 'ValidationError',
      errors: error.errors
    });
  }
};

module.exports = validate;