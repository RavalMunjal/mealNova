import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach Token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Global Error Handling
axiosInstance.interceptors.response.use(
  (response) => response.data, // Simplify response data extraction
  (error) => {
    // Check if it's an unauthorized error
    if (error.response && error.response.status === 401) {
      // Handle logout or token refresh here
      localStorage.removeItem('token');
      // window.location.href = '/login'; // Optional redirection
    }
    return Promise.reject(error.response ? error.response.data : error);
  }
);

const apiService = {
  get: (endpoint) => axiosInstance.get(endpoint),
  post: (endpoint, data) => axiosInstance.post(endpoint, data),
  put: (endpoint, data) => axiosInstance.put(endpoint, data),
  delete: (endpoint) => axiosInstance.delete(endpoint),
};

export default apiService;
