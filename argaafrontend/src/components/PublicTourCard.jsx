// src/components/PublicTourCard.jsx
// ...
import { UsersIcon, StarIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';



const PublicTourCard = ({ tour }) => {
  return (
    <div className="group bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col">
      <div className="relative">
        <img src={tour.coverImage} alt={tour.title} className="w-full h-56 object-cover" />
        <div className="absolute top-0 right-0 p-2 bg-blue-600 text-white font-bold rounded-bl-xl">
          ${tour.price}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800 truncate mb-1 group-hover:text-blue-600 transition-colors">
          {tour.title}
        </h3>
        <p className="text-sm text-gray-500 mb-3">{tour.city}</p>
        
        {/* Ratings and Group Size */}
        <div className="flex items-center justify-between text-sm mt-auto pt-3 border-t">
          <div className="flex items-center space-x-1">
            <StarIcon className="h-5 w-5 text-yellow-400" />
            <span className="text-gray-700 font-semibold">{tour.ratingsAverage.toFixed(1)}</span>
            <span className="text-gray-500">({tour.ratingsQuantity})</span>
          </div>
          <div className="flex items-center space-x-1">
            <UsersIcon className="h-5 w-5 text-gray-400" />
            <span className="text-gray-700 font-semibold">{tour.maxGroupSize} slots</span>
          </div>
        </div>
        
        <Link
          to={`/tours/${tour._id}`}
          className="mt-4 block w-full text-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-transform duration-200 hover:scale-105"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PublicTourCard;