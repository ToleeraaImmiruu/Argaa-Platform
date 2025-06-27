import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import customTourService from '../api/customTour.service';
import { UserCircleIcon, CalendarIcon, UsersIcon, MapPinIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

// Reusable Detail Item Component
const DetailItem = ({ icon: Icon, label, value }) => (
    <div>
        <dt className="flex items-center text-sm font-medium text-gray-500">
            <Icon className="h-5 w-5 text-gray-400 mr-2" />
            <span>{label}</span>
        </dt>
        <dd className="mt-1 text-lg font-semibold text-gray-900">{value}</dd>
    </div>
);

const CustomTourDetailPage = () => {
    const { id } = useParams();
    const [tourRequest, setTourRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isJoining, setIsJoining] = useState(false);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // Re-usable fetch function
    const fetchTourRequest = () => {
        setLoading(true);
        customTourService.getCustomTourById(id)
            .then(data => setTourRequest(data))
            .catch(err => toast.error("Could not load tour details."))
            .finally(() => setLoading(false));
    };

    // Initial fetch
    useEffect(() => {
        fetchTourRequest();
    }, [id]);

    const handleJoin = () => {
        if (!user) {
            toast.error("You must be logged in to join.");
            navigate('/login', { state: { from: location } });
            return;
        }
        setIsJoining(true);
        const promise = customTourService.joinCustomTour(id);

        toast.promise(promise, {
            loading: 'Joining the adventure...',
            success: (data) => {
                fetchTourRequest(); // Re-fetch data to update the UI
                return data.message || 'Successfully joined!';
            },
            error: (err) => err.message || 'Failed to join. The trip might be full.',
        });

        promise.finally(() => setIsJoining(false));
    };

    if (loading) return <p className="text-center p-10">Loading Community Adventure...</p>;
    if (!tourRequest) return <p className="text-center p-10">Tour Request Not Found.</p>;
    console.log("Tour Request Data:", tourRequest);
    // Derived state for easier logic in JSX
    const isParticipant = user && tourRequest.participants.some(p => p._id === user._id);
    const isFull = tourRequest.participants.length >= tourRequest.maxGroupSize;
    const canJoin = !isParticipant && !isFull && user;

    console.log("User Data:", user);
    console.log("Is Participant:", isParticipant);
    console.log("Is Full:", isFull);

    // Determine button text and state
    let buttonText = "Join This Adventure";
    if (isParticipant) buttonText = "You're In!";
    if (isFull) buttonText = "This Trip is Full";
    if (!user) buttonText = "Login to Join";


    return (
        <div className="max-w-5xl mx-auto animate-fadeIn">
            <div className="bg-white p-8 rounded-2xl shadow-xl">
                {/* Header with image */}
                <div className="relative mb-6">
                    <img src={tourRequest.coverImage} alt={tourRequest.title} className="w-full h-96 object-cover rounded-lg" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg"></div>
                    <div className="absolute bottom-6 left-6">
                        <h1 className="text-4xl font-extrabold text-white shadow-lg">{tourRequest.title}</h1>
                        <p className="text-lg text-gray-200">Proposed by {tourRequest.creator.firstName}</p>
                    </div>
                </div>

                {/* Details Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                    <DetailItem icon={MapPinIcon} label="Location" value={tourRequest.city} />
                    <DetailItem icon={CalendarIcon} label="Proposed Date" value={new Date(tourRequest.requestedDate).toLocaleDateString()} />
                </div>
                
                <p className="text-gray-700 leading-relaxed">{tourRequest.description}</p>
                
                {/* Participants Section */}
                <div className="my-8 border-t pt-8">
                    <h3 className="text-2xl font-bold mb-4">Who's Going? ({tourRequest.participants.length}/{tourRequest.maxGroupSize})</h3>
                    <div className="flex flex-wrap gap-4">
                        {tourRequest.participants.map(p => (
                            <div key={p._id} className={`flex items-center px-3 py-1 rounded-full text-sm font-medium
                                ${p._id === user?._id ? 'bg-blue-100 text-blue-800' : 'bg-gray-100'}`}>
                                <UserCircleIcon className="h-5 w-5 mr-1.5" />
                                {p.firstName}
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- THIS IS THE NEW CALL-TO-ACTION SECTION --- */}
                <div className="mt-8 border-t pt-8 text-center">
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleJoin} 
                        disabled={!canJoin || isJoining || user.role !== 'tourist'}
                        className="py-4 px-10 text-lg text-white font-bold rounded-lg shadow-lg transition-colors 
                                   disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none disabled:scale-100
                                   bg-blue-600 hover:bg-blue-700"
                    >
                        {buttonText}
                    </motion.button>
                    {isParticipant && (
                        <p className="flex items-center justify-center mt-4 text-green-600 font-semibold">
                            <CheckCircleIcon className="h-5 w-5 mr-1" />
                            You've joined this trip! Get ready for an adventure.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomTourDetailPage;