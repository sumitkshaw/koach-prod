import { Request, Response, NextFunction } from 'express';
import { ID } from 'node-appwrite';
import {
    databases,
    users,
    getSessionClient,
    USER_PROFILE_DATABASE_ID,
    USER_PROFILES_COLLECTION_ID,
} from '../../config/appwrite';

// ── Helper: build a user-session-scoped Appwrite account ────────────────────
const sessionAccount = (token: string) => getSessionClient(token).account;

// ── POST /api/auth/signup ────────────────────────────────────────────────────
export const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, email, password, userType = 'mentee' } = req.body;

        if (!name || !email || !password) {
            res.status(400).json({ error: 'name, email, and password are required' });
            return;
        }

        // 1. Create Appwrite account
        const userId = ID.unique();
        const newUser = await users.create(userId, email, undefined, password, name);

        // 2. Create a temporary session to send verification email
        let sessionToken: string | null = null;
        try {
            const session = await sessionAccount('').createEmailPasswordSession(email, password);
            sessionToken = session.secret;

            // 3. Send verification email
            const origin = process.env.FRONTEND_URL || 'http://localhost:3847';
            await sessionAccount(session.secret).createVerification(`${origin}/verify-success`);

            // 4. Destroy the temp session
            await sessionAccount(session.secret).deleteSession('current');
        } catch (verErr) {
            console.warn('[signup] Could not send verification email:', verErr);
        }

        // 5. Create user_profile document
        try {
            await databases.createDocument(
                USER_PROFILE_DATABASE_ID,
                USER_PROFILES_COLLECTION_ID,
                ID.unique(),
                {
                    userId: newUser.$id,
                    userType,
                    displayName: name,
                    onboardingComplete: false,
                    profileComplete: false,
                    currentOnboardingStep: 1,
                }
            );
        } catch (profileErr) {
            console.warn('[signup] Could not create user profile:', profileErr);
        }

        res.status(201).json({
            message: 'Account created! Verification email sent. Please check your inbox.',
            userId: newUser.$id,
        });
    } catch (err: unknown) {
        next(err);
    }
};

// ── POST /api/auth/login ─────────────────────────────────────────────────────
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ error: 'email and password are required' });
            return;
        }

        // Create session using user-facing account (scoped to no key — just project)
        const tempClient = getSessionClient('');
        const session = await tempClient.account.createEmailPasswordSession(
            String(email).trim().toLowerCase(),
            String(password)
        );

        const userAccount = sessionAccount(session.secret);
        const user = await userAccount.get();

        // Optionally fetch profile
        let profile = null;
        try {
            const docs = await databases.listDocuments(
                USER_PROFILE_DATABASE_ID,
                USER_PROFILES_COLLECTION_ID,
                // Filter by userId — uses Appwrite Query
                [`equal("userId", "${user.$id}")`]
            );
            profile = docs.documents[0] ?? null;
        } catch {
            // Profile may not exist yet — not a fatal error
        }

        // Return session token so frontend can store it (e.g. in memory or header)
        res.status(200).json({
            session: {
                $id: session.$id,
                secret: session.secret,
                expire: session.expire,
            },
            user: {
                $id: user.$id,
                name: user.name,
                email: user.email,
                emailVerification: user.emailVerification,
            },
            profile,
            isVerified: user.emailVerification,
        });
    } catch (err: unknown) {
        next(err);
    }
};

// ── POST /api/auth/logout ────────────────────────────────────────────────────
export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const sessionToken =
            (req.headers['x-appwrite-session'] as string) ||
            req.headers.authorization?.slice(7) ||
            Object.entries(req.cookies || {}).find(([k]) => k.startsWith('a_session_'))?.[1] as string;

        if (sessionToken) {
            try {
                await sessionAccount(sessionToken).deleteSession('current');
            } catch {
                // Already expired — that's fine
            }
        }

        res.status(200).json({ message: 'Logged out successfully' });
    } catch (err: unknown) {
        next(err);
    }
};

// ── GET /api/auth/me (protected) ─────────────────────────────────────────────
export const getMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = req.currentUser!;

        // Fetch full profile
        let profile = null;
        try {
            const docs = await databases.listDocuments(
                USER_PROFILE_DATABASE_ID,
                USER_PROFILES_COLLECTION_ID,
                [`equal("userId", "${user.$id}")`]
            );
            profile = docs.documents[0] ?? null;
        } catch {
            // ok
        }

        res.status(200).json({ user, profile });
    } catch (err: unknown) {
        next(err);
    }
};

// ── POST /api/auth/verify (protected — user must be logged in) ───────────────
export const sendVerification = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const sessionToken = req.appwriteSession!;
        const origin = process.env.FRONTEND_URL || 'http://localhost:3847';
        await sessionAccount(sessionToken).createVerification(`${origin}/verify-success`);
        res.status(200).json({ message: 'Verification email sent' });
    } catch (err: unknown) {
        next(err);
    }
};

// ── POST /api/auth/forgot-password ───────────────────────────────────────────
export const forgotPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { email } = req.body;

        if (!email) {
            res.status(400).json({ error: 'email is required' });
            return;
        }

        const origin = process.env.FRONTEND_URL || 'http://localhost:3847';

        // Use a temporary no-session client for recovery (public endpoint)
        const tempClient = getSessionClient('');
        await tempClient.account.createRecovery(
            String(email).trim().toLowerCase(),
            `${origin}/reset-password`
        );

        res.status(200).json({ message: 'Password reset email sent' });
    } catch (err: unknown) {
        next(err);
    }
};
