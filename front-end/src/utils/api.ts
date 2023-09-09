import axios from 'axios';

export const logout = () => {
  localStorage.clear();
  window.location.href = '/';
};

// Create a new Axios instance
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Replace with your API's base URL
  timeout: 5000, // Adjust the timeout as needed
});

// Add an interceptor to set the Authorization header with the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    if (error.response.status === 401) {
      logout()
    }
    return Promise.reject(error);
  }
);



export default api;