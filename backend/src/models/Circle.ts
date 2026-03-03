import { Schema, model, Document, Types } from 'mongoose';

export interface ICircle extends Document {
    name: string;
    slug: string;             // URL-safe, e.g. "ux-design"
    description: string;
    category: string;         // e.g. "Design", "Technology"
    tags: string[];
    coverImage: string;       // URL or asset path
    rules: string[];
    memberIds: string[];      // appwriteUserIds of members
    memberCount: number;
    postCount: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const CircleSchema = new Schema<ICircle>({
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, default: '' },
    category: { type: String, default: 'General' },
    tags: [{ type: String }],
    coverImage: { type: String, default: '' },
    rules: [{ type: String }],
    memberIds: [{ type: String }],      // appwrite user IDs
    memberCount: { type: Number, default: 0 },
    postCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

CircleSchema.index({ slug: 1 });
CircleSchema.index({ category: 1 });
CircleSchema.index({ memberCount: -1 });

export const Circle = model<ICircle>('Circle', CircleSchema);
