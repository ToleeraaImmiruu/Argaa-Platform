import axios from 'axios';

// The base URL for all admin-related requests
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api/admin',
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
 * Fetches all official tours for the admin dashboard, with status filtering.
 * @param {string} status - The status to filter by ('all', 'pending', etc.)
 */
const getOfficialTours = async (status) => {
  try {
    const params = status === 'all' ? {} : { status };
    // Makes a request to GET /api/admin/tours
    const response = await apiClient.get('/tours', { params });
    return response.data.data.tours;
  } catch (error) {
    console.error("Error fetching admin tours:", error);
    throw error.response?.data || error;
  }
};


const getCustomTours = async (status) => {
  try {
    const params = status === 'all' ? {} : { status };
    // Makes a request to GET /api/admin/custom-tours
    const response = await apiClient.get('/custom-tours', { params });
    return response.data.data.tourRequests;
  } catch (error) {
    console.error("Error fetching custom tours for admin:", error);
    throw error.response?.data || error;
  }
};

const getCustomTourById = async (id) => {
  try {
    // We already have a public GET /api/custom-tours/:id, which is fine for an admin to use too.
    // For simplicity, we'll re-use that and just add the function here.
    const response = await axios.create().get(`http://localhost:3000/api/custom-tours/${id}`);
    return response.data.data.tourRequest;
  } catch (error) {
    console.error("Error fetching custom tour by ID:", error);
    throw error.response?.data || error;
  }
};

/**
 * Updates the status of a custom tour request (approve/reject).
 * @param {string} id - The ID of the custom tour request.
 * @param {string} status - The new status ('approved' or 'rejected').
 */
const updateCustomTourStatus = async (id, status) => {
  try {
    const response = await apiClient.patch(`/custom-tours/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error("Error updating custom tour status:", error);
    throw error.response?.data || error;
  }
};

const adminService = {
  getOfficialTours,
  getCustomTours, 
  getCustomTourById,
  updateCustomTourStatus
};


export default adminService;