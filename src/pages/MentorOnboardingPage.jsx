// MentorOnboardingPage.jsx — 4-step mentor onboarding with avatar crop & title autocomplete
import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { completeMentorOnboarding } from '../utils/database/profiles';
import logoWhite from '../assets/logowhite.png';
import {
  User, Briefcase, MapPin, Globe, DollarSign, Linkedin, Twitter,
  Plus, X, ChevronLeft, CheckCircle, ArrowRight,
  GraduationCap, Trash2, Camera, ZoomIn,
} from 'lucide-react';

// ── Constants ─────────────────────────────────────────────────────────────────

const JOB_TITLES = [
  'Software Engineer', 'Senior Software Engineer', 'Staff Engineer', 'Principal Engineer',
  'Engineering Manager', 'CTO', 'VP of Engineering', 'Director of Engineering',
  'Product Manager', 'Senior Product Manager', 'Director of Product', 'VP of Product', 'CPO',
  'UX Designer', 'UI/UX Designer', 'Product Designer', 'Design Lead', 'Head of Design', 'Creative Director',
  'Data Scientist', 'ML Engineer', 'AI Researcher', 'Data Analyst', 'Data Engineer',
  'Marketing Manager', 'Growth Manager', 'CMO', 'Content Strategist', 'Brand Manager',
  'Sales Manager', 'VP of Sales', 'Account Executive', 'Business Development Manager',
  'Operations Manager', 'COO', 'Business Analyst', 'Strategy Consultant',
  'Founder', 'Co-Founder', 'CEO', 'Entrepreneur',
  'Consultant', 'Freelancer', 'Advisor', 'Executive Coach',
  'Finance Manager', 'CFO', 'Investment Banker', 'Financial Analyst', 'Venture Capitalist',
  'HR Manager', 'Talent Acquisition Lead', 'CHRO', 'People Operations Manager',
  'DevOps Engineer', 'Platform Engineer', 'Cloud Architect', 'Site Reliability Engineer',
  'Mobile Developer', 'iOS Developer', 'Android Developer', 'React Native Developer',
  'Full Stack Developer', 'Backend Developer', 'Frontend Developer',
  'Blockchain Developer', 'Cybersecurity Engineer', 'QA Engineer', 'Test Engineer',
  'Project Manager', 'Scrum Master', 'Agile Coach', 'Program Manager',
  'Researcher', 'PhD Student', 'Professor', 'Academic',
];

const SKILL_SUGGESTIONS = [
  'JavaScript', 'Python', 'React', 'Node.js', 'Machine Learning', 'Data Science',
  'UX/UI Design', 'Product Management', 'Marketing', 'Entrepreneurship',
  'Leadership', 'Public Speaking', 'Career Coaching', 'AWS', 'DevOps',
  'System Design', 'iOS/Android', 'Finance', 'Blockchain', 'AI/ML',
  'Product Strategy', 'Team Building', 'Venture Capital', 'Sales', 'Operations',
];

const INDUSTRIES = [
  'Technology', 'Finance', 'Healthcare', 'Education', 'Marketing',
  'Design', 'Business', 'Engineering', 'Science', 'Arts & Media', 'Consulting',
];

const LANGUAGES = ['English', 'Hindi', 'Spanish', 'French', 'German', 'Arabic', 'Mandarin', 'Portuguese'];

const STEPS = [
  { id: 1, title: 'Identity & Role',    subtitle: 'How will mentees find you?'   },
  { id: 2, title: 'Your Story',         subtitle: 'Bio & professional experience' },
  { id: 3, title: 'Skills & Education', subtitle: 'What can you help with?'       },
  { id: 4, title: 'Pricing & Links',    subtitle: 'Set your rate & socials'       },
];

const CROP_SIZE = 268;
const emptyExp = () => ({ title: '', company: '', period: '', description: '' });

// ── Image Crop Modal ──────────────────────────────────────────────────────────

