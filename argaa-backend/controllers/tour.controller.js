const Tour = require('../models/tour.model');
const Booking = require('../models/booking.model');
const Review = require('../models/review.model');
const APIFeatures = require('../utils/apiFeatures');

exports.createTour = async (req, res) => {
  try {
    const tourData = req.body;
    const guideId = req.user._id;

  

    const newTour = await Tour.create({
      ...tourData,
      guide: guideId,
    });

    res.status(201).json({
      status: 'success',
      message: 'Tour created successfully and is pending approval.',
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        status: 'fail',
        message: 'A tour with this title already exists.',
      });
    }
    console.error('Create Tour Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while creating the tour.',
    });
  }
};


// @desc    Get all tours with advanced features
// @route   GET /api/tours
// @access  Public
exports.getAllTours = async (req, res) => {
  try {
    // BUILD THE BASE QUERY
    // This is a critical business rule: The public should only see approved and published tours.
    let baseQuery = '';
    if (req.user && req.user.role === 'admin') {
      baseQuery = Tour.find(); // Admin can see all tours
    } else {
      // Public users can only see approved and published tours
      baseQuery = Tour.find({ isPublished: true, status: 'approved' });
    }

    

    // EXECUTE THE QUERY using our APIFeatures class
    const features = new APIFeatures(baseQuery, req.query)
      .search()
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const tours = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    console.error('Get All Tours Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while fetching tours.',
    });
  }
};


// Get a single tour by ID
exports.getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id).populate('guide', 'firstName lastName email');
    
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found.' });
    }
    console.log("the requested tour is: ", tour);
    // Business Rule: The public can only see approved and published tours.
    // However, an admin or the guide who owns the tour can see it in any state.
    const isOwnerOrAdmin = req.user && (req.user.role === 'admin' || tour.guide._id.toString() === req.user.id);
    console.log("isOwnerOrAdmin: ", isOwnerOrAdmin);
    
    if (!tour.isPublished && !isOwnerOrAdmin) {
        return res.status(404).json({ message: 'Tour not found.' });
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    console.error('Get Tour By ID Error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Update a tour
exports.updateTour = async (req, res) => {
  try {
    const tourToUpdate = await Tour.findById(req.params.id);

    if (!tourToUpdate) {
      return res.status(404).json({ message: 'Tour not found.' });
    }

    // Authorization Check: Must be an admin or the guide who created the tour.
    if (req.user.role !== 'admin' && tourToUpdate.guide.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden: You are not authorized to update this tour.' });
    }

    // Business Rule: A guide cannot approve, publish, or change the status of their own tour. Only an admin can.
    if (req.user.role === 'guide') {
      delete req.body.status;
      delete req.body.isPublished;
    }

    const updatedTour = await Tour.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // Return the modified document rather than the original
        runValidators: true, // Run schema validators on the update
      }
    );

    res.status(200).json({
      status: 'success',
      message: 'Tour updated successfully.',
      data: {
        tour: updatedTour,
      },
    });
  } catch (error) {
    console.error('Update Tour Error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

exports.getMyTours = async (req, res) => {
  try {
    const tours = await Tour.find({ guide: req.user.id }).sort('-createdAt');
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: { tours }
    });
  } catch (error) {
    console.error('Get My Tours Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.adminGetAllTours = async (req, res) => {
  try {
    const query = {};
    // If a status filter is provided in the query string, use it
    if (req.query.status && req.query.status !== 'all') {
        query.status = req.query.status;
    }
    
    const tours = await Tour.find(query)
        .populate('guide', 'firstName lastName email')
        .sort('-createdAt');
        
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: { tours }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const tourToDelete = await Tour.findById(req.params.id);

    if (!tourToDelete) {
      return res.status(404).json({ message: 'Tour not found.' });
    }

    // Authorization Check: Must be an admin or the guide who created the tour.
    if (req.user.role !== 'admin' && tourToDelete.guide.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden: You are not authorized to delete this tour.' });
    }

    // We also need to delete related data, like bookings and reviews, for a clean database.
    // This is an important step!
    await Booking.deleteMany({ tour: req.params.id });
    await Review.deleteMany({ tour: req.params.id });

    // Now delete the tour itself
    await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({ // 204 No Content is standard for a successful delete
      status: 'success',
      data: null,
    });
  } catch (error) {
    console.error('Delete Tour Error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};