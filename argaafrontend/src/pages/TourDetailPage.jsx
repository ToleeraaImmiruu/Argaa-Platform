import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import tourService from '../api/tour.service';
import bookingService from '../api/booking.service';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

import ThreeDModelViewer from '../components/ThreeDModelViewer';
import ArtisticImageGallery from '../components/ArtisticImageGallery';
import TourInfoHighlights from '../components/TourInfoHighlights';
import { BackwardIcon } from '@heroicons/react/24/outline';


// --- THE BOOKING WIDGET with the Final Touch ---
const BookingWidget = ({ tour }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const [bookedSlots, setBookedSlots] = useState(null);
    const [isChecking, setIsChecking] = useState(false);

    const { user, loading: authLoading } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!selectedDate) {
            setBookedSlots(null);
            return;
        };
        
        setIsChecking(true);
        const handler = setTimeout(() => {
            bookingService.getAvailabilityForDate(tour._id, selectedDate)
                .then(data => setBookedSlots(data.bookedSlots || 0))
                .finally(() => setIsChecking(false));
        }, 300);

        return () => clearTimeout(handler);
    }, [selectedDate, tour._id]);

    const remainingSlots = bookedSlots !== null ? tour.maxGroupSize - bookedSlots : tour.maxGroupSize;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user && !authLoading) {
            toast.error("You must be logged in to book.");
            navigate('/login', { state: { from: location } });
            return;
        }
        
        const bookingPromise = bookingService.createBooking(tour._id, {
            tourDate: selectedDate, numberOfPeople: Number(numberOfPeople)
        });
        toast.promise(bookingPromise, {
            loading: 'Processing your booking...',
            success: 'Booking successful! Check your bookings page.',
            error: (err) => err.message || 'Booking failed. Please try again.',
        });
    };

     

    const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

    // Get today's date in YYYY-MM-DD format for the min attribute of the date picker
    const today = new Date().toISOString().split('T')[0];


    return (
        <div className="bg-white p-6 rounded-xl shadow-2xl sticky top-24">
            <p className="text-3xl font-bold text-gray-800">${tour.price} <span className="text-base font-normal text-gray-500">/ person</span></p>
            <div className="my-4 border-t"></div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {tour.availableDates.length > 0 ? "Select an Available Date" : "Pick a Date for Your Tour"}
                    </label>

                    
                    {tour.availableDates.length > 0 ? (
                        // If specific dates are provided, show buttons
                        <div className="grid grid-cols-2 gap-2">
                            {tour.availableDates.map(date => {
                                const dateValue = new Date(date).toISOString().split('T')[0];
                                const isSelected = selectedDate === dateValue;
                                return (
                                    <button type="button" key={date} onClick={() => setSelectedDate(dateValue)}
                                        className={`p-3 rounded-lg text-sm text-center border transition-all duration-200 ${
                                            isSelected ? 'bg-blue-600 text-white border-blue-600 scale-105 shadow-lg' : 'bg-gray-100 hover:border-blue-500'
                                        }`}>
                                        {formatDate(date)}
                                    </button>
                                );
                            })}
                        </div>
                    ) : (
                        // If no specific dates, show a calendar input for any future date
                        <input 
                            type="date"
                            value={selectedDate}
                            onChange={e => setSelectedDate(e.target.value)}
                            min={today} // Prevent selecting past dates
                            required
                            className="mt-1 block w-full text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        />
                    )}
                </div>

                <AnimatePresence>
                    {selectedDate && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                            <div className="pt-4">
                                <label htmlFor="numberOfPeople" className="block text-sm font-semibold text-gray-700">Number of Guests</label>
                                <input type="number" id="numberOfPeople" value={numberOfPeople} onChange={e => setNumberOfPeople(e.target.value)} min="1" max={remainingSlots > 0 ? remainingSlots : 0} required className="mt-1 block w-full border-gray-300 rounded-md" />
                                <div className="text-xs text-right text-gray-500 mt-1 h-4">
                                    {isChecking ? 'Checking...' : bookedSlots !== null && (
                                        remainingSlots > 0 ? `${remainingSlots} slots remaining` : 'Sold out for this date'
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <button type="submit" disabled={(!selectedDate || user.role !== "tourist")  || (remainingSlots < numberOfPeople)} className="w-full text-white bg-blue-600 hover:bg-blue-700 font-bold py-3 px-4 rounded-lg transition-transform duration-200 hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed">
                    { !selectedDate ? 'Select a Date to Book' : 'Request to Book' }
                </button>
            </form>
        </div>
    );
};


// --- MAIN PAGE COMPONENT (No changes here) ---
const TourDetailPage = () => {
    // ... all the existing logic for the main page component remains exactly the same ...
    const { id } = useParams();
    const [tour, setTour] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTour = async () => {
            try {
                setLoading(true);
                const data = await tourService.getTourById(id);
                setTour(data);
            } catch (error) {
                console.error("Error fetching tour details:", error);
                toast.error("Could not load tour details.");
                setTour(null);
            } finally {
                setLoading(false);
            }
        };
        fetchTour();
        window.scrollTo(0, 0);
    }, [id]);

    const handleDelete = () => {
        // Ask for confirmation before deleting
        if (window.confirm("Are you sure you want to permanently delete this tour? This action cannot be undone.")) {
            const deletePromise = tourService.deleteTour(id);
            toast.promise(deletePromise, {
                loading: 'Deleting tour...',
                success: () => {
                    navigate('/'); // Navigate to dashboard on success
                    return 'Tour deleted successfully.';
                },
                error: (err) => err.message || 'Deletion failed.',
            });
        }
    };

    if (loading) return <div className="flex justify-center items-center h-screen"><p className="text-xl">Loading your adventure...</p></div>;
    if (!tour) return <div className="text-center p-20"><h2 className="text-3xl font-bold">Tour Not Found</h2><p className="text-gray-600 mt-2">The tour you are looking for does not exist or could not be loaded.</p></div>;
    const canManage = user && (user.role === 'admin' || user._id === tour.guide._id);
    console.log("the user is====>", tour.guide._id, "and the current user is====>", user._id, "can manage?", canManage);
    const modelUrl = "https://sketchfab.com/models/3b1bb86b99e34214aea36873a41280fb/embed?autospin=1&autostart=1&ui_theme=dark";
    const mockImages = [
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070",
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070",
        "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=1974",
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 animate-fadeIn">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
                <button onClick={() => window.history.back()} className="text-blue-600 hover:text-blue-800 text-2xl font-semibold mb-4 flex items-center transition-colors duration-200">
                    <BackwardIcon className='w-6 h-6 mr-2' />
                    Back to Tours
                </button>
                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">{tour.title}</h1>
            </motion.div>
            {canManage && (
                <div className="mb-8 p-4 bg-gray-100 rounded-lg flex items-center justify-end space-x-4">
                    <h3 className="font-semibold text-gray-700 mr-auto">Admin & Guide Actions</h3>
                    <Link to={`${ user.role === "admin" ? `/admin/tours/${id}` :  `/tours/${id}/edit`}`} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                        Edit Details
                    </Link>
                    <button onClick={handleDelete} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">
                        Delete Tour
                    </button>
                </div>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 xl:gap-12">
                <main className="lg:col-span-3">
                    <ThreeDModelViewer srcUrl={modelUrl} title={tour.title} />
                    <TourInfoHighlights tour={tour} />
                    <div className="prose max-w-none text-gray-700">
                        <p className="text-lg leading-relaxed">{tour.description}</p>
                    </div>
                    <ArtisticImageGallery images={tour.images && tour.images.length > 0 ? tour.images : mockImages} />
                </main>
                <aside className="lg:col-span-2">
                    <BookingWidget tour={tour} />
                </aside>
            </div>
        </div>
    );
};

export default TourDetailPage;