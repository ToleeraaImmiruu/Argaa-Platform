import axios from 'axios';

// A single, reusable Axios instance for the whole app
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Interceptor to add auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Creates a new booking for a specific tour.
 */
const createBooking = async (tourId, bookingData) => {
  try {
    // Correct path is /tours/:tourId/bookings
    const response = await apiClient.post(`/tours/${tourId}/bookings`, bookingData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Gets the number of booked slots for a tour on a specific date.
 */
const getAvailabilityForDate = async (tourId, date) => {
  try {
    // Correct path is /tours/:tourId/availability
    const response = await apiClient.get(`/tours/${tourId}/availability?date=${date}`);
    console.log("Availability response:", await response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to get availability:", error);
    return { bookedSlots: 0 };
  }
};

const getMyBookings = async () => {
  try {
    const response = await apiClient.get('/bookings/my-bookings');
    return response.data.data.bookings;
  } catch (error) {
    console.error("Error fetching user's bookings:", error);
    throw error.response?.data || error;
  }
};

const bookingService = {
  createBooking,
  getAvailabilityForDate,
  getMyBookings,
};

export default bookingService;