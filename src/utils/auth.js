// src/utils/auth.js
import { account as appwriteAccount, oauthProviders } from './appwrite';
import { ID } from 'appwrite';

// Re-export the account object for use in other files
export const account = appwriteAccount;

// Add delay to prevent rate limiting
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Create account with email/password - FIXED VERSION
export const createAccount = async (email, password, name) => {
  try {
    await delay(1000);

    // Create user account
    const user = await appwriteAccount.create(ID.unique(), email, password, name);

    // IMPORTANT FIX: Create a session FIRST before sending verification
    try {
      // Create a session so we're authenticated
      await appwriteAccount.createEmailPasswordSession(email, password);
      
      // Now send verification (requires authenticated session)
      await appwriteAccount.createVerification(`${window.location.origin}/verify-success`);
      
      // Delete the temporary session
      await appwriteAccount.deleteSession('current');
      
      return { user, message: 'Account created! Verification email sent. Please check your inbox (and spam).' };
    } catch (verr) {
      console.warn('[Signup] Verification send failed:', { 
        message: verr?.message, 
        code: verr?.code, 
        type: verr?.type 
      });
      
      // Clean up session if it exists
      try {
        await appwriteAccount.deleteSession('current');
      } catch (e) {
        // Ignore
      }
      
      // Still consider signup successful
      return { 
        user, 
        message: 'Account created! Please login first, then use "Resend Verification" on the login page to verify your email.'
      };
    }
  } catch (error) {
    console.error('[Signup] createAccount error:', {
      message: error?.message,
      code: error?.code,
      type: error?.type,
    });
    
    if (error.message?.includes('rate limit') || error.code === 429) {
      throw new Error('Too many attempts. Please wait before trying again.');
    }
    if (error.type === 'user_already_exists') {
      throw new Error('An account with this email already exists. Please try logging in or use "Forgot Password" if you forgot your password.');
    }
    
    throw new Error('Sign up failed. Please try again.');
  }
};

// Login with email/password - ADD VERIFICATION CHECK
export const login = async (email, password) => {
  try {
    await delay(1000);
    const normalizedEmail = String(email || '').trim().toLowerCase();
    
    // Create session
    const session = await appwriteAccount.createEmailPasswordSession(normalizedEmail, String(password ?? ''));
    const user = await appwriteAccount.get();
    
    // Return user regardless of verification status
    // Verification check will be handled in AuthContext
    return { session, user, isVerified: user.emailVerification };
    
  } catch (error) {
    if (error.message?.includes('rate limit') || error.code === 429) {
      throw new Error('Too many login attempts. Please wait before trying again.');
    } else if (error.type === 'user_invalid_credentials' || error.code === 401) {
      // Check if this might be an OAuth account
      throw new Error('Invalid email or password. Please check Caps Lock and try again, or use "Forgot Password".');
    }
    throw new Error(`Login failed. ${error?.message || 'Please try again.'}`);
  }
};

// OAuth login
export const loginWithOAuth = async (provider, successUrl, failureUrl = null) => {
  try {
    const defaultFailureUrl = `${window.location.origin}/login?error=${encodeURIComponent(
      JSON.stringify({ 
        message: `${provider} authentication failed`, 
        type: 'oauth_error' 
      })
    )}`;
    
    await appwriteAccount.createOAuth2Session(
      provider,
      successUrl,
      failureUrl || defaultFailureUrl
    );
  } catch (error) {
    console.error('OAuth login error:', error);
    throw new Error(`OAuth login failed: ${error.message}`);
  }
};

// Verify email using magic URL parameters
export const verifyEmail = async (userId, secret) => {
  try {
    await delay(500);
    const result = await appwriteAccount.updateVerification(userId, secret);
    return result;
  } catch (error) {
    throw new Error('Invalid or expired verification link.');
  }
};

// Resend verification email - IMPROVED VERSION
export const resendVerification = async (email, password) => {
  try {
    await delay(1000);
    
    // First create a session
    const normalizedEmail = String(email || '').trim().toLowerCase();
    await appwriteAccount.createEmailPasswordSession(normalizedEmail, String(password ?? ''));
    
    // Now send verification (requires authenticated session)
    await appwriteAccount.createVerification(`${window.location.origin}/verify-success`);
    
    // Clean up session
    await appwriteAccount.deleteSession('current');
    
    return { success: true };
  } catch (error) {
    if (error.message?.includes('rate limit') || error.code === 429) {
      throw new Error('Too many attempts. Please wait before trying again.');
    }
    if (error.type === 'user_invalid_credentials' || error.code === 401) {
      throw new Error('Invalid email or password. Please check your credentials.');
    }
    throw new Error(`Failed to send verification email. ${error?.message || 'Please try again.'}`);
  }
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const user = await appwriteAccount.get();
    return user;
  } catch (error) {
    return null;
  }
};

// Check if user is verified
export const checkUserVerification = async () => {
  try {
    const user = await appwriteAccount.get();
    return {
      user,
      isVerified: user?.emailVerification || false
    };
  } catch (error) {
    return { user: null, isVerified: false };
  }
};

// Logout
export const logout = async () => {
  try {
    await appwriteAccount.deleteSession('current');
  } catch (error) {
    throw error;
  }
};

// Check URL for verification parameters
export const checkVerificationInUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('userId');
  const secret = urlParams.get('secret');
  
  return { userId, secret };
};

// Password reset functionality
export const createPasswordRecovery = async (email, redirectUrl) => {
  try {
    await delay(1000);
    const normalizedEmail = String(email || '').trim().toLowerCase();
    await appwriteAccount.createRecovery(
      normalizedEmail,
      redirectUrl || `${window.location.origin}/reset-password`
    );
    return { success: true };
  } catch (error) {
    if (error.message?.includes('rate limit') || error.code === 429) {
      throw new Error('Too many attempts. Please wait before trying again.');
    }
    if (error.type === 'user_not_found') {
      throw new Error('No account found with this email address.');
    }
    throw new Error(`Failed to send password reset email. ${error?.message || 'Please try again.'}`);
  }
};

// Update password using recovery token
export const updatePassword = async (userId, secret, password) => {
  try {
    await delay(1000);
    await appwriteAccount.updateRecovery(userId, secret, password);
    return { success: true };
  } catch (error) {
    throw new Error('Invalid or expired reset link. Please request a new one.');
  }
};

// Check URL for password reset parameters
export const checkPasswordResetInUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('userId');
  const secret = urlParams.get('secret');
  
  return { userId, secret };
};

// NEW: Send verification from authenticated session
export const sendVerificationEmail = async () => {
  try {
    await appwriteAccount.createVerification(`${window.location.origin}/verify-success`);
    return { success: true };
  } catch (error) {
    console.error('Send verification error:', error);
    throw new Error(`Failed to send verification email: ${error.message}`);
  }
};

// NEW: Check if session exists and user is verified
export const getSessionStatus = async () => {
  try {
    const user = await appwriteAccount.get();
    const sessions = await appwriteAccount.listSessions();
    
    return {
      hasSession: sessions.total > 0,
      user,
      isVerified: user?.emailVerification || false
    };
  } catch (error) {
    return {
      hasSession: false,
      user: null,
      isVerified: false
    };
  }
};