const Review = require('../models/review.model');
const Booking = require('../models/booking.model');

// @desc    Create a new review for a tour
// @route   POST /api/tours/:tourId/reviews
// @access  Private (Tourists)
exports.createReview = async (req, res) => {
  try {
    const tourId = req.params.tourId;
    const userId = req.user.id;
    const { rating, review } = req.body;

    // 1. Business Rule: Check if the user has a completed booking for this tour
    const completedBooking = await Booking.findOne({
      user: userId,
      tour: tourId,
      status: 'completed' // Or 'confirmed' depending on your business logic
    });

    if (!completedBooking) {
      return res.status(403).json({ message: 'Forbidden: You must complete a tour before you can review it.' });
    }

    // 2. Create the review
    // The model will automatically handle duplicate checks and rating calculations.
    const newReview = await Review.create({
      tour: tourId,
      user: userId,
      rating,
      review,
    });

    res.status(201).json({
      status: 'success',
      message: 'Thank you for your review!',
      data: {
        review: newReview,
      },
    });

  } catch (error) {
    // Handle the unique index error for duplicate reviews
    if (error.code === 11000) {
      return res.status(409).json({ message: 'You have already submitted a review for this tour.' });
    }
    console.error('Create Review Error:', error);
    res.status(500).json({ message: 'Server error while creating review.' });
  }
};