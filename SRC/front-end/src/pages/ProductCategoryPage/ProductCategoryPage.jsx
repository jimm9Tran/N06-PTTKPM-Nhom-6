// src/pages/ProductCategoryPage/ProductCategoryPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ProductCard from '../../pages/ProductsPage/ProductCard';
import ProductCardSkeleton from '../ProductsPage/ProductCardSkeleton';
import { getProductsByCategory } from '../../services/productService';
import { toast } from 'react-toastify';

const ProductCategoryPage = () => {
  const { slugCategory } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = parseInt(searchParams.get('page')) || 1;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(pageParam);
  const [totalPages, setTotalPages] = useState(1);
  const [categoryTitle, setCategoryTitle] = useState('');

  useEffect(() => {
    async function fetchCategoryProducts() {
      setLoading(true);
      try {
        const response = await getProductsByCategory(slugCategory, currentPage, 12);
        setProducts(response.data.products || []);
        setTotalPages(response.data.totalPages || 1);
        setCategoryTitle(response.data.categoryTitle || '');
      } catch (error) {
        console.error("Error fetching products by category:", error);
        toast.error("Lỗi khi tải sản phẩm theo danh mục");
      } finally {
        setLoading(false);
      }
    }
    if (slugCategory) {
      fetchCategoryProducts();
    } else {
      setProducts([]);
      setTotalPages(1);
      setLoading(false);
    }
  }, [slugCategory, currentPage]);

  const handlePrev = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      searchParams.set('page', newPage);
      setSearchParams(searchParams);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      searchParams.set('page', newPage);
      setSearchParams(searchParams);
    }
  };

  return (
    <div className='bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden'>
      <div className="container">
        <h1 className="text-2xl font-bold my-5 text-gray-800 dark:text-white">
          {categoryTitle}
        </h1>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {Array.from({ length: 12 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-300">
            Không tìm thấy sản phẩm nào.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              {products.map((product) => (
                <ProductCard key={product._id || product.id} product={product} />
              ))}
            </div>
            {/* Phân trang */}
            <div className="flex justify-center mt-6">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-l disabled:opacity-50 transition-colors"
              >
                Previous
              </button>
              <div className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                {currentPage} / {totalPages}
              </div>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-r disabled:opacity-50 transition-colors"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCategoryPage;
