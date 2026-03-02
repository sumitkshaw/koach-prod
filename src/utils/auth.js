// src/utils/auth.js
// Firebase-based replacements for old Appwrite auth helpers.
// All functions that pages import from here now use Firebase SDK.

import { auth } from './firebase';
import { sendPasswordResetEmail, confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';

// ── Get current Firebase user (sync) ────────────────────────────────────────
export const getCurrentUser = () => {
  const user = auth.currentUser;
  if (!user) return null;
  return {
    $id: user.uid,
    uid: user.uid,
    email: user.email,
    name: user.displayName || '',
    emailVerification: user.emailVerified,
    avatarUrl: user.photoURL || '',
  };
};

// ── Check if current user's email is verified ──────────────────────────────
export const checkUserVerification = async () => {
  const user = auth.currentUser;
  if (!user) return false;
  await user.reload(); // refresh from Firebase
  return user.emailVerified;
};

// ── Check URL params for Appwrite email verification (stub — not used anymore)
export const checkVerificationInUrl = () => ({ userId: null, secret: null });

// ── Verify email (stub — Firebase does this via email link, not URL params)
export const verifyEmail = async () => ({ success: true });

// ── Send password reset email ────────────────────────────────────────────────
export const forgotPassword = (email) =>
  sendPasswordResetEmail(auth, email);

// ── Check if URL contains a Firebase password reset code ───────────────────
export const checkPasswordResetInUrl = () => {
  const params = new URLSearchParams(window.location.search);
  const oobCode = params.get('oobCode');
  const mode = params.get('mode');
  return { oobCode, isReset: mode === 'resetPassword' };
};

// ── Confirm the new password using oobCode from URL ────────────────────────
export const resetPassword = async (oobCode, newPassword) => {
  await confirmPasswordReset(auth, oobCode, newPassword);
};

// ── Verify the oobCode is valid before letting user type new password ───────
export const verifyResetCode = (oobCode) => verifyPasswordResetCode(auth, oobCode);

// ── Resend email verification ────────────────────────────────────────────────
export const resendVerification = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error('Not logged in');
  const { sendEmailVerification } = await import('firebase/auth');
  await sendEmailVerification(user);
};

// ── Update password ──────────────────────────────────────────────────────────
export const updatePassword = async (oldPassword, newPassword) => {
  const { EmailAuthProvider, reauthenticateWithCredential, updatePassword: fbUpdatePassword } = await import('firebase/auth');
  const user = auth.currentUser;
  if (!user) throw new Error('Not logged in');
  const credential = EmailAuthProvider.credential(user.email, oldPassword);
  await reauthenticateWithCredential(user, credential);
  await fbUpdatePassword(user, newPassword);
};

// ── OAuth login (legacy stub — real Google login is in authService.js) ──────
export const loginWithOAuth = () => {
  console.warn('Use loginWithGoogle from AuthContext instead');
};

// ── account export stub (some files reference this directly) ────────────────
export const account = {
  get: () => Promise.resolve(getCurrentUser()),
};