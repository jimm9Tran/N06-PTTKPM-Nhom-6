// src/pages/ProductDetailPage/ProductDetailPage.jsx
import React, { useEffect, useState } from 'react';
import ProductDetail from '../../components/Products/ProductDetail';

const ProductDetailPage = () => {
  return (
    <div className='bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden'>
      <ProductDetail />
    </div>
  );
};

export default ProductDetailPage;