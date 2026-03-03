// SignUpForm.jsx — modal signup with phone OTP gate as step 1
import { useState, useEffect } from "react";
import { User, Mail, Lock, AlertCircle, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/image3.png";
import { useAuth } from "../../utils/AuthContext";
import PhoneOtpGate from "../PhoneOtpGate";

const GoogleIcon = () => (
  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

export default function SignUpForm({ onSwitchToLogin, onClose, initialUserType = "mentee", onPhoneVerified }) {
  // fixed userType from the modal that opened us — no toggle needed
  const userType = initialUserType;

  const [step, setStep] = useState('phone'); // 'phone' | 'account'
  const [verifiedPhone, setVerifiedPhone] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { signup, loginWithGoogle } = useAuth();



  const handlePhoneVerified = (phone) => {
    setVerifiedPhone(phone);
    setStep('account');
    // Notify parent (AuthModals) so it can show exit warning if user tries to close
    if (onPhoneVerified) onPhoneVerified();
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      localStorage.setItem('welcome_toast', `Welcome to Koach, ${name}!`);
      await signup(name, email, password, userType, verifiedPhone);
      localStorage.setItem('dashboardType', userType);
      // Navigate FIRST, then silently close modal so navigate('/') doesn't overwrite
      navigate(userType === 'mentor' ? '/mentor-onboarding' : '/dashboard');
      if (onClose) onClose();
    } catch (err) {
      console.error('Sign-up error:', err);
      setError(err?.message || 'Sign-up failed. Please try again.');
      localStorage.removeItem('welcome_toast');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      localStorage.setItem('welcome_toast', 'Welcome to Koach!');
      // loginWithGoogle navigates internally — DON'T call onClose() after,
      // it would trigger navigate('/') and overwrite the mentor-onboarding redirect.
      await loginWithGoogle(navigate, true, userType, verifiedPhone);
      // Silently close modal state only (no navigation side-effect)
      if (onClose) onClose();
    } catch (err) {
      console.error('Google sign-up error:', err);
      setError('Google sign-up failed. Please try again.');
      localStorage.removeItem('welcome_toast');
    }
  };

  const isMentor = userType === 'mentor';

  return (
    <div className="w-full flex flex-col py-6 px-4">
      {/* Header */}
      <div className="text-center mb-5">
        <img src={Logo} alt="Koach Logo" className="h-10 mx-auto mb-2" />
        <h2 className="text-2xl font-bold text-blue-700">
          {isMentor ? 'Become a Mentor' : 'Create Account'}
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          {isMentor ? 'Share your expertise with students' : 'Start your learning journey'}
        </p>
      </div>

      {/* ── Step progress bar ── */}
      <div className="flex items-center justify-center gap-0 mb-6">
        {/* Step 1 */}
        <div className="flex flex-col items-center w-24">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all
            ${step === 'phone'
              ? 'bg-blue-600 border-blue-600 text-white'
              : 'bg-emerald-500 border-emerald-500 text-white'}`}>
            {step === 'account' ? <CheckCircle className="w-4 h-4" /> : '1'}
          </div>
          <span className={`text-[11px] mt-1 font-medium ${step === 'phone' ? 'text-blue-600' : 'text-emerald-600'}`}>
            Verify Phone
          </span>
        </div>

        {/* Connector line */}
        <div className={`h-0.5 w-12 -mt-4 transition-all ${step === 'account' ? 'bg-emerald-400' : 'bg-gray-200'}`} />

        {/* Step 2 */}
        <div className="flex flex-col items-center w-24">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all
            ${step === 'account'
              ? 'bg-blue-600 border-blue-600 text-white'
              : 'bg-white border-gray-300 text-gray-400'}`}>
            2
          </div>
          <span className={`text-[11px] mt-1 font-medium ${step === 'account' ? 'text-blue-600' : 'text-gray-400'}`}>
            Your Details
          </span>
        </div>
      </div>

      {/* ── STEP 1: Phone OTP ── */}
      {step === 'phone' && (
        <>
          <PhoneOtpGate userType={userType} onVerified={handlePhoneVerified} />
          <p className="text-center mt-5 text-xs text-gray-500">
            Already have an account?{' '}
            <button onClick={onSwitchToLogin} className="text-blue-600 font-semibold hover:underline">
              Log in
            </button>
          </p>
        </>
      )}

      {/* ── STEP 2: Account details ── */}
      {step === 'account' && (
        <>
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text" placeholder="Full Name" value={name} required
                onChange={e => setName(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder-gray-400"
              />
            </div>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email" placeholder={isMentor ? 'mentor@example.com' : 'student@example.com'} value={email} required
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder-gray-400"
              />
            </div>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password" placeholder="Password" value={password} required
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder-gray-400"
              />
            </div>

            {error && (
              <div className="flex items-center text-red-500 text-xs bg-red-50 p-2 rounded">
                <AlertCircle size={14} className="mr-1.5 flex-shrink-0" />{error}
              </div>
            )}

            <button type="submit" disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md text-base mt-1">
              {isLoading ? 'Creating...' : (isMentor ? 'Sign Up as Mentor' : 'Sign Up')}
            </button>
          </form>

          <div className="mt-4">
            <div className="flex items-center mb-3">
              <div className="flex-grow border-t border-gray-100" />
              <span className="mx-3 text-xs text-gray-400 font-medium">OR CONTINUE WITH</span>
              <div className="flex-grow border-t border-gray-100" />
            </div>
            <button onClick={handleGoogleSignUp}
              className="w-full flex items-center justify-center py-3.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <GoogleIcon />
              <span className="text-base font-medium text-gray-600">Continue with Google</span>
            </button>
          </div>

          <div className="mt-3 text-center">
            <button
              type="button"
              onClick={() => { setStep('phone'); setVerifiedPhone(''); setError(''); }}
              className="text-xs text-slate-400 hover:text-slate-600 hover:underline"
            >
              ← Change phone number
            </button>
          </div>

          <p className="text-center mt-3 text-xs text-gray-500">
            Already have an account?{' '}
            <button onClick={onSwitchToLogin} className="text-blue-600 font-semibold hover:underline">
              Log in
            </button>
          </p>
        </>
      )}
    </div>
  );
}
