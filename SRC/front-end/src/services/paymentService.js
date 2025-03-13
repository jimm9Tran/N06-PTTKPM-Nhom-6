// src/services/paymentService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const createPayment = (orderId, amount, orderInfo) => {
  return axios.post(`${API_BASE_URL}/payment/create`, { orderId, amount, orderInfo }, { withCredentials: true });
};
