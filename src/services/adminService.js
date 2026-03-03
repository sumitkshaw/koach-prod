// src/services/adminService.js
import api from './api';

const ADMIN_TOKEN_KEY = 'koach_admin_token';

const adminHeaders = () => ({
  headers: { 'x-admin-token': localStorage.getItem(ADMIN_TOKEN_KEY) || '' },
});

export const adminLogin = async (email, password) => {
  const { data } = await api.post('/api/admin/login', { email, password });
  if (data.token) localStorage.setItem(ADMIN_TOKEN_KEY, data.token);
  return data;
};

export const adminLogout = () => localStorage.removeItem(ADMIN_TOKEN_KEY);

export const isAdminLoggedIn = () => !!localStorage.getItem(ADMIN_TOKEN_KEY);

export const getAdminUsers = async () => {
  const { data } = await api.get('/api/admin/users', adminHeaders());
  return data;
};

export const getAdminMentors = async () => {
  const { data } = await api.get('/api/admin/mentors', adminHeaders());
  return data;
};

export const approveMentor = async (id) => {
  const { data } = await api.patch(`/api/admin/mentors/${id}/approve`, {}, adminHeaders());
  return data;
};

export const rejectMentor = async (id) => {
  const { data } = await api.patch(`/api/admin/mentors/${id}/reject`, {}, adminHeaders());
  return data;
};
