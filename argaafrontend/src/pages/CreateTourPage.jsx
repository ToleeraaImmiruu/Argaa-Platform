import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tourService from '../api/tour.service';

const CreateTourPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    durationHours: '',
    maxGroupSize: '',
    coverImage: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070', // A nice default placeholder
    city: '',
    meetingPoint: '',
    category: 'adventure',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const tourData = {
        ...formData,
        price: Number(formData.price),
        durationHours: Number(formData.durationHours),
        maxGroupSize: Number(formData.maxGroupSize),
      };
      await tourService.createTour(tourData);
      navigate('/');
    } catch (err) {
      // Improve error handling to show specific validation messages from the backend
      const errorMessage = err.errors ? err.errors.join(', ') : err.message || 'Failed to create tour. Please check all fields.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <div className="mb-8">
  <button onClick={() => navigate(-1)} className="text-blue-600 hover:text-blue-800 text-2xl font-semibold w-full  flex items-center justify-start transition-colors duration-200">
   <pan className='hover:pointer'>← Back</pan> 
  </button>
</div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Create a New Tour</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Tour Title</label>
          <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Bale Mountains Trekking Adventure"/>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea name="description" id="description" rows="4" value={formData.description} onChange={handleChange} required className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Describe the amazing experience..."></textarea>
        </div>
        
        {/* --- ADDED MISSING FIELDS --- */}
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
          <input type="text" name="city" id="city" value={formData.city} onChange={handleChange} required className="mt-1 block w-full px-4 py-2 border rounded-md" placeholder="e.g., Goba"/>
        </div>
        
        <div>
          <label htmlFor="meetingPoint" className="block text-sm font-medium text-gray-700">Meeting Point</label>
          <input type="text" name="meetingPoint" id="meetingPoint" value={formData.meetingPoint} onChange={handleChange} required className="mt-1 block w-full px-4 py-2 border rounded-md" placeholder="e.g., Dinsho Park Entrance"/>
        </div>
        
        <div>
          <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">Cover Image URL</label>
          <input type="url" name="coverImage" id="coverImage" value={formData.coverImage} onChange={handleChange} required className="mt-1 block w-full px-4 py-2 border rounded-md"/>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price ($)</label>
              <input type="number" name="price" id="price" min="0" value={formData.price} onChange={handleChange} required className="mt-1 block w-full px-4 py-2 border rounded-md" />
           </div>
           <div>
              <label htmlFor="durationHours" className="block text-sm font-medium text-gray-700">Duration (Hours)</label>
              <input type="number" name="durationHours" id="durationHours" min="1" value={formData.durationHours} onChange={handleChange} required className="mt-1 block w-full px-4 py-2 border rounded-md" />
           </div>
           <div>
              <label htmlFor="maxGroupSize" className="block text-sm font-medium text-gray-700">Max Group Size</label>
              <input type="number" name="maxGroupSize" id="maxGroupSize" min="1" value={formData.maxGroupSize} onChange={handleChange} required className="mt-1 block w-full px-4 py-2 border rounded-md" />
           </div>
        </div>
        
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select name="category" id="category" value={formData.category} onChange={handleChange} required className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="adventure">Adventure</option>
            <option value="nature">Nature</option>
            <option value="historical">Historical</option>
            <option value="cultural">Cultural</option>
            <option value="religious">Religious</option>
            <option value="city-tour">City Tour</option>
          </select>
        </div>
        
        {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md text-center">
                <p>{error}</p>
            </div>
        )}
          
        <div className="text-right">
          <button type="submit" disabled={loading} className="px-6 py-2 font-bold text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-gray-400">
            {loading ? 'Submitting...' : 'Submit for Approval'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTourPage;