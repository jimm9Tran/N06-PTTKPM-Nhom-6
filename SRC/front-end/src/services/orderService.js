// src/services/orderService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const checkoutOrder = (orderData) => {
  // Gọi API thanh toán từ backend
  return axios.post(`${API_BASE_URL}/checkout/order`, orderData, { withCredentials: true });
};
