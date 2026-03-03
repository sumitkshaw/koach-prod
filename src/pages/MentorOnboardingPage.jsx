// MentorOnboardingPage.jsx — dashboard-aesthetic mentor onboarding
// 3 steps: Identity & Role | Expertise | Pricing & Links
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { completeMentorOnboarding } from '../utils/database/profiles';
import {
  User, Briefcase, MapPin, Globe, DollarSign, Linkedin, Twitter,
  Plus, X, ChevronRight, ChevronLeft, CheckCircle, ArrowRight,
} from 'lucide-react';

const SKILL_SUGGESTIONS = [
  'JavaScript', 'Python', 'React', 'Node.js', 'Machine Learning', 'Data Science',
  'UX/UI Design', 'Product Management', 'Marketing', 'Entrepreneurship',
  'Leadership', 'Public Speaking', 'Career Coaching', 'AWS', 'DevOps',
  'System Design', 'iOS/Android', 'Finance', 'Blockchain', 'AI/ML',
];

const INDUSTRIES = [
  'Technology', 'Finance', 'Healthcare', 'Education', 'Marketing',
  'Design', 'Business', 'Engineering', 'Science', 'Arts & Media',
];

const LANGUAGES = ['English', 'Hindi', 'Spanish', 'French', 'German', 'Arabic', 'Mandarin'];

const STEPS = [
  { id: 1, title: 'Identity & Role', subtitle: 'How will mentees find you?' },
  { id: 2, title: 'Your Expertise', subtitle: 'What can you help with?' },
  { id: 3, title: 'Pricing & Links', subtitle: 'Set your rate & socials' },
];

