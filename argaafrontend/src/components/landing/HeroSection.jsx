import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => (
    <div className="relative h-[60vh] md:h-[80vh] flex items-center justify-center text-white overflow-hidden">
        {/* Animated Background Image */}
        <div className="absolute inset-0">
            <motion.div
                className="w-full h-full"
                // This makes the image slightly larger than the container
                initial={{ scale: 1.1, x: "-5%" }} 
                // Animate it to the right over a long duration
                animate={{ x: "5%" }} 
                transition={{
                    duration: 40, // A long duration for a slow, subtle pan
                    repeat: Infinity, // Loop the animation
                    repeatType: "reverse", // Go back and forth smoothly
                    ease: "linear",
                }}
            >
                <img 
                    src="https://unsplash.com/photos/picturesque-village-nestled-at-the-foot-of-snow-capped-mountains-TX-AxJV1mBw" 
                    alt="Lush green landscapes of Oromia" 
                    className="w-full h-full object-cover"
                />
            </motion.div>
            <div className="absolute inset-0 bg-black/50"></div> {/* Dark overlay */}
        </div>
        
        {/* Content remains the same but with updated links */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center px-4"
        >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">Your Oromian Adventure Awaits</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-200">
                Discover authentic tours from local guides or propose your own dream trip with the community.
            </p>
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
                <Link to="/login" className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-transform hover:scale-105">
                    Explore Tours
                </Link>
                <Link to="/signup" className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition-transform hover:scale-105">
                    Become a Guide
                </Link>
            </div>
        </motion.div>
    </div>
);

export default HeroSection;