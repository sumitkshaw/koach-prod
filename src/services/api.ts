// src/services/api.ts
// Typed axios instance — attaches Firebase ID token to every request

import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { auth } from '../utils/firebase';

const api: AxiosInstance = axios.create({
    baseURL: (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:4731',
    headers: { 'Content-Type': 'application/json' },
});

// ── Request interceptor — attach fresh Firebase ID token ────────────────────
api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    const user = auth.currentUser;
    if (user) {
        const token = await user.getIdToken();
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

// ── Response interceptor — handle global 401 ────────────────────────────────
api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            console.warn('API: Unauthorized — token may be invalid or expired');
        }
        return Promise.reject(error);
    }
);

export default api;
