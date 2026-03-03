// Settings2.jsx — Mentor Profile Settings
// Fetches real data from GET /api/mentors/me and saves via PATCH /api/mentors/:id
import React, { useState, useEffect, useRef } from 'react';
import {
  User, Briefcase, MapPin, Globe, DollarSign, Linkedin, Twitter, Save,
  Plus, X, CheckCircle, XCircle, Clock, Slash, ChevronDown, Check,
  Edit2, Loader2, AlertCircle
} from 'lucide-react';
import Navigation from '../Navigation';
import Sidenav from './Sidenav';
import Footer from '../Footer';
import { useAuth } from '../../utils/AuthContext';
import { getMyMentorProfile, updateMentor } from '../../services/mentorService';

const SKILL_SUGGESTIONS = [
  'JavaScript', 'Python', 'React', 'Node.js', 'Machine Learning', 'Data Science',
  'UX/UI Design', 'Product Management', 'Marketing', 'Entrepreneurship',
  'Leadership', 'Career Coaching', 'AWS', 'DevOps', 'System Design',
];

const LANGUAGES = ['English', 'Hindi', 'Spanish', 'French', 'German', 'Arabic', 'Mandarin'];
const INDUSTRIES = [
  'Technology', 'Finance', 'Healthcare', 'Education', 'Marketing',
  'Design', 'Business', 'Engineering', 'Science', 'Arts & Media',
];

const AVAILABILITY_OPTIONS = [
  { label: 'Available for Mentoring', color: 'text-emerald-600', icon: CheckCircle, bg: 'bg-emerald-50' },
  { label: 'Fully Booked', color: 'text-rose-500', icon: XCircle, bg: 'bg-rose-50' },
  { label: 'Taking a Break', color: 'text-amber-500', icon: Clock, bg: 'bg-amber-50' },
  { label: 'Inactive', color: 'text-slate-500', icon: Slash, bg: 'bg-slate-50' },
];

