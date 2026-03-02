import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, X, Mail, AlertCircle } from "lucide-react";
import Logo from "../assets/image3.png";
import LoginImage from "../assets/loginimage.png";
import { useAuth } from "../utils/AuthContext";
import { getCurrentUser, checkUserVerification } from "../utils/auth";
import Footer from '../components/Footer';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationInfo, setVerificationInfo] = useState("");
  const [isVerificationLoading, setIsVerificationLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    user,
    login,
    loginWithGoogle,
    loginWithLinkedIn,
    verificationMessage,
    clearVerificationMessage,
    resendVerificationEmail,
    sendVerification
  } = useAuth();

  // Handle OAuth callback - check for errors but also verify if user is actually logged in
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const errorParam = urlParams.get('error');
    
    // First, always check if user is logged in (OAuth might have succeeded despite error param)
    getCurrentUser().then((currentUser) => {
      if (currentUser) {
        // User is logged in, redirect regardless of error param
        window.history.replaceState({}, document.title, window.location.pathname);
        navigate("/dashboard");
        return;
      }
      
      // Only show error if user is NOT logged in AND there's an error
      if (errorParam) {
        try {
          const errorData = JSON.parse(decodeURIComponent(errorParam));
          // If user already exists from OAuth during login attempt
          if (errorData.type === 'user_already_exists' || errorData.code === 409) {
            // User exists but not logged in - show helpful message
            setError("This account already exists. Please use email/password to log in, or if you signed up with Google, use Google login.");
          } else {
            // Other OAuth errors
            setError("OAuth login failed. Please try again.");
          }
          // Clean URL
          window.history.replaceState({}, document.title, window.location.pathname);
        } catch (e) {
          // If error param is not JSON, ignore it
          console.error("Error parsing OAuth error:", e);
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      }
    }).catch(() => {
      // If getCurrentUser fails and there's an error param, show error
      if (errorParam) {
        try {
          const errorData = JSON.parse(decodeURIComponent(errorParam));
          if (errorData.type === 'user_already_exists' || errorData.code === 409) {
            setError("This account already exists. Please log in with your email/password or use the same OAuth provider you used to sign up.");
          }
          window.history.replaceState({}, document.title, window.location.pathname);
        } catch (e) {
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      }
    });
  }, [location.search, navigate]);

  // Show verification modal when verificationMessage exists
  useEffect(() => {
    if (verificationMessage) {
      setVerificationInfo(verificationMessage);
      setShowVerificationModal(true);
    }
  }, [verificationMessage]);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  // Prefill email if saved (e.g., for resend verification convenience)
  useEffect(() => {
    const savedEmail = localStorage.getItem("loginEmail");
    if (savedEmail && !email) {
      setEmail(savedEmail);
    }
  }, []); // run once

  // Check verification status before login - FIX FOR WAITING LOOP
  const checkAndHandleLogin = async () => {
    try {
      // First try to create session to check verification
      const { user: currentUser, isVerified } = await checkUserVerification();
      
      if (currentUser && !isVerified) {
        // User exists but not verified - show modal instead of error
        setVerificationInfo("Please verify your email first. Check your inbox for the verification link or resend it.");
        setShowVerificationModal(true);
        return { shouldLogin: false, verified: false };
      }
      
      return { shouldLogin: true, verified: isVerified };
    } catch (error) {
      // If can't check verification, proceed with normal login
      return { shouldLogin: true, verified: false };
    }
  };

  // Login handler - FIXED VERSION
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");
    clearVerificationMessage();

    try {
      // Check verification status first
      const { shouldLogin, verified } = await checkAndHandleLogin();
      
      if (!shouldLogin) {
        setIsLoading(false);
        return; // Already handled (showing verification modal)
      }

      await login(email, password, navigate, setError);
      // Successful login will cause AuthContext.login to call navigate("/past-experience")
      // Clean up saved email after successful attempt
      localStorage.removeItem("loginEmail");
    } catch (err) {
      console.error("Login error:", err);
      
      // SMART ERROR DETECTION FOR MIXED AUTH
      if (err.message?.includes('Invalid email or password')) {
        // Check if this might be an OAuth account
        const savedOAuthAccounts = JSON.parse(localStorage.getItem('oauthAccounts') || '{}');
        const lowerEmail = email.toLowerCase();
        
        if (savedOAuthAccounts[lowerEmail]) {
          setError(
            <div>
              <p className="font-semibold">Account created with {savedOAuthAccounts[lowerEmail]}!</p>
              <p>Please use "Login with {savedOAuthAccounts[lowerEmail]}" or </p>
              <button
                onClick={() => navigate('/forgot-password')}
                className="text-blue-600 hover:underline mt-1"
              >
                reset your password
              </button>
              <p className="text-sm mt-2">
                <button
                  onClick={() => {
                    savedOAuthAccounts[lowerEmail] === 'google' 
                      ? handleGoogleLogin()
                      : handleLinkedInLogin();
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Login with {savedOAuthAccounts[lowerEmail]}
                </button>
              </p>
            </div>
          );
        } else {
          setError("Invalid email or password. Please check your credentials.");
        }
      } else if (err.message?.includes('verify your email')) {
        // Show verification modal instead of inline error
        setVerificationInfo("❌ Please verify your email first! Check your inbox for verification link.");
        setShowVerificationModal(true);
      } else {
        setError(err.message || "Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Social logins - they either redirect (OAuth) or throw
  const handleGoogleLogin = async () => {
    try {
      // Store email for OAuth tracking
      if (email) {
        localStorage.setItem('lastEmailAttempt', email);
      }
      // Pass false for isSignupFlow (or omit, default is false)
      await loginWithGoogle(navigate, false);
    } catch (err) {
      console.error("Google login error:", err);
      setError("Google login failed. Please try again.");
    }
  };

  const handleLinkedInLogin = async () => {
    try {
      // Store email for OAuth tracking
      if (email) {
        localStorage.setItem('lastEmailAttempt', email);
      }
      // Pass false for isSignupFlow (or omit, default is false)
      await loginWithLinkedIn(navigate, false);
    } catch (err) {
      console.error("LinkedIn login error:", err);
      setError("LinkedIn login is currently unavailable.");
    }
  };

  // Handle resend verification from modal
  const handleModalResendVerification = async () => {
    if (!email) {
      setError("Please enter your email address first.");
      setShowVerificationModal(false);
      return;
    }

    setIsVerificationLoading(true);
    try {
      await sendVerification(
        (errorMsg) => setError(errorMsg),
        (successMsg) => {
          setSuccess(successMsg);
          setVerificationInfo("✅ Verification email sent! Check your inbox and spam folder.");
        }
      );
    } catch (err) {
      setError("Failed to send verification email. Please try again.");
    } finally {
      setIsVerificationLoading(false);
    }
  };

  // Original resend verification (requires password)
  const handleResendVerification = async () => {
    if (!email) {
      setError("Please enter your email address first.");
      return;
    }
    if (!password) {
      setError("Please enter your password to resend the verification email.");
      return;
    }

    try {
      // Save email so it can be pre-filled later
      localStorage.setItem("loginEmail", email);

      await resendVerificationEmail(email, password, setError, (message) => {
        setError("");
        setSuccess(message);
      });
    } catch (err) {
      console.error("Resend verification error:", err);
      if (!error) setError("Failed to resend verification email. Try again later.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Verification Modal */}
      {showVerificationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => {
                setShowVerificationModal(false);
                clearVerificationMessage();
              }}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
            
            {/* Modal Content */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
                <AlertCircle className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Verification Required
              </h3>
              <p className="text-gray-600">
                {verificationInfo}
              </p>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={handleModalResendVerification}
                disabled={isVerificationLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center"
              >
                {isVerificationLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5 mr-2" />
                    Resend Verification Email
                  </>
                )}
              </button>
              
              <button
                onClick={() => {
                  setShowVerificationModal(false);
                  clearVerificationMessage();
                }}
                className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
            
            <p className="text-xs text-gray-500 mt-4 text-center">
              Check your spam folder if you don't see the email
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-1 bg-gray-50">
        {/* Left Panel - Form */}
        <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center px-8 py-12 lg:px-16">
          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="absolute top-8 left-8 p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <br />

          {/* Content Container */}
          <div className="max-w-md mx-auto w-full">
            {/* Logo */}
            <div className="mb-2">
              <img src={Logo} alt="Logo" className="h-13 w-auto" />
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-semibold text-blue-600 mb-2">Login</h2>
              <p className="text-gray-600">Login to your account</p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    // store for convenience if user needs to resend verification
                    localStorage.setItem("loginEmail", e.target.value);
                  }}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-700 placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-700 placeholder-gray-500 focus:border-blue-500 focus:outline-only transition-colors"
                  required
                />
              </div>

              {/* Error / Success */}
              {error && (
                <div className="text-red-600 text-sm bg-red-50 border border-red-200 p-3 rounded">
                  {error}
                </div>
              )}
              {success && (
                <div className="text-green-700 text-sm bg-green-50 border border-green-200 p-3 rounded">
                  {success}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={handleResendVerification}
                className="text-green-600 hover:underline font-medium text-sm"
              >
                Resend Verification Email
              </button>

              <button
                onClick={() => navigate("/forgot-password")}
                className="text-blue-600 hover:underline font-medium"
              >
                Forgot Password?
              </button>
            </div>

            {/* Sign up Link */}
            <div className="mt-6 text-center text-gray-600">
              Don&apos;t have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-blue-600 hover:underline font-medium"
              >
                Sign up
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center my-6">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="mx-4 text-gray-500">or</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {/* Google icon */}
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" aria-hidden>
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Login with Google
              </button>

              <button
                onClick={handleLinkedInLogin}
                className="w-full flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {/* LinkedIn icon */}
                <svg className="w-5 h-5 mr-3" fill="#0077B5" viewBox="0 0 24 24" aria-hidden>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Login with LinkedIn
              </button>
            </div>

            {/* Terms */}
            <p className="mt-6 text-xs text-gray-500 text-center">
              By logging in you agree to Company's{" "}
              <button className="text-blue-600 hover:underline">Terms of Use</button>{" "}
              and <button className="text-blue-600 hover:underline">Privacy Policy</button>.
            </p>
          </div>
        </div>

        {/* Right Panel - Image */}
        <div className="hidden lg:flex lg:w-1/2 justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
          <div className="w-full h-full overflow-hidden">
            <div className="rounded-2xl shadow-xl bg-white p-2 transform hover:scale-105 transition-transform duration-300 h-full">
              <div className="rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 p-8 h-full flex items-center justify-center">
                <div className="text-center">
                  <img
                    src={LoginImage}
                    alt="Sign Up Visual"
                    className="rounded-xl shadow-lg w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> {/* end main content */}

      {/* Footer */}
      <Footer />
    </div>
  );
}