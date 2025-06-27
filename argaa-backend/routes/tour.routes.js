const express = require('express');
const router = express.Router();

// Import all required components
const { createTour, getAllTours, getTourById, updateTour, getMyTours, deleteTour } = require('../controllers/tour.controller');
const { protect, authorize, getLoggedInUser } = require('../middleware/auth.middleware');
const { getTourAvailabilityByDate } = require('../controllers/booking.controller');
const validate = require('../middleware/validation.middleware');
const { createTourSchema, updateTourSchema } = require('../validators/tour.validator');
const reviewRouter = require('./review.routes'); 


// --- Define the Route --

// GET and POST /api/tours
router
  .route("/")
  .get(getLoggedInUser, getAllTours)
  .post(
  protect,                     
  authorize('guide', 'admin'), 
  validate(createTourSchema),  
  createTour                  
);

router.get('/my-tours', protect, authorize('guide'), getMyTours);
// GET /api/tours/:id
router
  .route('/:id')
  .get(getLoggedInUser, getTourById) 
  .patch(
    protect, 
    authorize('guide', 'admin'),
    validate(updateTourSchema),
    updateTour
  )
  .delete(protect, authorize('guide', 'admin'), deleteTour);

router.get('/:tourId/availability', getTourAvailabilityByDate);

router.use('/:tourId/reviews', reviewRouter);

module.exports = router;