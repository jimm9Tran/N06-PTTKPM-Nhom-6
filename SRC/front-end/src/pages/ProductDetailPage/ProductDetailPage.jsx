import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetail } from '../../services/productService';
import ProductDetail from '../../components/Products/ProductDetail';

const ProductDetailPage = () => {
  // Lấy tham số slugProduct từ URL
  const { slugProduct } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDetail() {
      try {
        const response = await getProductDetail(slugProduct);
        setProduct(response.data.product);
      } catch (err) {
        console.error("Error fetching product detail:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [slugProduct]);

  if (loading) return <div className="container mx-auto p-4">Loading...</div>;
  if (error) return <div className="container mx-auto p-4">Error loading product details</div>;
  if (!product) return <div className="container mx-auto p-4">Product not found</div>;

  return <ProductDetail product={product} />;
};

export default ProductDetailPage;
