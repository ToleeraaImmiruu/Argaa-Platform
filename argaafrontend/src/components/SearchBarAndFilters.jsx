import React, { useState } from 'react';
import { FunnelIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBarAndFilters = ({ filters, setFilters }) => {
  const [showFilters, setShowFilters] = useState(false);

  const handleChange = (e) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleResetFilters = () => {
    // Tell the parent to reset all filter-related fields
    setFilters(prev => ({ 
      search: prev.search,
      category: '', city: '', minPrice: '', maxPrice: '', availableFrom: '', availableTo: '' 
    }));
  };

  const filterVariants = {
    hidden: { height: 0, opacity: 0, marginTop: '0px' },
    visible: {
      height: 'auto',
      opacity: 1,
      marginTop: '1rem',
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
      height: 0,
      opacity: 0,
      marginTop: '0px',
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  return (
    <div className="relative mb-8 w-full max-w-4xl mx-auto">
      <div className="relative flex items-center bg-white rounded-full shadow-lg p-2 z-20">
        <div className="pl-4 pr-2 text-gray-400">
          <MagnifyingGlassIcon className="h-6 w-6" />
        </div>
        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={handleChange}
          placeholder="Search for adventures, places..."
          className="w-full bg-transparent text-lg focus:outline-none"
        />
        <button
          onClick={() => setShowFilters(prev => !prev)}
          className={`flex items-center space-x-2 ml-4 px-4 py-2 rounded-full transition-colors ${showFilters ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
        >
          <FunnelIcon className="h-5 w-5" />
          <span className="hidden md:inline">Filters</span>
        </button>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            key="filter-box"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={filterVariants}
            className="absolute w-full bg-white rounded-xl shadow-lg p-6 pt-20 -mt-14 z-10"
          >
            {/* The form remains the same */}
            {/* add X icon to hide the filter */}
            <button
              onClick={() => setShowFilters(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" stroke=" 
currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select name="category" value={filters.category} onChange={handleChange} className="mt-1 w-full h-8 border-2 rounded-md border-gray-600 shadow-sm">
                  <option value="">All</option><option value="adventure">Adventure</option><option value="nature">Nature</option><option value="historical">Historical</option><option value="cultural">Cultural</option>
                </select>
              </div>
              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input type="text" name="city" value={filters.city} onChange={handleChange} placeholder="e.g., Adama" className="mt-1 w-full h-8 rounded-md border-2 border-gray-600 shadow-sm" />
              </div>
              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Price Range</label>
                <div className="flex items-center space-x-2 mt-1">
                  <input type="number" name="minPrice" value={filters.minPrice} onChange={handleChange} placeholder="Min" className="w-full h-8 rounded-md border-gray-600 border-2" />
                  <input type="number" name="maxPrice" value={filters.maxPrice} onChange={handleChange} placeholder="Max" className="w-full h-8 rounded-md border-gray-600 border-2" />
                </div>
              </div>
              {/* Date Range */}
              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-gray-700">Available Between</label>
                <div className="flex items-center space-x-2 mt-1">
                  <input type="date" name="availableFrom" value={filters.availableFrom} onChange={handleChange} className="w-full rounded-md border-gray-300" />
                  <span className="text-gray-500">to</span>
                  <input type="date" name="availableTo" value={filters.availableTo} onChange={handleChange} className="w-full rounded-md border-gray-300" />
                </div>
              </div>
            </div>
            <div className="mt-6 border-t pt-4 text-right">
              <button onClick={handleResetFilters} className="text-sm font-medium text-red-600/90 border-rounded border-1 text-white bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition-colors">
                Reset All Filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBarAndFilters;