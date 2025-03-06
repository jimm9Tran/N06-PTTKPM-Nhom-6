// src/pages/ProductsPage/ProductsSkeleton.jsx
import React from 'react';
import ProductCardSkeleton from './ProductCardSkeleton';

const ProductsSkeleton = () => {
  const skeletonArray = Array.from({ length: 12 });

  return (
    <div className="mb-10 section_product">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 place-items-center">
        {skeletonArray.map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default ProductsSkeleton;