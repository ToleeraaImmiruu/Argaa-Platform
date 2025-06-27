import React from 'react';

const ThreeDModelViewer = ({ srcUrl, title }) => {
  return (
    // We use a fixed height for a taller, more "portrait" view
    <div className="h-[450px] md:h-[600px] w-full bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
      <iframe
        title={title}
        frameBorder="0"
        allowFullScreen
        mozallowfullscreen="true"
        webkitallowfullscreen="true"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        src={srcUrl}
        className="w-full h-full"
      ></iframe>
    </div>
  );
};
export default ThreeDModelViewer;