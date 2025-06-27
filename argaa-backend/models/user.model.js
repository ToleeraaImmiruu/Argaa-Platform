// models/user.model.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['tourist', 'guide', 'hotel-manager', 'admin'],
    default: 'tourist',
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);