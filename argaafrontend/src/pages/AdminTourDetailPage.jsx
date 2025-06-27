import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import tourService from '../api/tour.service';
import toast from 'react-hot-toast';

const AdminTourDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tour, setTour] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        const fetchTour = async () => {
            try {
                const data = await tourService.getTourById(id);
                setTour(data);
            } catch (error) {
                console.error("Error fetching tour details:", error);
                toast.error("Could not fetch tour details.");
            } finally {
                setLoading(false);
            }
        };
        fetchTour();
    }, [id]);

    const handleUpdate = async (updateData, successMessage) => {
        setIsUpdating(true);
        toast.loading('Updating...');
        try {
            const updatedTour = await tourService.updateTour(id, updateData);
            setTour(updatedTour); // Update local state with new tour data
            toast.dismiss();
            toast.success(successMessage);
        } catch (error) {
            console.error("Update failed:", error);
            toast.dismiss();
            toast.error("Update failed.");
        } finally {
            setIsUpdating(false);
        }
    };
    
    if (loading) return <div>Loading...</div>;
    if (!tour) return <div>Tour not found.</div>;

    return (
        <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="md:col-span-2">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{tour.title}</h1>
                    <p className="text-lg text-gray-500 mb-6">in {tour.city}</p>
                    <img src={tour.coverImage} alt={tour.title} className="w-full h-80 object-cover rounded-lg shadow-md mb-6" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">Description</h2>
                    <p className="text-gray-700 leading-relaxed">{tour.description}</p>
                </div>
                {/* Right Column (Sidebar) */}
                <div className="md:col-span-1 bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold border-b pb-2 mb-4">Tour Details</h3>
                    <div className="space-y-3 text-sm">
                        <p><strong>Guide:</strong> {tour.guide.firstName} {tour.guide.lastName}</p>
                        <p><strong>Price:</strong> ${tour.price}</p>
                        <p><strong>Duration:</strong> {tour.durationHours} hours</p>
                        <p><strong>Max Group:</strong> {tour.maxGroupSize} people</p>
                        <p><strong>Category:</strong> {tour.category}</p>
                        <p><strong>Status:</strong> <span className="font-semibold">{tour.status}</span></p>
                        <p><strong>Published:</strong> <span className="font-semibold">{tour.isPublished ? 'Yes' : 'No'}</span></p>
                    </div>

                    <h3 className="text-xl font-bold border-b pb-2 my-6">Admin Actions</h3>
                    <div className="flex flex-col space-y-3">
                        {tour.status === 'pending' && (
                            <button onClick={() => handleUpdate({ status: 'approved' }, 'Tour Approved!')} disabled={isUpdating} className="w-full text-white bg-green-600 hover:bg-green-700 font-bold py-2 px-4 rounded transition-colors disabled:bg-gray-400">
                                Approve
                            </button>
                        )}
                        {tour.status === 'pending' && (
                            <button onClick={() => handleUpdate({ status: 'rejected' }, 'Tour Rejected.')} disabled={isUpdating} className="w-full text-white bg-red-600 hover:bg-red-700 font-bold py-2 px-4 rounded transition-colors disabled:bg-gray-400">
                                Reject
                            </button>
                        )}
                        {tour.status === 'approved' && !tour.isPublished && (
                            <button onClick={() => handleUpdate({ isPublished: true }, 'Tour Published!')} disabled={isUpdating} className="w-full text-white bg-blue-600 hover:bg-blue-700 font-bold py-2 px-4 rounded transition-colors disabled:bg-gray-400">
                                Publish
                            </button>
                        )}
                        {tour.isPublished && (
                            <button onClick={() => handleUpdate({ isPublished: false }, 'Tour Unpublished.')} disabled={isUpdating} className="w-full text-white bg-yellow-500 hover:bg-yellow-600 font-bold py-2 px-4 rounded transition-colors disabled:bg-gray-400">
                                Unpublish
                            </button>
                        )}
                        <button onClick={() => navigate('/admin/tours')} className="w-full text-gray-700 bg-gray-200 hover:bg-gray-300 font-bold py-2 px-4 rounded transition-colors">
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminTourDetailPage;