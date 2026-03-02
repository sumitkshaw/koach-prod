import { Request, Response, NextFunction } from 'express';
import admin from '../config/firebase-admin';

// Extend Request to carry authenticated user info
declare global {
    namespace Express {
        interface Request {
            currentUser?: {
                $id: string;      // = Firebase UID (kept for backward compat with all controllers)
                uid: string;
                email: string;
                name: string;
                emailVerification: boolean;
            };
        }
    }
}

/**
 * requireAuth middleware
 * Verifies a Firebase ID token from:
 *   Authorization: Bearer <firebase-id-token>
 */
export const requireAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const token = req.headers.authorization?.startsWith('Bearer ')
            ? req.headers.authorization.slice(7)
            : undefined;

        if (!token) {
            res.status(401).json({ error: 'Unauthorized — no token provided' });
            return;
        }

        const decoded = await admin.auth().verifyIdToken(token);

        req.currentUser = {
            $id: decoded.uid,           // backward compatible — all controllers use $id
            uid: decoded.uid,
            email: decoded.email || '',
            name: decoded.name || '',
            emailVerification: decoded.email_verified || false,
        };

        next();
    } catch {
        res.status(401).json({ error: 'Unauthorized — invalid or expired token' });
    }
};
