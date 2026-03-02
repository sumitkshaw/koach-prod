// src/services/authService.js
// All auth operations go through the backend API — no direct Appwrite SDK in frontend

import api from './api';

/**
 * Login with email and password.
 * Returns { session, user, profile, isVerified }
 * Stores session secret in localStorage for subsequent API calls.
 */
export const login = async (email, password) => {
  const { data } = await api.post('/api/auth/login', { email, password });
  if (data.session?.secret) {
    localStorage.setItem('koach_session', data.session.secret);
  }
  return data;
};

/**
 * Sign up a new user.
 * Returns { userId, message }
 */
export const signup = async (name, email, password, userType = 'mentee') => {
  const { data } = await api.post('/api/auth/signup', { name, email, password, userType });
  return data;
};

/**
 * Logout — deletes the session on Appwrite, clears localStorage.
 */
export const logout = async () => {
  try {
    await api.post('/api/auth/logout');
  } finally {
    localStorage.removeItem('koach_session');
  }
};

/**
 * Get the current authenticated user + profile.
 * Returns { user, profile } or null if not authenticated.
 */
export const getMe = async () => {
  try {
    const { data } = await api.get('/api/auth/me');
    return data;
  } catch {
    return null;
  }
};

/**
 * Send verification email to the currently logged-in user.
 */
export const sendVerification = async () => {
  const { data } = await api.post('/api/auth/verify');
  return data;
};

/**
 * Send a password reset email.
 */
export const forgotPassword = async (email) => {
  const { data } = await api.post('/api/auth/forgot-password', { email });
  return data;
};

/**
 * Check if we have a stored session (fast client-side check).
 */
export const hasStoredSession = () => !!localStorage.getItem('koach_session');
