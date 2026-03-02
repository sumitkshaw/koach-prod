import { Router } from 'express';
import {
    login,
    signup,
    logout,
    getMe,
    sendVerification,
    forgotPassword,
} from './auth.controller';
import { requireAuth } from '../../middleware/auth';

const router = Router();

// Public routes
router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', logout);
router.post('/verify', requireAuth, sendVerification);
router.post('/forgot-password', forgotPassword);

// Protected routes
router.get('/me', requireAuth, getMe);

export default router;
