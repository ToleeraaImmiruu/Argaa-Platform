// src/pages/Tours.jsx
import React, { useEffect, useState } from 'react';
import { getAllTours } from '../services/tourService';
import TourCard from '../components/TourCard';

export default function Tours() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const data = await getAllTours();
        setTours(data);
      } catch (err) {
        console.error('Error fetching tours:', err);
      }
    };
    fetchTours();
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tours.map(tour => (
        <TourCard key={tour._id} tour={tour} />
      ))}
    </div>
  );
}
