const express = require('express');
const router = express.Router({ mergeParams: true }); // Important for nested routes
const { protect, authorize } = require('../middleware/auth.middleware');
const { createReview } = require('../controllers/review.controller');

router.use(protect);

router.route('/')
  .post(authorize('tourist'), createReview);

module.exports = router;