import React from 'react';
import { motion } from 'framer-motion';

const ArtisticImageGallery = ({ images }) => {
  if (!images || images.length === 0) return null;

  const imageVariants = {
    hover: { scale: 1.05, filter: "brightness(1.1)" },
  };

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold mb-6">Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img, index) => {
          // Create a dynamic, non-uniform layout
          const colSpan = index === 0 || index === 3 ? 'col-span-2' : '';
          const rowSpan = index === 0 || index === 3 ? 'row-span-2' : '';
          
          return (
            <motion.div
              key={index}
              className={`overflow-hidden rounded-xl shadow-lg ${colSpan} ${rowSpan}`}
              variants={imageVariants}
              whileHover="hover"
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <img src={img} alt={`Tour gallery image ${index + 1}`} className="w-full h-full object-cover" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
export default ArtisticImageGallery;