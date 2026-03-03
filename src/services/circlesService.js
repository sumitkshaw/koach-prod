// src/services/circlesService.js
import api from './api';

export const getCircles = async (params = {}) => {
  const { data } = await api.get('/api/circles', { params });
  return data; // Circle[]
};

export const getCircleBySlug = async (slug) => {
  const { data } = await api.get(`/api/circles/${slug}`);
  return data;
};

export const joinCircle = async (slug) => {
  const { data } = await api.post(`/api/circles/${slug}/join`);
  return data;
};

export const leaveCircle = async (slug) => {
  const { data } = await api.post(`/api/circles/${slug}/leave`);
  return data;
};

export const getPosts = async (slug, params = {}) => {
  const { data } = await api.get(`/api/circles/${slug}/posts`, { params });
  return data; // { posts, total, hasMore }
};

export const createPost = async (slug, payload) => {
  const { data } = await api.post(`/api/circles/${slug}/posts`, payload);
  return data;
};

export const upvotePost = async (postId) => {
  const { data } = await api.post(`/api/circles/posts/${postId}/upvote`);
  return data;
};

export const getComments = async (postId) => {
  const { data } = await api.get(`/api/circles/posts/${postId}/comments`);
  return data; // Comment[]
};

export const createComment = async (postId, body) => {
  const { data } = await api.post(`/api/circles/posts/${postId}/comments`, { body });
  return data;
};

export const upvoteComment = async (postId, commentId) => {
  const { data } = await api.post(`/api/circles/posts/${postId}/comments/${commentId}/upvote`);
  return data;
};

export const seedCircles = async () => {
  const { data } = await api.post('/api/circles/seed');
  return data;
};
