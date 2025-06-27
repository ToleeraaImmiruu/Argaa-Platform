import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Import all necessary services and components
import tourService from '../api/tour.service';
import PublicTourCard from '../components/PublicTourCard';
import SearchBarAndFilters from '../components/SearchBarAndFilters';
import { UsersIcon } from '@heroicons/react/24/solid'; // For a nice icon

// --- A New Reusable Card for Community Tours ---
const CommunityTourCard = ({ tourRequest }) => {
    const participantCount = tourRequest.participants?.length || 0;
    const progressPercentage = (participantCount / tourRequest.maxGroupSize) * 100;

    return (
        <motion.div whileHover={{ y: -5 }} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
            <Link to={`/custom-tours/${tourRequest._id}`} className="flex flex-col h-full">
                <img src={tourRequest.coverImage} alt={tourRequest.title} className="w-full h-48 object-cover" />
                <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-gray-800 truncate mb-1">{tourRequest.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">{tourRequest.city}</p>
                    
                    <div className="mt-auto">
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                        </div>
                        <div className="flex items-center text-sm font-semibold text-gray-700">
                            <UsersIcon className="h-4 w-4 mr-1.5 text-gray-500"/>
                            {participantCount} / {tourRequest.maxGroupSize} Joined
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

// --- The Main Upgraded Dashboard ---
const TouristDashboard = () => {
  
  // State for official tours
  const [officialTours, setOfficialTours] = useState([]);
  const [officialToursLoading, setOfficialToursLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState({});

  // Fetch official tours when filters change
  useEffect(() => {
    const handler = setTimeout(() => {
      setOfficialToursLoading(true);
      const cleanFilters = Object.fromEntries(Object.entries(activeFilters).filter(([_, v]) => v));
      tourService.getPublicTours(cleanFilters)
        .then(data => setOfficialTours(data))
        .catch(err => console.error(err))
        .finally(() => setOfficialToursLoading(false));
    }, 500);
    return () => clearTimeout(handler);
  }, [activeFilters]);

  // Fetch community tours when the tab is active
  console.log("the official tours-=====", officialTours)

  return (
    <div className="animate-fadeIn max-w-screen-xl mx-auto px-4">
      {/* --- Welcoming Header --- */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">Find Your Next Adventure</h1>
        <p className="mt-4 text-lg text-gray-600">Browse professionally-guided tours or join an adventure proposed by the community!</p>
      </div>
      
     

      <AnimatePresence mode="wait">
        <motion.div
          key="official-tours"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
         
            <div>
              <SearchBarAndFilters filters={activeFilters} setFilters={setActiveFilters} />
              <div className="text-center mb-8">
                <Link to="/custom-tours/new" className="inline-block py-3 px-6 font-bold text-white bg-green-600 rounded-md hover:bg-green-700 transition-transform hover:scale-105">
                  + Propose a New Trip
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 mt-8">
                {officialToursLoading ? <p>Loading...</p> : officialTours.map((tour) => <PublicTourCard key={tour._id} tour={tour} />)}
              </div>
            </div>
          
          
          
        </motion.div>
      </AnimatePresence>
    </div>
  );
};



export default TouristDashboard;