import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import tourService from '../api/tour.service';
import TourCard from '../components/TourCard';

const GuideDashboard = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const data = await tourService.getMyTours();
        setTours(data);
      } catch (err) {
        console.error("Error fetching tours:", err);
        setError('Failed to fetch your tours.');
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  if (loading) return <div>Loading your tours...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Tours</h1>
        <Link to="/create-tour" className="px-6 py-2 font-bold text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors">
          + Create New Tour
        </Link>
      </div>

      {tours.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <TourCard key={tour._id} tour={tour} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700">No tours found.</h2>
          <p className="mt-2 text-gray-500">Ready to lead an adventure? Create your first tour to get started!</p>
        </div>
      )}
    </div>
  );
};

export default GuideDashboard;