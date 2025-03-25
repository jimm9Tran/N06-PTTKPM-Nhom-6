// src/pages/CheckoutSuccess.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const CheckoutSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  dark:bg-gray-900 p-6 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center w-full sm:w-4/5 md:w-2/3 lg:w-1/2 xl:w-1/3">
        <FaCheckCircle className="text-green-500 text-6xl mb-4 mx-auto" />
        <h1 className="text-3xl font-semibold mb-4 text-green-600 dark:text-green-400">Thanh toán thành công!</h1>
        <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
          Cảm ơn bạn đã hoàn tất thanh toán đơn hàng. Chúng tôi sẽ xử lý và giao hàng sớm nhất có thể.
        </p>
        <Link 
          to="/" 
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md text-lg font-semibold transition-colors duration-300 transform hover:scale-105"
        >
          Quay lại trang chủ
        </Link>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
