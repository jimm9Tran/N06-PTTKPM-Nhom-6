import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Heading from '../Shared/Heading';
import ProductCard from './ProductCard';

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="container">
        {/* Header section */}
        <Heading title="Featured Products" subtitle={"Check Out Our Top Products"} />

        {/* Hiển thị các sản phẩm */}
        <ProductCard data={products} />
      </div>
    </div>
  );
}

export default Products;
