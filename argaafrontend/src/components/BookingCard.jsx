import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarDaysIcon, UserGroupIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

// A dedicated status badge for bookings
const BookingStatusBadge = ({ status }) => {
    const styles = {
        pending: 'bg-yellow-100 text-yellow-800',
        confirmed: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800',
        completed: 'bg-blue-100 text-blue-800',
    };
    const text = status.charAt(0).toUpperCase() + status.slice(1);
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status]}`}>{text}</span>;
};


const BookingCard = ({ booking }) => {
    // Defensive check in case tour was deleted but booking remains
    if (!booking.tour) {
        return (
            <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
                <p className="text-red-500">This tour is no longer available.</p>
            </div>
        );
    }

    const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'
    });

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row transition-shadow duration-300 hover:shadow-xl">
            <img src={booking.tour.coverImage} alt={booking.tour.title} className="w-full md:w-1/3 h-48 md:h-auto object-cover" />
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start">
                    <span className="text-sm text-gray-500">{booking.tour.category}</span>
                    <BookingStatusBadge status={booking.status} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mt-2">{booking.tour.title}</h3>
                <p className="text-md text-gray-600 mb-4">{booking.tour.city}</p>

                <div className="mt-auto border-t pt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center">
                        <CalendarDaysIcon className="h-5 w-5 text-gray-500 mr-2" />
                        <div>
                            <span className="font-semibold">Date:</span> {formatDate(booking.tourDate)}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <UserGroupIcon className="h-5 w-5 text-gray-500 mr-2" />
                        <div>
                            <span className="font-semibold">Guests:</span> {booking.numberOfPeople}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <CurrencyDollarIcon className="h-5 w-5 text-gray-500 mr-2" />
                        <div>
                            <span className="font-semibold">Total:</span> ${booking.totalPrice}
                        </div>
                    </div>
                </div>
                 <div className="mt-4 flex justify-end">
                    <Link to={`/tours/${booking.tour._id}`} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                        View Original Tour
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BookingCard;