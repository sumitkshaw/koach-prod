/**
 * profiles.js — Now speaks to our MongoDB backend instead of Appwrite directly.
 * Auth still uses Appwrite. All user/mentor profile data lives in MongoDB.
 */
import api from '../../services/api';

// ── Get user's profile from MongoDB ─────────────────────────────────────────
export const getUserProfile = async (userId) => {
  try {
    const res = await api.get('/api/users/me');
    return res.data;
  } catch (error) {
    if (error?.response?.status === 404) return null;
    console.error('Error fetching user profile:', error);
    return null;
  }
};

// ── Create or update user profile in MongoDB (upsert) ───────────────────────
export const createUserProfile = async (profileData) => {
  try {
    const res = await api.post('/api/users/profile', profileData);
    return res.data;
  } catch (error) {
    console.error('Error creating/updating user profile:', error);
    throw new Error(`Failed to save user profile: ${error?.response?.data?.error || error.message}`);
  }
};

// ── Partially update user profile ───────────────────────────────────────────
export const updateUserProfile = async (_documentId, updates) => {
  // _documentId ignored — we use the auth token to identify the user
  try {
    const res = await api.patch('/api/users/profile', updates);
    return res.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw new Error('Failed to update user profile');
  }
};

export const updateUserProfileByUserId = async (_userId, updates) => {
  return updateUserProfile(null, updates);
};

// ── Check if user needs onboarding ──────────────────────────────────────────
export const checkOnboardingStatus = async (_userId) => {
  try {
    const res = await api.get('/api/users/onboarding-status');
    return res.data;
  } catch (error) {
    console.error('Error checking onboarding status:', error);
    return { hasProfile: false, onboardingComplete: false, userType: null };
  }
};

// ── Complete mentor onboarding — creates Mentor document in MongoDB ──────────
export const completeMentorOnboarding = async (_userId, onboardingData = {}) => {
  try {
    const res = await api.post('/api/users/complete-mentor-onboarding', onboardingData);
    return res.data;
  } catch (error) {
    console.error('Error completing mentor onboarding:', error);
    throw new Error(`Failed to complete mentor onboarding: ${error?.response?.data?.error || error.message}`);
  }
};

// ── Complete mentee onboarding — creates UserProfile in MongoDB ──────────────
export const completeMenteeProfile = async (_userId, profileData = {}) => {
  try {
    const res = await api.post('/api/users/complete-mentee-onboarding', profileData);
    return res.data;
  } catch (error) {
    console.error('Error completing mentee onboarding:', error);
    throw new Error(`Failed to complete mentee profile: ${error?.response?.data?.error || error.message}`);
  }
};

// ── Save onboarding progress (partial auto-save) ─────────────────────────────
export const saveOnboardingProgress = async (_userId, step, data) => {
  try {
    await api.patch('/api/users/profile', { onboardingStep: step, ...data });
  } catch (error) {
    // Non-fatal — just log it
    console.warn(`Auto-save step ${step} failed (non-fatal):`, error?.message);
  }
};

// ── Get incomplete profiles (kept for backward compat, returns empty) ─────────
export const getIncompleteProfiles = async () => [];