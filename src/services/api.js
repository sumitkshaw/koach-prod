// src/services/api.js
// Axios instance — attaches Firebase ID token to every request (no more Appwrite session cookies)

import axios from 'axios';
import { auth } from '../utils/firebase';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4731',
  headers: { 'Content-Type': 'application/json' },
});

// ── Request interceptor — attach fresh Firebase ID token ────────────────────
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();   // auto-refreshes if expired
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// ── Response interceptor — handle global 401 ────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('API: Unauthorized — token may be invalid or expired');
    }
    return Promise.reject(error);
  }
);

export default api;
