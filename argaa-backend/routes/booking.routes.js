// routes/booking.routes.js
const express = require('express');
// Allow this router to access params from other routers (like :tourId)
const router = express.Router({ mergeParams: true });

const { protect } = require('../middleware/auth.middleware');
const validate = require('../middleware/validation.middleware');
const { createTourBookingSchema } = require('../validators/booking.validator');
const { createTourBooking, getMyBookings, cancelBooking } = require('../controllers/booking.controller');


// All routes below this will be protected
router.use(protect);

// POST /api/tours/:tourId/bookings
router
  .route('/')
  .post(validate(createTourBookingSchema), createTourBooking);

router.route('/my-bookings').get(getMyBookings);

// Route to cancel a specific booking
router.route('/:id/cancel').patch(cancelBooking);

module.exports = router;

