// AdminLogin.jsx — /admin route, white + blue theme
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Loader2, AlertCircle } from 'lucide-react';
import { adminLogin, isAdminLoggedIn } from '../../services/adminService';
import logoWhite from '../../assets/logowhite.png';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAdminLoggedIn()) navigate('/admin/dashboard', { replace: true });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await adminLogin(email.trim(), password);
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      setError(err?.response?.data?.error || 'Invalid credentials. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/30 px-4">
      {/* Background blobs */}
      <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-100/60 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 left-[-5%] w-[400px] h-[400px] rounded-full bg-indigo-100/40 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Card */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-10 shadow-xl shadow-slate-200/40">

          {/* Logo */}
          <div className="flex flex-col items-center mb-10">
            <img src={logoWhite} alt="Koach" className="h-9 mb-6 object-contain" style={{ filter: 'invert(1)' }} />
            <div className="w-full h-px bg-slate-100 mb-6" />
            <h1 className="text-xl font-bold text-slate-800">Admin Portal</h1>
            <p className="text-slate-400 text-sm mt-1 font-medium">Internal access only</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="admin@koach.space"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900
                             text-sm placeholder-slate-400 focus:outline-none focus:border-blue-500
                             focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900
                             text-sm placeholder-slate-400 focus:outline-none focus:border-blue-500
                             focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span className="text-sm text-red-600">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-blue-600 hover:bg-blue-700
                         text-white font-bold rounded-xl transition-all active:scale-[0.98]
                         shadow-lg shadow-blue-500/25 disabled:opacity-60 mt-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-400 text-xs mt-5">
          This portal is for Koach administrators only.
        </p>
      </div>
    </div>
  );
}
