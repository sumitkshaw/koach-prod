// src/utils/AuthContext.jsx
// Firebase-powered auth context — no Appwrite.
// Auth state flows via onAuthStateChanged from Firebase SDK.

import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import * as authService from '../services/authService';
import { createUserProfile } from './database/profiles';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [verificationMessage, setVerificationMessage] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const normalizedUser = {
          $id: firebaseUser.uid,
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || '',
          emailVerification: firebaseUser.emailVerified,
          avatarUrl: firebaseUser.photoURL || '',
        };
        setUser(normalizedUser);
        // Upsert MongoDB UserProfile with all Firebase user data
        try {
          const nameParts = (firebaseUser.displayName || '').split(' ');
          await createUserProfile({
            userId: firebaseUser.uid,
            appwriteUserId: firebaseUser.uid,
            userType: 'mentee',
            email: firebaseUser.email || '',
            firstName: nameParts[0] || '',
            lastName: nameParts.slice(1).join(' ') || '',
            avatarUrl: firebaseUser.photoURL || '',
          });
        } catch { /* already exists — fine */ }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // ── Auth actions exposed to all pages via useAuth() ─────────────────────────

  const signup = async (name, email, password, userType = 'mentee', phone = '') => {
    const firebaseUser = await authService.signup(name, email, password);
    const nameParts = name.split(' ');
    await createUserProfile({
      userId: firebaseUser.uid,
      appwriteUserId: firebaseUser.uid,
      userType,
      email,
      phone,
      firstName: nameParts[0] || '',
      lastName: nameParts.slice(1).join(' ') || '',
    });
    return firebaseUser;
  };

  const login = (email, password) => authService.login(email, password);

  const loginWithGoogle = async (navigate, isSignup = false, userType = 'mentee', phone = '') => {
    const firebaseUser = await authService.loginWithGoogle();
    const nameParts = (firebaseUser.displayName || '').split(' ');
    await createUserProfile({
      userId: firebaseUser.uid,
      appwriteUserId: firebaseUser.uid,
      userType,
      email: firebaseUser.email || '',
      phone,
      firstName: nameParts[0] || '',
      lastName: nameParts.slice(1).join(' ') || '',
      avatarUrl: firebaseUser.photoURL || '',
    });
    if (navigate) {
      navigate(userType === 'mentor' ? '/mentor-onboarding' : '/dashboard');
    }
    return firebaseUser;
  };

  // Kept for backward compat — LinkedIn not implemented, falls back to Google
  const loginWithLinkedIn = loginWithGoogle;

  const logout = async (navigate) => {
    await authService.logout();
    if (navigate) navigate('/');
  };

  const sendVerification = () => authService.sendVerification();

  const clearVerificationMessage = () => setVerificationMessage('');

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    isVerified: user?.emailVerification || false,
    verificationMessage,
    // Actions
    signup,
    login,
    loginWithGoogle,
    loginWithLinkedIn,
    logout,
    sendVerification,
    clearVerificationMessage,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
