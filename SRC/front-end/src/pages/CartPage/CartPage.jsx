// src/pages/CartPage/CartPage.jsx
import React, { useState, useEffect } from 'react';
import { getCart, updateCart, deleteFromCart } from '../../services/cartService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Hàm lấy thông tin giỏ hàng từ backend
  const fetchCart = async () => {
    try {
      const response = await getCart();
      setCart(response.data.cartDetail);
    } catch (err) {
      console.error("Error fetching cart:", err);
      setError("Lỗi khi tải giỏ hàng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Hàm cập nhật số lượng sản phẩm
  const handleQuantityChange = async (productId, newQuantity, size) => {
    const quantity = parseInt(newQuantity);
    if (isNaN(quantity) || quantity < 1) return;
    try {
      await updateCart(productId, quantity, size);
      toast.success("Cập nhật giỏ hàng thành công");
      // Cập nhật lại giỏ hàng sau khi thay đổi số lượng
      fetchCart();
    } catch (err) {
      console.error("Error updating cart:", err);
      toast.error("Lỗi khi cập nhật sản phẩm");
    }
  };

  // Hàm xóa sản phẩm khỏi giỏ hàng
  const handleDelete = async (productId, size) => {
    try {
      await deleteFromCart(productId, size);
      toast.success("Đã xóa sản phẩm khỏi giỏ hàng");
      // Sau khi xóa, cập nhật lại giỏ hàng
      fetchCart();
    } catch (err) {
      console.error("Error deleting cart item:", err);
      toast.error("Lỗi khi xóa sản phẩm");
    }
  };

  if (loading) {
    return <div className="text-center py-10">Đang tải giỏ hàng...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (!cart || !cart.products || cart.products.length === 0) {
    return <div className="text-center py-10">Giỏ hàng của bạn đang trống.</div>;
  }

  // Tính toán tạm tính, thuế, phí vận chuyển và tổng tiền (ví dụ đơn giản)
  const subtotal = cart.totalPrice || cart.products.reduce((sum, item) => sum + item.totalPrice, 0);
  const taxes = subtotal * 0.01; // Giả sử thuế 1%
  const shipping = 0;
  const total = subtotal + taxes + shipping;

  return (
    <div className="h-screen py-8 bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-4">Giỏ hàng của bạn</h1>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Danh sách sản phẩm */}
          <div className="md:w-3/4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left font-semibold">Sản phẩm</th>
                    <th className="text-left font-semibold">Giá</th>
                    <th className="text-left font-semibold">Số lượng</th>
                    <th className="text-left font-semibold">Tổng</th>
                    <th className="text-left font-semibold">Thao tác</th>
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
                            <span className="font-semibold">{item.productInfor?.title}</span>
                            {item.size && (
                              <span className="text-sm text-gray-500 dark:text-gray-300 block">
                                Size: {item.size}
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
                      <td className="py-4 flex items-center justify-center mt-3">
                        <button
                          className="text-red-500 hover:text-red-700 text-center w-8 h-8"
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
          </div>
          {/* Phần Summary */}
          <div className="md:w-1/4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Tóm tắt</h2>
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
                <span>Thuế (1%)</span>
                <span>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(taxes)}
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