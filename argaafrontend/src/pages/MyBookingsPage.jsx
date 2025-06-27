import React, { useState, useEffect } from 'react';
import bookingService from '../api/booking.service';
import BookingCard from '../components/BookingCard';
import { Link } from 'react-router-dom';

const MyBookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        bookingService.getMyBookings()
            .then(data => {
                setBookings(data);
            })
            .catch(error => {
                console.error("Could not fetch bookings", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-center p-10">Loading your bookings...</div>;
    }

    return (
        <div className="max-w-5xl mx-auto px-4 animate-fadeIn">
            <div className="text-left mb-10">
                <h1 className="text-4xl font-extrabold text-gray-800">My Adventures</h1>
                <p className="mt-2 text-lg text-gray-600">Here's a list of all your past and upcoming trips.</p>
            </div>

            {bookings.length > 0 ? (
                <div className="space-y-6">
                    {bookings.map(booking => (
                        <BookingCard key={booking._id} booking={booking} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 px-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-700">No Bookings Yet</h2>
                    <p className="mt-2 text-gray-500">Your next adventure is waiting for you!</p>
                    <Link to="/" className="mt-6 inline-block py-3 px-6 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700">
                        Explore Tours
                    </Link>
                </div>
            )}
        </div>
    );
};

export default MyBookingsPage;