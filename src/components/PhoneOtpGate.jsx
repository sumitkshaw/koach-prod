// src/components/PhoneOtpGate.jsx
// Step 1 of signup: verify phone number via Firebase OTP.
// Same phone allowed for mentee + mentor, but not two of the same userType.

import { useState, useEffect, useRef } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber, signOut } from 'firebase/auth';
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
  const [otpSent, setOtpSent] = useState(false);
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
      setOtpSent(true);
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
      // ✅ Immediately sign out the temp phone-only Firebase session.
      // We just needed OTP as a proof of ownership — the real account
      // (email/password or Google) is created in the next step.
      await signOut(auth);

      const fullPhone = `${countryCode}${phone.replace(/\D/g, '')}`;
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
        <div className="space-y-4">
          <p className="text-gray-500 text-sm text-center -mt-2 mb-4">
            We'll send a code to confirm your number
          </p>

          <div className="flex gap-2">
            <div className="relative w-1/3">
               <select
                value={countryCode}
                onChange={e => setCountryCode(e.target.value)}
                className="w-full pl-3 pr-2 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all appearance-none bg-white text-gray-700"
              >
                {COUNTRY_CODES.map(c => (
                  <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center px-1 text-gray-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
            
            <div className="relative flex-1">
              <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="Phone number"
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder-gray-400 text-gray-700"
                onKeyDown={e => e.key === 'Enter' && handleSendOtp()}
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center text-red-500 text-xs bg-red-50 p-2 rounded">
              <Shield size={14} className="mr-1.5 flex-shrink-0" />
              {error}
            </div>
          )}

          <button
            onClick={handleSendOtp}
            disabled={loading || !phone}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md text-sm disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center mt-2"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Send OTP'}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Green success banner */}
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg px-4 py-3 text-sm font-medium">
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>OTP sent to <strong>{countryCode} {phone}</strong></span>
          </div>

          {/* 6-digit OTP boxes */}
          <div className="flex gap-2 justify-center" onPaste={handleOtpPaste}>
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
                className={`w-12 h-14 text-center text-2xl font-bold border-2 rounded-xl focus:outline-none transition-all
                  ${digit ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-700'}
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-100`}
              />
            ))}
          </div>

          {error && (
            <div className="flex items-center text-red-500 text-xs bg-red-50 p-2 rounded">
              <Shield size={14} className="mr-1.5 flex-shrink-0" />
              {error}
            </div>
          )}

          <button
            onClick={handleVerifyOtp}
            disabled={loading || otp.join('').length !== 6}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md text-sm disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center mt-2"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Verify Code'}
          </button>

          <div className="text-center mt-3">
            {resendTimer > 0 ? (
              <p className="text-xs text-gray-400">Resend code in {resendTimer}s</p>
            ) : (
              <button onClick={handleResend} className="text-xs text-blue-600 hover:text-blue-800 hover:underline font-medium">
                Resend OTP
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
