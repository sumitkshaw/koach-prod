// src/services/api.js
// Axios instance that all services use — points to the backend at port 4731

import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4731',
  withCredentials: true, // send cookies (Appwrite session) automatically
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── Request interceptor — attach session token from localStorage if present ─
api.interceptors.request.use((config) => {
  const sessionSecret = localStorage.getItem('koach_session');
  if (sessionSecret) {
    config.headers['X-Appwrite-Session'] = sessionSecret;
  }
  return config;
});

// ── Response interceptor — handle global 401 ────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear stale session info
      localStorage.removeItem('koach_session');
    }
    return Promise.reject(error);
  }
);

export default api;
