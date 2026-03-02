import { Request, Response, NextFunction } from 'express';
import admin from '../../config/firebase-admin';
import { UserProfile } from '../../models/UserProfile';

// ── GET /api/auth/me (protected) ─────────────────────────────────────────────
// Firebase auth is handled on the client.
// This endpoint just returns the verified user from req.currentUser (set by middleware).
export const getMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = req.currentUser!;

        // Also fetch MongoDB profile if it exists
        const profile = await UserProfile.findOne({ appwriteUserId: user.$id }).lean();

        res.status(200).json({ user, profile });
    } catch (err) {
        next(err);
    }
};

// ── POST /api/auth/logout ────────────────────────────────────────────────────
// Firebase logout is client-side (signOut). This endpoint is a no-op stub kept
// for backward compat with any frontend code that calls /api/auth/logout.
export const logout = async (_req: Request, res: Response): Promise<void> => {
    res.status(200).json({ message: 'Logged out — call signOut() on the Firebase client' });
};

// ── POST /api/auth/verify (stub) ─────────────────────────────────────────────
// Firebase handles email verification on the client via sendEmailVerification().
export const sendVerification = async (_req: Request, res: Response): Promise<void> => {
    res.status(200).json({ message: 'Call sendEmailVerification(user) on the Firebase client' });
};

// ── POST /api/auth/forgot-password (stub) ────────────────────────────────────
// Firebase handles password reset on the client via sendPasswordResetEmail().
export const forgotPassword = async (_req: Request, res: Response): Promise<void> => {
    res.status(200).json({ message: 'Call sendPasswordResetEmail(auth, email) on the Firebase client' });
};

// ── POST /api/auth/signup (stub) ─────────────────────────────────────────────
// Firebase signup is done on the client. This stub creates the MongoDB UserProfile
// document after the Firebase user is created.
export const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { uid, email, name, userType = 'mentee' } = req.body;

        if (!uid) {
            res.status(400).json({ error: 'uid is required' });
            return;
        }

        const profile = await UserProfile.findOneAndUpdate(
            { appwriteUserId: uid },
            {
                appwriteUserId: uid,
                userType,
                email: email || '',
                firstName: name?.split(' ')[0] || '',
                lastName: name?.split(' ').slice(1).join(' ') || '',
                onboardingComplete: false,
                onboardingStep: 1,
            },
            { upsert: true, new: true }
        );

        res.status(201).json({ message: 'Profile created', profile });
    } catch (err) {
        next(err);
    }
};

// ── POST /api/auth/login (stub) ──────────────────────────────────────────────
// Firebase login is done on the client. This stub is kept for backward compat.
export const login = async (_req: Request, res: Response): Promise<void> => {
    res.status(200).json({ message: 'Use Firebase signInWithEmailAndPassword on the client' });
};
