import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Mail, Shield, AlertCircle } from "lucide-react";
import { useAuth } from "../utils/AuthContext";
import { getCurrentUser } from "../utils/auth";

export default function VerifyRequiredPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user, sendVerification, loginWithGoogle, loginWithLinkedIn, logout } = useAuth();

  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        navigate("/login");
        return;
      }
      
      setEmail(currentUser.email);
      
      // If already verified, redirect
      if (currentUser.emailVerification) {
        navigate("/dashboard");
      }
    };
    
    checkUser();
  }, [navigate]);

  const handleSendVerification = async () => {
    setIsLoading(true);
    setError("");
    setSuccess("");
    
    try {
      await sendVerification(setError, setSuccess);
    } catch (err) {
      setError("Failed to send verification email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle(navigate, false);
    } catch (err) {
      setError("Google login failed. Please try again.");
    }
  };

  const handleLinkedInLogin = async () => {
    try {
      await loginWithLinkedIn(navigate, false);
    } catch (err) {
      setError("LinkedIn login is currently unavailable.");
    }
  };

  const handleLogout = async () => {
    await logout(navigate);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
            <Shield className="w-8 h-8 text-yellow-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Verify Your Email Address
          </h1>
          <p className="text-gray-600">
            We need to confirm your email before you can access the dashboard
          </p>
        </div>

        <div className="space-y-6">
          {/* Current Status */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-blue-800 font-medium">
                Verification Required
              </span>
            </div>
            <p className="text-blue-700 text-sm mt-2">
              Email: <span className="font-semibold">{email}</span>
            </p>
          </div>

          {/* Option 1: Send Verification Email */}
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-start mb-4">
              <Mail className="w-6 h-6 text-blue-600 mr-3 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Verify via Email
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  We'll send a verification link to your email. Click it to confirm your account.
                </p>
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded mb-4">
                {error}
              </div>
            )}

            {success && (
              <div className="text-green-600 text-sm bg-green-50 p-3 rounded mb-4">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {success}
                </div>
                <p className="mt-2 text-green-700">
                  Check your inbox (and spam folder) for the verification link.
                </p>
              </div>
            )}

            <button
              onClick={handleSendVerification}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="w-5 h-5 mr-2" />
                  Send Verification Email
                </>
              )}
            </button>

            <p className="text-xs text-gray-500 mt-3 text-center">
              Didn't receive the email? Check spam folder or wait a few minutes.
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-gray-500 text-sm">OR verify instantly with</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          {/* Option 2: OAuth Verification */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Instant Verification with Social Login
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Sign in with Google or LinkedIn to verify instantly (no password required)
            </p>

            <div className="space-y-3">
              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Verify with Google
              </button>

              <button
                onClick={handleLinkedInLogin}
                className="w-full flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-3" fill="#0077B5" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Verify with LinkedIn
              </button>
            </div>
          </div>

          {/* Logout Option */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-gray-600 text-sm mb-3">
              Want to use a different account?
            </p>
            <button
              onClick={handleLogout}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Logout and try different email
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-2">How verification works:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Email method: Click the link in the email we send you</li>
            <li>• Social method: Login with Google/LinkedIn (instant verification)</li>
            <li>• After verification, you'll be redirected to your dashboard</li>
            <li>• Check spam folder if you don't see the email</li>
          </ul>
        </div>
      </div>
    </div>
  );
}