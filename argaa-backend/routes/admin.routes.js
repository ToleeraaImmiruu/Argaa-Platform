const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth.middleware');
const { 
    adminGetAllCustomTours, 
    adminUpdateCustomTourStatus 
} = require('../controllers/customTour.controller');

const { adminGetAllTours: adminGetAllOfficialTours } = require('../controllers/tour.controller');

// All admin routes are protected and restricted to the 'admin' role
router.use(protect, authorize('admin'));
router.route('/tours').get(adminGetAllOfficialTours);

// Routes for custom tours
router.route('/custom-tours').get(adminGetAllCustomTours);
router.route('/custom-tours/:id').patch(adminUpdateCustomTourStatus);

module.exports = router;