import React from 'react';
import { format } from 'date-fns';

const OrderCard = ({ order }) => {
  // Tính tổng giá trị đơn hàng (sau giảm giá, nhân theo số lượng)
  const totalPrice = order.products.reduce((sum, product) => {
    const priceAfterDiscount = product.price * (1 - product.discountPercentage / 100);
    return sum + priceAfterDiscount * product.quantity;
  }, 0);

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 hover:shadow-lg transition duration-300">
      <div className="mb-2">
        <span className="font-semibold">Mã đơn hàng:</span> {order.cart_id}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Trạng thái:</span> {order.status}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Ngày đặt:</span>{' '}
        {format(new Date(order.createdAt), 'dd/MM/yyyy')}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Thông tin người nhận:</span>
        <div className="ml-2">
          <div><span className="font-medium">Họ tên:</span> {order.userInfo.fullName}</div>
          <div><span className="font-medium">SĐT:</span> {order.userInfo.phone}</div>
          <div><span className="font-medium">Địa chỉ:</span> {order.userInfo.address}</div>
        </div>
      </div>
      <div className="mb-2">
        <span className="font-semibold">Sản phẩm:</span> {order.products.length}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Tổng giá trị:</span> ₫{totalPrice.toLocaleString()}
      </div>
      <button
        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full transition-colors"
        onClick={() => {
          // Ví dụ: chuyển đến trang chi tiết đơn hàng
          // Bạn có thể dùng react-router-dom để điều hướng, ví dụ: history.push(`/order/${order._id}`)
          alert(`Xem chi tiết đơn hàng ${order.cart_id}`);
        }}
      >
        Xem chi tiết
      </button>
    </div>
  );
};

export default OrderCard;
