// src/services/productService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const getProducts = (page = 1, limit = 12) => {
  return axios.get(`${API_BASE_URL}/products?page=${page}&limit=${limit}`);
};

export const getProductDetail = (slugProduct) => {
  return axios.get(`${API_BASE_URL}/products/detail/${slugProduct}`);
};

export const getProductsByCategory = (slug, page = 1, limit = 12) => {
  return axios.get(`${API_BASE_URL}/products/${slug}?page=${page}&limit=${limit}`);
};

export const getSearchResults = (keyword, page = 1, limit = 12) => {
  return axios.get(`${API_BASE_URL}/search?keyword=${encodeURIComponent(keyword)}&page=${page}&limit=${limit}`);
};

export const register = (userData) => {
  return axios.post(`${API_BASE_URL}/user/register`, userData, { withCredentials: true });
};

export const login = (credentials) => {
  return axios.post(`${API_BASE_URL}/user/login`, credentials, { withCredentials: true });
};

export const logout = () => {
  return axios.get(`${API_BASE_URL}/user/logout`, { withCredentials: true });
};

export const forgotPassword = (email) => {
  return axios.post(`${API_BASE_URL}/user/password/forgot`, { email });
};

export const verifyOTP = (email, otp) => {
  return axios.post(`${API_BASE_URL}/user/password/otp`, { email, otp }, { withCredentials: true });
};

export const resetPassword = (password) => {
  return axios.post(`${API_BASE_URL}/user/password/reset`, { password }, { withCredentials: true });
};

export const getUserInfo = () => {
  return axios.get(`${API_BASE_URL}/user/info`, { withCredentials: true });
};
