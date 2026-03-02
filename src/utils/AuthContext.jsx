// src/utils/AuthContext.jsx
// Auth state now flows through the backend API via authService.js
// Direct Appwrite SDK calls (from auth.js) are preserved as a fallback for
// OAuth flows that still redirect through Appwrite's OAuth redirect mechanism
import { createContext, useContext, useState, useEffect, useRef } from "react";
import * as authService from "../services/authService";
import {
  verifyEmail,
  checkVerificationInUrl,
  loginWithOAuth,
  updatePassword,
  resendVerification,
  account,
} from "./auth";
import {
  createUserProfile,
  checkOnboardingStatus,
} from "./database/profiles";
import { FEATURE_FLAGS } from "./featureFlags";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const verificationHandledRef = useRef(false);

  // ── Initialize: check session on app load ──────────────────────────────────
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Handle email-verification link (URL params from Appwrite email)
        if (!verificationHandledRef.current) {
          const { userId, secret } = checkVerificationInUrl();
          if (userId && secret) {
            try {
              await verifyEmail(userId, secret);
              setVerificationMessage("Email verified successfully! You can now login.");
              setIsVerified(true);
            } catch {
              setVerificationMessage("Verification failed. Please try again.");
            } finally {
              window.history.replaceState({}, document.title, window.location.pathname);
              verificationHandledRef.current = true;
            }
          }
        }

        // Fetch current user from backend (validates stored session token)
        const data = await authService.getMe();
        if (data?.user) {
          setUser(data.user);
          setIsVerified(data.user.emailVerification || false);
          setNeedsVerification(data.user && !data.user.emailVerification);
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // ── Helper: create profile for new user ────────────────────────────────────
  const createUserProfileWithRole = async (userId, userData) => {
    if (!FEATURE_FLAGS.USE_NEW_PROFILE_SYSTEM) return null;
    try {
      const userType = localStorage.getItem("signupUserType") || userData.userType || "mentee";
      localStorage.removeItem("signupUserType");
      const profile = await createUserProfile({
        userId,
        userType,
        displayName: userData.name || "",
        onboardingComplete: false,
        profileComplete: false,
        currentOnboardingStep: 1,
      });
      return profile;
    } catch (error) {
      console.error("Failed to create user profile:", error);
      return null;
    }
  };

  // ── Helper: redirect after login ───────────────────────────────────────────
  const redirectBasedOnStatus = (status, navigate) => {
    if (status.userType === "mentor") {
      navigate(status.needsOnboarding ? "/mentor-onboarding" : "/dashboard_mentor");
    } else {
      navigate("/dashboard");
    }
  };

  const handlePostLoginRedirection = async (userId, navigate, verified) => {
    if (!verified) {
      navigate("/verify-required");
      return;
    }
    if (!FEATURE_FLAGS.ENABLE_ROLE_BASED_ONBOARDING) {
      navigate("/dashboard");
      return;
    }
    try {
      const status = await checkOnboardingStatus(userId);
      if (!status.hasProfile) {
        await createUserProfileWithRole(userId, { name: user?.name || "", userType: "mentee" });
        const newStatus = await checkOnboardingStatus(userId);
        redirectBasedOnStatus(newStatus, navigate);
        return;
      }
      redirectBasedOnStatus(status, navigate);
    } catch {
      navigate("/dashboard");
    }
  };

  // ── Signup ─────────────────────────────────────────────────────────────────
  const signup = async (name, email, password, navigate, setError, userType = "mentee") => {
    try {
      localStorage.setItem("signupUserType", userType);
      localStorage.setItem("signupEmail", email);

      const result = await authService.signup(name, email, password, userType);
      setVerificationMessage(result.message);
      setNeedsVerification(true);
      navigate("/verify-required");
    } catch (error) {
      console.error("Sign-up error", error);
      localStorage.removeItem("signupUserType");
      localStorage.removeItem("signupEmail");
      const msg = error?.response?.data?.error || error.message || "Sign-up failed.";
      if (msg.toLowerCase().includes("already exists")) {
        setError('❌ Account already exists! Please try logging in or use "Forgot Password".');
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(msg);
      }
      return false;
    }
  };

  // ── Login ──────────────────────────────────────────────────────────────────
  const login = async (email, password, navigate, setError, userType = null) => {
    try {
      if (userType) localStorage.setItem("signupUserType", userType);

      const result = await authService.login(email, password);
      setUser(result.user);
      setIsVerified(result.isVerified || result.user?.emailVerification);
      await handlePostLoginRedirection(
        result.user.$id,
        navigate,
        result.isVerified || result.user?.emailVerification
      );
    } catch (error) {
      console.error("Login error", error);
      const msg = error?.response?.data?.error || error.message || "Login failed.";
      if (msg.includes("verify")) {
        setError("❌ Please verify your email first! Check your inbox.");
        setNeedsVerification(true);
      } else if (msg.includes("Invalid") || msg.includes("credentials")) {
        setError("❌ Invalid email or password. Please check your credentials.");
      } else if (msg.includes("rate limit") || msg.includes("429")) {
        setError("⏰ Too many login attempts. Please wait a few minutes.");
      } else {
        setError(msg);
      }
    }
  };

  // ── OAuth (still uses direct Appwrite SDK — redirect-based flow) ───────────
  const loginWithOAuthAndRedirect = async (provider, navigate, isSignupFlow = false, userType = null) => {
    try {
      if (userType) localStorage.setItem("signupUserType", userType);
      const oauthAttempt = { provider, timestamp: Date.now(), isSignupFlow };
      localStorage.setItem("lastOAuthAttempt", JSON.stringify(oauthAttempt));
      try { await account.deleteSession("current"); } catch { /* ignore */ }
      const successUrl = `${window.location.origin}/oauth-callback`;
      const failureUrl = `${window.location.origin}/login?error=${encodeURIComponent(
        JSON.stringify({ message: `${provider} authentication failed`, type: "oauth_error" })
      )}`;
      await loginWithOAuth(provider, successUrl, failureUrl);
    } catch (error) {
      localStorage.removeItem("lastOAuthAttempt");
      throw error;
    }
  };

  const loginWithGoogle = (navigate, isSignupFlow = false, userType = null) =>
    loginWithOAuthAndRedirect("google", navigate, isSignupFlow, userType);

  const loginWithLinkedIn = (navigate, isSignupFlow = false, userType = null) =>
    loginWithOAuthAndRedirect("linkedin", navigate, isSignupFlow, userType);

  // ── Verification ───────────────────────────────────────────────────────────
  const sendVerification = async (setError, setSuccess) => {
    try {
      await authService.sendVerification();
      setSuccess("✅ Verification email sent! Check your inbox and spam folder.");
    } catch {
      setError("Failed to send verification email. Please try again.");
    }
  };

  const resendVerificationEmail = async (email, password, setError, setSuccess) => {
    try {
      await resendVerification(email, password); // still uses Appwrite SDK directly
      setSuccess("✅ Verification email sent! Check your inbox.");
    } catch (error) {
      setError(error.message || "Failed to resend verification email.");
    }
  };

  // ── Logout ─────────────────────────────────────────────────────────────────
  const logout = async (navigate) => {
    try {
      await authService.logout();
      setUser(null);
      setNeedsVerification(false);
      setIsVerified(false);
      localStorage.removeItem("lastOAuthAttempt");
      localStorage.removeItem("lastEmailAttempt");
      localStorage.removeItem("signupEmail");
      navigate("/");
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  // ── Password reset (still uses Appwrite SDK — uses direct link) ────────────
  const resetPassword = async (email, setError, setSuccess) => {
    try {
      await authService.forgotPassword(email);
      setSuccess("✅ Password reset email sent! Check inbox.");
    } catch (error) {
      setError(error?.response?.data?.error || error.message || "Failed to send reset email.");
    }
  };

  const confirmPasswordReset = async (userId, secret, newPassword, setError, setSuccess) => {
    try {
      await updatePassword(userId, secret, newPassword);
      setSuccess("✅ Password updated successfully! You can now log in.");
      return true;
    } catch (error) {
      setError(error.message || "Failed to update password.");
      return false;
    }
  };

  const clearVerificationMessage = () => setVerificationMessage("");

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated: !!user,
        isVerified,
        needsVerification,
        verificationMessage,
        loading,
        login,
        signup,
        loginWithGoogle,
        loginWithLinkedIn,
        logout,
        clearVerificationMessage,
        resetPassword,
        confirmPasswordReset,
        resendVerificationEmail,
        sendVerification,
        checkUserVerification: authService.getMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;