// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: "http://localhost:5000/api",  // Replace with your actual backend
});

export const getAllProducts = () => API.get('/products');
export const loginUser = (data) => API.post('/auth/login', data);
