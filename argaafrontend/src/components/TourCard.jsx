import React from 'react';
import { Link } from 'react-router-dom';

// A helper function to format the status badge
const StatusBadge = ({ status, isPublished }) => {
  let bgColor, textColor, text;

  if (status === 'approved' && isPublished) {
    bgColor = 'bg-green-100';
    textColor = 'text-green-800';
    text = 'Published';
  } else if (status === 'approved' && !isPublished) {
    bgColor = 'bg-blue-100';
    textColor = 'text-blue-800';
    text = 'Approved';
  } else if (status === 'pending') {
    bgColor = 'bg-yellow-100';
    textColor = 'text-yellow-800';
    text = 'Pending';
  } else if (status === 'rejected') {
    bgColor = 'bg-red-100';
    textColor = 'text-red-800';
    text = 'Rejected';
  } else {
    bgColor = 'bg-gray-100';
    textColor = 'text-gray-800';
    text = 'Unknown';
  }

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${bgColor} ${textColor}`}>
      {text}
    </span>
  );
};

const TourCard = ({ tour }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <img src={tour.coverImage} alt={tour.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800 truncate">{tour.title}</h3>
          <StatusBadge status={tour.status} isPublished={tour.isPublished} />
        </div>
        <p className="text-sm text-gray-600 mb-2">{tour.city}</p>
        <div className="flex justify-between items-center text-sm text-gray-700">
          <span>Price: <span className="font-semibold">${tour.price}</span></span>
          <span>Max Group: <span className="font-semibold">{tour.maxGroupSize}</span></span>
        </div>
       <div className="mt-4 flex justify-end">
        <Link to={`/tours/${tour._id}/manage`} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Manage
        </Link>
      </div>
      </div>
    </div>
  );
};

export default TourCard;