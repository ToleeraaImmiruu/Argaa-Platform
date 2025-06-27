import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import tourService from '../api/tour.service';

const EditTourPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        tourService.getTourById(id)
            .then(data => {
                // Format dates for the input field if they exist
                const formattedData = {
                    ...data,
                    availableDates: data.availableDates?.map(d => new Date(d).toISOString().split('T')[0]) || []
                };
                setFormData(formattedData);
            })
            .catch(() => toast.error("Could not load tour data."))
            .finally(() => setLoading(false));
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatePromise = tourService.updateTour(id, formData);
        toast.promise(updatePromise, {
            loading: 'Updating tour...',
            success: () => {
                navigate(`/tours/${id}`); // Go back to the detail page
                return 'Tour updated successfully!';
            },
            error: (err) => err.message || 'Update failed.',
        });
    };

    if (loading) return <p>Loading tour data...</p>;
    if (!formData) return <p>Tour not found.</p>;

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6">Edit Tour: {formData.title}</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Re-use the same form fields from CreateTourPage here */}
                {/* Example for title */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium">Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300" />
                </div>
                {/* ... Add all other fields: description, price, city, etc. */}

                <div className="text-right">
                    <button type="submit" className="px-6 py-2 font-bold text-white bg-blue-600 rounded-md">Save Changes</button>
                </div>
            </form>
        </div>
    );
};

export default EditTourPage;