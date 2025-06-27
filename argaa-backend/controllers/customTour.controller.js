const CustomTourRequest = require('../models/customTourRequest.model');

// Create a new custom tour request
exports.createCustomTour = async (req, res) => {
  try {
    const tourData = { ...req.body, creator: req.user.id };
    const newTourRequest = await CustomTourRequest.create(tourData);

    res.status(201).json({
      status: 'success',
      message: 'Your tour request has been submitted and is pending approval.',
      data: {
        tourRequest: newTourRequest,
      },
    });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

// Get all APPROVED custom tour requests
exports.getAllCustomTours = async (req, res) => {
  try {
    // retrieve all customr tours that belong to the req.user.id = CustomTourRequest.creator whether they are approved or not
    let myTours = []
    if (req.user){
        myTours = await CustomTourRequest.find({ creator: req.user.id })
        .populate('creator', 'firstName lastName')
        .sort('-createdAt');
    }
    const tourRequests = await CustomTourRequest.find({ status: 'approved' })
      .populate('creator', 'firstName')
      .sort('-createdAt');

    const allTours = myTours.concat(tourRequests);

    res.status(200).json({
      status: 'success',
      results: tourRequests.length,
      data: {
        allTours,
      },
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};

// Get details for a single custom tour request
exports.getCustomTourById = async (req, res) => {
  try {
    console.log("Fetching custom tour request with ID:", req.params.id);
    const tourRequest = await CustomTourRequest.findById(req.params.id)
      .populate('creator', 'firstName lastName')
      .populate('participants', 'firstName');

    if (!tourRequest) {
      return res.status(404).json({ message: 'Tour request not found.' });
    }

    res.status(200).json({
      status: 'success',
      data: {
        tourRequest,
      },
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};

// @desc    Join a custom tour request
// @route   PATCH /api/custom-tours/:id/join
// @access  Private
exports.joinCustomTour = async (req, res) => {
  try {
    const tourRequest = await CustomTourRequest.findById(req.params.id);

    if (!tourRequest) {
      return res.status(404).json({ message: 'Tour request not found.' });
    }
    if (tourRequest.status !== 'approved') {
      return res.status(400).json({ message: `Cannot join a tour that is '${tourRequest.status}'.` });
    }
    if (tourRequest.participants.includes(req.user.id)) {
      return res.status(400).json({ message: 'You have already joined this tour request.' });
    }
    if (tourRequest.participants.length >= tourRequest.maxGroupSize) {
      return res.status(400).json({ message: 'This tour request is already full.' });
    }

    tourRequest.participants.push(req.user.id);

    // If joining makes the tour full, update the status
    if (tourRequest.participants.length === tourRequest.maxGroupSize) {
      tourRequest.status = 'full';
    }

    await tourRequest.save();

    res.status(200).json({
      status: 'success',
      message: 'You have successfully joined the tour request!',
      data: {
        tourRequest,
      },
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};

// @desc    Admin: Get all custom tour requests (including pending)
// @route   GET /api/admin/custom-tours
// @access  Private (Admin)
exports.adminGetAllCustomTours = async (req, res) => {
  try {
    const query = req.query.status ? { status: req.query.status } : {};
    const tourRequests = await CustomTourRequest.find(query)
        .populate('creator', 'firstName lastName email')
        .sort('-createdAt');
    res.status(200).json({
        status: 'success',
        results: tourRequests.length,
        data: { tourRequests }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};

// @desc    Admin: Approve or Reject a request
// @route   PATCH /api/admin/custom-tours/:id
// @access  Private (Admin)
exports.adminUpdateCustomTourStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({ message: "Invalid status. Must be 'approved' or 'rejected'." });
        }
        
        const tourRequest = await CustomTourRequest.findByIdAndUpdate(
            req.params.id, 
            { status }, 
            { new: true, runValidators: true }
        );

        if (!tourRequest) {
            return res.status(404).json({ message: 'Tour request not found.' });
        }

        res.status(200).json({
            status: 'success',
            message: `Tour request has been ${status}.`,
            data: { tourRequest }
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
};

exports.getMyCreatedTours = async (req, res) => {
    console.log("user ID=============:", req);
    try {
        const tourRequests = await CustomTourRequest.find({ creator: req.user.id })
            .populate('creator', 'firstName')
            .sort('-createdAt');

        res.status(200).json({
            status: 'success',
            results: tourRequests.length,
            data: { tourRequests }
        });
    } catch (error) {
        console.log('Error fetching created tours:', error);
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
};


exports.getMyJoinedTours = async (req, res) => {
    try {
        const tourRequests = await CustomTourRequest.find({
            participants: req.user.id, 
            creator: { $ne: req.user.id } 
        })
        .populate('creator', 'firstName')
        .sort('-createdAt');

        res.status(200).json({
            status: 'success',
            results: tourRequests.length,
            data: { tourRequests }
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
};

exports.deleteAllCustomTours = async (req, res) => {
    try{
        await CustomTourRequest.deleteMany()
        res.status(204).json({
            status : "success",
            message : "succesfully deleted all custom tours"
        })
    }catch(error){
        res.status(500).json({status : "error", message : "Server error"})
    }
}