import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import customTourService from '../api/customTour.service';
import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { UsersIcon } from '@heroicons/react/24/solid';

const CustomTourCard = ({ tourRequest }) => {
    const participantCount = tourRequest.participants?.length || 0;
    const progressPercentage = (participantCount / tourRequest.maxGroupSize) * 100;

    return (
        <motion.div whileHover={{ y: -5 }} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <Link to={`/custom-tours/${tourRequest._id}`}>
                <img src={tourRequest.coverImage} alt={tourRequest.title} className="w-full h-56 object-cover" />
                <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-800 truncate mb-1">{tourRequest.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">{tourRequest.city}</p>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                    <p className="text-sm font-semibold text-gray-700">{participantCount} / {tourRequest.maxGroupSize} joined</p>
                </div>
            </Link>
        </motion.div>
    );
};



// Reusable TabButton for this page
const FilterTab = ({ name, activeTab, setActiveTab, count, requiresAuth }) => {
    const isActive = activeTab === name;
    if (requiresAuth) return null; // Hide if user not logged in

    return (
        <button onClick={() => setActiveTab(name)}
            className="relative px-4 py-2 text-sm font-semibold transition-colors text-gray-500 hover:text-blue-600 focus:outline-none">
            <div className="flex items-center">
                <span className={isActive ? 'text-blue-600' : ''}>{name}</span>
                {count > 0 && (
                    <span className={`ml-2 text-xs font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
                        {count}
                    </span>
                )}
            </div>
            {isActive && <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" layoutId="communityTabUnderline" />}
        </button>
    );
};

const CustomToursPage = () => {
    const { user } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('All');
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let fetchPromise;
        setLoading(true);

        switch (activeTab) {
            case 'Created by Me':
                fetchPromise = customTourService.getMyCreatedTours();
                break;
            case 'I Joined':
                fetchPromise = customTourService.getMyJoinedTours();
                break;
            case 'All':
            default:
                fetchPromise = customTourService.getAllCustomTours();
                break;
        }

        fetchPromise
            .then(data => setTours(data || []))
            .catch(err => {
                console.error(`Failed to fetch for tab ${activeTab}:`, err);
                setTours([]);
            })
            .finally(() => setLoading(false));

    }, [activeTab]);

    return (
        <div className="max-w-screen-xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 text-center md:text-left">
                <div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">Community Adventures</h1>
                   { user.role === "tourist" && <p className="mt-4 text-lg text-gray-600">Join trips proposed by fellow travelers or create your own!</p>}
                </div>
                {user.role === "tourist" && <Link to="/custom-tours/new" className="mt-6 md:mt-0 inline-block py-3 px-6 font-bold text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors">
                    + Propose a Trip
                </Link>}
            </div>

            {/* --- NEW TAB INTERFACE --- */}
            {user.role === "tourist" && <div className="flex justify-center md:justify-start border-b border-gray-200 mb-8">
                <FilterTab name="All" activeTab={activeTab} setActiveTab={setActiveTab} count={activeTab === 'All' ? tours.length : 0} />
                <FilterTab name="Created by Me" activeTab={activeTab} setActiveTab={setActiveTab} count={activeTab === 'Created by Me' ? tours.length : 0} requiresAuth={!user} />
                <FilterTab name="I Joined" activeTab={activeTab} setActiveTab={setActiveTab} count={activeTab === 'I Joined' ? tours.length : 0} requiresAuth={!user} />
            </div>}

            {loading ? <p>Loading...</p> : (
                tours.length > 0 ? (
                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        <AnimatePresence>
                            {tours.map(req => (
                                <motion.div key={req._id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <CustomTourCard tourRequest={req} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <div className="text-center py-16">
                        <h3 className="text-xl font-semibold">No tours found in this category.</h3>
                    </div>
                )
            )}
        </div>
    );
};

export default CustomToursPage;