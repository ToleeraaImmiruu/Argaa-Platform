import axios from 'axios';

// The base URL for all tour-related requests
const API_URL = 'http://localhost:3000/api/tours';

// A single, reusable Axios instance for tours
const apiClient = axios.create({
  baseURL: API_URL,
});

// Interceptor to add the auth token to every request automatically
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


const getPublicTours = async (filters = {}) => {
  try {
    const params = {
      ...(filters.search && { search: filters.search }),
      ...(filters.category && { category: filters.category }),
      ...(filters.city && { city: filters.city }),
      ...(filters.minPrice && { 'price[gte]': filters.minPrice }),
      ...(filters.maxPrice && { 'price[lte]': filters.maxPrice }),
      ...(filters.availableFrom && { availableFrom: filters.availableFrom }),
      ...(filters.availableTo && { availableTo: filters.availableTo }),
    };
    // Makes request to GET /api/tours with params
    const response = await apiClient.get('/', { params });
    return response.data.data.tours;
  } catch (error) {
    console.error("Error fetching public tours:", error);
    throw error.response?.data || error;
  }
};


const getTourById = async (id) => {
  try {
    // Makes request to GET /api/tours/:id
    const response = await apiClient.get(`/${id}`);
    const data = await response.data;
    console.log("Fetched tour data:", data);
    return response.data.data.tour;
  } catch (error) {
    console.error("Error fetching tour by ID:", error);
    throw error.response?.data || error;
  }
};


const getMyTours = async () => {
  try {
    // Makes request to GET /api/tours/my-tours
    const response = await apiClient.get('/my-tours');
    return response.data.data.tours;
  } catch (error) {
    console.error("Error fetching guide's tours:", error);
    throw error.response?.data || error;
  }
};


const createTour = async (tourData) => {
  try {
    // Makes request to POST /api/tours
    const response = await apiClient.post('/', tourData);
    return response.data.data.tour;
  } catch (error) {
    console.error("Error creating tour:", error);
    throw error.response?.data || error;
  }
};


const updateTour = async (id, tourData) => {
  try {
    // Makes request to PATCH /api/tours/:id
    const response = await apiClient.patch(`/${id}`, tourData);
    return response.data.data.tour;
  } catch (error) {
    console.error("Error updating tour:", error);
    throw error.response?.data || error;
  }
};

const deleteTour = async (id) => {
  try {
    await apiClient.delete(`/${id}`);
    // No data is returned on a 204 response
  } catch (error) {
    console.error("Error deleting tour:", error);
    throw error.response?.data || error;
  }
};


const tourService = {
  getPublicTours,
  getTourById,
  getMyTours,
  createTour,
  updateTour,
  deleteTour,
};

export default tourService;