function CropModal({ file, onSave, onClose }) {
  const [scale, setScale] = useState(1);
  const [minScale, setMinScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, ox: 0, oy: 0 });
  const [imgDims, setImgDims] = useState({ w: 0, h: 0 });
  const [imgLoaded, setImgLoaded] = useState(false);
  const imgRef = useRef(null);
  const imgSrc = useRef(URL.createObjectURL(file)).current;

  useEffect(() => () => URL.revokeObjectURL(imgSrc), [imgSrc]);

  const clampOffset = useCallback((ox, oy, s, dims) => {
    const d = dims || imgDims;
    if (!d.w) return { x: 0, y: 0 };
    const maxX = Math.max(0, d.w * s / 2 - CROP_SIZE / 2);
    const maxY = Math.max(0, d.h * s / 2 - CROP_SIZE / 2);
    return {
      x: Math.max(-maxX, Math.min(maxX, ox)),
      y: Math.max(-maxY, Math.min(maxY, oy)),
    };
  }, [imgDims]);

  const handleImageLoad = () => {
    const img = imgRef.current;
    if (!img) return;
    const dims = { w: img.naturalWidth, h: img.naturalHeight };
    const init = Math.max(CROP_SIZE / dims.w, CROP_SIZE / dims.h);
    setImgDims(dims);
    setMinScale(init);
    setScale(init);
    setOffset({ x: 0, y: 0 });
    setImgLoaded(true);
  };

  const tx = CROP_SIZE / 2 + offset.x - imgDims.w * scale / 2;
  const ty = CROP_SIZE / 2 + offset.y - imgDims.h * scale / 2;

  const startDrag = (clientX, clientY) => {
    setIsDragging(true);
    setDragStart({ x: clientX, y: clientY, ox: offset.x, oy: offset.y });
  };
  const moveDrag = (clientX, clientY) => {
    if (!isDragging) return;
    setOffset(clampOffset(dragStart.ox + (clientX - dragStart.x), dragStart.oy + (clientY - dragStart.y), scale));
  };
  const endDrag = () => setIsDragging(false);

  const handleSave = () => {
    if (!imgRef.current || !imgLoaded) return;
    const out = 400;
    const canvas = document.createElement('canvas');
    canvas.width = out; canvas.height = out;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(out / 2, out / 2, out / 2, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(imgRef.current, -tx / scale, -ty / scale, CROP_SIZE / scale, CROP_SIZE / scale, 0, 0, out, out);
    onSave(canvas.toDataURL('image/jpeg', 0.92));
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[200] p-4 select-none"
      onMouseMove={e => moveDrag(e.clientX, e.clientY)}
      onMouseUp={endDrag}
      onTouchMove={e => moveDrag(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchEnd={endDrag}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-5">
          <div>
            <h3 className="text-base font-bold text-slate-900">Crop Profile Photo</h3>
            <p className="text-xs text-slate-400 mt-0.5">Drag to reposition · Scroll to zoom</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Crop circle */}
        <div className="flex justify-center mb-5">
          <div style={{ position: 'relative', width: CROP_SIZE, height: CROP_SIZE }}>
            <div
              style={{ width: CROP_SIZE, height: CROP_SIZE, borderRadius: '50%', overflow: 'hidden', cursor: isDragging ? 'grabbing' : 'grab', border: '3px solid #3B82F6', position: 'relative', background: '#f1f5f9' }}
              onMouseDown={e => { e.preventDefault(); startDrag(e.clientX, e.clientY); }}
              onTouchStart={e => startDrag(e.touches[0].clientX, e.touches[0].clientY)}
              onWheel={e => {
                e.preventDefault();
                const next = Math.max(minScale, Math.min(minScale * 4, scale - e.deltaY * 0.001));
                setScale(next);
                setOffset(prev => clampOffset(prev.x, prev.y, next));
              }}
            >
              <img
                ref={imgRef}
                src={imgSrc}
                alt="crop-preview"
                onLoad={handleImageLoad}
                draggable={false}
                style={{
                  position: 'absolute',
                  left: tx, top: ty,
                  width: imgDims.w * scale,
                  height: imgDims.h * scale,
                  pointerEvents: 'none',
                  userSelect: 'none',
                  display: 'block',
                }}
              />
            </div>
            {/* Guide ring */}
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              boxShadow: '0 0 0 3px #3B82F6, 0 0 0 9999px rgba(0,0,0,0.45)',
              pointerEvents: 'none',
            }} />
          </div>
        </div>

        {/* Zoom slider */}
        <div className="mb-6 px-2">
          <div className="flex items-center gap-3">
            <ZoomIn className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <input type="range"
              min={minScale} max={minScale * 4} step={0.01}
              value={scale}
              onChange={e => {
                const s = +e.target.value;
                setScale(s);
                setOffset(prev => clampOffset(prev.x, prev.y, s));
              }}
              className="flex-1 accent-blue-600 h-1.5 rounded-full"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={onClose}
            className="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors">
            Cancel
          </button>
          <button onClick={handleSave}
            className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors">
            Save Photo
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Job Title Autocomplete Combobox ───────────────────────────────────────────

function TitleComboBox({ value, onChange, err }) {
  const [inputVal, setInputVal] = useState(value || '');
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const hide = (e) => { if (!wrapperRef.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', hide);
    return () => document.removeEventListener('mousedown', hide);
  }, []);

  const filtered = inputVal.trim()
    ? JOB_TITLES.filter(t => t.toLowerCase().includes(inputVal.toLowerCase())).slice(0, 8)
    : JOB_TITLES.slice(0, 8);

  const exactMatch = JOB_TITLES.some(t => t.toLowerCase() === inputVal.toLowerCase());

  const select = (title) => {
    setInputVal(title);
    onChange(title);
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <Briefcase size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        <input
          value={inputVal}
          onChange={e => { setInputVal(e.target.value); onChange(e.target.value); setOpen(true); setHighlighted(0); }}
          onFocus={() => setOpen(true)}
          onKeyDown={e => {
            const total = filtered.length + (!exactMatch && inputVal.trim() ? 1 : 0);
            if (e.key === 'ArrowDown') { e.preventDefault(); setHighlighted(h => (h + 1) % total); }
            if (e.key === 'ArrowUp') { e.preventDefault(); setHighlighted(h => (h - 1 + total) % total); }
            if (e.key === 'Enter') {
              e.preventDefault();
              if (highlighted < filtered.length) { select(filtered[highlighted]); }
              else if (inputVal.trim()) { select(inputVal.trim()); }
            }
            if (e.key === 'Escape') setOpen(false);
          }}
          placeholder="e.g. Senior Product Manager"
          className={`w-full pl-9 pr-4 py-3 border rounded-xl text-sm bg-slate-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all ${err ? 'border-red-300 bg-red-50' : 'border-slate-200'}`}
        />
      </div>

      {open && (
        <div className="absolute z-50 left-0 right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden max-h-56 overflow-y-auto">
          {filtered.map((t, i) => (
            <button key={t} type="button"
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${i === highlighted ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'}`}
              onMouseDown={e => { e.preventDefault(); select(t); }}
              onMouseEnter={() => setHighlighted(i)}
            >
              {t}
            </button>
          ))}
          {inputVal.trim() && !exactMatch && (
            <button type="button"
              className={`w-full text-left px-4 py-2.5 text-sm border-t border-slate-100 flex items-center gap-2 ${highlighted === filtered.length ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-500 hover:bg-slate-50'}`}
              onMouseDown={e => { e.preventDefault(); select(inputVal.trim()); }}
              onMouseEnter={() => setHighlighted(filtered.length)}
            >
              <Plus className="w-3.5 h-3.5 flex-shrink-0" />
              Use "<span className="font-semibold">{inputVal.trim()}</span>"
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function MentorOnboardingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Avatar
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [cropFile, setCropFile] = useState(null);
  const fileInputRef = useRef(null);

  const nameParts = (user?.name || '').split(' ');
  const [form, setForm] = useState({
    firstName: nameParts[0] || '',
    lastName: nameParts.slice(1).join(' ') || '',
    title: '',
    company: '',
    location: '',
    language: 'English',
    bio: '',
    experience: [emptyExp()],
    skills: [],
    skillInput: '',
    industry: '',
    yearsOfExperience: '',
    educationDegree: '',
    educationInstitution: '',
    hourlyRate: '',
    linkedIn: '',
    twitter: '',
  });

  const set = (field, value) => {
    setForm(p => ({ ...p, [field]: value }));
    setErrors(p => ({ ...p, [field]: null }));
  };

  // Experience helpers
  const updateExp = (idx, field, value) => {
    set('experience', form.experience.map((e, i) => i === idx ? { ...e, [field]: value } : e));
  };
  const addExp = () => set('experience', [...form.experience, emptyExp()]);
  const removeExp = (idx) => set('experience', form.experience.filter((_, i) => i !== idx));

  // Skill helpers
  const addSkill = (s) => {
    const t = s.trim();
    if (!t || form.skills.includes(t)) return;
    set('skills', [...form.skills, t]);
    set('skillInput', '');
  };
  const removeSkill = (s) => set('skills', form.skills.filter(x => x !== s));

  // Avatar upload
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.match(/^image\/(jpeg|png|webp)/)) { alert('Please upload a JPEG or PNG file.'); return; }
    setCropFile(file);
    e.target.value = '';
  };

  // Validation
  const validate = () => {
    const e = {};
    if (step === 1) {
      if (!form.firstName.trim()) e.firstName = 'Required';
      if (!form.title.trim()) e.title = 'Job title is required';
      if (!form.location.trim()) e.location = 'Required';
    }
    if (step === 2) {
      const wc = form.bio.trim().split(/\s+/).filter(Boolean).length;
      if (wc < 20) e.bio = `Need at least 20 words (${wc} so far)`;
      form.experience.forEach((exp, i) => {
        if (exp.title && !exp.company) e[`exp_${i}_company`] = 'Required';
        if (exp.title && !exp.period) e[`exp_${i}_period`] = 'Required';
      });
    }
    if (step === 3) {
      if (form.skills.length === 0) e.skills = 'Add at least one skill';
      if (!form.industry) e.industry = 'Select an industry';
      if (!form.yearsOfExperience || +form.yearsOfExperience < 1) e.yearsOfExperience = 'Required';
    }
    if (step === 4) {
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
        experience: form.experience.filter(e => e.title.trim()),
        skills: form.skills,
        industry: form.industry,
        yearsOfExperience: +form.yearsOfExperience,
        education: { degree: form.educationDegree, institution: form.educationInstitution },
        hourlyRate: +form.hourlyRate,
        linkedIn: form.linkedIn,
        twitter: form.twitter,
        avatarUrl: avatarPreview || '',
      });
      localStorage.setItem('dashboardType', 'mentor');
      navigate('/dashboard_mentor');
    } catch (err) {
      console.error('Onboarding error:', err);
      alert('Failed to save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const bioWords = form.bio.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="min-h-screen flex bg-[#F8FAFC]">

      {/* ── Left Panel ─────────────────────────────────────────────────── */}
      <aside
        className="hidden lg:flex flex-col w-72 xl:w-80 flex-shrink-0 p-10 justify-between relative overflow-hidden"
        style={{ background: 'linear-gradient(155deg, #09183D 0%, #0E2260 45%, #060D25 100%)' }}
      >
        {/* Glow orbs */}
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10 blur-[90px] pointer-events-none" style={{ background: '#4F8EF7' }} />
        <div className="absolute bottom-10 -left-10 w-56 h-56 rounded-full opacity-8 blur-[70px] pointer-events-none" style={{ background: '#6366F1' }} />

        <div className="relative z-10">
          <div className="mb-10">
            <img src={logoWhite} alt="Koach" className="h-8 object-contain" />
          </div>

          <h2 className="text-xl font-bold text-white mb-1">Set up your profile</h2>
          <p className="text-slate-400 text-sm mb-10">Your info appears on your public listing page</p>

          <div className="space-y-1">
            {STEPS.map(s => {
              const done = s.id < step;
              const active = s.id === step;
              return (
                <div key={s.id} className={`flex items-start gap-3 p-3.5 rounded-2xl transition-all ${active ? 'bg-white/10' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold transition-all
                    ${done ? 'bg-emerald-400 text-white' : active ? 'bg-white text-blue-700' : 'bg-white/10 text-slate-500'}`}>
                    {done ? <CheckCircle className="w-4 h-4" /> : s.id}
                  </div>
                  <div className="pt-0.5">
                    <p className={`text-sm font-semibold ${active ? 'text-white' : done ? 'text-emerald-400' : 'text-slate-500'}`}>{s.title}</p>
                    <p className={`text-xs mt-0.5 ${active ? 'text-blue-200' : 'text-slate-600'}`}>{s.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress circles at bottom */}
        <div className="relative z-10">
          <div className="flex gap-1.5 mb-4">
            {STEPS.map(s => (
              <div key={s.id} className={`h-1 flex-1 rounded-full transition-all duration-500 ${s.id <= step ? 'bg-blue-500' : 'bg-white/15'}`} />
            ))}
          </div>
          <p className="text-slate-500 text-xs">© 2025 Koach · All rights reserved.</p>
        </div>
      </aside>

      {/* ── Right Panel ─────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col overflow-y-auto bg-[#F8FAFC] lg:rounded-l-none">

        {/* Mobile header */}
        <div className="lg:hidden flex items-center px-6 py-4 bg-white border-b border-slate-100 shadow-sm">
          <img src={logoWhite} alt="Koach" className="h-7 object-contain invert" />
          <span className="ml-auto text-sm text-slate-400 font-medium">Step {step} / {STEPS.length}</span>
        </div>

        <div className="flex-1 px-6 sm:px-10 lg:px-16 xl:px-20 py-10 max-w-3xl w-full mx-auto">

          {/* Progress bar */}
          <div className="mb-7">
            <div className="flex items-center justify-between mb-2">
              <p className="text-blue-600 text-xs font-bold uppercase tracking-wider">Step {step} of {STEPS.length} — {STEPS[step - 1].title}</p>
              <p className="text-xs text-slate-400 font-medium">{Math.round((step / STEPS.length) * 100)}%</p>
            </div>
            <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                style={{ width: `${(step / STEPS.length) * 100}%` }} />
            </div>
          </div>

          {/* Step heading */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900">{STEPS[step - 1].title}</h1>
            <p className="text-slate-500 mt-1 text-sm">{STEPS[step - 1].subtitle}</p>
          </div>

          {/* ── STEP 1 ─────────────────────────────────────────────────── */}
          {step === 1 && (
            <div className="space-y-4">

              {/* Avatar section */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <SectionHeader icon={<User className="w-4 h-4" />} title="Profile Photo" sub="Add a clear, professional headshot" />
                <div className="flex items-center gap-6">
                  <div
                    className="relative w-24 h-24 rounded-full flex-shrink-0 cursor-pointer group"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Avatar" className="w-24 h-24 rounded-full object-cover ring-2 ring-blue-500 ring-offset-2" />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center ring-2 ring-slate-200">
                        <User className="w-9 h-9 text-blue-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800 mb-1">
                      {avatarPreview ? 'Photo uploaded ✓' : 'Upload a photo'}
                    </p>
                    <p className="text-xs text-slate-400 mb-3">JPEG or PNG · Max 10MB · Square crop will be applied</p>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className={`px-4 py-2 text-xs font-bold rounded-xl border transition-colors ${avatarPreview ? 'border-slate-200 text-slate-600 hover:bg-slate-50' : 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'}`}
                    >
                      {avatarPreview ? 'Change Photo' : 'Choose File'}
                    </button>
                  </div>
                  <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleAvatarChange} />
                </div>
              </div>

              {/* Identity fields */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <SectionHeader icon={<Briefcase className="w-4 h-4" />} title="Your Identity" sub="This appears at the top of your public profile" />
                <div className="grid grid-cols-2 gap-5 mb-5">
                  <Fld label="First Name" required>
                    <Input value={form.firstName} onChange={e => set('firstName', e.target.value)} placeholder="Jane" err={errors.firstName} />
                    <Err msg={errors.firstName} />
                  </Fld>
                  <Fld label="Last Name">
                    <Input value={form.lastName} onChange={e => set('lastName', e.target.value)} placeholder="Doe" />
                  </Fld>
                </div>
                <div className="grid grid-cols-2 gap-5 mb-5">
                  <Fld label="Job Title" required>
                    <TitleComboBox value={form.title} onChange={v => set('title', v)} err={errors.title} />
                    <Err msg={errors.title} />
                  </Fld>
                  <Fld label="Current Company">
                    <InputIcon icon={<Briefcase size={14} />} value={form.company} onChange={e => set('company', e.target.value)} placeholder="Google, Stripe…" />
                  </Fld>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <Fld label="Location" required>
                    <InputIcon icon={<MapPin size={14} />} value={form.location} onChange={e => set('location', e.target.value)} placeholder="Mumbai, India" err={errors.location} />
                    <Err msg={errors.location} />
                  </Fld>
                  <Fld label="Primary Language">
                    <div className="relative">
                      <Globe size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      <select className="w-full pl-9 pr-4 py-3 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all"
                        value={form.language} onChange={e => set('language', e.target.value)}>
                        {LANGUAGES.map(l => <option key={l}>{l}</option>)}
                      </select>
                    </div>
                  </Fld>
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 2 ─────────────────────────────────────────────────── */}
          {step === 2 && (
            <div className="space-y-4">
              {/* Bio */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <SectionHeader icon={<User className="w-4 h-4" />} title="About You" sub="Introduce yourself to potential mentees" />
                <Fld label="Professional Bio" required hint={
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${bioWords < 20 ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
                    {bioWords} / 20 min words
                  </span>
                }>
                  <textarea
                    className={`w-full px-4 py-3.5 border rounded-xl text-sm resize-none focus:outline-none transition-all mt-1 ${errors.bio ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:bg-white'}`}
                    rows={5}
                    value={form.bio}
                    onChange={e => set('bio', e.target.value)}
                    placeholder="Tell mentees who you are, your background, and how you can help them achieve their goals…"
                  />
                  <Err msg={errors.bio} />
                </Fld>
              </div>

              {/* Experience */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <div className="flex items-start justify-between mb-5 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-xl bg-indigo-50"><Briefcase className="w-4 h-4 text-indigo-600" /></div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">Work Experience</h3>
                      <p className="text-xs text-slate-400 mt-0.5">Optional — shown on your profile timeline</p>
                    </div>
                  </div>
                  <button onClick={addExp}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100 rounded-xl font-bold transition-colors flex-shrink-0">
                    <Plus className="w-3.5 h-3.5" /> Add Entry
                  </button>
                </div>
                <div className="space-y-4">
                  {form.experience.map((exp, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl relative">
                      {form.experience.length > 1 && (
                        <button onClick={() => removeExp(idx)}
                          className="absolute top-3 right-3 p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-1">Job Title</label>
                          <input value={exp.title} onChange={e => updateExp(idx, 'title', e.target.value)} placeholder="Senior Engineer"
                            className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-1">Company <span className="text-red-400">*</span></label>
                          <input value={exp.company} onChange={e => updateExp(idx, 'company', e.target.value)} placeholder="Google"
                            className={`w-full px-3 py-2.5 border rounded-lg text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all ${errors[`exp_${idx}_company`] ? 'border-red-300' : 'border-slate-200'}`} />
                          <Err msg={errors[`exp_${idx}_company`]} />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="block text-xs font-bold text-slate-500 mb-1">Period <span className="text-red-400">*</span></label>
                        <input value={exp.period} onChange={e => updateExp(idx, 'period', e.target.value)} placeholder="Jan 2020 – Mar 2023"
                          className={`w-full px-3 py-2.5 border rounded-lg text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all ${errors[`exp_${idx}_period`] ? 'border-red-300' : 'border-slate-200'}`} />
                        <Err msg={errors[`exp_${idx}_period`]} />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">Description <span className="text-slate-400 font-normal">(optional)</span></label>
                        <textarea value={exp.description} onChange={e => updateExp(idx, 'description', e.target.value)}
                          placeholder="What did you build, lead, or achieve?" rows={2}
                          className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none transition-all" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 3 ─────────────────────────────────────────────────── */}
          {step === 3 && (
            <div className="space-y-4">
              {/* Skills */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <SectionHeader icon={<Briefcase className="w-4 h-4" />} title="Skills & Expertise" sub="What topics and skills can you mentor on?" />
                <Fld label="Add Skills" required>
                  <div className={`flex flex-wrap gap-2 p-3.5 border rounded-xl min-h-[56px] bg-slate-50 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 focus-within:bg-white transition-all ${errors.skills ? 'border-red-300' : 'border-slate-200'}`}>
                    {form.skills.map(s => (
                      <span key={s} className="flex items-center gap-1.5 bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-semibold">
                        {s}
                        <button onClick={() => removeSkill(s)} className="hover:bg-white/20 rounded p-0.5"><X className="w-3 h-3" /></button>
                      </span>
                    ))}
                    <input
                      className="flex-1 min-w-[140px] bg-transparent outline-none text-sm placeholder-slate-400 py-1"
                      value={form.skillInput}
                      onChange={e => set('skillInput', e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addSkill(form.skillInput); } }}
                      placeholder={form.skills.length === 0 ? 'Type a skill and press Enter…' : 'Add more…'}
                    />
                  </div>
                  <Err msg={errors.skills} />
                  <div className="flex flex-wrap gap-2 mt-3">
                    {SKILL_SUGGESTIONS.filter(s => !form.skills.includes(s)).slice(0, 16).map(s => (
                      <button key={s} onClick={() => addSkill(s)}
                        className="flex items-center gap-1 px-2.5 py-1.5 text-xs bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors font-medium text-slate-600">
                        <Plus className="w-3 h-3" />{s}
                      </button>
                    ))}
                  </div>
                </Fld>
              </div>

              {/* Industry & Years */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <SectionHeader icon={<Globe className="w-4 h-4" />} title="Industry & Experience" sub="Help mentees understand your background depth" />
                <div className="grid grid-cols-2 gap-5">
                  <Fld label="Industry" required>
                    <select className={`w-full px-4 py-3 border rounded-xl text-sm bg-slate-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all ${errors.industry ? 'border-red-300' : 'border-slate-200'}`}
                      value={form.industry} onChange={e => set('industry', e.target.value)}>
                      <option value="">Select industry</option>
                      {INDUSTRIES.map(i => <option key={i}>{i}</option>)}
                    </select>
                    <Err msg={errors.industry} />
                  </Fld>
                  <Fld label="Years of Experience" required>
                    <Input type="number" min="1" max="50" value={form.yearsOfExperience}
                      onChange={e => set('yearsOfExperience', e.target.value)} placeholder="e.g. 8" err={errors.yearsOfExperience} />
                    <Err msg={errors.yearsOfExperience} />
                  </Fld>
                </div>
              </div>

              {/* Education */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <SectionHeader icon={<GraduationCap className="w-4 h-4" />} title="Education" sub="Optional — adds credibility to your profile" />
                <div className="grid grid-cols-2 gap-4">
                  <Fld label="Degree / Qualification">
                    <Input value={form.educationDegree} onChange={e => set('educationDegree', e.target.value)} placeholder="B.Tech in Computer Science" />
                  </Fld>
                  <Fld label="Institution">
                    <Input value={form.educationInstitution} onChange={e => set('educationInstitution', e.target.value)} placeholder="IIT Bombay" />
                  </Fld>
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 4 ─────────────────────────────────────────────────── */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <SectionHeader icon={<DollarSign className="w-4 h-4" />} title="Rate & Social Links" sub="Your rate drives plan pricing on your listing" />
                <div className="grid grid-cols-3 gap-5">
                  <Fld label="Hourly Rate (USD)" required>
                    <InputIcon icon={<DollarSign size={14} />} type="number" min="1"
                      value={form.hourlyRate} onChange={e => set('hourlyRate', e.target.value)} placeholder="60" err={errors.hourlyRate} />
                    <Err msg={errors.hourlyRate} />
                    <p className="text-xs text-slate-400 mt-1">Plans = 3× & 6× this rate</p>
                  </Fld>
                  <Fld label="LinkedIn URL">
                    <InputIcon icon={<Linkedin size={14} className="text-blue-600" />}
                      value={form.linkedIn} onChange={e => set('linkedIn', e.target.value)} placeholder="linkedin.com/in/you" />
                  </Fld>
                  <Fld label="X / Twitter URL">
                    <InputIcon icon={<Twitter size={14} className="text-sky-500" />}
                      value={form.twitter} onChange={e => set('twitter', e.target.value)} placeholder="twitter.com/you" />
                  </Fld>
                </div>
              </div>

              {/* Preview card */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Listing Preview</p>
                <div className="bg-slate-50 rounded-xl border border-slate-100 p-5 flex items-start gap-4">
                  {avatarPreview
                    ? <img src={avatarPreview} alt="avatar" className="w-16 h-16 rounded-2xl object-cover flex-shrink-0 shadow" />
                    : <div className="w-16 h-16 rounded-2xl flex-shrink-0 flex items-center justify-center text-white text-2xl font-bold bg-gradient-to-br from-blue-500 to-indigo-600 shadow">{form.firstName?.[0] || <User className="w-6 h-6" />}</div>
                  }
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 text-base">{form.firstName || 'Your Name'} {form.lastName}</p>
                    <p className="text-sm text-blue-600 font-semibold mt-0.5">
                      {form.title || 'Your Job Title'}
                      {form.company && <span className="text-slate-400 font-normal"> @ {form.company}</span>}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {form.skills.slice(0, 5).map(s => (
                        <span key={s} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-md border border-blue-100">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xl font-bold text-slate-900">${form.hourlyRate || '—'}<span className="text-sm font-normal text-slate-400">/hr</span></p>
                    <p className="text-xs text-slate-400 mt-0.5">{form.location || 'Location'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Nav buttons ─────────────────────────────────────────────── */}
          <div className="flex items-center justify-between mt-8 pt-7 border-t border-slate-200">
            <button onClick={handleBack} disabled={step === 1}
              className="flex items-center gap-2 px-5 py-2.5 text-slate-500 hover:text-slate-800 disabled:opacity-25 disabled:cursor-not-allowed font-semibold text-sm transition-colors rounded-xl hover:bg-slate-100">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            {step < 4 ? (
              <button onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-500/20">
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={loading}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-sm shadow-xl shadow-blue-500/20 active:scale-95 transition-all disabled:opacity-50 hover:opacity-90">
                {loading ? 'Saving…' : 'Complete & Go to Dashboard'}
                {!loading && <CheckCircle className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>
      </main>

      {/* ── Crop Modal ──────────────────────────────────────────────────── */}
      {cropFile && (
        <CropModal
          file={cropFile}
          onSave={dataUrl => { setAvatarPreview(dataUrl); setCropFile(null); }}
          onClose={() => setCropFile(null)}
        />
      )}
    </div>
  );
}

// ── Micro-components ──────────────────────────────────────────────────────────

const SectionHeader = ({ icon, title, sub }) => (
  <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-slate-100">
    <div className="p-1.5 rounded-xl bg-slate-100 text-slate-500 flex-shrink-0">{icon}</div>
    <div>
      <h3 className="text-sm font-bold text-slate-800">{title}</h3>
      {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
    </div>
  </div>
);

const Fld = ({ label, required, hint, children }) => (
  <div>
    {(label || hint) && (
      <div className="flex items-center justify-between mb-1.5">
        {label && <label className="block text-sm font-semibold text-slate-700">{label} {required && <span className="text-red-400">*</span>}</label>}
        {hint && <span>{hint}</span>}
      </div>
    )}
    {children}
  </div>
);

const Err = ({ msg }) => msg ? <p className="text-xs text-red-500 mt-1 font-medium">{msg}</p> : null;

const Input = ({ err, ...props }) => (
  <input {...props}
    className={`w-full px-4 py-3 border rounded-xl text-sm bg-slate-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all ${err ? 'border-red-300 bg-red-50' : 'border-slate-200'}`} />
);

const InputIcon = ({ icon, err, ...props }) => (
  <div className="relative">
    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">{icon}</span>
    <input {...props}
      className={`w-full pl-9 pr-4 py-3 border rounded-xl text-sm bg-slate-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all ${err ? 'border-red-300 bg-red-50' : 'border-slate-200'}`} />
  </div>
);