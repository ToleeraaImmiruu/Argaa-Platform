// models/tour.model.js
const mongoose = require('mongoose');
const User = require('./user.model'); // Ensure the User model is available for checks

const tourSchema = new mongoose.Schema({
  // --- Core Tour Information ---
  title: {
    type: String,
    required: [true, 'A tour must have a title'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'A tour must have a description'],
    trim: true
  },
  coverImage: {
    type: String,
    required: [true, 'A tour must have a cover image URL']
  },
  images: [String], // Array of image URLs for a gallery
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
    min: [0, 'Price cannot be negative']
  },
  durationHours: {
    type: Number,
    required: [true, 'A tour must have a duration in hours'],
    min: [1, 'Duration must be at least 1 hour']
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size'],
    min: [1, 'Group size must be at least 1']
  },
  category: {
    type: String,
    required: [true, 'A tour must have a category'],
    enum: {
      values: ['historical', 'nature', 'adventure', 'cultural', 'religious', 'city-tour'],
      message: 'Category must be one of: historical, nature, adventure, cultural, religious, city-tour'
    }
  },

  // --- Logistics & Availability ---
  city: {
    type: String,
    required: [true, 'A tour must be associated with a city'],
    trim: true
  },
  meetingPoint: {
    type: String,
    required: [true, 'A tour must have a clear meeting point']
  },
  availableDates: {
    type: [Date],
    default: [] // Array of specific dates when the tour is available
  },

  // --- Ratings and Reviews (Calculated Fields) ---
  ratingsAverage: {
    type: Number,
    default: 4.5, // Start with a good default to encourage first booking
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0'],
    // This function rounds the value to one decimal place (e.g. 4.666 -> 4.7)
    set: val => Math.round(val * 10) / 10
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  
  // --- Management & Staff ---
  guide: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A tour must have a guide']
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending' // Admin must approve new tours
  },
  isPublished: {
    type: Boolean,
    default: false // A tour is not public until an admin publishes it
  },

  // --- [Future] Geo-Location Data (Optional for MVP) ---
  // We keep this structure for easy integration of maps later.
  location: {
        type: {
            type: String,
            enum: ['Point'], // The type must be 'Point'
        },
        coordinates: [Number], // [longitude, latitude]
        address: String
    }
}, {
  timestamps: true, // Adds createdAt and updatedAt
  toJSON: { virtuals: true }, // Ensure virtual properties are included in JSON output
  toObject: { virtuals: true }
});

// --- INDEXES ---
// Create an index on price and ratings for faster sorting
tourSchema.index({ price: 1, ratingsAverage: -1 });
// Create a geospatial index for future map features
tourSchema.index({ location: '2dsphere' });
tourSchema.index({ title: 'text', description: 'text', city: 'text' });
// --- VIRTUAL PROPERTIES ---
// Create a virtual property for duration in days (not stored in DB)
tourSchema.virtual('durationDays').get(function() {
  return this.durationHours / 24;
});

// --- DOCUMENT MIDDLEWARE ---
// A pre-save hook to ensure the assigned guide actually has the 'guide' role.
// tourSchema.pre('save', async function(next) {
//   const guideUser = await User.findById(this.guide);
//   if (!guideUser || guideUser.role !== 'guide') {
//     return next(new Error('The assigned user is not a registered guide.'));
//   }
//   next();
// });

module.exports = mongoose.model('Tour', tourSchema);