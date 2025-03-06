// src/components/ProductCardSkeleton.jsx
import React from 'react';

const ProductCardSkeleton = () => {
  return (
    <div className="mb-10 section_product animate-pulse" data-aos="fade-up">
      <div className="box-image h-[300px] p-5 flex justify-center items-center border border-[#f0eeee] rounded-[12px] relative overflow-hidden">
        <div className="w-full h-full bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>
      <div className="mt-2 h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
      <div className="mt-2 h-6 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
      <div className="mt-2 h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
    </div>
  );
};

export default ProductCardSkeleton;