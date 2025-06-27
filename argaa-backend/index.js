const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); 
dotenv.config();

// --- Connect to Database ---
connectDB();

const app = express();

// --- Middlewares ---
app.use(express.json());

// --- Routes ---
const authRoutes = require('./routes/auth.routes');
const tourRoutes = require('./routes/tour.routes');
const bookingRoutes = require('./routes/booking.routes');
const { protect } = require('./middleware/auth.middleware');
const chatbotRoutes = require('./routes/chatbot.routes');
const customTourRoutes = require('./routes/customTour.routes');
const adminRoutes = require('./routes/admin.routes');

const cors = require('cors');
// Enable CORS for all routes
app.use(cors({
  origin: '*', // Allow all origins, you can specify specific origins if needed
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Public routes
app.get('/', (req, res) => res.send('ARGAA Platform API is running...'));
app.use('/api/auth', authRoutes);
app.use('/api/tours', tourRoutes);
app.use('/api/tours/:tourId/bookings', bookingRoutes);
app.use('/api/bookings', bookingRoutes); 
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/custom-tours', customTourRoutes);
app.use('/api/admin', adminRoutes);

// Protected route example to test our token later
app.get('/api/profile/me', protect, (req, res) => {
  res.status(200).json(req.user);
});


// --- Server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`));