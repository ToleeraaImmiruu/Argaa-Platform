import React from 'react';
import { Link } from 'react-router-dom';
import PublicTourCard from '../PublicTourCard';

// New mock data focused on Oromia tourism sites
const mockTours = [
    { 
        _id: '1', 
        title: 'Wenchi Crater Lake Escape', 
        city: 'Near Ambo', 
        price: 350, 
        coverImage: 'https://images.unsplash.com/photo-1576026366352-3215a4a58434?q=80&w=2070', 
        ratingsAverage: 4.9, 
        ratingsQuantity: 152 
    },
    { 
        _id: '2', 
        title: 'Bale Mountains National Park Trek', 
        city: 'Dinsho', 
        price: 900, 
        coverImage: 'https://images.unsplash.com/photo-1543616016-00c0f04c6f37?q=80', 
        ratingsAverage: 5.0, 
        ratingsQuantity: 210 
    },
    { 
        _id: '3', 
        title: 'Adama City & Sodere Hot Springs', 
        city: 'Adama (Nazret)', 
        price: 250, 
        coverImage: 'https://images.unsplash.com/photo-1588783454364-a6a7a7267155?q=80', 
        ratingsAverage: 4.7, 
        ratingsQuantity: 88 
    },
    { 
        _id: '4', 
        title: 'Sof Omar Caves Exploration', 
        city: 'Near Goro', 
        price: 600, 
        coverImage: 'https://images.unsplash.com/photo-1605638195240-6393961b3539?q=80', 
        ratingsAverage: 4.8, 
        ratingsQuantity: 64 
    },
];

const FeaturedToursSection = () => (
    <div className="py-16">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800">Featured Oromian Adventures</h2>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {mockTours.map(tour => <PublicTourCard key={tour._id} tour={tour} />)}
            </div>
            <div className="mt-12 text-center">
                <Link to="/login" className="px-8 py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
                    View All Tours
                </Link>
            </div>
        </div>
    </div>
);

export default FeaturedToursSection;