import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import customTourService from '../api/customTour.service';

const CreateCustomTourPage = () => {
    // --- CHANGE 1: UPDATE THE INITIAL STATE ---
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        city: '',
        requestedDate: '',
        maxGroupSize: 10, // Provide a sensible default value
        coverImage: 'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?q=80&w=1974',
    });
    
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // The ...formData spread will now correctly include the new maxGroupSize
        const tourData = {
            ...formData,
            maxGroupSize: Number(formData.maxGroupSize),
        };
        
        const promise = customTourService.createCustomTour(tourData);

        toast.promise(promise, {
            loading: 'Submitting your request...',
            success: (data) => {
            navigate('/custom-tours', { state: { refresh: true } });
            return data.message || 'Request submitted for approval!';
            },
            error: (err) => err.response?.data?.message || 'Submission failed.',
        });

        setLoading(false);
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
                 <div className="mt-8 text-start text-bold">
                <button onClick={() => navigate(-1)} className="text-lg text-center text-blue-600 hover:underline">
                    ← Back 
                </button>
            </div>
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-900">Propose a New Adventure</h1>
                    <p className="mt-2 text-lg text-gray-600">Have an idea for a tour? Share it with the community and let's make it happen!</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-semibold text-gray-700">Tour Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} required className="mt-1 h-10 border-2 block w-full rounded-md border-gray-600 shadow-sm" placeholder="e.g., A Day Trip to Wenchi Crater Lake"/>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-semibold text-gray-700">Describe Your Ideal Trip</label>
                        <textarea name="description" rows="4" value={formData.description} onChange={handleChange} required className="mt-1 block w-full border-2 rounded-md border-gray-600 shadow-sm" placeholder="What would you like to see and do?"></textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="city" className="block text-sm font-semibold text-gray-700">City or Area</label>
                            <input type="text" name="city" value={formData.city} onChange={handleChange} required className="mt-1 block w-full h-10 border-2 rounded-md border-gray-600 shadow-sm" placeholder="e.g., Near Ambo"/>
                        </div>
                        <div>
                            <label htmlFor="requestedDate" className="block text-sm font-semibold text-gray-700">Ideal Date</label>
                            <input type="date" name="requestedDate" value={formData.requestedDate} onChange={handleChange} required className="mt-1 block h-10 border-2 w-full rounded-md border-gray-600 shadow-sm"/>
                        </div>
                    </div>
                    
                    {/* --- CHANGE 2: ADD THE NEW INPUT FIELD --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                           <label htmlFor="maxGroupSize" className="block text-sm font-semibold text-gray-700">Max Group Size</label>
                           <input type="number" name="maxGroupSize" value={formData.maxGroupSize} onChange={handleChange} min="2" max="50" required className="mt-1 h-10 border-2 block w-full rounded-md border-gray-600 shadow-sm"/>
                           <p className="text-xs text-gray-500 mt-1">How many people can join? (Including you).</p>
                        </div>
                        <div>
                            <label htmlFor="coverImage" className="block text-sm font-semibold text-gray-700">Cover Image URL</label>
                            <input type="url" name="coverImage" value={formData.coverImage} onChange={handleChange} required className="mt-1 block h-10 border-2 w-full rounded-md border-gray-600 shadow-sm"/>
                        </div>
                    </div>

                     <div className="text-right">
                        <button type="submit" disabled={loading} className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400">
                            Submit Request
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default CreateCustomTourPage;