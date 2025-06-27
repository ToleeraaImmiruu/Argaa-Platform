import React, { createContext, useState, useEffect } from 'react';
import authService from '../api/auth.service';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On initial load, try to fetch user profile if a token exists
    const fetchUser = async () => {
      if (token) {
        try {
          // You'll need to create this service function
          const profile = await authService.getProfile(token);
          setUser(profile);
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
          logout();
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, [token]);

  const signup = async (userData) => {
    const { token, user } = await authService.signup(userData);
    localStorage.setItem('token', token);
    setToken(token);
    setUser(user);
  };

  const login = async (credentials) => {
    const { token, user } = await authService.login(credentials);
    localStorage.setItem('token', token);
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };