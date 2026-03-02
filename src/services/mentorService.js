// src/services/mentorService.js
import api from './api';

/**
 * Get all active mentors with optional filters.
 * @param {Object} filters - { skill, minRating, maxRate, search }
 */
export const getMentors = async (filters = {}) => {
  const { data } = await api.get('/api/mentors', { params: filters });
  return data; // { total, documents: Mentor[] }
};

/**
 * Get a single mentor by their Appwrite document ID.
 */
export const getMentorById = async (id) => {
  const { data } = await api.get(`/api/mentors/${id}`);
  return data;
};

/**
 * Create a new mentor profile (protected — must be logged in).
 */
export const createMentor = async (mentorData) => {
  const { data } = await api.post('/api/mentors', mentorData);
  return data;
};

/**
 * Update an existing mentor profile (protected — must own it).
 */
export const updateMentor = async (id, updates) => {
  const { data } = await api.patch(`/api/mentors/${id}`, updates);
  return data;
};
