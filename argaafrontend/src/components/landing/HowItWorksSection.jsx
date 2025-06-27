import React from 'react';
import { MagnifyingGlassIcon, UserPlusIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const Step = ({ icon: Icon, title, description, delay }) => (
    <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} // Animation runs only once when it enters the screen
        transition={{ duration: 0.5, delay: delay * 0.2 }}
        className="flex flex-col items-center text-center"
    >
        <div className="flex items-center justify-center h-20 w-20 rounded-full bg-white shadow-lg border mb-5">
            <Icon className="h-10 w-10 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <p className="mt-2 text-gray-600">{description}</p>
    </motion.div>
);

const HowItWorksSection = () => (
    <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800">Your Journey in 3 Simple Steps</h2>
            <div className="relative mt-16">
                {/* Dotted line for desktop */}
                <div className="hidden md:block absolute top-10 left-0 w-full h-0.5 border-t-2 border-dashed border-gray-300"></div>
                
                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
                    <Step 
                        icon={MagnifyingGlassIcon} 
                        title="1. Discover" 
                        description="Browse tours from local experts or find community-led trip ideas."
                        delay={0}
                    />
                    <Step 
                        icon={UserPlusIcon} 
                        title="2. Join or Create" 
                        description="Book an existing tour instantly, or propose your own and invite others to join."
                        delay={1}
                    />
                    <Step 
                        icon={MapPinIcon} 
                        title="3. Adventure" 
                        description="Connect with your guide and fellow travelers. It's time to explore!"
                        delay={2}
                    />
                </div>
            </div>
        </div>
    </div>
);

export default HowItWorksSection;