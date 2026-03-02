import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { getCurrentUser } from "../utils/auth";
import {
  createUserProfile,
  getUserProfile,
  checkOnboardingStatus,
} from "../utils/database/profiles";

export default function OAuthCallback() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        // Check if user exists after OAuth redirect
        const currentUser = await getCurrentUser();

        if (!currentUser) {
          navigate("/login");
          return;
        }

        // Set user in context
        setUser(currentUser);

        // Get provider from localStorage tracking
        const lastOAuthAttempt = JSON.parse(localStorage.getItem('lastOAuthAttempt') || '{}');
        const provider = lastOAuthAttempt.provider || 'google';

        // Track successful OAuth login
        if (currentUser.email) {
          const oauthAccounts = JSON.parse(localStorage.getItem('oauthAccounts') || '{}');
          oauthAccounts[currentUser.email.toLowerCase()] = provider;
          localStorage.setItem('oauthAccounts', JSON.stringify(oauthAccounts));
        }

        // Get or create profile (idempotent - safe to call multiple times)
        const userType = localStorage.getItem('signupUserType') || 'mentee';
        const profile = await createUserProfile({
          userId: currentUser.$id,
          userType,
          displayName: currentUser.name || '',
        });

        // Clean up localStorage
        localStorage.removeItem('signupUserType');
        localStorage.removeItem('lastOAuthAttempt');
        localStorage.removeItem('lastEmailAttempt');

        console.log('✅ OAuth successful, profile:', profile);

        // Simple redirect logic
        // We can just set a generic message here.
        localStorage.setItem("welcome_toast", "Welcome to Koach!"); // Set generic welcome for OAuth success
        localStorage.setItem("welcome_toast", "Welcome to Koach!"); // Set generic welcome for OAuth success

        if (profile.userType === 'mentor' && !profile.onboardingComplete) {
          navigate("/mentor-onboarding");
        } else if (profile.userType === 'mentor') {
          navigate("/dashboard_mentor");
        } else {
          navigate("/dashboard");
        }

      } catch (error) {
        console.error("OAuth callback error:", error);
        // Even if profile creation fails, redirect to dashboard
        navigate("/dashboard");
      }
    };

    handleOAuthCallback();
  }, [navigate, setUser]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
}