// src/components/Products/ProductDetail.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetail } from '../../services/productService';
import { CartContext } from '../../context/CartContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetailSkeleton from './ProductDetailSkeleton';

const ProductDetail = () => {
  const { slugProduct } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addProductToCart, fetchCart } = useContext(CartContext);

  useEffect(() => {
    async function fetchDetail() {
      try {
        const response = await getProductDetail(slugProduct);
        const prod = response.data.product;
        setProduct(prod);
        if (prod.sizes && prod.sizes.length > 0) {
          setSelectedSize(prod.sizes[0].size);
        }
      } catch (err) {
        console.error("Error fetching product detail:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [slugProduct]);

  const handleAddToCart = async () => {
    try {
      await addProductToCart(product._id, quantity, selectedSize);
      await fetchCart(); 
      toast.success("Đã thêm sản phẩm vào giỏ hàng");
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Lỗi khi thêm sản phẩm vào giỏ hàng");
    }
  };

  if (loading) return <ProductDetailSkeleton />;
  if (error) return <div className="text-center py-10">Error loading product details.</div>;
  if (!product) return <div className="text-center py-10">Product not found.</div>;

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white dark:bg-gray-900 dark:text-white">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          {/* Phần hiển thị hình ảnh sản phẩm */}
          <div className="lg:w-1/2 w-full">
            <img 
              alt={product.title} 
              className="object-contain object-center rounded border border-gray-200 dark:border-gray-700 transition-transform duration-300 transform hover:scale-105" 
              src={product.thumbnail || "https://via.placeholder.com/600"} 
            />
          </div>
          {/* Phần hiển thị thông tin sản phẩm */}
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {product.product_category_id?.title || "BRAND NAME"}
            </h2>
            <h1 className="text-gray-900 dark:text-white text-3xl title-font font-medium mb-1">
              {product.title}
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                ))}
                <span className="text-gray-600 ml-3">
                  {product.reviewCount || "162 Reviews"}
                </span>
              </span>
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                {/* Ví dụ hiển thị icon mạng xã hội */}
                <a className="text-gray-500" href="#">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a className="ml-2 text-gray-500" href="#">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a className="ml-2 text-gray-500" href="#">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                </a>
              </span>
            </div>
            {/* Phần chọn màu sắc và kích thước */}
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
              <div className="flex">
                <span className="mr-3">Màu sắc</span>
                {product.colors && product.colors.length > 0 ? (
                  product.colors.map((color, index) => (
                    <button
                      key={index}
                      className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"
                      style={{ backgroundColor: color }}
                    ></button>
                  ))
                ) : (
                  <span>Không có màu</span>
                )}
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <select
                    className="rounded border appearance-none border-gray-400 dark:border-gray-600 dark:bg-gray-800 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10 dark:text-white"
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                  >
                    {product.sizes && product.sizes.length > 0 ? (
                      product.sizes.map((s, index) => (
                        <option key={index} value={s.size}>
                          {s.size}
                        </option>
                      ))
                    ) : (
                      <option value="">Tiêu chuẩn</option>
                    )}
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 dark:text-gray-300 pointer-events-none flex items-center justify-center">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            {/* Phần hiển thị giá và nút thêm vào giỏ hàng */}
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900 dark:text-white">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(product.price)}
              </span>
              <button
                className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                onClick={handleAddToCart}
              >
                Thêm vào giỏ hàng
              </button>
              <button className="rounded-full w-10 h-10 bg-gray-200 dark:bg-gray-700 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Phần mô tả sản phẩm */}
        <div className="container mt-12 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-5 text-center">Mô tả sản phẩm</h3>
          <div
            className="prose dark:prose-invert leading-relaxed mx-auto"
            dangerouslySetInnerHTML={{ __html: product.description || "<p>Không có mô tả sản phẩm.</p>" }}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;