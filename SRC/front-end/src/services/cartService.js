// src/services/cartService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const getCart = () => {
  return axios.get(`${API_BASE_URL}/cart`, { withCredentials: true });
};

export const addToCart = (productId, quantity = 1, size = "") => {
  return axios.post(`${API_BASE_URL}/cart/add/${productId}?quantity=${quantity}&size=${encodeURIComponent(size)}`, {}, { withCredentials: true });
};

export const deleteFromCart = (productId, size = "") => {
  return axios.delete(`${API_BASE_URL}/cart/delete/${productId}?size=${encodeURIComponent(size)}`, { withCredentials: true });
};

export const updateCart = (productId, quantity, size = "") => {
  return axios.put(`${API_BASE_URL}/cart/update/${productId}/${quantity}?size=${encodeURIComponent(size)}`, {}, { withCredentials: true });
};
