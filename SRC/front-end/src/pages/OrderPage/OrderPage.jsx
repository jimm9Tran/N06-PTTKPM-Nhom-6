import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [expandedOrders, setExpandedOrders] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/order', { withCredentials: true });
        setOrders(data.orders);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          navigate('/user/login');
        } else {
          setError('Không thể tải đơn hàng. Vui lòng thử lại sau.');
        }
      }
    };

    fetchOrders();
  }, [navigate]);

  const toggleExpand = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-5xl font-extrabold text-center mb-10 text-gray-800 dark:text-gray-100">
          Đơn hàng của tôi
        </h1>
        {error && <div className="text-center text-red-500 mb-6">{error}</div>}
        {orders.length === 0 ? (
          <div className="text-center text-xl text-gray-700 dark:text-gray-300">
            Không có đơn hàng nào.
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105"
              >
                <div className="p-6 flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-semibold text-indigo-600">
                      Mã đơn: {order.cart_id}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Ngày tạo: {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                        order.status === 'pending'
                          ? 'bg-yellow-200 text-yellow-800'
                          : order.status === 'cancelled'
                          ? 'bg-red-200 text-red-800'
                          : 'bg-green-200 text-green-800'
                      }`}
                    >
                      {order.status.toUpperCase()}
                    </span>
                    <button
                      onClick={() => toggleExpand(order._id)}
                      className="px-3 py-1 border border-gray-300 dark:border-gray-500 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                    >
                      {expandedOrders[order._id] ? 'Ẩn chi tiết' : 'Xem chi tiết'}
                    </button>
                  </div>
                </div>
                {expandedOrders[order._id] && (
                  <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="font-semibold mb-2">Sản phẩm:</p>
                        {order.products && order.products.length > 0 ? (
                          <ul className="space-y-3">
                            {order.products.map((product, index) => (
                              <li key={index} className="flex items-center">
                                <img
                                  src={product.productInfo?.thumbnail || '/placeholder.jpg'}
                                  alt={product.productInfo?.title || 'Sản phẩm chưa cập nhật'}
                                  className="w-16 h-16 object-cover rounded mr-3"
                                />
                                <div>
                                  <p className="font-medium">
                                    {product.productInfo?.title || 'Sản phẩm chưa cập nhật'}
                                  </p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    SL: {product.quantity}
                                  </p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-gray-600 dark:text-gray-400">Không có sản phẩm nào.</p>
                        )}
                      </div>
                      <div className="flex flex-col justify-center">
                        <p className="font-semibold">Tổng giá trị:</p>
                        <p className="text-3xl font-bold text-indigo-600 mt-2">
                          ₫{order.totalPrice?.toLocaleString() || '0'}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <button
                        onClick={() => navigate(`/order/${order._id}`)}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition-colors"
                      >
                        Chi tiết đơn hàng
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
