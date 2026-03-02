import { useState, useEffect, useCallback } from 'react';
import { User, Shield, Target, CheckCircle, AlertCircle, Save, Loader2, MapPin, Briefcase, BookOpen, Calendar, Users, Zap, Star, Sparkles } from 'lucide-react';
import Navigation from '../Navigation';
import Sidenav from './Sidenav';
import Footer from '../Footer';
import { useAuth } from '../../utils/AuthContext';
import { getUserProfile, updateUserProfile } from '../../utils/database/profiles';

// ── Options ───────────────────────────────────────────────────────────────────
const GOALS = ['Career Growth', 'Skill Development', 'Networking', 'Project Guidance', 'Career Switch', 'Leadership Skills', 'Interview Prep', 'Salary Negotiation'];
const QUALITIES = ['Patient', 'Experienced', 'Industry Expert', 'Empathetic', 'Structured', 'Motivating', 'Available', 'Practical'];
const SESSION_TYPES = ['1-on-1 Video', 'Voice Call', 'Text / Chat', 'Async Feedback'];
const FREQUENCIES = ['Once a week', 'Twice a month', 'Once a month', 'As needed'];
const TIMELINES = ['1 month', '3 months', '6 months', '1 year', 'Ongoing'];
const ROLE_OPTIONS = [
  { value: 'student', label: 'Student' },
  { value: 'recent_graduate', label: 'Recent Graduate' },
  { value: 'junior_professional', label: 'Junior Professional (0–3 yrs)' },
  { value: 'mid_professional', label: 'Mid-level Professional (3–8 yrs)' },
  { value: 'senior_professional', label: 'Senior Professional (8+ yrs)' },
  { value: 'entrepreneur', label: 'Entrepreneur / Founder' },
  { value: 'career_changer', label: 'Career Changer' },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function ChipSelect({ options, value, onChange }) {
  const selected = Array.isArray(value) ? value : [];
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => {
        const isOn = selected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(isOn ? selected.filter(v => v !== opt) : [...selected, opt])}
            className={`px-3.5 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm
              ${isOn
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent shadow-md shadow-blue-500/20'
                : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600'}`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function SingleSelect({ options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => {
        const isOn = value === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 hover:-translate-y-0.5
              ${isOn
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent shadow-md shadow-blue-500/20'
                : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600'}`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

const inputCls = "w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white/80 text-slate-800 text-sm font-medium focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-400 shadow-sm";

const TABS = [
  { id: 'profile', label: 'Profile', icon: User, desc: 'Your personal info' },
  { id: 'goals', label: 'Goals', icon: Target, desc: 'What you want' },
  { id: 'security', label: 'Security', icon: Shield, desc: 'Password & access' },
];

const getInitials = (name) => {
  if (!name) return '?';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};

const Settings1 = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user?.$id) return;
    (async () => {
      setLoading(true);
      try {
        const data = await getUserProfile(user.$id);
        setProfile(data);
        if (data) {
          setForm({
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            email: data.email || user.email || '',
            location: data.location || '',
            country: data.country || '',
            institution: data.institution || '',
            currentRole: data.currentRole || '',
            bio: data.bio || '',
            goals: data.goals || [],
            reasons: data.reasons || [],
            pastExperiences: data.pastExperiences || '',
            idealSessionFrequency: data.idealSessionFrequency || '',
            preferredSessionTypes: data.preferredSessionTypes || [],
            timeline: data.timeline || '',
            qualities: data.qualities || [],
          });
        }
      } catch { setError('Could not load profile.'); }
      finally { setLoading(false); }
    })();
  }, [user]);

  const set = useCallback((key, val) => setForm(prev => ({ ...prev, [key]: val })), []);

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      await updateUserProfile(null, { ...form, onboardingComplete: true, onboardingStep: 99 });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch { setError('Failed to save. Please try again.'); }
    finally { setSaving(false); }
  };

  const displayName = profile
    ? `${profile.firstName} ${profile.lastName}`.trim() || user?.name || user?.email
    : user?.name || user?.email;

  const profileComplete = profile?.onboardingComplete;
  const completionPct = (() => {
    if (!form.firstName) return 0;
    const fields = [form.firstName, form.lastName, form.location, form.currentRole, form.bio, form.pastExperiences];
    const arr = [form.goals?.length > 0, form.preferredSessionTypes?.length > 0, form.idealSessionFrequency, form.timeline];
    const filled = fields.filter(Boolean).length + arr.filter(Boolean).length;
    return Math.round((filled / (fields.length + arr.length)) * 100);
  })();

  // ── TAB RENDERS ──────────────────────────────────────────────────────────────
  const ProfileTab = () => (
    <div className="space-y-6">
      {/* Identity */}
      <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/40 border border-white/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/60 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-5 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-[1.25rem] flex items-center justify-center text-white text-2xl font-bold shadow-xl shadow-blue-500/30">
              {getInitials(displayName)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">{displayName || '—'}</h2>
              <p className="text-sm text-slate-500 font-medium">{user?.email}</p>
              {profileComplete && (
                <span className="inline-flex items-center gap-1 mt-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                  <CheckCircle className="w-3 h-3" /> Profile complete
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'First Name', key: 'firstName', placeholder: 'Your first name', type: 'text' },
              { label: 'Last Name', key: 'lastName', placeholder: 'Your last name', type: 'text' },
              { label: 'Location', key: 'location', placeholder: 'e.g. Mumbai, India', type: 'text' },
              { label: 'Country', key: 'country', placeholder: 'e.g. India', type: 'text' },
              { label: 'Institution / Company', key: 'institution', placeholder: 'e.g. IIT Delhi, Google', type: 'text' },
            ].map(f => (
              <div key={f.key} className="group">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">{f.label}</label>
                <input
                  type={f.type}
                  className={inputCls}
                  value={form[f.key] || ''}
                  onChange={e => set(f.key, e.target.value)}
                  placeholder={f.placeholder}
                />
              </div>
            ))}

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Current Role</label>
              <select className={inputCls} value={form.currentRole || ''} onChange={e => set('currentRole', e.target.value)}>
                <option value="">Select your role...</option>
                {ROLE_OPTIONS.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Email</label>
              <input className={inputCls} value={form.email || ''} disabled placeholder="—" />
              <p className="text-xs text-slate-400 mt-1 ml-1">Linked to your auth account — cannot be changed here.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/40 border border-white/50">
        <h3 className="font-bold text-slate-900 text-lg mb-1 flex items-center gap-2">
          <div className="w-8 h-8 bg-violet-50 rounded-xl flex items-center justify-center text-violet-500"><Sparkles className="w-4 h-4" /></div>
          About You
        </h3>
        <p className="text-sm text-slate-400 mb-5 ml-10">Visible to mentors — make it count.</p>
        <textarea className={inputCls + ' resize-none'} rows={4} value={form.bio || ''} onChange={e => set('bio', e.target.value)} placeholder="I'm a product designer with 3 years of experience looking to transition into UX leadership..." />

        <div className="mt-5">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Past Experiences</label>
          <textarea className={inputCls + ' resize-none'} rows={3} value={form.pastExperiences || ''} onChange={e => set('pastExperiences', e.target.value)} placeholder="Interned at a fintech startup, built side projects in React, ran a college coding club..." />
        </div>
      </div>
    </div>
  );

  const GoalsTab = () => (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/40 border border-white/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-rose-50/60 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
        <div className="relative z-10 space-y-7">
          <div>
            <h3 className="font-bold text-slate-900 text-lg mb-1 flex items-center gap-2">
              <div className="w-8 h-8 bg-rose-50 rounded-xl flex items-center justify-center text-rose-500"><Target className="w-4 h-4" /></div>
              Your Goals
            </h3>
            <p className="text-sm text-slate-400 mb-4 ml-10">What do you want to get out of mentorship?</p>
            <ChipSelect options={GOALS} value={form.goals} onChange={v => set('goals', v)} />
          </div>

          <div>
            <h3 className="font-bold text-slate-900 text-lg mb-1 flex items-center gap-2">
              <div className="w-8 h-8 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500"><Star className="w-4 h-4" /></div>
              Ideal Mentor Qualities
            </h3>
            <p className="text-sm text-slate-400 mb-4 ml-10">What traits matter most to you?</p>
            <ChipSelect options={QUALITIES} value={form.qualities} onChange={v => set('qualities', v)} />
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/40 border border-white/50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-48 h-48 bg-blue-50/60 rounded-full blur-3xl -ml-16 -mt-16 pointer-events-none" />
        <div className="relative z-10 space-y-7">
          <div>
            <h3 className="font-bold text-slate-900 text-lg mb-1 flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500"><Calendar className="w-4 h-4" /></div>
              Session Format
            </h3>
            <p className="text-sm text-slate-400 mb-4 ml-10">How do you prefer to connect with mentors?</p>
            <ChipSelect options={SESSION_TYPES} value={form.preferredSessionTypes} onChange={v => set('preferredSessionTypes', v)} />
          </div>

          <div>
            <h3 className="font-bold text-slate-900 text-lg mb-1">How often?</h3>
            <p className="text-sm text-slate-400 mb-4">Pick the cadence that works for you.</p>
            <SingleSelect options={FREQUENCIES} value={form.idealSessionFrequency} onChange={v => set('idealSessionFrequency', v)} />
          </div>

          <div>
            <h3 className="font-bold text-slate-900 text-lg mb-1">Commitment timeline</h3>
            <p className="text-sm text-slate-400 mb-4">How long do you plan to use Koach?</p>
            <SingleSelect options={TIMELINES} value={form.timeline} onChange={v => set('timeline', v)} />
          </div>
        </div>
      </div>
    </div>
  );

  const SecurityTab = () => (
    <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/40 border border-white/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-50/60 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
      <div className="relative z-10">
        <h3 className="font-bold text-slate-900 text-lg mb-1 flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-500"><Shield className="w-4 h-4" /></div>
          Password & Security
        </h3>
        <p className="text-sm text-slate-400 mb-6 ml-10">Your account is secured via Firebase Authentication.</p>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-100 mb-6">
          <p className="text-sm font-medium text-blue-700">
            To change your password, use the <span className="font-bold">Forgot Password</span> link on the login page — a secure reset link will be sent to <span className="font-bold">{user?.email}</span>.
          </p>
        </div>

        <div className="space-y-3">
          {[
            { label: 'Signed in as', value: user?.email, bold: true },
            { label: 'Email verified', value: user?.emailVerification ? '✓ Verified' : '✗ Not verified', color: user?.emailVerification ? 'text-emerald-600' : 'text-yellow-600' },
            { label: 'Account type', value: profile?.userType === 'mentor' ? 'Mentor' : 'Mentee', bold: true },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between p-4 bg-slate-50/80 rounded-2xl border border-slate-100">
              <span className="text-sm text-slate-500 font-medium">{item.label}</span>
              <span className={`text-sm font-bold ${item.color || 'text-slate-800'}`}>{item.value || '—'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-dm relative overflow-x-hidden">
      {/* Atmosphere — matching dashboard */}
      <div className="fixed top-0 left-0 w-full h-[800px] bg-gradient-to-b from-blue-50/50 via-indigo-50/30 to-transparent pointer-events-none z-0" />
      <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-100/40 blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10">
        <Navigation />
        <Sidenav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} currentRoute="/dashboard/settings" />

        <div className={`pt-24 transition-all duration-300 ${sidebarOpen ? 'lg:ml-20' : 'lg:ml-0'}`}>
          <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-6xl mx-auto">

            {/* Page header */}
            <div className="mb-10 pl-1">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                Account <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Settings</span>
              </h1>
              <p className="text-slate-500 mt-2 font-medium">Manage your profile, goals, and preferences.</p>
            </div>

            {/* Profile completion bar */}
            {!loading && !profileComplete && (
              <div className="mb-8 bg-white/80 backdrop-blur-xl rounded-[2rem] p-5 shadow-xl shadow-slate-200/40 border border-white/50 flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-yellow-500" />
                      Profile {completionPct}% complete
                    </span>
                    <span className="text-xs text-slate-400 font-medium">Fill in all sections below</span>
                  </div>
                  <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-700"
                      style={{ width: `${completionPct}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {loading ? (
              <div className="flex items-center justify-center py-32">
                <div className="text-center">
                  <Loader2 className="w-10 h-10 animate-spin text-blue-500 mx-auto mb-3" />
                  <p className="text-slate-400 font-medium">Loading your profile...</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row gap-6">

                {/* Settings sidebar */}
                <div className="lg:w-60 flex-shrink-0">
                  <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-xl shadow-slate-200/40 border border-white/50 overflow-hidden lg:sticky lg:top-28 p-3">
                    {/* Mini avatar card */}
                    <div className="flex items-center gap-3 p-4 mb-2 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-blue-500/30 flex-shrink-0">
                        {getInitials(displayName)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-white truncate">{displayName?.split(' ')[0] || 'Hey!'}</p>
                        <p className="text-xs text-slate-400 truncate">{profile?.userType || 'mentee'}</p>
                      </div>
                    </div>

                    <nav className="space-y-1">
                      {TABS.map(tab => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all duration-300 text-sm font-bold group
                              ${isActive
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                          >
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all
                              ${isActive ? 'bg-white/20' : 'bg-slate-100 group-hover:bg-white group-hover:shadow-sm'}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="text-left">
                              <div>{tab.label}</div>
                              <div className={`text-[10px] font-medium ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>{tab.desc}</div>
                            </div>
                            {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />}
                          </button>
                        );
                      })}
                    </nav>
                  </div>
                </div>

                {/* Main content */}
                <div className="flex-1 min-w-0">
                  <div className="animate-in slide-in-from-bottom-4 duration-500">
                    {activeTab === 'profile' && <ProfileTab />}
                    {activeTab === 'goals' && <GoalsTab />}
                    {activeTab === 'security' && <SecurityTab />}
                  </div>

                  {/* Save bar */}
                  {activeTab !== 'security' && (
                    <div className="mt-6 flex items-center justify-between gap-4 bg-white/80 backdrop-blur-xl rounded-[2rem] border border-white/50 p-4 shadow-xl shadow-slate-200/40">
                      <div className="text-sm">
                        {error && <p className="text-red-500 font-semibold flex items-center gap-1.5"><AlertCircle className="w-4 h-4" />{error}</p>}
                        {saved && (
                          <p className="text-emerald-600 font-semibold flex items-center gap-1.5">
                            <CheckCircle className="w-4 h-4" /> All changes saved!
                          </p>
                        )}
                        {!error && !saved && <p className="text-slate-400 font-medium">Your changes will be saved immediately.</p>}
                      </div>
                      <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
                      >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {saving ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Settings1;