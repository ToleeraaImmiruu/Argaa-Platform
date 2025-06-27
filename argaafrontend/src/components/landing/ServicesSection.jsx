import React from 'react';
import { MapIcon, UsersIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

const ServiceCard = ({ icon: Icon, title, description }) => (
    <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mx-auto mb-4">
            <Icon className="h-8 w-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <p className="mt-2 text-gray-600">{description}</p>
    </div>
);

const ServicesSection = () => (
    <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-800">Everything You Need in One Place</h2>
            <p className="mt-2 text-lg text-gray-600">Whether you're exploring or guiding, Argaa connects you.</p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                <ServiceCard 
                    icon={MapIcon} 
                    title="Discover Unique Tours" 
                    description="Browse a curated selection of tours led by expert local guides who know the hidden gems."
                />
                <ServiceCard 
                    icon={UsersIcon} 
                    title="Create Community Trips" 
                    description="Can't find the perfect trip? Propose your own and invite other travelers to join your adventure."
                />
                <ServiceCard 
                    icon={BriefcaseIcon} 
                    title="Guide & Host" 
                    description="Share your local knowledge and passion. Create tour listings, manage bookings, and earn an income."
                />
            </div>
        </div>
    </div>
);

export default ServicesSection;