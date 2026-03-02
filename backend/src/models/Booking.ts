import { Schema, model, Document, Types } from 'mongoose';

export interface IBooking extends Document {
    mentorId: Types.ObjectId | string;
    menteeId: string; // Appwrite user ID
    mentorName: string;
    menteeName: string;
    date: string;
    time: string;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    goal: string;
    planName: string;
    totalAmount: number;
    createdAt: Date;
    updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>({
    mentorId: { type: Schema.Types.Mixed, required: true },
    menteeId: { type: String, required: true },
    mentorName: { type: String, default: '' },
    menteeName: { type: String, default: '' },
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled', 'completed'], default: 'pending' },
    goal: { type: String, default: '' },
    planName: { type: String, default: '' },
    totalAmount: { type: Number, default: 0 },
}, { timestamps: true });

BookingSchema.index({ menteeId: 1 });
BookingSchema.index({ mentorId: 1 });
BookingSchema.index({ status: 1 });

export const Booking = model<IBooking>('Booking', BookingSchema);
