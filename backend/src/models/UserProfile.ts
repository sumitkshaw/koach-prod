import { Schema, model, Document } from 'mongoose';

// ── UserProfile Model ─────────────────────────────────────────────────────────
// Stores mentee profile data and onboarding state for all users.
// Mentor-specific data goes in the Mentor model after onboarding completes.

export interface IUserProfile extends Document {
    appwriteUserId: string;         // Appwrite auth ID (the link between auth & data)
    userType: 'mentor' | 'mentee';

    // Basic info (collected in onboarding step 1)
    firstName: string;
    lastName: string;
    email: string;
    location: string;
    country: string;
    avatarUrl: string;

    // Mentee-specific onboarding data
    institution: string;
    currentRole: string;            // student | professional
    goals: string[];                // what they want from mentorship
    reasons: string[];              // why they joined
    pastExperiences: string;        // text
    idealSessionFrequency: string;  // weekly, bi-weekly, monthly
    preferredSessionTypes: string[];
    timeline: string;               // how long they plan to use platform
    qualities: string[];            // mentor qualities they care about

    // Bio / about
    bio: string;

    // Status tracking
    onboardingComplete: boolean;
    onboardingStep: number;

    createdAt: Date;
    updatedAt: Date;
}

const UserProfileSchema = new Schema<IUserProfile>({
    appwriteUserId: { type: String, required: true, unique: true, index: true },
    userType: { type: String, enum: ['mentor', 'mentee'], required: true },

    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    email: { type: String, default: '' },
    location: { type: String, default: '' },
    country: { type: String, default: '' },
    avatarUrl: { type: String, default: '' },

    // Mentee fields
    institution: { type: String, default: '' },
    currentRole: { type: String, default: '' },
    goals: [{ type: String }],
    reasons: [{ type: String }],
    pastExperiences: { type: String, default: '' },
    idealSessionFrequency: { type: String, default: '' },
    preferredSessionTypes: [{ type: String }],
    timeline: { type: String, default: '' },
    qualities: [{ type: String }],
    bio: { type: String, default: '' },

    onboardingComplete: { type: Boolean, default: false },
    onboardingStep: { type: Number, default: 1 },
}, { timestamps: true });

export const UserProfile = model<IUserProfile>('UserProfile', UserProfileSchema);