export default function Settings2() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Profile');
  const [mentor, setMentor] = useState(null);      // raw DB object
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // 'ok' | 'error' | null
  const [fetchError, setFetchError] = useState(null);

  const [form, setForm] = useState({
    title: '', company: '', location: '', language: 'English', bio: '',
    skills: [], skillInput: '',
    industry: '', yearsOfExperience: '',
    hourlyRate: '', linkedIn: '', twitter: '',
  });

  const [availability, setAvailability] = useState('Available for Mentoring');
  const [availDropOpen, setAvailDropOpen] = useState(false);
  const availRef = useRef(null);
  const statusRef = useRef(null);

  // ── Fetch mentor profile ──────────────────────────────────────────────────
  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getMyMentorProfile();
        setMentor(data);
        setForm({
          title: data.title || '',
          company: data.company || '',
          location: data.location || '',
          language: data.language || 'English',
          bio: data.bio || '',
          skills: Array.isArray(data.skills) ? data.skills : [],
          skillInput: '',
          industry: data.industry || '',
          yearsOfExperience: String(data.yearsOfExperience || ''),
          hourlyRate: String(data.hourlyRate || ''),
          linkedIn: data.linkedIn || '',
          twitter: data.twitter || '',
        });
      } catch (err) {
        setFetchError('Could not load your mentor profile. Complete onboarding first.');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const h = (e) => { if (availRef.current && !availRef.current.contains(e.target)) setAvailDropOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const set = (field, value) => setForm(p => ({ ...p, [field]: value }));

  const addSkill = (s) => {
    const t = s.trim();
    if (!t || form.skills.includes(t)) return;
    set('skills', [...form.skills, t]);
    set('skillInput', '');
  };
  const removeSkill = (s) => set('skills', form.skills.filter(x => x !== s));

  const handleSave = async () => {
    if (!mentor?._id) return;
    setSaving(true);
    setSaveStatus(null);
    try {
      await updateMentor(mentor._id, {
        title: form.title,
        company: form.company,
        location: form.location,
        language: form.language,
        bio: form.bio,
        skills: form.skills,
        industry: form.industry,
        yearsOfExperience: +form.yearsOfExperience || 0,
        hourlyRate: +form.hourlyRate || 0,
        linkedIn: form.linkedIn,
        twitter: form.twitter,
      });
      setSaveStatus('ok');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (err) {
      console.error(err);
      setSaveStatus('error');
    } finally {
      setSaving(false);
    }
  };

  const sidebarItems = [
    { name: 'Profile', icon: User },
  ];

  const getInitials = (name) => (name || '').split(' ').map(n => n[0]).join('').toUpperCase() || '?';

  const ProfileContent = () => (
    <div className="space-y-6">
      {/* Header card */}
      <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-xl flex-shrink-0">
            {getInitials(user?.name)}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-slate-900">{user?.name || '—'}</h2>
            <p className="text-slate-500">{form.title || 'No title set'}</p>
            <p className="text-sm text-slate-400 mt-0.5">{user?.email}</p>
          </div>

          {/* Availability pill */}
          <div className="relative" ref={availRef}>
            <button
              onClick={() => setAvailDropOpen(o => !o)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold hover:bg-slate-100 transition-colors">
              <span className={`w-2 h-2 rounded-full ${AVAILABILITY_OPTIONS.find(o => o.label === availability)?.color.replace('text-', 'bg-') || 'bg-slate-400'}`} />
              {availability}
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${availDropOpen ? 'rotate-180' : ''}`} />
            </button>
            {availDropOpen && (
              <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-slate-100 w-52 z-20 overflow-hidden">
                {AVAILABILITY_OPTIONS.map(opt => (
                  <button key={opt.label} onClick={() => { setAvailability(opt.label); setAvailDropOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 text-left">
                    <div className={`p-1.5 rounded-lg ${opt.bg} ${opt.color}`}>
                      <opt.icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">{opt.label}</span>
                    {opt.label === availability && <Check className="w-4 h-4 ml-auto text-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Personal info */}
      <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-blue-600" /> Professional Info
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Job Title" icon={<Briefcase size={15} className="text-gray-400" />}>
            <input className="finput" value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. Senior Product Manager" />
          </Field>
          <Field label="Company" icon={<Briefcase size={15} className="text-gray-400" />}>
            <input className="finput" value={form.company} onChange={e => set('company', e.target.value)} placeholder="Current employer" />
          </Field>
          <Field label="Location" icon={<MapPin size={15} className="text-gray-400" />}>
            <input className="finput" value={form.location} onChange={e => set('location', e.target.value)} placeholder="City, Country" />
          </Field>
          <Field label="Primary Language" icon={<Globe size={15} className="text-gray-400" />}>
            <select className="finput" value={form.language} onChange={e => set('language', e.target.value)}>
              {LANGUAGES.map(l => <option key={l}>{l}</option>)}
            </select>
          </Field>
          <Field label="Industry" icon={<Briefcase size={15} className="text-gray-400" />}>
            <select className="finput" value={form.industry} onChange={e => set('industry', e.target.value)}>
              <option value="">Select industry</option>
              {INDUSTRIES.map(i => <option key={i}>{i}</option>)}
            </select>
          </Field>
          <Field label="Years of Experience" icon={<Briefcase size={15} className="text-gray-400" />}>
            <input className="finput" type="number" min="1" value={form.yearsOfExperience} onChange={e => set('yearsOfExperience', e.target.value)} placeholder="e.g. 8" />
          </Field>
          <div className="md:col-span-2">
            <Field label="Professional Bio" icon={<Edit2 size={15} className="text-gray-400" />}>
              <textarea className="finput h-28 resize-none" value={form.bio} onChange={e => set('bio', e.target.value)} placeholder="Tell mentees about your background…" />
            </Field>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
          <User className="w-5 h-5 text-purple-600" /> Skills & Expertise
        </h3>
        <div className="flex flex-wrap gap-2 mb-3 p-3 border border-gray-200 rounded-xl min-h-[52px] bg-gray-50">
          {form.skills.map(s => (
            <span key={s} className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium">
              {s} <button onClick={() => removeSkill(s)}><X className="w-3 h-3" /></button>
            </span>
          ))}
          <input
            className="flex-1 min-w-[120px] bg-transparent outline-none text-sm placeholder-gray-400"
            value={form.skillInput}
            onChange={e => set('skillInput', e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addSkill(form.skillInput); } }}
            placeholder="Type & press Enter to add…"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {SKILL_SUGGESTIONS.filter(s => !form.skills.includes(s)).map(s => (
            <button key={s} onClick={() => addSkill(s)}
              className="px-2.5 py-1 text-xs bg-gray-100 hover:bg-blue-50 hover:text-blue-700 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors font-medium">
              <Plus className="w-3 h-3 inline mr-0.5" />{s}
            </button>
          ))}
        </div>
      </div>

      {/* Pricing & Links */}
      <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-green-600" /> Pricing & Social Links
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Field label="Hourly Rate (USD)" icon={<DollarSign size={15} className="text-gray-400" />}>
            <input className="finput" type="number" min="1" value={form.hourlyRate} onChange={e => set('hourlyRate', e.target.value)} placeholder="60" />
          </Field>
          <Field label="LinkedIn URL" icon={<Linkedin size={15} className="text-blue-500" />}>
            <input className="finput" value={form.linkedIn} onChange={e => set('linkedIn', e.target.value)} placeholder="https://linkedin.com/in/…" />
          </Field>
          <Field label="X / Twitter URL" icon={<Twitter size={15} className="text-sky-500" />}>
            <input className="finput" value={form.twitter} onChange={e => set('twitter', e.target.value)} placeholder="https://twitter.com/…" />
          </Field>
        </div>
      </div>

      {/* Save button */}
      <div className="flex items-center justify-end gap-4 pb-4">
        {saveStatus === 'ok' && (
          <div className="flex items-center gap-2 text-emerald-600 font-medium text-sm">
            <CheckCircle className="w-4 h-4" /> Changes saved!
          </div>
        )}
        {saveStatus === 'error' && (
          <div className="flex items-center gap-2 text-red-500 font-medium text-sm">
            <AlertCircle className="w-4 h-4" /> Save failed. Try again.
          </div>
        )}
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 disabled:opacity-50">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navigation />
      <Sidenav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} currentRoute="/dashboard_mentor/settings" />

      <div className={`pt-24 transition-all duration-300 ${sidebarOpen ? 'lg:ml-20' : 'lg:ml-0'}`}>
        <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-900 mb-8">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Profile</span>
          </h1>

          {loading && (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          )}
          {fetchError && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-6 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0" /> {fetchError}
            </div>
          )}
          {!loading && !fetchError && <ProfileContent />}
        </div>
        <Footer />
      </div>

      <style>{`
        .finput { width: 100%; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 0.625rem; padding: 0.6rem 0.875rem; font-size: 0.9375rem; outline: none; transition: border-color 0.15s, box-shadow 0.15s; color: #1e293b; }
        .finput:focus { border-color: #3B82F6; box-shadow: 0 0 0 3px rgba(59,130,246,0.12); background: #fff; }
      `}</style>
    </div>
  );
}

// Small helper so fields are consistent
function Field({ label, icon, children }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
        {icon} {label}
      </label>
      {children}
    </div>
  );
}