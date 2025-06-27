// src/services/authService.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api/auth',
  withCredentials: true, // enables cookies for refresh tokens if used
});

export const login = async (email, password) => {
  const res = await API.post('/login', { email, password });
  return res.data;
};

export const register = async (formData) => {
  const res = await API.post('/register', formData);
  return res.data;
};

export const logout = async () => {
  const res = await API.post('/logout');
  return res.data;
};
