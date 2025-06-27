// src/services/tourService.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

// Get all tours
export const getAllTours = async () => {
  const res = await API.get('/tours');
  return res.data;
};

// Get single tour
export const getTourById = async (id) => {
  const res = await API.get(`/tours/${id}`);
  return res.data;
};

// Book a tour
export const bookTour = async (tourId) => {
  const res = await API.post(`/bookings`, { tourId });
  return res.data;
};

// Get current user's bookings
export const getUserBookings = async () => {
  const res = await API.get('/bookings/my');
  return res.data;
};
