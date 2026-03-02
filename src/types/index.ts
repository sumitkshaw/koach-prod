// src/types/index.ts
// Shared TypeScript types used across the frontend

// ── Auth ─────────────────────────────────────────────────────────────────────
export interface AppUser {
    $id: string;          // Firebase UID (backward compat alias)
    uid: string;
    email: string;
    name: string;
    emailVerification: boolean;
    avatarUrl: string;
}

// ── MongoDB UserProfile ───────────────────────────────────────────────────────
export interface UserProfile {
    _id?: string;
    appwriteUserId: string;
    userType: 'mentor' | 'mentee';
    firstName: string;
    lastName: string;
    email: string;
    location: string;
    country: string;
    avatarUrl: string;
    institution: string;
    currentRole: string;
    goals: string[];
    reasons: string[];
    pastExperiences: string;
    idealSessionFrequency: string;
    preferredSessionTypes: string[];
    timeline: string;
    qualities: string[];
    bio: string;
    onboardingComplete: boolean;
    onboardingStep: number;
    createdAt?: string;
    updatedAt?: string;
}

// ── MongoDB Mentor ────────────────────────────────────────────────────────────
export interface MentorExperience {
    company: string;
    title: string;
    duration: string;
    description: string;
}

export interface MentorReview {
    reviewer: string;
    rating: number;
    comment: string;
    date: string;
}

export interface Mentor {
    _id: string;
    appwriteUserId?: string;
    name: string;
    title: string;
    company: string;
    bio: string;
    location: string;
    industry: string;
    skills: string[];
    yearsOfExperience: number;
    hourlyRate: number;
    rating: number;
    reviewCount: number;
    badge: string;
    badgeType: string;
    isActive: boolean;
    avatarUrl?: string;
    linkedIn?: string;
    education: { degree: string; institution: string };
    experience: MentorExperience[];
    reviews: MentorReview[];
}

// ── Booking ──────────────────────────────────────────────────────────────────
export interface Booking {
    _id: string;
    mentorId: string;
    userId: string;
    date: string;
    time: string;
    duration: number;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    notes?: string;
    totalPrice: number;
}

// ── Auth Context ──────────────────────────────────────────────────────────────
export interface AuthContextValue {
    user: AppUser | null;
    loading: boolean;
    isAuthenticated: boolean;
    isVerified: boolean;
    verificationMessage: string;
    signup: (name: string, email: string, password: string, userType?: string) => Promise<any>;
    login: (email: string, password: string) => Promise<any>;
    loginWithGoogle: (navigate?: any, isSignup?: boolean, userType?: string) => Promise<any>;
    loginWithLinkedIn: (navigate?: any, isSignup?: boolean, userType?: string) => Promise<any>;
    logout: (navigate?: any) => Promise<void>;
    sendVerification: () => Promise<void> | undefined;
    clearVerificationMessage: () => void;
}
