import { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import Logo from "../assets/image3.png";
import SignupImage from "../assets/signupimg.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { getCurrentUser } from "../utils/auth";
import Footer from '../components/Footer';

export default function MentorSignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signup, loginWithGoogle, loginWithLinkedIn, verificationMessage, clearVerificationMessage } = useAuth();

  // Check if user is already logged in
  useEffect(() => {
    if (user) {
      setError("You are already logged in. Your account is already created. Please log out if you want to create a new account.");
    }
  }, [user]);

  // Handle OAuth callback - check for errors but also verify if user is actually logged in
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const errorParam = urlParams.get('error');
    
    // First, always check if user is logged in (OAuth might have succeeded despite error param)
    getCurrentUser().then((currentUser) => {
      if (currentUser) {
        // User is logged in, redirect regardless of error param
        window.history.replaceState({}, document.title, window.location.pathname);
        navigate("/dashboard_mentor");
        return;
      }
      
      // Only show error if user is NOT logged in AND there's an error
      if (errorParam) {
        try {
          const errorData = JSON.parse(decodeURIComponent(errorParam));
          // If user already exists from OAuth signup attempt
          if (errorData.type === 'user_already_exists' || errorData.code === 409) {
            // User exists but not logged in - show helpful message
            setError("An account with this email already exists. Please log in instead or use 'Forgot Password' if you forgot your password.");
          } else {
            // Other OAuth errors
            setError("OAuth signup failed. Please try again.");
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
            setError("An account with this email already exists. Please log in instead.");
          }
          window.history.replaceState({}, document.title, window.location.pathname);
        } catch (e) {
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      }
    });
  }, [location.search, navigate]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    // Check if user is already logged in
    if (user) {
      setError("You are already logged in. Your account is already created. Please log out if you want to create a new account.");
      return;
    }
    
    setIsLoading(true);
    setError("");

    try {
      // Set userType as 'mentor' when signing up from mentor signup page
      await signup(name, email, password, navigate, setError, 'mentor');
    } catch (error) {
      console.error("Sign-up error:", error);
      setError("❌ Sign-up failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      // Store OAuth method for this email
      if (email) {
        const oauthAccounts = JSON.parse(localStorage.getItem('oauthAccounts') || '{}');
        oauthAccounts[email.toLowerCase()] = 'google';
        localStorage.setItem('oauthAccounts', JSON.stringify(oauthAccounts));
        localStorage.setItem('lastEmailAttempt', email);
      }
      
      // Pass true for isSignupFlow and 'mentor' as userType
      await loginWithGoogle(navigate, true, 'mentor');
    } catch (error) {
      console.error("Google sign-up error:", error);
      setError("Google sign-up failed. Please try again.");
    }
  };

  const handleLinkedInSignUp = async () => {
    try {
      // Store OAuth method for this email
      if (email) {
        const oauthAccounts = JSON.parse(localStorage.getItem('oauthAccounts') || '{}');
        oauthAccounts[email.toLowerCase()] = 'linkedin';
        localStorage.setItem('oauthAccounts', JSON.stringify(oauthAccounts));
        localStorage.setItem('lastEmailAttempt', email);
      }
      
      // Pass true for isSignupFlow and 'mentor' as userType
      await loginWithLinkedIn(navigate, true, 'mentor');
    } catch (error) {
      console.error("LinkedIn sign-up error:", error);
      setError("LinkedIn sign-up is currently unavailable.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Verification Success Message */}
      {verificationMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative m-4">
          <span className="block sm:inline">{verificationMessage}</span>
          <button 
            onClick={clearVerificationMessage}
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
          >
            <span className="text-2xl">×</span>
          </button>
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

            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-semibold text-blue-600 mb-2">Become a Mentor</h2>
              <p className="text-gray-600">
                Join our platform as a mentor and share your expertise
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSignUp} className="space-y-5">
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-700 placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-700 placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                  required
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm bg-red-50 p-2 rounded">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? "Creating Mentor Account..." : "Sign Up as Mentor"}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/mentor-login")}
                className="text-blue-600 hover:underline font-medium"
              >
                Log in as Mentor
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center my-6">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="mx-4 text-gray-500">or</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>

            {/* Social Sign Up Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleGoogleSignUp}
                className="w-full flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign Up with Google
              </button>

              <button
                onClick={handleLinkedInSignUp}
                className="w-full flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-3" fill="#0077B5" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Sign Up with LinkedIn
              </button>
            </div>

            {/* Terms */}
            <p className="mt-6 text-xs text-gray-500 text-center">
              By signing up to become a mentor I accept Company&apos;s{" "}
              <button className="text-blue-600 hover:underline">
                Terms of Use
              </button>{" "}
              and{" "}
              <button className="text-blue-600 hover:underline">
                Privacy Policy
              </button>
              .
            </p>

            {/* Looking to be a mentee? */}
            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <p className="text-gray-600 text-sm">
                Looking to find a mentor instead?{" "}
                <button
                  onClick={() => navigate("/signup")}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Sign up as Mentee
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel - Image */}
        <div className="hidden lg:flex lg:w-1/2 justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
          <div className="w-full h-full overflow-hidden">
            <div className="rounded-2xl shadow-xl bg-white p-2 transform hover:scale-105 transition-transform duration-300 h-full">
              <div className="rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 p-8 h-full flex items-center justify-center">
                <div className="text-center">
                  <img
                    src={SignupImage}
                    alt="Mentor Sign Up Visual"
                    className="rounded-xl shadow-lg w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}