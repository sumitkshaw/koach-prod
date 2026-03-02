// src/utils/database/profiles.ts
// MongoDB backend calls for user profile management — fully typed

import api from '../../services/api';
import { UserProfile } from '../../types';

interface CreateProfileInput {
    userId: string;
    appwriteUserId?: string;
    userType?: 'mentor' | 'mentee';
    email?: string;
    firstName?: string;
    lastName?: string;
    avatarUrl?: string;
    name?: string;        // convenience — split into firstName/lastName
    [key: string]: any;
}

// ── Get user's profile from MongoDB ─────────────────────────────────────────
export const getUserProfile = async (_userId: string): Promise<UserProfile | null> => {
    try {
        const res = await api.get('/api/users/me');
        return res.data as UserProfile;
    } catch (error: any) {
        if (error?.response?.status === 404) return null;
        console.error('Error fetching user profile:', error);
        return null;
    }
};

// ── Create or update user profile in MongoDB (upsert) ───────────────────────
export const createUserProfile = async (profileData: CreateProfileInput): Promise<UserProfile> => {
    try {
        const res = await api.post('/api/users/profile', profileData);
        return res.data as UserProfile;
    } catch (error: any) {
        console.error('Error creating/updating user profile:', error);
        throw new Error(`Failed to save user profile: ${error?.response?.data?.error || error.message}`);
    }
};

// ── Partially update user profile ───────────────────────────────────────────
export const updateUserProfile = async (
    _documentId: string | null,
    updates: Partial<UserProfile>
): Promise<UserProfile> => {
    try {
        const res = await api.patch('/api/users/profile', updates);
        return res.data as UserProfile;
    } catch (error: any) {
        console.error('Error updating user profile:', error);
        throw new Error('Failed to update user profile');
    }
};

export const updateUserProfileByUserId = async (
    _userId: string,
    updates: Partial<UserProfile>
): Promise<UserProfile> => updateUserProfile(null, updates);

// ── Check if user needs onboarding ──────────────────────────────────────────
export interface OnboardingStatus {
    hasProfile: boolean;
    onboardingComplete: boolean;
    userType: 'mentor' | 'mentee' | null;
    currentStep?: number;
}

export const checkOnboardingStatus = async (_userId: string): Promise<OnboardingStatus> => {
    try {
        const res = await api.get('/api/users/onboarding-status');
        return res.data as OnboardingStatus;
    } catch (error) {
        console.error('Error checking onboarding status:', error);
        return { hasProfile: false, onboardingComplete: false, userType: null };
    }
};

// ── Complete mentor onboarding ────────────────────────────────────────────────
export const completeMentorOnboarding = async (
    _userId: string,
    onboardingData: Record<string, any> = {}
): Promise<any> => {
    try {
        const res = await api.post('/api/users/complete-mentor-onboarding', onboardingData);
        return res.data;
    } catch (error: any) {
        console.error('Error completing mentor onboarding:', error);
        throw new Error(`Failed to complete mentor onboarding: ${error?.response?.data?.error || error.message}`);
    }
};

// ── Complete mentee onboarding ────────────────────────────────────────────────
export const completeMenteeProfile = async (
    _userId: string,
    profileData: Record<string, any> = {}
): Promise<any> => {
    try {
        const res = await api.post('/api/users/complete-mentee-onboarding', profileData);
        return res.data;
    } catch (error: any) {
        console.error('Error completing mentee onboarding:', error);
        throw new Error(`Failed to complete mentee profile: ${error?.response?.data?.error || error.message}`);
    }
};

// ── Save onboarding progress (auto-save, non-fatal) ──────────────────────────
export const saveOnboardingProgress = async (
    _userId: string | undefined,
    step: number,
    data: Record<string, any>
): Promise<void> => {
    try {
        await api.patch('/api/users/profile', { onboardingStep: step, ...data });
    } catch (error: any) {
        console.warn(`Auto-save step ${step} failed (non-fatal):`, error?.message);
    }
};

// ── Stub kept for backward compat ────────────────────────────────────────────
export const getIncompleteProfiles = async (): Promise<any[]> => [];