export default function MentorOnboardingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const nameParts = (user?.name || '').split(' ');
  const [form, setForm] = useState({
    firstName: nameParts[0] || '',
    lastName: nameParts.slice(1).join(' ') || '',
    title: '',
    company: '',
    location: '',
    language: 'English',
    bio: '',
    skills: [],
    skillInput: '',
    industry: '',
    yearsOfExperience: '',
    hourlyRate: '',
    linkedIn: '',
    twitter: '',
  });

  const set = (field, value) => {
    setForm(p => ({ ...p, [field]: value }));
    setErrors(p => ({ ...p, [field]: null }));
  };

  const addSkill = (s) => {
    const t = s.trim();
    if (!t || form.skills.includes(t)) return;
    set('skills', [...form.skills, t]);
    set('skillInput', '');
  };
  const removeSkill = (s) => set('skills', form.skills.filter(x => x !== s));

  const validate = () => {
    const e = {};
    if (step === 1) {
      if (!form.firstName.trim()) e.firstName = 'Required';
      if (!form.title.trim()) e.title = 'Job title is required';
      const wc = form.bio.trim().split(/\s+/).filter(Boolean).length;
      if (wc < 30) e.bio = `Bio needs at least 30 words (${wc} so far)`;
      if (!form.location.trim()) e.location = 'Required';
    }
    if (step === 2) {
      if (form.skills.length === 0) e.skills = 'Add at least one skill';
      if (!form.industry) e.industry = 'Select an industry';
      if (!form.yearsOfExperience || +form.yearsOfExperience < 1) e.yearsOfExperience = 'Required';
    }
    if (step === 3) {
      if (!form.hourlyRate || +form.hourlyRate < 1) e.hourlyRate = 'Enter your hourly rate';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => { if (validate()) setStep(s => s + 1); };
  const handleBack = () => setStep(s => s - 1);

  const handleSubmit = async () => {
    if (!validate() || !user?.$id) return;
    setLoading(true);
    try {
      await completeMentorOnboarding(user.$id, {
        firstName: form.firstName,
        lastName: form.lastName,
        title: form.title,
        company: form.company,
        location: form.location,
        language: form.language,
        bio: form.bio,
        skills: form.skills,
        industry: form.industry,
        yearsOfExperience: +form.yearsOfExperience,
        hourlyRate: +form.hourlyRate,
        linkedIn: form.linkedIn,
        twitter: form.twitter,
      });
      localStorage.setItem('dashboardType', 'mentor');
      navigate('/dashboard_mentor');
    } catch (err) {
      console.error('Failed to complete onboarding:', err);
      alert('Failed to save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const bioWords = form.bio.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="min-h-screen flex" style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)' }}>

      {/* ── Left panel — branding + step nav ── */}
      <aside className="hidden lg:flex flex-col w-72 xl:w-80 flex-shrink-0 p-10 justify-between relative overflow-hidden">
        {/* Glow orbs */}
        <div className="absolute top-20 -left-20 w-64 h-64 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #3B82F6, transparent)' }} />
        <div className="absolute bottom-20 -right-10 w-48 h-48 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #A78BFA, transparent)' }} />

        <div className="relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-12">
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
              <span className="text-white font-black text-sm">K</span>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">Koach</span>
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">Set up your profile</h2>
          <p className="text-slate-400 text-sm mb-10">Your info appears on your public listing page</p>

          {/* Step list */}
          <div className="space-y-2">
            {STEPS.map((s, i) => {
              const done = s.id < step;
              const active = s.id === step;
              return (
                <div key={s.id} className={`flex items-start gap-3 p-3 rounded-xl transition-all ${active ? 'bg-white/10 backdrop-blur-sm' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-bold transition-all
                    ${done ? 'bg-emerald-500 text-white' : active ? 'bg-blue-500 text-white' : 'bg-white/10 text-slate-400'}`}>
                    {done ? <CheckCircle className="w-4 h-4" /> : s.id}
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${active ? 'text-white' : done ? 'text-emerald-400' : 'text-slate-500'}`}>
                      {s.title}
                    </p>
                    <p className={`text-xs mt-0.5 ${active ? 'text-slate-300' : 'text-slate-600'}`}>{s.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-slate-600 text-xs relative z-10">© 2025 Koach. All rights reserved.</p>
      </aside>

      {/* ── Right panel — form ── */}
      <main className="flex-1 flex flex-col overflow-y-auto bg-white lg:rounded-l-3xl">

        {/* Mobile header */}
        <div className="lg:hidden flex items-center gap-2 px-6 py-4 border-b border-gray-100">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white font-black text-xs">K</span>
          </div>
          <span className="font-bold text-gray-900">Koach</span>
          <span className="ml-auto text-sm text-gray-400">Step {step} of {STEPS.length}</span>
        </div>

        <div className="flex-1 px-8 lg:px-16 xl:px-20 py-12">
          {/* Header */}
          <div className="mb-10">
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-wider mb-1">
              Step {step} of {STEPS.length}
            </p>
            <h1 className="text-3xl font-bold text-gray-900">{STEPS[step - 1].title}</h1>
            <p className="text-gray-500 mt-1">{STEPS[step - 1].subtitle}</p>
          </div>

          {/* ── STEP 1 ── */}
          {step === 1 && (
            <div className="space-y-7">
              {/* Name row */}
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <Label>First Name <Req /></Label>
                  <Input value={form.firstName} onChange={e => set('firstName', e.target.value)} placeholder="Jane" err={errors.firstName} />
                  <Err msg={errors.firstName} />
                </div>
                <div>
                  <Label>Last Name</Label>
                  <Input value={form.lastName} onChange={e => set('lastName', e.target.value)} placeholder="Doe" />
                </div>
              </div>

              {/* Title + Company */}
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <Label>Job Title <Req /></Label>
                  <InputIcon icon={<Briefcase size={15} />} value={form.title} onChange={e => set('title', e.target.value)} placeholder="Senior Product Manager" err={errors.title} />
                  <Err msg={errors.title} />
                </div>
                <div>
                  <Label>Current Company</Label>
                  <InputIcon icon={<Briefcase size={15} />} value={form.company} onChange={e => set('company', e.target.value)} placeholder="Google, Amazon…" />
                </div>
              </div>

              {/* Location + Language */}
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <Label>Location <Req /></Label>
                  <InputIcon icon={<MapPin size={15} />} value={form.location} onChange={e => set('location', e.target.value)} placeholder="Mumbai, India" err={errors.location} />
                  <Err msg={errors.location} />
                </div>
                <div>
                  <Label>Primary Language</Label>
                  <div className="relative">
                    <Globe size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all"
                      value={form.language} onChange={e => set('language', e.target.value)}>
                      {LANGUAGES.map(l => <option key={l}>{l}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Bio — full width */}
              <div>
                <Label>
                  Professional Bio <Req />
                  <span className={`ml-2 text-xs font-normal ${bioWords < 30 ? 'text-amber-500' : 'text-emerald-500'}`}>
                    {bioWords} / 30 words minimum
                  </span>
                </Label>
                <textarea
                  className={`w-full px-4 py-3.5 border rounded-xl text-sm resize-none focus:outline-none transition-all ${errors.bio ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:bg-white'}`}
                  rows={5}
                  value={form.bio}
                  onChange={e => set('bio', e.target.value)}
                  placeholder="Tell mentees who you are, your background, and how you can help them achieve their goals…"
                />
                <Err msg={errors.bio} />
              </div>
            </div>
          )}

          {/* ── STEP 2 ── */}
          {step === 2 && (
            <div className="space-y-7">
              {/* Skills tag input */}
              <div>
                <Label>Skills / Expertise <Req /></Label>
                <div className={`flex flex-wrap gap-2 p-3.5 border rounded-xl min-h-[56px] bg-gray-50 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 focus-within:bg-white transition-all ${errors.skills ? 'border-red-300' : 'border-gray-200'}`}>
                  {form.skills.map(s => (
                    <span key={s} className="flex items-center gap-1.5 bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-semibold">
                      {s}
                      <button onClick={() => removeSkill(s)} className="hover:bg-white/20 rounded p-0.5"><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                  <input
                    className="flex-1 min-w-[140px] bg-transparent outline-none text-sm placeholder-gray-400 py-1"
                    value={form.skillInput}
                    onChange={e => set('skillInput', e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addSkill(form.skillInput); } }}
                    placeholder={form.skills.length === 0 ? 'Type a skill and press Enter…' : 'Add more…'}
                  />
                </div>
                <Err msg={errors.skills} />

                {/* Suggestion chips */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {SKILL_SUGGESTIONS.filter(s => !form.skills.includes(s)).map(s => (
                    <button key={s} onClick={() => addSkill(s)}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs bg-white border border-gray-200 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors font-medium text-gray-600">
                      <Plus className="w-3 h-3" />{s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Industry + Years */}
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <Label>Industry <Req /></Label>
                  <select className={`w-full px-4 py-3 border rounded-xl text-sm bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all ${errors.industry ? 'border-red-300' : 'border-gray-200'}`}
                    value={form.industry} onChange={e => set('industry', e.target.value)}>
                    <option value="">Select your industry</option>
                    {INDUSTRIES.map(i => <option key={i}>{i}</option>)}
                  </select>
                  <Err msg={errors.industry} />
                </div>
                <div>
                  <Label>Years of Experience <Req /></Label>
                  <Input type="number" min="1" max="50" value={form.yearsOfExperience}
                    onChange={e => set('yearsOfExperience', e.target.value)} placeholder="e.g. 8" err={errors.yearsOfExperience} />
                  <Err msg={errors.yearsOfExperience} />
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 3 ── */}
          {step === 3 && (
            <div className="space-y-7">
              <div className="grid grid-cols-3 gap-5">
                <div>
                  <Label>Hourly Rate (USD) <Req /></Label>
                  <InputIcon icon={<DollarSign size={15} />} type="number" min="1"
                    value={form.hourlyRate} onChange={e => set('hourlyRate', e.target.value)} placeholder="60" err={errors.hourlyRate} />
                  <Err msg={errors.hourlyRate} />
                  <p className="text-xs text-gray-400 mt-1.5">Used to set your plan pricing on the listing page</p>
                </div>
                <div>
                  <Label>LinkedIn URL</Label>
                  <InputIcon icon={<Linkedin size={15} className="text-blue-600" />}
                    value={form.linkedIn} onChange={e => set('linkedIn', e.target.value)}
                    placeholder="linkedin.com/in/you" />
                </div>
                <div>
                  <Label>X / Twitter URL</Label>
                  <InputIcon icon={<Twitter size={15} className="text-sky-500" />}
                    value={form.twitter} onChange={e => set('twitter', e.target.value)}
                    placeholder="twitter.com/you" />
                </div>
              </div>

              {/* Preview card */}
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-lg mt-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4">Your listing preview</p>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg,#3B82F6,#6366F1)' }}>
                    {form.firstName?.[0] || <User className="w-5 h-5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-base">{form.firstName || 'Your Name'} {form.lastName}</p>
                    <p className="text-sm text-gray-500">{form.title || 'Your Job Title'}{form.company ? ` · ${form.company}` : ''}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {form.skills.slice(0, 5).map(s => (
                        <span key={s} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-md">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xl font-bold text-gray-900">${form.hourlyRate || '—'}<span className="text-sm font-normal text-gray-400">/hr</span></p>
                    <p className="text-xs text-gray-400 mt-0.5">{form.location || 'Location'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Nav buttons */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-100">
            <button onClick={handleBack} disabled={step === 1}
              className="flex items-center gap-2 px-6 py-3 text-gray-500 hover:text-gray-700 disabled:opacity-25 disabled:cursor-not-allowed font-medium text-sm transition-colors">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>

            {step < 3 ? (
              <button onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-500/20 text-sm">
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={loading}
                className="flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white text-sm transition-all shadow-xl active:scale-95 disabled:opacity-50"
                style={{ background: 'linear-gradient(135deg,#3B82F6,#6366F1)' }}>
                {loading ? 'Saving profile…' : 'Complete & Go to Dashboard'}
                {!loading && <CheckCircle className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

// ── Micro-components ──────────────────────────────────────────────────────────
const Label = ({ children }) => (
  <label className="block text-sm font-semibold text-gray-700 mb-1.5">{children}</label>
);
const Req = () => <span className="text-red-400 ml-0.5">*</span>;
const Err = ({ msg }) => msg ? <p className="text-xs text-red-500 mt-1">{msg}</p> : null;

const Input = ({ err, ...props }) => (
  <input {...props}
    className={`w-full px-4 py-3 border rounded-xl text-sm bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all ${err ? 'border-red-300 bg-red-50' : 'border-gray-200'}`} />
);

const InputIcon = ({ icon, err, ...props }) => (
  <div className="relative">
    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>
    <input {...props}
      className={`w-full pl-9 pr-4 py-3 border rounded-xl text-sm bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all ${err ? 'border-red-300 bg-red-50' : 'border-gray-200'}`} />
  </div>
);