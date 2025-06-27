// models/booking.model.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookingType: {
    type: String,
    enum: ['tour', 'hotel'],
    required: true
  },
  //Tour-specific fields
  tour: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour' },
  tourDate: { type: Date },
  numberOfPeople: { type: Number },

  //Hotel-specific fields
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
  roomType: { type: mongoose.Schema.Types.ObjectId, ref: 'RoomType' },
  checkInDate: { type: Date },
  checkOutDate: { type: Date },

  // Common fields
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);