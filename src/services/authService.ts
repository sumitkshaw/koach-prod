// src/services/authService.ts
// Firebase-based auth — typed

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    sendPasswordResetEmail,
    sendEmailVerification,
    updateProfile,
    User,
    UserCredential,
} from 'firebase/auth';
import { auth, googleProvider } from '../utils/firebase';

/** Sign up with email + password. Creates user, sets displayName, sends verification. */
export const signup = async (name: string, email: string, password: string): Promise<User> => {
    const { user }: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, { displayName: name });
    await sendEmailVerification(user);
    return user;
};

/** Login with email + password. */
export const login = async (email: string, password: string): Promise<User> => {
    const { user }: UserCredential = await signInWithEmailAndPassword(auth, email, password);
    return user;
};

/** Login with Google popup. */
export const loginWithGoogle = async (): Promise<User> => {
    const { user }: UserCredential = await signInWithPopup(auth, googleProvider);
    return user;
};

/** Logout — signs out from Firebase. */
export const logout = (): Promise<void> => signOut(auth);

/** Send password reset email. */
export const forgotPassword = (email: string): Promise<void> =>
    sendPasswordResetEmail(auth, email);

/** Send email verification to current user. */
export const sendVerification = (): Promise<void> | undefined => {
    const user = auth.currentUser;
    if (user) return sendEmailVerification(user);
};

/** Get current Firebase user (synchronous). */
export const getCurrentUser = (): User | null => auth.currentUser;

/** Get a fresh ID token for backend requests. */
export const getIdToken = (forceRefresh = false): Promise<string | null> => {
    const user = auth.currentUser;
    return user ? user.getIdToken(forceRefresh) : Promise.resolve(null);
};

/** Backward-compat stub — used by some components. */
export const getMe = async () => {
    const user = auth.currentUser;
    if (!user) return null;
    return {
        user: {
            $id: user.uid,
            uid: user.uid,
            email: user.email ?? '',
            name: user.displayName ?? '',
            emailVerification: user.emailVerified,
        },
    };
};

export const hasStoredSession = (): boolean => !!auth.currentUser;
