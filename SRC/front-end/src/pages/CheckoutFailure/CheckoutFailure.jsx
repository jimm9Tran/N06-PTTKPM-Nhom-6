// src/pages/CheckoutFailure.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutFailure = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-100 dark:bg-red-900 dark:text-white">
      <h1 className="text-4xl font-bold mb-4">Thanh toán thất bại!</h1>
      <p className="mb-4">Đã có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.</p>
      <Link to="/" className="text-blue-500 underline">Quay lại trang chủ</Link>
    </div>
  );
};

export default CheckoutFailure;
