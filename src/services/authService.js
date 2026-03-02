// src/services/authService.js
// Firebase-based auth — no Appwrite SDK, no backend proxy for login/signup

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
import { auth, googleProvider } from '../utils/firebase';

/**
 * Sign up with email + password.
 * Creates the user in Firebase Auth and sets displayName.
 */
export const signup = async (name, email, password) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(user, { displayName: name });
  await sendEmailVerification(user);
  return user;
};

/**
 * Login with email + password.
 */
export const login = async (email, password) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
};

/**
 * Login with Google popup.
 */
export const loginWithGoogle = async () => {
  const { user } = await signInWithPopup(auth, googleProvider);
  return user;
};

/**
 * Logout — signs out from Firebase.
 */
export const logout = () => signOut(auth);

/**
 * Send password reset email.
 */
export const forgotPassword = (email) => sendPasswordResetEmail(auth, email);

/**
 * Send email verification to current user.
 */
export const sendVerification = () => {
  const user = auth.currentUser;
  if (user) return sendEmailVerification(user);
};

/**
 * Get current Firebase user (synchronous).
 */
export const getCurrentUser = () => auth.currentUser;

/**
 * Get a fresh ID token for the backend (call before protected API requests).
 */
export const getIdToken = (forceRefresh = false) => {
  const user = auth.currentUser;
  return user ? user.getIdToken(forceRefresh) : Promise.resolve(null);
};

/**
 * Backward-compat stub — used by some components.
 */
export const getMe = async () => {
  const user = auth.currentUser;
  if (!user) return null;
  return {
    user: {
      $id: user.uid,
      uid: user.uid,
      email: user.email,
      name: user.displayName || '',
      emailVerification: user.emailVerified,
    },
  };
};

export const hasStoredSession = () => !!auth.currentUser;
