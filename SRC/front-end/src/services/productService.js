import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const getProducts = (page = 1, limit = 12) => {
  return axios.get(`${API_BASE_URL}/products?page=${page}&limit=${limit}`);
};

export const getProductDetail = (slugProduct) => {
  return axios.get(`${API_BASE_URL}/products/detail/${slugProduct}`);
};

export const getProductsByCategory = (slug, page = 1, limit = 12) => {
  return axios.get(`${API_BASE_URL}/products/category/${slug}?page=${page}&limit=${limit}`);
};
