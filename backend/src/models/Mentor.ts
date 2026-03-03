import { Schema, model, Document, Types } from 'mongoose';

// ── Sub-schemas ──────────────────────────────────────────────────────────────

const ExperienceSchema = new Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    period: { type: String, required: true },
    description: { type: String, default: '' },
}, { _id: false });

const EducationSchema = new Schema({
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    year: { type: String, default: '' },
}, { _id: false });

const ReviewSchema = new Schema({
    name: { type: String, required: true },
    title: { type: String, default: '' },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
}, { _id: false });

// ── Main Mentor Schema ───────────────────────────────────────────────────────

export interface IMentor extends Document {
    name: string;
    country: string;
    title: string;
    company: string;
    bio: string;
    avatarUrl: string;
    location: string;
    language: string;
    industry: string;
    skills: string[];
    yearsOfExperience: number;
    hourlyRate: number;
    rating: number;
    reviewCount: number;
    badge: string;
    badgeType: string;
    topContributor: boolean;
    isActive: boolean;
    linkedIn: string;
    twitter: string;
    experience: Array<{ title: string; company: string; period: string; description: string }>;
    education: { degree: string; institution: string; year: string };
    reviews: Array<{ name: string; title: string; rating: number; comment: string; createdAt: Date }>;
    appwriteUserId: string;
    createdAt: Date;
    updatedAt: Date;
}

const MentorSchema = new Schema<IMentor>({
    name: { type: String, required: true, trim: true },
    country: { type: String, default: '' },
    title: { type: String, default: '' },
    company: { type: String, default: '' },
    bio: { type: String, default: '' },
    avatarUrl: { type: String, default: '' },
    location: { type: String, default: 'Remote' },
    language: { type: String, default: 'English' },
    industry: { type: String, default: '' },
    skills: [{ type: String }],
    yearsOfExperience: { type: Number, default: 0 },
    hourlyRate: { type: Number, default: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    badge: { type: String, default: '' },
    badgeType: { type: String, default: 'default' },
    topContributor: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },   // requires admin approval to appear on listing
    linkedIn: { type: String, default: '' },
    twitter: { type: String, default: '' },
    experience: [ExperienceSchema],
    education: { type: EducationSchema, default: () => ({}) },
    reviews: [ReviewSchema],
    appwriteUserId: { type: String, default: '' },
}, { timestamps: true });

// Indexes for fast querying
MentorSchema.index({ skills: 1 });
MentorSchema.index({ rating: -1 });
MentorSchema.index({ hourlyRate: 1 });
MentorSchema.index({ isActive: 1 });

export const Mentor = model<IMentor>('Mentor', MentorSchema);
