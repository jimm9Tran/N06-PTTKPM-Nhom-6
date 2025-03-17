// src/pages/CheckoutPage.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { checkoutOrder } from '../../services/orderService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CheckoutPage = () => {
  const { cart, fetchCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    message: '',
    paymentMethod: 'cash' // "cash" hoặc "bank"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!cart || !cart.products || cart.products.length === 0) {
      toast.error("Giỏ hàng của bạn đang trống.");
      return;
    }

    try {
      const orderData = {
        cart_id: cart._id,
        userInfo: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          message: formData.message,
        },
        paymentMethod: formData.paymentMethod,
        total: cart.totalPrice
      };

      if (formData.paymentMethod === 'bank') {
        const response = await checkoutOrder(orderData);
        window.location.href = response.data.url;
      } else {
        const response = await checkoutOrder(orderData);
        toast.success("Đặt hàng thành công");
        navigate(`/checkout/success/${response.data.orderId}`);
      }
    } catch (error) {
      console.error("Checkout error: ", error);
      toast.error("Lỗi khi đặt hàng. Vui lòng thử lại.");
    }
  };

  const subtotal = cart?.totalPrice || 0;
  const taxes = subtotal * 0.0;
  const shipping = 0;
  const total = subtotal + taxes + shipping;

  return (
    <div className="min-h-screen py-10 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container mx-auto px-4">
        {/* <h1 className="text-4xl font-extrabold text-center mb-10 text-blue-600 dark:text-blue-400">
          Thanh Toán
        </h1> */}
        <form onSubmit={handleCheckout} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12 flex flex-col md:flex-row gap-8">
          {/* Form thông tin khách hàng */}
          <div className="md:w-2/3">
            <h2 className="text-2xl font-semibold mb-6 border-b pb-2 border-gray-300 dark:border-gray-700">
              Thông tin thanh toán
            </h2>
            <div className="mb-5">
              <label htmlFor="fullName" className="block text-lg font-medium mb-2">
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                id="fullName" 
                name="fullName" 
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Nhập họ và tên" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
            <div className="mb-5">
              <label htmlFor="email" className="block text-lg font-medium mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Nhập email" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
            <div className="mb-5">
              <label htmlFor="phone" className="block text-lg font-medium mb-2">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                id="phone" 
                name="phone" 
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Nhập số điện thoại" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
            <div className="mb-5">
              <label htmlFor="address" className="block text-lg font-medium mb-2">
                Địa chỉ <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                id="address" 
                name="address" 
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Nhập địa chỉ nhận hàng" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
            <div className="mb-5">
              <label htmlFor="message" className="block text-lg font-medium mb-2">
                Ghi chú
              </label>
              <textarea 
                id="message" 
                name="message" 
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Nhập ghi chú (nếu có)" 
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              ></textarea>
            </div>
            <div className="mb-5">
              <span className="block text-lg font-medium mb-2">Phương thức thanh toán <span className="text-red-500">*</span></span>
              <div className="flex items-center space-x-6">
                <label className="inline-flex items-center">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="cash"
                    checked={formData.paymentMethod === "cash"}
                    onChange={handleInputChange}
                    className="form-radio text-blue-500"
                  />
                  <span className="ml-2 text-lg">Thanh toán khi nhận hàng</span>
                </label>
                <label className="inline-flex items-center">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="bank"
                    checked={formData.paymentMethod === "bank"}
                    onChange={handleInputChange}
                    className="form-radio text-blue-500"
                  />
                  <span className="ml-2 text-lg">Thanh toán qua VNPay</span>
                </label>
              </div>
            </div>
          </div>
          {/* Tóm tắt đơn hàng */}
          <div className="md:w-1/3">
            <h2 className="text-2xl font-bold mb-6 border-b pb-2 border-gray-300 dark:border-gray-700">Đơn hàng của bạn</h2>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow p-4 space-y-4">
              {cart && cart.products && cart.products.length > 0 ? (
                cart.products.map((item) => (
                  <div key={`${item.product_id}-${item.size}`} className="flex items-center border-b pb-2">
                    <img
                      className="w-16 h-16 object-contain mr-4 rounded"
                      src={item.productInfor?.thumbnail || "https://via.placeholder.com/100"}
                      alt={item.productInfor?.title || "Hình sản phẩm"}
                    />
                    <div>
                      <p className="font-semibold text-lg">{item.productInfor?.title}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Size: {item.size}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">SL: {item.quantity}</p>
                    </div>
                    <div className="ml-auto font-bold text-lg">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(item.totalPrice || 0)}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-lg">Giỏ hàng của bạn đang trống.</p>
              )}
              <div className="flex justify-between border-t pt-4">
                <span className="font-bold text-xl">Tạm tính:</span>
                <span className="font-bold text-xl">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(cart?.totalPrice || 0)}
                </span>
              </div>
            </div>
            <div className="mt-6">
              {formData.paymentMethod === "bank" ? (
                <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg text-xl font-semibold">
                  Tiến hành thanh toán
                </button>
              ) : (
                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg text-xl font-semibold">
                  Đặt hàng
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
