import React from 'react';
import { ClockIcon, UsersIcon, TagIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const Highlight = ({ icon: Icon, label, value }) => (
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
            <Icon className="h-8 w-8 text-blue-600" />
        </div>
        <div>
            <dt className="text-sm font-semibold text-gray-900">{label}</dt>
            <dd className="mt-1 text-base text-gray-700">{value}</dd>
        </div>
    </div>
);


const TourInfoHighlights = ({ tour }) => {
  return (
    <div className="my-12">
      <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
        <Highlight icon={ClockIcon} label="Duration" value={`${tour.durationHours} hours`} />
        <Highlight icon={UsersIcon} label="Max Group Size" value={`${tour.maxGroupSize} people`} />
        <Highlight icon={TagIcon} label="Category" value={tour.category.charAt(0).toUpperCase() + tour.category.slice(1)} />
        <Highlight icon={UserCircleIcon} label="Guide" value={`${tour.guide.firstName} ${tour.guide.lastName}`} />
      </dl>
    </div>
  );
};

export default TourInfoHighlights;