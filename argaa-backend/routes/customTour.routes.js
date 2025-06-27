const express = require('express');
const router = express.Router();
const { protect, getLoggedInUser } = require('../middleware/auth.middleware');
const {
  createCustomTour,
  getAllCustomTours,
  getCustomTourById,
  joinCustomTour,
  getMyCreatedTours,
  getMyJoinedTours,
  deleteAllCustomTours
} = require('../controllers/customTour.controller');

router.route('/my-creations').get(protect, getMyCreatedTours);
router.route('/my-joins').get(protect, getMyJoinedTours);
router.route('/delete-all').delete(deleteAllCustomTours)
// Public routes
router.route('/').get(getLoggedInUser, getAllCustomTours);
router.route('/:id').get(getCustomTourById);

// Private (logged-in user) routes

router.route('/').post(protect, createCustomTour);
router.route('/:id/join').patch(protect, joinCustomTour);

module.exports = router;