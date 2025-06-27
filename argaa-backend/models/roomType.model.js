// models/roomType.model.js
const mongoose = require('mongoose');

const roomTypeSchema = new mongoose.Schema({
  hotel: { // The hotel this room type belongs to
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true
  },
  name: { type: String, required: true }, // e.g., "Standard Queen", "Deluxe Suite"
  pricePerNight: { type: Number, required: true },
  capacity: { type: Number, required: true }, 
  quantity: { type: Number, required: true }, 
  beds: { type: Number, required: true },
  photos: [String],
}, { timestamps: true });

module.exports = mongoose.model('RoomType', roomTypeSchema);