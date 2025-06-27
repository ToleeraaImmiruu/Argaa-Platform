// controllers/booking.controller.js
const Booking = require('../models/booking.model');
const Tour = require('../models/tour.model');

// @desc    Create a new booking for a tour
// @route   POST /api/tours/:tourId/bookings
// @access  Private (Tourists)
exports.createTourBooking = async (req, res) => {
  try {
    // 1. Get all necessary data
    const { tourId } = req.params;
    const userId = req.user.id;
    const { tourDate, numberOfPeople } = req.body;

    // 2. Find the tour and check its validity for booking
    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found.' });
    }
    if (!tour.isPublished || tour.status !== 'approved') {
      return res.status(400).json({ message: 'This tour is not currently available for booking.' });
    }
    const requestedDateStr = new Date(tourDate).toISOString().split('T')[0];
    const isDateAvailable = tour.availableDates.length === 0 || tour.availableDates.some(date => new Date(date).toISOString().split('T')[0] === requestedDateStr);
    
    if (!isDateAvailable) {
      return res.status(400).json({ message: 'This tour is not available on the selected date.' });
    }

    // 4. Check for capacity on the requested date
    const bookingsOnDate = await Booking.find({ tour: tourId, tourDate: requestedDateStr });
    const currentCapacity = bookingsOnDate.reduce((acc, booking) => acc + booking.numberOfPeople, 0);

    if (currentCapacity + numberOfPeople > tour.maxGroupSize) {
      const availableSlots = tour.maxGroupSize - currentCapacity;
      return res.status(400).json({ 
        message: `Booking failed. Only ${availableSlots} slots remaining for this date.`,
        availableSlots: availableSlots
      });
    }

    // 5. (Optional but recommended) Prevent duplicate bookings
    const existingBooking = await Booking.findOne({ user: userId, tour: tourId, tourDate: requestedDateStr });
    if (existingBooking) {
      return res.status(409).json({ message: 'You have already booked this tour for the selected date.' });
    }

    // 6. Calculate total price and create the booking
    const totalPrice = tour.price * numberOfPeople;

    const newBooking = await Booking.create({
      user: userId,
      tour: tourId,
      bookingType: 'tour',
      tourDate: requestedDateStr,
      numberOfPeople,
      totalPrice,
      status: 'pending'
    });

    res.status(201).json({
      status: 'success',
      message: 'Booking created successfully. Please proceed to payment to confirm.',
      data: {
        booking: newBooking,
      },
    });

  } catch (error) {
    console.error('Create Booking Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while creating your booking.',
    });
  }
};


// @desc    Cancel a booking
// @route   PATCH /api/bookings/:id/cancel
// @access  Private
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found.' });
    }

    // Authorization: User can only cancel their own booking
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden: You are not authorized to cancel this booking.' });
    }

    // Business Rule: Cannot cancel a booking that is not 'pending' or 'confirmed'
    if (booking.status !== 'pending' && booking.status !== 'confirmed') {
      return res.status(400).json({ message: `Cannot cancel a booking with status '${booking.status}'.` });
    }

    // Perform the update
    booking.status = 'cancelled';
    await booking.save();

    res.status(200).json({
      status: 'success',
      message: 'Booking has been successfully cancelled.',
      data: {
        booking,
      },
    });
  } catch (error) {
    console.error('Cancel Booking Error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};


exports.getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id })
            .populate({
                path: 'tour',
                select: 'title coverImage city category'
            })
            .sort('-createdAt'); 

        res.status(200).json({
            status: 'success',
            results: bookings.length,
            data: {
                bookings,
            }
        });
    } catch (error) {
        console.error('Get My Bookings Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


// @access  Public
exports.getTourAvailabilityByDate = async (req, res) => {
  try {
    const { tourId } = req.params;
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: 'A date query parameter is required.' });
    }

    // Find all confirmed or pending bookings for this tour on the specified date
    const bookingsOnDate = await Booking.find({
      tour: tourId,
      tourDate: new Date(date),
      status: { $in: ['pending', 'confirmed'] } // Count both pending and confirmed against the total
    });

    // Calculate the total number of people booked
    const bookedSlots = bookingsOnDate.reduce((acc, booking) => acc + booking.numberOfPeople, 0);

    res.status(200).json({
      status: 'success',
      bookedSlots: bookedSlots
    });

  } catch (error) {
    console.error("Availability Check Error:", error);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};