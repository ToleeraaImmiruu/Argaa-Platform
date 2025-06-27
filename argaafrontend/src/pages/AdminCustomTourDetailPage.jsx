import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import adminService from '../api/admin.service';
import { UserCircleIcon, CalendarIcon, UsersIcon, MapPinIcon } from '@heroicons/react/24/outline';

const DetailItem = ({ icon: Icon, label, value }) => (
    <div>
        <dt className="flex items-center text-sm font-medium text-gray-500">
            <Icon className="h-5 w-5 text-gray-400 mr-2" />
            <span>{label}</span>
        </dt>
        <dd className="mt-1 text-lg font-semibold text-gray-900">{value}</dd>
    </div>
);

const AdminCustomTourDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tourRequest, setTourRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        setLoading(true);
        adminService.getCustomTourById(id)
            .then(data => setTourRequest(data))
            .catch(() => toast.error("Could not load tour request details."))
            .finally(() => setLoading(false));
    }, [id]);

    const handleStatusUpdate = (newStatus) => {
        setIsUpdating(true);
        const promise = adminService.updateCustomTourStatus(id, newStatus);

        toast.promise(promise, {
            loading: 'Updating status...',
            success: (data) => {
                // Navigate back to the dashboard after a successful update
                navigate('/admin/tours'); // Or just update local state: setTourRequest(data.data.tourRequest)
                return data.message || `Request ${newStatus}.`;
            },
            error: (err) => err.message || 'Update failed.',
        });
        
        promise.finally(() => setIsUpdating(false));
    };

    if (loading) return <p className="text-center p-10">Loading Request Details...</p>;
    if (!tourRequest) return <p className="text-center p-10">Tour Request Not Found.</p>;

    return (
        <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column: Main Content */}
                <div className="md:col-span-2">
                    <img src={tourRequest.coverImage} alt={tourRequest.title} className="w-full h-80 object-cover rounded-lg mb-6 shadow-md" />
                    <h1 className="text-4xl font-bold text-gray-900">{tourRequest.title}</h1>
                    <p className="mt-4 text-gray-700 leading-relaxed">{tourRequest.description}</p>
                </div>

                {/* Right Column: Details & Actions */}
                <div className="md:col-span-1">
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h2 className="text-2xl font-bold border-b pb-3 mb-4">Request Details</h2>
                        <dl className="space-y-4">
                            <DetailItem icon={UserCircleIcon} label="Created By" value={`${tourRequest.creator.firstName} ${tourRequest.creator.lastName}`} />
                            <DetailItem icon={MapPinIcon} label="City / Area" value={tourRequest.city} />
                            <DetailItem icon={CalendarIcon} label="Requested Date" value={new Date(tourRequest.requestedDate).toLocaleDateString()} />
                            <DetailItem icon={UsersIcon} label="Group Size" value={`${tourRequest.participants.length} / ${tourRequest.maxGroupSize} joined`} />
                        </dl>
                        
                        {/* Admin Actions */}
                        {tourRequest.status === 'pending' && (
                            <div className="mt-8 border-t pt-6">
                                <h3 className="text-lg font-semibold text-center mb-4">Review this Request</h3>
                                <div className="flex flex-col space-y-3">
                                    <button onClick={() => handleStatusUpdate('approved')} disabled={isUpdating} className="w-full text-white bg-green-600 hover:bg-green-700 font-bold py-2 px-4 rounded transition-colors disabled:bg-gray-400">
                                        Approve
                                    </button>
                                    <button onClick={() => handleStatusUpdate('rejected')} disabled={isUpdating} className="w-full text-white bg-red-600 hover:bg-red-700 font-bold py-2 px-4 rounded transition-colors disabled:bg-gray-400">
                                        Reject
                                    </button>
                                </div>
                            </div>
                        )}
                        {tourRequest.status !== 'pending' && (
                             <p className="mt-8 border-t pt-6 text-center text-gray-600 font-semibold">
                                This request has already been reviewed.
                                <br/>
                                <span className="text-lg text-blue-600">Status: {tourRequest.status.toUpperCase()}</span>
                             </p>
                        )}
                    </div>
                </div>
            </div>
            <div className="mt-8 text-center">
                <button onClick={() => navigate(-1)} className="text-sm text-blue-600 hover:underline">
                    ← Back to Dashboard
                </button>
            </div>
        </div>
    );
};

export default AdminCustomTourDetailPage;