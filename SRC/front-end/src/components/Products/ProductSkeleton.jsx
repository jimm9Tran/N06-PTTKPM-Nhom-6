// src/components/Products/ProductSkeleton.jsx
import React from 'react';

const ProductSkeleton = () => {
  const skeletonItems = Array.from({ length: 8 });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
      {skeletonItems.map((_, index) => (
        <div key={index} className="animate-pulse flex flex-col items-center">
          <div className="w-full h-[300px] bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
          <div className="mt-4 w-3/4 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="mt-2 w-1/2 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default ProductSkeleton;