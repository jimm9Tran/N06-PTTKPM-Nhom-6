import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderStatusPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get("http://localhost:3000/user/orders", { withCredentials: true });
        setOrders(response.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading orders...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Đơn hàng của bạn</h1>
      {orders.length === 0 ? (
        <div>Bạn chưa có đơn hàng nào.</div>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id} className="border p-4 mb-2">
              <p>Mã đơn hàng: {order._id}</p>
              <p>Trạng thái: {order.status || "Đang xử lý"}</p>
              <p>Tổng tiền: {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(order.total)}</p>
              {/* Hiển thị thông tin chi tiết nếu cần */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderStatusPage;