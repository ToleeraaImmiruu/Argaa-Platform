// src/pages/TourDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTourById, bookTour } from '../services/tourService';

export default function TourDetail() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const data = await getTourById(id);
        setTour(data);
      } catch (err) {
        console.error('Error:', err);
      }
    };
    fetchTour();
  }, [id]);

  const handleBook = async () => {
    try {
      await bookTour(id);
      alert('Tour booked successfully!');
    } catch (err) {
      alert('Booking failed: ' + err.message);
    }
  };

  if (!tour) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <img src={tour.coverImage} className="w-full h-80 object-cover rounded mb-4" />
      <h2 className="text-3xl font-bold mb-2">{tour.title}</h2>
      <p className="text-gray-700 mb-4">{tour.description}</p>
      <p><strong>Duration:</strong> {tour.durationHours} hours</p>
      <p><strong>Group Size:</strong> {tour.maxGroupSize}</p>
      <p className="text-lg font-bold my-4">Price: ${tour.price}</p>
      <button
        onClick={handleBook}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Book Now
      </button>
    </div>
  );
}
