import { Request, Response, NextFunction } from 'express';
import { getSessionClient } from '../config/appwrite';

// Extend Request to carry authenticated user info
declare global {
    namespace Express {
        interface Request {
            appwriteSession?: string;
            currentUser?: {
                $id: string;
                email: string;
                name: string;
                emailVerification: boolean;
            };
        }
    }
}

/**
 * requireAuth middleware
 * Reads the Appwrite session token from:
 *   1. The `X-Appwrite-Session` header  (preferred for API calls)
 *   2. The `a_session_*` cookie         (set by loginWithOAuth / browser flow)
 *   3. The `Authorization: Bearer ...`  header
 */
export const requireAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Extract token
        const sessionHeader = req.headers['x-appwrite-session'] as string | undefined;
        const bearerToken = req.headers.authorization?.startsWith('Bearer ')
            ? req.headers.authorization.slice(7)
            : undefined;

        // Cookie: Appwrite stores it as a_session_<projectId>
        const cookieSession = Object.entries(req.cookies || {}).find(([k]) =>
            k.startsWith('a_session_')
        )?.[1] as string | undefined;

        const sessionToken = sessionHeader || bearerToken || cookieSession;

        if (!sessionToken) {
            res.status(401).json({ error: 'Unauthorized — no session token provided' });
            return;
        }

        // Validate by fetching the authenticated user
        const { account } = getSessionClient(sessionToken);
        const user = await account.get();

        req.appwriteSession = sessionToken;
        req.currentUser = {
            $id: user.$id,
            email: user.email,
            name: user.name,
            emailVerification: user.emailVerification,
        };

        next();
    } catch {
        res.status(401).json({ error: 'Unauthorized — invalid or expired session' });
    }
};
