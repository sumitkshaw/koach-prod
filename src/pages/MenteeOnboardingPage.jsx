import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import OnboardingNav from '../components/OnboardingNav';
import { completeMenteeProfile, saveOnboardingProgress } from '../utils/database/profiles';
import Logo from '../assets/logowhite.png';

// ── Step config ──────────────────────────────────────────────────────────────
const STEPS = [
  {
    id: 1,
    title: 'About You',
    description: 'Tell us a bit about yourself',
    icon: '👤',
  },
  {
    id: 2,
    title: 'Your Goals',
    description: 'What do you want to achieve?',
    icon: '🎯',
  },
  {
    id: 3,
    title: 'Preferences',
    description: 'How do you like to learn?',
    icon: '⚙️',
  },
  {
    id: 4,
    title: 'Background',
    description: 'Share your experience',
    icon: '📋',
  },
];

const GOALS = [
  'Land a new job', 'Get promoted', 'Switch careers', 'Build a startup',
  'Improve technical skills', 'Grow as a leader', 'Build confidence',
  'Expand my network', 'Get into top university', 'Learn from experts',
];

const QUALITIES = [
  'Structured & organized', 'Patient & encouraging', 'Direct & honest',
  'Highly experienced', 'Available on short notice', 'Strong communicator',
  'Industry connections', 'Good listener',
];

const SESSION_TYPES = ['1-on-1 Video Calls', 'Text / Chat', 'Voice Calls', 'Async feedback', 'In-person'];
const FREQUENCIES = ['Once a week', 'Twice a month', 'Once a month', 'As needed'];
const TIMELINES = ['1–3 months', '3–6 months', '6–12 months', '1+ year'];
const REASONS = [
  'Struggling with my career path', 'Need accountability', 'Want expert guidance',
  'Looking for a role model', 'Need honest feedback', 'Want structured learning',
];

