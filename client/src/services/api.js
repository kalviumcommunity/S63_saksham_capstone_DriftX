// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// 🛒 Product APIs
export const getAllProducts = async () => {
  try {
    const response = await API.get('/products');
    if (response.status === 200) {
      return response.data;
    }
    throw new Error('Failed to fetch products');
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const updateProduct = (id, productData) => API.put(`/products/${id}`, productData);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

// 👤 User APIs
export const loginUser = (data) => API.post('/users/login', data);

export const updateUser = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem('userInfo')?.token}`,
    },
  };

  const response = await axios.put('/api/users/profile', userData, config);
  return response.data;
};

export const deleteUser = async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('userInfo')?.token}`,
    },
  };

  const response = await axios.delete('/api/users/profile', config);
  return response.data;
};

export default API;
