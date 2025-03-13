// src/pages/CheckoutPage.jsx
import React, { useState, useEffect } from 'react';
import { createPayment } from '../../services/paymentService';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState('');
  const [amount, setAmount] = useState(0);
  const [orderInfo, setOrderInfo] = useState('');

  // Giả sử ta lấy thông tin đơn hàng từ localStorage hoặc context; để test dùng dữ liệu mẫu:
  useEffect(() => {
    const dummyOrderId = 'ORDER123456789';
    setOrderId(dummyOrderId);
    setAmount(4500000); // Số tiền thanh toán (VND)
    setOrderInfo('Thanh toán đơn hàng ' + dummyOrderId);
  }, []);

  const handleCheckout = async () => {
    try {
      const response = await createPayment(orderId, amount, orderInfo);
      // Chuyển hướng người dùng đến URL thanh toán VNPay
      window.location.href = response.data.url;
    } catch (err) {
      console.error("Error creating payment:", err);
      toast.error("Lỗi khi tạo thanh toán");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 dark:text-white">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-3xl font-bold mb-4">Thanh Toán</h1>
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded shadow">
        <p className="mb-2">Mã đơn hàng: {orderId}</p>
        <p className="mb-2">Số tiền: {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount)}</p>
        <p className="mb-4">Thông tin đơn hàng: {orderInfo}</p>
        <button onClick={handleCheckout} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
          Thanh toán qua VNPay
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
