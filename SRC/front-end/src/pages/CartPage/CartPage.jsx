// src/pages/CartPage/CartPage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cart, loading, error, fetchCart, updateProductQuantity, removeProductFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleQuantityChange = async (productId, newQuantity, size) => {
    const quantity = parseInt(newQuantity);
    if (isNaN(quantity) || quantity < 1) return;
    try {
      await updateProductQuantity(productId, quantity, size);
      toast.success("Cập nhật giỏ hàng thành công");
    } catch (err) {
      console.error("Error updating cart:", err);
      toast.error("Lỗi khi cập nhật sản phẩm");
    }
  };

  const handleDelete = async (productId, size) => {
    try {
      await removeProductFromCart(productId, size);
      toast.success("Đã xóa sản phẩm khỏi giỏ hàng");
    } catch (err) {
      console.error("Error deleting cart item:", err);
      toast.error("Lỗi khi xóa sản phẩm");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-8 bg-white dark:bg-gray-900 dark:text-white duration-200">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-semibold mb-4">Giỏ hàng của bạn</h1>
          <div className="flex flex-col md:flex-row gap-4 animate-pulse">
            <div className="md:w-3/4">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-5"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/6"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
                </div>
              </div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>

            <div className="md:w-1/4">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
                <div className="mt-5 h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (!cart || !cart.products || cart.products.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 dark:text-white duration-200">
        <h2 className="text-2xl font-semibold mb-2">Giỏ hàng của bạn đang trống</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Hãy thêm sản phẩm vào giỏ hàng để tiếp tục.
        </p>
        <button
          onClick={() => navigate('/products')}
          className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
        >
          &larr; TIẾP TỤC XEM SẢN PHẨM
        </button>
      </div>
    );
  }

  const subtotal = cart.totalPrice || cart.products.reduce((sum, item) => sum + item.totalPrice, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen py-8 bg-white dark:bg-gray-900 dark:text-white duration-200">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-4">Giỏ hàng của bạn</h1>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-3/4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left font-semibold">Sản phẩm</th>
                    <th className="text-left font-semibold">Giá</th>
                    <th className="text-left font-semibold">Số lượng</th>
                    <th className="text-left font-semibold">Tổng</th>
                    <th className="text-left font-semibold">Xoá SP</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.products.map((item) => (
                    <tr key={`${item.product_id}-${item.size}`}>
                      <td className="py-4">
                        <div className="flex items-center">
                          <img
                            className="h-16 w-16 mr-4 object-contain"
                            src={item.productInfor?.thumbnail || "https://via.placeholder.com/150"}
                            alt={item.productInfor?.title || "Hình sản phẩm"}
                          />
                          <div>
                            <span className="font-semibold">
                              {item.productInfor?.title}
                            </span>
                            {item.size && (
                              <span className="text-sm text-gray-500 dark:text-gray-300 block">
                                Kích thước: {item.size}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(item.productInfor?.price || 0)}
                      </td>
                      <td className="py-4">
                        <div className="flex items-center">
                          <button
                            className="border rounded-md py-2 px-4 mr-2 bg-gray-100 dark:bg-gray-700"
                            onClick={() =>
                              handleQuantityChange(item.product_id, item.quantity - 1, item.size)
                            }
                          >
                            -
                          </button>
                          <span className="text-center w-8">{item.quantity}</span>
                          <button
                            className="border rounded-md py-2 px-4 ml-2 bg-gray-100 dark:bg-gray-700"
                            onClick={() =>
                              handleQuantityChange(item.product_id, item.quantity + 1, item.size)
                            }
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-4">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(item.totalPrice || 0)}
                      </td>
                      <td className="py-4 ">
                        <button
                          className="text-red-500 hover:text-red-700 text-center w-8 h-8 "
                          onClick={() => handleDelete(item.product_id, item.size)}
                        >
                          x
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              onClick={() => navigate('/products')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
            >
              &larr; TIẾP TỤC XEM SẢN PHẨM
            </button>
          </div>

          <div className="md:w-1/4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Tổng cộng giỏ hàng</h2>
              <div className="flex justify-between mb-2">
                <span>Tạm tính</span>
                <span>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(subtotal)}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Phí vận chuyển</span>
                <span>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(shipping)}
                </span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Tổng cộng</span>
                <span className="font-semibold">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(total)}
                </span>
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mt-4 w-full"
                onClick={() => navigate('/checkout')}
              >
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CartPage;