// ── Component ────────────────────────────────────────────────────────────────
export default function MenteeOnboardingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    // Step 1
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    location: '',
    institution: '',
    currentRole: '',
    bio: '',
    // Step 2
    goals: [],
    reasons: [],
    // Step 3
    qualities: [],
    preferredSessionTypes: [],
    idealSessionFrequency: '',
    timeline: '',
    // Step 4
    pastExperiences: '',
  });

  const set = (field, value) => {
    setForm(p => ({ ...p, [field]: value }));
    if (errors[field]) setErrors(p => ({ ...p, [field]: null }));
  };

  const toggleArray = (field, value) => {
    setForm(prev => {
      const arr = prev[field] || [];
      return {
        ...prev,
        [field]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value],
      };
    });
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 border-2 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      errors[field]
        ? 'border-red-400 bg-red-50'
        : 'border-slate-200 hover:border-blue-300 focus:border-blue-500'
    }`;

  const tagClass = (active) =>
    `px-4 py-2 rounded-full text-sm font-medium border-2 cursor-pointer transition-all select-none ${
      active
        ? 'bg-blue-600 text-white border-blue-600 shadow-md'
        : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600'
    }`;

  // ── Validation ─────────────────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (currentStep === 1) {
      if (!form.firstName.trim()) e.firstName = 'Required';
      if (!form.lastName.trim()) e.lastName = 'Required';
      if (!form.location.trim()) e.location = 'Required';
      if (!form.currentRole) e.currentRole = 'Required';
    }
    if (currentStep === 2) {
      if (form.goals.length === 0) e.goals = 'Select at least one goal';
      if (form.reasons.length === 0) e.reasons = 'Select at least one reason';
    }
    if (currentStep === 3) {
      if (form.preferredSessionTypes.length === 0) e.preferredSessionTypes = 'Select at least one type';
      if (!form.idealSessionFrequency) e.idealSessionFrequency = 'Required';
      if (!form.timeline) e.timeline = 'Required';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = async () => {
    if (!validate()) return;
    // Auto-save progress
    await saveOnboardingProgress(user?.$id, currentStep, form);
    setCurrentStep(s => s + 1);
  };

  const handleBack = () => setCurrentStep(s => s - 1);

  const handleComplete = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      // Send full profile to MongoDB via backend
      await completeMenteeProfile(user?.$id, {
        ...form,
        userType: 'mentee',
      });
      navigate('/dashboard');
    } catch (err) {
      alert(`Could not save your profile: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // ── Render Steps ───────────────────────────────────────────────────────────
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">First Name *</label>
                <input className={inputClass('firstName')} value={form.firstName} onChange={e => set('firstName', e.target.value)} placeholder="Alex" />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Last Name *</label>
                <input className={inputClass('lastName')} value={form.lastName} onChange={e => set('lastName', e.target.value)} placeholder="Johnson" />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
              <input className={inputClass('email')} type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="alex@email.com" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Location *</label>
              <input className={inputClass('location')} value={form.location} onChange={e => set('location', e.target.value)} placeholder="City, Country" />
              {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Institution / Company</label>
              <input className={inputClass('institution')} value={form.institution} onChange={e => set('institution', e.target.value)} placeholder="e.g. University of Toronto / Google" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Current Role *</label>
              <select className={inputClass('currentRole')} value={form.currentRole} onChange={e => set('currentRole', e.target.value)}>
                <option value="">Select your current role...</option>
                <option value="student">Student</option>
                <option value="recent_graduate">Recent Graduate</option>
                <option value="junior_professional">Junior Professional (0–3 yrs)</option>
                <option value="mid_professional">Mid-level Professional (3–8 yrs)</option>
                <option value="senior_professional">Senior Professional (8+ yrs)</option>
                <option value="entrepreneur">Entrepreneur / Founder</option>
                <option value="career_changer">Career Changer</option>
              </select>
              {errors.currentRole && <p className="text-red-500 text-xs mt-1">{errors.currentRole}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Short Bio <span className="text-slate-400 font-normal">(optional)</span></label>
              <textarea className={inputClass('bio')} rows={3} value={form.bio} onChange={e => set('bio', e.target.value)} placeholder="Tell potential mentors a bit about yourself..." />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1">What do you want to achieve? *</label>
              <p className="text-slate-500 text-sm mb-4">Select all that apply</p>
              <div className="flex flex-wrap gap-2.5">
                {GOALS.map(g => (
                  <span key={g} className={tagClass(form.goals.includes(g))} onClick={() => toggleArray('goals', g)}>{g}</span>
                ))}
              </div>
              {errors.goals && <p className="text-red-500 text-xs mt-2">{errors.goals}</p>}
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1">Why are you here? *</label>
              <p className="text-slate-500 text-sm mb-4">Pick your main reasons</p>
              <div className="flex flex-wrap gap-2.5">
                {REASONS.map(r => (
                  <span key={r} className={tagClass(form.reasons.includes(r))} onClick={() => toggleArray('reasons', r)}>{r}</span>
                ))}
              </div>
              {errors.reasons && <p className="text-red-500 text-xs mt-2">{errors.reasons}</p>}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1">What qualities matter most in a mentor? *</label>
              <div className="flex flex-wrap gap-2.5 mt-3">
                {QUALITIES.map(q => (
                  <span key={q} className={tagClass(form.qualities.includes(q))} onClick={() => toggleArray('qualities', q)}>{q}</span>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1">Preferred session types *</label>
              <div className="flex flex-wrap gap-2.5 mt-3">
                {SESSION_TYPES.map(s => (
                  <span key={s} className={tagClass(form.preferredSessionTypes.includes(s))} onClick={() => toggleArray('preferredSessionTypes', s)}>{s}</span>
                ))}
              </div>
              {errors.preferredSessionTypes && <p className="text-red-500 text-xs mt-2">{errors.preferredSessionTypes}</p>}
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1.5">How often would you like to meet? *</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {FREQUENCIES.map(f => (
                  <button key={f} type="button" onClick={() => set('idealSessionFrequency', f)}
                    className={`py-3 rounded-xl text-sm font-semibold border-2 transition-all ${form.idealSessionFrequency === f ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'}`}>
                    {f}
                  </button>
                ))}
              </div>
              {errors.idealSessionFrequency && <p className="text-red-500 text-xs mt-2">{errors.idealSessionFrequency}</p>}
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1.5">How long do you plan to use Koach? *</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {TIMELINES.map(t => (
                  <button key={t} type="button" onClick={() => set('timeline', t)}
                    className={`py-3 rounded-xl text-sm font-semibold border-2 transition-all ${form.timeline === t ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'}`}>
                    {t}
                  </button>
                ))}
              </div>
              {errors.timeline && <p className="text-red-500 text-xs mt-2">{errors.timeline}</p>}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1.5">Tell us about your past experiences</label>
              <p className="text-slate-500 text-sm mb-3">Jobs, projects, coursework, or anything relevant to your career journey.</p>
              <textarea
                className={inputClass('pastExperiences')}
                rows={6}
                value={form.pastExperiences}
                onChange={e => set('pastExperiences', e.target.value)}
                placeholder="e.g. I've worked as a software intern at a startup, built a personal finance app during college, and I'm now looking to transition into product management..."
              />
            </div>
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <h4 className="font-bold text-slate-900 mb-3 text-sm">📋 Your Profile Summary</h4>
              <div className="space-y-2 text-sm text-slate-700">
                <p><span className="text-slate-400">Name:</span> {form.firstName} {form.lastName}</p>
                <p><span className="text-slate-400">Location:</span> {form.location || '—'}</p>
                <p><span className="text-slate-400">Role:</span> {form.currentRole || '—'}</p>
                <p><span className="text-slate-400">Goals:</span> {form.goals.length > 0 ? form.goals.slice(0, 3).join(', ') : '—'}</p>
                <p><span className="text-slate-400">Session type:</span> {form.idealSessionFrequency || '—'}</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <OnboardingNav />

      <div className="max-w-2xl mx-auto px-4 py-8 pt-24">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {STEPS.map((step, i) => {
            const done = currentStep > step.id;
            const active = currentStep === step.id;
            return (
              <div key={step.id} className="flex items-center gap-2">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold transition-all ${done ? 'bg-green-500 text-white' : active ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white text-slate-400 border-2 border-slate-200'}`}>
                  {done ? '✓' : step.id}
                </div>
                {i < STEPS.length - 1 && <div className={`h-0.5 w-8 transition-all ${done ? 'bg-green-400' : 'bg-slate-200'}`} />}
              </div>
            );
          })}
        </div>

        {/* Step header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">{STEPS[currentStep - 1].icon}</div>
          <h1 className="text-2xl font-bold text-slate-900">{STEPS[currentStep - 1].title}</h1>
          <p className="text-slate-500 mt-1">{STEPS[currentStep - 1].description}</p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/20 p-8 border border-slate-100 mb-6">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          {currentStep > 1 && (
            <button onClick={handleBack} className="flex-1 py-3.5 rounded-xl border-2 border-slate-200 text-slate-600 font-bold text-sm hover:border-slate-400 transition-all">
              ← Back
            </button>
          )}
          {currentStep < STEPS.length ? (
            <button onClick={handleNext} className="flex-1 py-3.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
              Continue →
            </button>
          ) : (
            <button onClick={handleComplete} disabled={loading} className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm hover:opacity-90 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? '⏳ Saving...' : '🎉 Start Finding Mentors'}
            </button>
          )}
        </div>

        <p className="text-center text-slate-400 text-xs mt-4">
          Step {currentStep} of {STEPS.length} — Your data is saved automatically
        </p>
      </div>
    </div>
  );
}
