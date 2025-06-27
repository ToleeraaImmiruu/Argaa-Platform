// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserBookings } from '../services/tourService';

export default function Dashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    console.log('Current user:', user);  // Debug user data

    const fetchBookings = async () => {
      try {
        const data = await getUserBookings();
        setBookings(data);
      } catch (err) {
        console.error('Error fetching bookings:', err);
      }
    };
    fetchBookings();
  }, [user]);  // Added user to dependency just in case

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {user?.firstName ? user.firstName : "Guest"}!
      </h1>
      <h2 className="text-xl mb-2">Your Bookings:</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <ul className="space-y-2">
          {bookings.map((b, idx) => (
            <li key={idx} className="border p-3 rounded shadow-sm">
              <strong>Tour:</strong> {b.tour.title} <br />
              <strong>Date:</strong> {new Date(b.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
