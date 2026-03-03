// src/components/PhoneOtpGate.jsx
// Step 1 of signup: verify phone number via Firebase OTP.
// Same phone allowed for mentee + mentor, but not two of the same userType.

import { useState, useEffect, useRef } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { Phone, ArrowRight, Shield, RefreshCw, ChevronLeft } from 'lucide-react';
import { auth } from '../utils/firebase';
import api from '../services/api';

const COUNTRY_CODES = [
  { code: '+91', flag: '🇮🇳', name: 'India' },
  { code: '+1', flag: '🇺🇸', name: 'US/Canada' },
  { code: '+44', flag: '🇬🇧', name: 'UK' },
  { code: '+971', flag: '🇦🇪', name: 'UAE' },
  { code: '+65', flag: '🇸🇬', name: 'Singapore' },
  { code: '+61', flag: '🇦🇺', name: 'Australia' },
  { code: '+49', flag: '🇩🇪', name: 'Germany' },
  { code: '+33', flag: '🇫🇷', name: 'France' },
];

/**
 * PhoneOtpGate
 * @param {string} userType - 'mentee' | 'mentor'
 * @param {function} onVerified - called with (phoneE164) when OTP confirmed
 */
export default function PhoneOtpGate({ userType, onVerified }) {
  const [step, setStep] = useState('phone'); // 'phone' | 'otp'
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const recaptchaRef = useRef(null);
  const verifierRef = useRef(null);
  const otpRefs = useRef([]);
  const timerRef = useRef(null);

  // Cleanup recaptcha on unmount
  useEffect(() => {
    return () => {
      if (verifierRef.current) {
        verifierRef.current.clear();
      }
      clearInterval(timerRef.current);
    };
  }, []);

  const startResendTimer = () => {
    setResendTimer(30);
    timerRef.current = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) { clearInterval(timerRef.current); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const initRecaptcha = () => {
    if (!verifierRef.current) {
      verifierRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {},
      });
    }
    return verifierRef.current;
  };

  const handleSendOtp = async () => {
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 7) { setError('Enter a valid phone number.'); return; }

    const fullPhone = `${countryCode}${digits}`;
    setError('');
    setLoading(true);

    try {
      // Check if phone+userType combo is blocked
      const { data } = await api.post('/api/users/check-phone', { phone: fullPhone, userType }).catch(() => ({ data: { allowed: true } }));
      if (!data.allowed) {
        setError(`A ${userType} account already exists with this number. Use a different number or log in.`);
        setLoading(false);
        return;
      }

      const verifier = initRecaptcha();
      const result = await signInWithPhoneNumber(auth, fullPhone, verifier);
      setConfirmationResult(result);
      setStep('otp');
      startResendTimer();
    } catch (err) {
      console.error('OTP send error:', err);
      if (err.code === 'auth/too-many-requests') {
        setError('Too many attempts. Please wait a moment and try again.');
      } else if (err.code === 'auth/invalid-phone-number') {
        setError('Invalid phone number. Check the format.');
      } else {
        setError('Failed to send OTP. Please try again.');
      }
      // Reset recaptcha on failure
      verifierRef.current?.clear();
      verifierRef.current = null;
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(''));
      otpRefs.current[5]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const code = otp.join('');
    if (code.length !== 6) { setError('Enter the complete 6-digit code.'); return; }

    setError('');
    setLoading(true);
    try {
      await confirmationResult.confirm(code);
      const fullPhone = `${countryCode}${phone.replace(/\D/g, '')}`;
      // Store in sessionStorage so signup form can use it
      sessionStorage.setItem('koach_verified_phone', fullPhone);
      onVerified(fullPhone);
    } catch (err) {
      console.error('OTP verify error:', err);
      if (err.code === 'auth/invalid-verification-code') {
        setError('Incorrect OTP. Try again.');
      } else if (err.code === 'auth/code-expired') {
        setError('OTP expired. Request a new one.');
      } else {
        setError('Verification failed. Please retry.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setOtp(['', '', '', '', '', '']);
    setError('');
    verifierRef.current?.clear();
    verifierRef.current = null;
    setStep('phone');
    await handleSendOtp();
  };

  return (
    <div className="w-full">
      {/* Hidden reCAPTCHA container */}
      <div id="recaptcha-container" ref={recaptchaRef} />

      {step === 'phone' ? (
        <div className="space-y-5">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <Phone className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Verify your number</h3>
              <p className="text-xs text-slate-500">We'll send a one-time code to confirm it's you</p>
            </div>
          </div>

          {/* Phone input */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Phone Number</label>
            <div className="flex gap-2">
              <select
                value={countryCode}
                onChange={e => setCountryCode(e.target.value)}
                className="px-3 py-3 border-2 border-gray-200 rounded-lg text-gray-700 bg-white focus:border-blue-500 focus:outline-none text-sm font-medium"
              >
                {COUNTRY_CODES.map(c => (
                  <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                ))}
              </select>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="9876543210"
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none text-sm font-medium"
                onKeyDown={e => e.key === 'Enter' && handleSendOtp()}
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

          <button
            onClick={handleSendOtp}
            disabled={loading || !phone}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <>Send OTP <ArrowRight className="w-4 h-4" /></>
            )}
          </button>

          <p className="text-center text-xs text-slate-400">
            Your number is only used for account security and won't be shared.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Header */}
          <button
            onClick={() => { setStep('phone'); setError(''); setOtp(['','','','','','']); }}
            className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-2 -ml-1"
          >
            <ChevronLeft className="w-4 h-4" /> Change number
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Enter OTP</h3>
              <p className="text-xs text-slate-500">
                Sent to <span className="font-semibold text-slate-700">{countryCode} {phone}</span>
              </p>
            </div>
          </div>

          {/* 6-digit OTP boxes */}
          <div className="flex gap-2 justify-between" onPaste={handleOtpPaste}>
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={el => otpRefs.current[i] = el}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleOtpChange(i, e.target.value)}
                onKeyDown={e => handleOtpKeyDown(i, e)}
                className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-xl focus:outline-none transition-all
                  ${digit ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-700'}
                  focus:border-blue-500`}
              />
            ))}
          </div>

          {error && <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

          <button
            onClick={handleVerifyOtp}
            disabled={loading || otp.join('').length !== 6}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Verify & Continue'}
          </button>

          <div className="text-center">
            {resendTimer > 0 ? (
              <p className="text-xs text-slate-400">Resend in {resendTimer}s</p>
            ) : (
              <button onClick={handleResend} className="text-sm text-blue-600 hover:underline font-medium">
                Resend OTP
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
