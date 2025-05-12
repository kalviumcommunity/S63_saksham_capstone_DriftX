// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add request interceptor for authentication
API.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const { token } = JSON.parse(userInfo);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 🛒 Product APIs
export const getAllProducts = async () => {
  try {
    const response = await API.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const updateProduct = (id, productData) => API.put(`/products/${id}`, productData);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

// 👤 User APIs
export const loginUser = async (data) => {
  try {
    const response = await API.post('/users/login', data);
    // Return both user and token
    return { user: response.data.user, token: response.data.token };
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const updateUser = async (userData) => {
  try {
    let config = {};
    // If userData is FormData, do not set Content-Type (let browser set it)
    if (userData instanceof FormData) {
      config = { headers: { } };
    }
    const response = await API.put('/users/profile', userData, config);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async () => {
  try {
    const response = await API.delete('/users/profile');
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// ===== DummyJSON Product APIs =====
export const getAllProductsDummy = async () => {
  try {
    const response = await axios.get('https://dummyjson.com/products');
    return response.data.products;
  } catch (error) {
    console.error('Error fetching DummyJSON products:', error);
    throw error;
  }
};

export const getProductsByCategoryDummy = async (category) => {
  try {
    const response = await axios.get(`https://dummyjson.com/products/category/${category}`);
    return response.data.products;
  } catch (error) {
    console.error('Error fetching DummyJSON category:', error);
    throw error;
  }
};

export const searchProductsDummy = async (query) => {
  try {
    const response = await axios.get(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`);
    return response.data.products;
  } catch (error) {
    console.error('Error searching DummyJSON products:', error);
    throw error;
  }
};

export default API;

