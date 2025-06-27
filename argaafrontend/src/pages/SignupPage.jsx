import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'tourist', // Default role
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signup(formData);
      navigate('/'); // Navigate to homepage on successful signup
    } catch (err) {
      // Assuming the error format is { errors: [{ msg: '...' }] } or { message: '...' }
      setError(err.message || (err.errors && err.errors[0].msg) || 'Failed to sign up.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-800">Create Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input name="firstName" type="text" value={formData.firstName} onChange={handleChange} placeholder="First Name" required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input name="lastName" type="text" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">I am a:</label>
            <select name="role" id="role" value={formData.role} onChange={handleChange} required className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="tourist">Tourist</option>
              <option value="guide">Guide</option>
              <option value="hotel-manager">Hotel Manager</option>
            </select>
          </div>

          {error && <p className="text-sm text-center text-red-500">{error}</p>}
          
          <button type="submit" disabled={loading} className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400">
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;