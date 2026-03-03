import { Schema, model, Document } from 'mongoose';

export interface IAdminUser extends Document {
    email: string;
    passwordHash: string;
    createdAt: Date;
}

const AdminUserSchema = new Schema<IAdminUser>({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
}, { timestamps: true });

export const AdminUser = model<IAdminUser>('AdminUser', AdminUserSchema);
