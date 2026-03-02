// src/services/bookingService.js
import api from './api';

/**
 * Create a new booking.
 * @param {{ mentorId, sessionDate, duration, notes?, price? }} bookingData
 */
export const createBooking = async (bookingData) => {
  const { data } = await api.post('/api/bookings', bookingData);
  return data;
};

/**
 * Get all bookings for a mentee (by menteeId = user.$id).
 */
export const getMenteeBookings = async (menteeId) => {
  const { data } = await api.get(`/api/bookings/mentee/${menteeId}`);
  return data; // { total, documents: Booking[] }
};

/**
 * Get all bookings for a mentor (by mentorId / Appwrite doc $id).
 */
export const getMentorBookings = async (mentorId) => {
  const { data } = await api.get(`/api/bookings/mentor/${mentorId}`);
  return data; // { total, documents: Booking[] }
};

/**
 * Update booking status or notes.
 * @param {string} id - Booking document $id
 * @param {{ status?: 'pending'|'confirmed'|'cancelled'|'completed', notes?: string }} updates
 */
export const updateBookingStatus = async (id, updates) => {
  const { data } = await api.patch(`/api/bookings/${id}`, updates);
  return data;
};
