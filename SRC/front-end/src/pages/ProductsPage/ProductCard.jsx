// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div
      className="mb-10 section_product"
      data-aos="fade-up"
      data-aos-delay={product.aosDelay}
    >
      <div
        className="box-image h-[300px] p-5 flex justify-center items-center border border-[#f0eeee] rounded-[12px] relative overflow-hidden transition duration-300 group"
      >
        <Link to={`/products/detail/${product.slug}`}>
          <img
            src={product.thumbnail}
            alt={product.title}
            className="object-contain h-auto transition-transform duration-300 transform group-hover:scale-105"
            style={{ margin: 0 }}
          />
        </Link>
      </div>

      {product.product_category_id && (
        <h2 className="font-thin mt-2">
          <Link  to={`/products/${product.product_category_id.slug}`}
                  className="font-thin mt-2 inline-block hover:underline" >
          {product.product_category_id.title}
          </Link>
        </h2>
      )}

      <Link to={`/products/detail/${product.slug}`}>
        <h2 className="font-normal cursor-pointer hover:underline">
          {product.title}
        </h2>
      </Link>

      <h2 className="font-bold text-lg mt-2">
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(product.price)}
      </h2>
    </div>
  );
};

export default ProductCard;
