import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:3000',
  validateStatus: (status) => {
    // Treat all status codes as valid (do not throw exceptions)
    return status >= 200 && status < 500;
  },
});

export default api;
