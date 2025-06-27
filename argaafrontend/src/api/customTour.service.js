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

const createCustomTour = async (tourData) => {
  const response = await apiClient.post('/custom-tours', tourData);
  return response.data;
};

const getAllCustomTours = async () => {
  const response = await apiClient.get('/custom-tours');
  return response.data.data.allTours;
};

const getCustomTourById = async (id) => {
  const response = await apiClient.get(`/custom-tours/${id}`);
  return response.data.data.tourRequest;
};

const joinCustomTour = async (id) => {
  const response = await apiClient.patch(`/custom-tours/${id}/join`);
  return response.data;
};

const getMyCreatedTours = async () => {
  const response = await apiClient.get('/custom-tours/my-creations');
  return response.data.data.tourRequests;
};

const getMyJoinedTours = async () => {
  const response = await apiClient.get('/custom-tours/my-joins');
  return response.data.data.tourRequests;
};

const customTourService = {
  createCustomTour,
  getAllCustomTours,
  getCustomTourById,
  joinCustomTour,
  getMyCreatedTours,
  getMyJoinedTours,
};

export default customTourService;