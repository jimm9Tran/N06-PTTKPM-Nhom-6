// src/pages/ProductDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '../../components/Products/ProductDetail';
import { getProductDetail } from '../../services/productService';

const ProductDetailPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDetail() {
      try {
        const response = await getProductDetail(slug);
        setProduct(response.data.product);
      } catch (err) {
        console.error("Error fetching product detail:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error || !product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = (product) => {
    // Thực hiện logic thêm sản phẩm vào giỏ hàng
    console.log("Adding product to cart:", product);
  };

  return (
    <ProductDetail product={product} onAddToCart={handleAddToCart} />
  );
};

export default ProductDetailPage;
