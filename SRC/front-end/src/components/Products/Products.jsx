// src/components/Products/Products.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Heading from '../Shared/Heading';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductSkeleton';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3000/')
      .then(response => {
        setProducts(response.data.products);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <Heading 
        title="Most Popular Sneaker" 
        subtitle="Nơi các mẫu giày sneaker mới nhất với mức giá Steal Deal" 
      />
      {loading ? <ProductCardSkeleton /> : <ProductCard data={products} />}
    </div>
  );
}

export default Products;