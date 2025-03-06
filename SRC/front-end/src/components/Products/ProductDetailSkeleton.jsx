// src/components/Products/ProductDetailSkeleton.jsx
import React from 'react';

const ProductDetailSkeleton = () => {
  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white dark:bg-gray-900 dark:text-white">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full">
            <div className="w-full h-[300px] bg-gray-300 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-700 animate-pulse" />
          </div>
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <div className="h-4 w-1/3 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-2" />
            <div className="h-8 w-full bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-4" />
            <div className="flex space-x-2 mb-4">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
              ))}
            </div>
            <div className="h-6 w-full bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-2" />
            <div className="h-6 w-1/2 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-6" />

            <div className="flex items-center space-x-4 mb-6">
              <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
            </div>

            <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
        <div className="container mt-12 max-w-4xl mx-auto">
          <div className="h-8 w-1/2 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mx-auto mb-6" />
          <div className="space-y-4">
            <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailSkeleton;