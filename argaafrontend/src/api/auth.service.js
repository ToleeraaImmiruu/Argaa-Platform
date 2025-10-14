import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // Your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});
const signup = async (userData) => {
  try {
    const response = await apiClient.post('/auth/signup', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
const login = async (credentials) => {
  try {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
const getProfile = async (token) => {
  try {
    const response = await apiClient.get('/profile/me', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

const authService = {
  signup,
  login,
  getProfile,
};

export default authService;
