import { Request, Response, NextFunction } from 'express';
import { ID, Query } from 'node-appwrite';
import {
    databases,
    DATABASE_ID,
    BOOKINGS_COLLECTION_ID,
} from '../../config/appwrite';

type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
const VALID_STATUSES: BookingStatus[] = ['pending', 'confirmed', 'cancelled', 'completed'];

// ── POST /api/bookings ───────────────────────────────────────────────────────
export const createBooking = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = req.currentUser!;
        const { mentorId, sessionDate, duration, notes, price } = req.body;

        if (!mentorId || !sessionDate || !duration) {
            res.status(400).json({ error: 'mentorId, sessionDate, and duration are required' });
            return;
        }

        const booking = await databases.createDocument(
            DATABASE_ID,
            BOOKINGS_COLLECTION_ID,
            ID.unique(),
            {
                menteeId: user.$id,
                menteeName: user.name,
                mentorId,
                sessionDate: new Date(sessionDate).toISOString(),
                duration: Number(duration),
                status: 'pending' as BookingStatus,
                notes: notes || '',
                price: Number(price) || 0,
                createdAt: new Date().toISOString(),
            }
        );

        res.status(201).json(booking);
    } catch (err: unknown) {
        next(err);
    }
};

// ── GET /api/bookings/mentee/:menteeId ───────────────────────────────────────
export const getMenteeBookings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { menteeId } = req.params;
        const user = req.currentUser!;

        // Users can only fetch their own bookings (unless we add admin role later)
        if (menteeId !== user.$id) {
            res.status(403).json({ error: 'Forbidden' });
            return;
        }

        const result = await databases.listDocuments(DATABASE_ID, BOOKINGS_COLLECTION_ID, [
            Query.equal('menteeId', menteeId),
            Query.orderDesc('sessionDate'),
            Query.limit(100),
        ]);

        res.status(200).json(result);
    } catch (err: unknown) {
        next(err);
    }
};

// ── GET /api/bookings/mentor/:mentorId ───────────────────────────────────────
export const getMentorBookings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { mentorId } = req.params;

        const result = await databases.listDocuments(DATABASE_ID, BOOKINGS_COLLECTION_ID, [
            Query.equal('mentorId', mentorId),
            Query.orderDesc('sessionDate'),
            Query.limit(100),
        ]);

        res.status(200).json(result);
    } catch (err: unknown) {
        next(err);
    }
};

// ── PATCH /api/bookings/:id ──────────────────────────────────────────────────
export const updateBookingStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const { status, notes } = req.body;
        const user = req.currentUser!;

        if (status && !VALID_STATUSES.includes(status as BookingStatus)) {
            res.status(400).json({ error: `status must be one of: ${VALID_STATUSES.join(', ')}` });
            return;
        }

        // Verify the caller is a participant in the booking
        const existing = await databases.getDocument(DATABASE_ID, BOOKINGS_COLLECTION_ID, id) as Record<string, string>;
        if (existing.menteeId !== user.$id && existing.mentorId !== user.$id) {
            res.status(403).json({ error: 'Forbidden — you are not a participant in this booking' });
            return;
        }

        const updates: Record<string, unknown> = {};
        if (status) updates.status = status;
        if (notes !== undefined) updates.notes = notes;

        const updated = await databases.updateDocument(DATABASE_ID, BOOKINGS_COLLECTION_ID, id, updates);
        res.status(200).json(updated);
    } catch (err: unknown) {
        next(err);
    }
};
