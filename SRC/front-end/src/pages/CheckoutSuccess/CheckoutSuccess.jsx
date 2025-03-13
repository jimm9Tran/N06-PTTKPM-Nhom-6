// src/pages/CheckoutSuccess.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 dark:bg-green-900 dark:text-white">
      <h1 className="text-4xl font-bold mb-4">Thanh toán thành công!</h1>
      <p className="mb-4">Cảm ơn bạn đã thanh toán đơn hàng của chúng tôi.</p>
      <Link to="/" className="text-blue-500 underline">Quay lại trang chủ</Link>
    </div>
  );
};

export default CheckoutSuccess;
