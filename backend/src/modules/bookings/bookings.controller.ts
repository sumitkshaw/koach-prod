import { Request, Response, NextFunction } from 'express';
import { Booking } from '../../models/Booking';
import mongoose from 'mongoose';

// ── POST /api/bookings ───────────────────────────────────────────────────────
export const createBooking = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const currentUser = req.currentUser!;
        const { mentorId, mentorName, date, time, goal, planName, totalAmount } = req.body;

        if (!mentorId || !date || !time) {
            res.status(400).json({ error: 'mentorId, date, and time are required' });
            return;
        }

        const booking = await Booking.create({
            mentorId,
            menteeId: currentUser.$id,
            mentorName: mentorName || '',
            menteeName: currentUser.name || '',
            date,
            time,
            goal: goal || '',
            planName: planName || '',
            totalAmount: Number(totalAmount) || 0,
            status: 'pending',
        });

        res.status(201).json(booking);
    } catch (err) {
        next(err);
    }
};

// ── GET /api/bookings/mentee/:menteeId ───────────────────────────────────────
export const getMenteeBookings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const currentUser = req.currentUser!;
        const { menteeId } = req.params;

        // Users can only see their own bookings
        if (currentUser.$id !== menteeId) {
            res.status(403).json({ error: 'Forbidden' });
            return;
        }

        const bookings = await Booking.find({ menteeId })
            .sort({ createdAt: -1 })
            .lean();

        res.status(200).json({ total: bookings.length, documents: bookings });
    } catch (err) {
        next(err);
    }
};

// ── GET /api/bookings/mentor/:mentorId ───────────────────────────────────────
export const getMentorBookings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { mentorId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(mentorId)) {
            res.status(400).json({ error: 'Invalid mentor ID' });
            return;
        }

        const bookings = await Booking.find({ mentorId })
            .sort({ createdAt: -1 })
            .lean();

        res.status(200).json({ total: bookings.length, documents: bookings });
    } catch (err) {
        next(err);
    }
};

// ── PATCH /api/bookings/:id ──────────────────────────────────────────────────
export const updateBookingStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const currentUser = req.currentUser!;
        const { id } = req.params;
        const { status } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ error: 'Invalid booking ID' });
            return;
        }

        const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
        if (!validStatuses.includes(status)) {
            res.status(400).json({ error: `Status must be one of: ${validStatuses.join(', ')}` });
            return;
        }

        const booking = await Booking.findById(id);
        if (!booking) {
            res.status(404).json({ error: 'Booking not found' });
            return;
        }

        // Ensure the caller is either the mentee or owns the mentor slot
        if (booking.menteeId !== currentUser.$id) {
            res.status(403).json({ error: 'Forbidden' });
            return;
        }

        booking.status = status;
        await booking.save();

        res.status(200).json(booking);
    } catch (err) {
        next(err);
    }
};
