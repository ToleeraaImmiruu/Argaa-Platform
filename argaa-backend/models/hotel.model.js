// models/hotel.model.js
const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  city: { type: String, required: true, trim: true },
  address: { type: String, required: true },
  amenities: [String],
  photos: [String],
}, { timestamps: true });

module.exports = mongoose.model('Hotel', hotelSchema);