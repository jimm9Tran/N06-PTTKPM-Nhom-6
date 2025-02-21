import React from 'react';
import { FaHeart, FaStar } from 'react-icons/fa';
import Button from '../../components/Shared/Button';

const ProductCard = ({ product, onClick }) => {
  return (
    <div
      className="group bg-white border rounded-lg overflow-hidden shadow-md hover:shadow-lg cursor-pointer"
      onClick={onClick}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-[200px] object-cover transition-transform transform group-hover:scale-110 duration-300"
        />
        <div className="absolute top-2 right-2">
          <button className="text-gray-500 hover:text-primary">
            <FaHeart />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <p className="text-sm text-gray-500">{product.category}</p>
        <h3 className="text-lg font-semibold text-gray-900 mt-1">{product.title}</h3>

        {/* Rating */}
        <div className="flex items-center mt-1 text-yellow-400">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              className={`${
                index < product.rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Price */}
        <p className="text-xl font-bold text-gray-900 mt-2">{product.price} ₫</p>
      </div>
      
      {/* Add to Cart Button */}
      <div className="p-4 pt-0">
        <Button text="Add to Cart" bgColor="bg-primary" textColor="text-white" />
      </div>
    </div>
  );
};

export default ProductCard;
