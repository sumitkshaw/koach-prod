import { Router } from 'express';
import {
    createBooking,
    getMenteeBookings,
    getMentorBookings,
    updateBookingStatus,
} from './bookings.controller';
import { requireAuth } from '../../middleware/auth';

const router = Router();

// All booking routes require authentication
router.post('/', requireAuth, createBooking);
router.get('/mentee/:menteeId', requireAuth, getMenteeBookings);
router.get('/mentor/:mentorId', requireAuth, getMentorBookings);
router.patch('/:id', requireAuth, updateBookingStatus);

export default router;
