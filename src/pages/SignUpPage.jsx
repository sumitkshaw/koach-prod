import { useState, useEffect } from "react";
import { ChevronLeft, CheckCircle } from "lucide-react";
import Logo from "../assets/image3.png";
import SignupImage from "../assets/signupimg.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { getCurrentUser } from "../utils/auth";
import Footer from '../components/Footer';
import PhoneOtpGate from '../components/PhoneOtpGate';

export default function SignUpPage() {
  const [step, setStep] = useState('phone'); // 'phone' | 'signup'
  const [verifiedPhone, setVerifiedPhone] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signup, loginWithGoogle, verificationMessage, clearVerificationMessage } = useAuth();

  useEffect(() => {
    if (user) {
      setError("You're already logged in. Log out to create a new account.");
    }
  }, [user]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const errorParam = urlParams.get('error');
    getCurrentUser().then((currentUser) => {
      if (currentUser) { navigate("/dashboard"); return; }
      if (errorParam) {
        try {
          const d = JSON.parse(decodeURIComponent(errorParam));
          if (d.type === 'user_already_exists' || d.code === 409) {
            setError("An account with this email already exists. Please log in.");
          } else { setError("OAuth signup failed. Please try again."); }
          window.history.replaceState({}, document.title, window.location.pathname);
        } catch { window.history.replaceState({}, document.title, window.location.pathname); }
      }
    }).catch(() => {});
  }, [location.search, navigate]);

  const handlePhoneVerified = (phone) => {
    setVerifiedPhone(phone);
    setStep('signup');
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (user) { setError("Already logged in."); return; }
    setIsLoading(true);
    setError("");
    try {
      await signup(name, email, password, 'mentee', verifiedPhone);
      navigate('/dashboard');
    } catch (err) {
      console.error("Sign-up error:", err);
      setError(err?.message || "Sign-up failed. Please try again.");
    } finally { setIsLoading(false); }
  };

  const handleGoogleSignUp = async () => {
    try {
      await loginWithGoogle(navigate, true, 'mentee', verifiedPhone);
    } catch (err) {
      console.error("Google sign-up error:", err);
      setError("Google sign-up failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {verificationMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative m-4">
          <span>{verificationMessage}</span>
          <button onClick={clearVerificationMessage} className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <span className="text-2xl">×</span>
          </button>
        </div>
      )}

      <div className="flex flex-1 bg-gray-50">
        {/* Left Panel */}
        <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center px-8 py-12 lg:px-16 relative">
          <button
            onClick={() => step === 'signup' ? setStep('phone') : navigate("/")}
            className="absolute top-8 left-8 p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="max-w-md mx-auto w-full mt-8">
            <div className="mb-4">
              <img src={Logo} alt="Logo" className="h-13 w-auto" />
            </div>

            {/* Step indicator */}
            <div className="flex items-center gap-3 mb-6">
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all
                ${step === 'phone' ? 'bg-blue-600 text-white' : 'bg-emerald-100 text-emerald-700'}`}>
                {step === 'signup' ? <CheckCircle className="w-3 h-3" /> : <span>1</span>}
                Verify Phone
              </div>
              <div className="h-px w-6 bg-gray-200" />
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all
                ${step === 'signup' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                <span>2</span> Create Account
              </div>
            </div>

            {step === 'phone' ? (
              <>
                <div className="mb-6">
                  <h2 className="text-3xl font-semibold text-blue-600 mb-1">Sign Up</h2>
                  <p className="text-gray-600">First, let's verify your phone number</p>
                </div>
                <PhoneOtpGate userType="mentee" onVerified={handlePhoneVerified} />
                <div className="mt-6 text-center text-gray-600 text-sm">
                  Already have an account?{" "}
                  <button onClick={() => navigate("/login")} className="text-blue-600 hover:underline font-medium">Log in</button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="text-3xl font-semibold text-blue-600 mb-1">Create Account</h2>
                  <p className="text-gray-600">Phone verified ✓ — now set up your account</p>
                </div>

                <form onSubmit={handleSignUp} className="space-y-4">
                  <input
                    type="text" placeholder="Full Name" value={name}
                    onChange={e => setName(e.target.value)} required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-700 placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                  />
                  <input
                    type="email" placeholder="Email address" value={email}
                    onChange={e => setEmail(e.target.value)} required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-700 placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                  />
                  <input
                    type="password" placeholder="Password" value={password}
                    onChange={e => setPassword(e.target.value)} required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-700 placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                  />

                  {error && <div className="text-red-500 text-sm bg-red-50 p-2 rounded">{error}</div>}

                  <button type="submit" disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50">
                    {isLoading ? "Creating Account..." : "Sign Up"}
                  </button>
                </form>

                <div className="flex items-center my-5">
                  <hr className="flex-grow border-t border-gray-300" />
                  <span className="mx-4 text-gray-500 text-sm">or</span>
                  <hr className="flex-grow border-t border-gray-300" />
                </div>

                <button onClick={handleGoogleSignUp}
                  className="w-full flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Continue with Google
                </button>

                <p className="mt-5 text-xs text-gray-500 text-center">
                  By signing up I accept Koach's{" "}
                  <button className="text-blue-600 hover:underline">Terms of Use</button> and{" "}
                  <button className="text-blue-600 hover:underline">Privacy Policy</button>.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Right Panel */}
        <div className="hidden lg:flex lg:w-1/2 justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
          <div className="w-full h-full overflow-hidden rounded-2xl shadow-xl bg-white p-2">
            <div className="rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 p-8 h-full flex items-center justify-center">
              <img src={SignupImage} alt="Sign Up" className="rounded-xl shadow-lg w-full h-auto object-cover" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}