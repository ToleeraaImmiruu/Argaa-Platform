const mongoose = require('mongoose');
const Tour = require('./tour.model');

const reviewSchema = new mongoose.Schema({
  review: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  tour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tour',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

// Prevent a user from writing multiple reviews for the same tour
reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

// --- STATIC METHOD to calculate average ratings ---
reviewSchema.statics.calculateAverageRatings = async function(tourId) {
  const stats = await this.aggregate([
    {
      $match: { tour: tourId }
    },
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 }, 
        avgRating: { $avg: '$rating' }
      }
    }
  ]);

  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating
    });
  } else {
    // If no reviews exist, reset to defaults
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5 
    });
  }
};

// --- HOOKS to trigger the calculation ---
// Call the method after a new review is saved
reviewSchema.post('save', function() {
  // 'this.constructor' points to the current model (Review)
  this.constructor.calculateAverageRatings(this.tour);
});

// Also trigger on update and delete (using a pre-hook with a regex)
reviewSchema.pre(/^findOneAnd/, async function(next) {
    // We need to get the document to access the tourId before the query executes
    this.r = await this.clone().findOne();
    next();
});

reviewSchema.post(/^findOneAnd/, async function() {
    // this.r was set in the pre-hook. Now we can access the tourId after the query ran.
    if (this.r) {
        await this.r.constructor.calculateAverageRatings(this.r.tour);
    }
});


module.exports = mongoose.model('Review', reviewSchema);