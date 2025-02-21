// ProductPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard'; // Import ProductCard component
import { useNavigate } from 'react-router-dom';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products with pagination
    axios
      .get(`http://localhost:3000/products?page=${currentPage}`)
      .then((response) => {
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, [currentPage]);

  const handleProductClick = (productSlug) => {
    // Navigate to product detail page
    navigate(`/products/${productSlug}`);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => handleProductClick(product.slug)}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8">
        <button
          className={`px-4 py-2 rounded-md border ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : ''}`}
          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`px-4 py-2 mx-2 rounded-md border ${currentPage === index + 1 ? 'bg-primary text-white' : 'bg-gray-100'}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={`px-4 py-2 rounded-md border ${currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : ''}`}
          onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
