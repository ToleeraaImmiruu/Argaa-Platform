import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import adminService from '../api/admin.service';

// Reusable StatusBadge component
const StatusBadge = ({ status }) => {
    const styles = {
        pending: 'bg-yellow-100 text-yellow-800',
        approved: 'bg-blue-100 text-blue-800',
        rejected: 'bg-red-100 text-red-800',
        full: 'bg-indigo-100 text-indigo-800',
        converted: 'bg-green-100 text-green-800',
    };
    const text = status.charAt(0).toUpperCase() + status.slice(1);
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status] || 'bg-gray-100 text-gray-800'}`}>{text}</span>;
};

// Reusable TabButton component
const TabButton = ({ name, activeTab, setActiveTab }) => {
  const isActive = activeTab === name;
  return (
    <button onClick={() => setActiveTab(name)} className="relative px-4 py-2 text-lg font-semibold transition-colors text-gray-500 hover:text-blue-600">
      <span className={isActive ? 'text-blue-600' : ''}>{name}</span>
      {isActive && <motion.div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600" layoutId="adminUnderline" />}
    </button>
  );
};

const AdminDashboard = () => {
    // State for switching between views
    const [activeTab, setActiveTab] = useState('Official Tours');

    // State for official tours
    const [officialTours, setOfficialTours] = useState([]);
    const [officialToursFilter, setOfficialToursFilter] = useState('all');
    const [officialToursLoading, setOfficialToursLoading] = useState(true);
    
    // State for custom tour requests
    const [customTours, setCustomTours] = useState([]);
    const [customToursFilter, setCustomToursFilter] = useState('all'); // Default to pending for admin action
    const [customToursLoading, setCustomToursLoading] = useState(true);

    // Effect for fetching official tours
    useEffect(() => {
        if (activeTab === 'Official Tours') {
            setOfficialToursLoading(true);
            adminService.getOfficialTours(officialToursFilter)
                .then(data => setOfficialTours(data))
                .catch(error => console.error("Failed to fetch official tours:", error))
                .finally(() => setOfficialToursLoading(false));
        }
    }, [activeTab, officialToursFilter]);
    
    // Effect for fetching custom tour requests
    useEffect(() => {
        if (activeTab === 'Community Requests') {
            setCustomToursLoading(true);
            adminService.getCustomTours(customToursFilter)
                .then(data => setCustomTours(data))
                .catch(error => console.error("Failed to fetch custom tours:", error))
                .finally(() => setCustomToursLoading(false));
        }
    }, [activeTab, customToursFilter]);

    return (
        <div className="p-4 md:p-6 bg-white rounded-lg shadow-lg animate-fadeIn">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
            <p className="text-gray-500 mb-6">Oversee and manage all platform activities.</p>
            
            <div className="flex border-b border-gray-200 mb-6">
                <TabButton name="Official Tours" activeTab={activeTab} setActiveTab={setActiveTab} />
                <TabButton name="Community Requests" activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    {/* --- Official Tours View --- */}
                    {activeTab === 'Official Tours' && (
                        <div>
                            <div className="flex space-x-2 mb-4">
                                {['all', 'pending', 'approved', 'rejected'].map(status => (
                                    <button key={status} onClick={() => setOfficialToursFilter(status)} className={`px-4 py-2 text-sm rounded-md transition-colors ${officialToursFilter === status ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</button>
                                ))}
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white">
                                    {/* Table for Official Tours */}
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Tour Title</th>
                                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Guide</th>
                                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                            <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {officialToursLoading ? <tr><td colSpan="4" className="text-center py-4">Loading...</td></tr> : officialTours.map(tour => (
                                            <tr key={tour._id} className="hover:bg-gray-50">
                                                <td className="py-4 px-4 font-medium">{tour.title}</td>
                                                <td className="py-4 px-4 text-gray-500">{tour.guide?.firstName}</td>
                                                <td className="py-4 px-4"><StatusBadge status={tour.status} /></td>
                                                <td className="py-4 px-4 text-right"><Link to={`/tours/${tour._id}`} className="text-blue-600 hover:underline font-medium">View</Link></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* --- Community Requests View --- */}
                    {activeTab === 'Community Requests' && (
                        <div>
                            <div className="flex space-x-2 mb-4">
                                {['all','pending', 'approved', 'rejected'].map(status => (
                                    <button key={status} onClick={() => setCustomToursFilter(status)} className={`px-4 py-2 text-sm rounded-md transition-colors ${customToursFilter === status ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</button>
                                ))}
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white">
                                    {/* Table for Custom Tour Requests */}
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Request Title</th>
                                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Creator</th>
                                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                            <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {customToursLoading ? <tr><td colSpan="5" className="text-center py-4">Loading...</td></tr> : customTours.map(req => (
                                            <tr key={req._id} className="hover:bg-gray-50">
                                                <td className="py-4 px-4 font-medium">{req.title}</td>
                                                <td className="py-4 px-4 text-gray-500">{req.creator?.firstName} {req.creator?.lastName}</td>
                                                <td className="py-4 px-4 text-gray-500">{new Date(req.requestedDate).toLocaleDateString()}</td>
                                                <td className="py-4 px-4"><StatusBadge status={req.status} /></td>
                                                <td className="py-4 px-4 text-right">
                                                    {/* We will create this page in the next step */}
                                                    <Link to={`/admin/custom-tours/${req._id}`} className="text-blue-600 hover:underline font-medium">Review</Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;