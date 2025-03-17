import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const createVnpayPayment = (payload) => {
  // payload = { orderId, amount, orderInfo }
  return axios.post(`${API_BASE_URL}/payment/create`, payload, { withCredentials: true });
};
