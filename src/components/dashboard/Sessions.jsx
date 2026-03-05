import React, { useState, useEffect, useMemo } from 'react';
import {
  Search, Clock, Calendar, Download, Plus, Loader2,
  ChevronDown, ChevronUp, Video, FileText, CheckCircle2,
  Star, Filter, ArrowUpRight, BookOpen, Zap
} from 'lucide-react';
import Navigation from '../Navigation';
import Sidenav from './Sidenav';
import Footer from '../Footer';
import { getMenteeBookings } from '../../services/bookingService';
import { useAuth } from '../../utils/AuthContext';

// ── Avatar colour helper ───────────────────────────────────────────────────────
const AV_COLORS = [
  'from-blue-400 to-indigo-500',
  'from-emerald-400 to-teal-500',
  'from-violet-400 to-purple-500',
  'from-rose-400 to-pink-500',
  'from-amber-400 to-orange-500',
  'from-cyan-400 to-sky-500',
];
const avColor = (s = 'A') => AV_COLORS[s.charCodeAt(0) % AV_COLORS.length];

// ── Tag colours ────────────────────────────────────────────────────────────────
const TAG_COLORS = {
  Performance:    'bg-yellow-50 text-yellow-700 border-yellow-100',
  Leadership:     'bg-violet-50 text-violet-700 border-violet-100',
  Career:         'bg-indigo-50 text-indigo-700 border-indigo-100',
  Marketing:      'bg-rose-50 text-rose-700 border-rose-100',
  Product:        'bg-blue-50 text-blue-700 border-blue-100',
  Frontend:       'bg-cyan-50 text-cyan-700 border-cyan-100',
  Design:         'bg-pink-50 text-pink-700 border-pink-100',
  Session:        'bg-slate-50 text-slate-600 border-slate-100',
};
const tagColor = t => TAG_COLORS[t] || 'bg-slate-50 text-slate-600 border-slate-100';

// ── Demo/fallback data ────────────────────────────────────────────────────────
const DEMO_UPCOMING = [
  {
    id: 'u1', mentorName: 'Priya Nair', mentorRole: 'Staff Engineer @ Stripe',
    avatar: 'P', plan: 'Pro', date: '2026-03-12', time: '10:00 AM', duration: 60,
    topic: 'System design deep-dive',
  },
  {
    id: 'u2', mentorName: 'Marcus Webb', mentorRole: 'Head of Product @ Monzo',
    avatar: 'M', plan: 'Basic', date: '2026-03-20', time: '3:00 PM', duration: 45,
    topic: 'Product roadmap review',
  },
];

const DEMO_PAST = [
  {
    id: 'p1', mentorName: 'Priya Nair', date: 'March 5, 2026',
    sessionType: 'TypeScript Generics & Advanced Patterns', duration: '60 min',
    tags: ['Frontend', 'Career'],
    sessionNotes: [
      'Covered mapped types, conditional types and template literal types.',
      'Action item: build a form validation library using Zod + TypeScript.',
      'Next session we\'ll review the completed project.',
    ],
    attachments: [{ name: 'TypeScript_Advanced_Notes.pdf' }],
    rating: 5,
  },
  {
    id: 'p2', mentorName: 'Marcus Webb', date: 'February 22, 2026',
    sessionType: 'Public Speaking & Presentation Skills', duration: '45 min',
    tags: ['Leadership', 'Performance'],
    sessionNotes: [
      'Practised the opening hook — avoid starting with "Thank you for having me".',
      'Rule of three: structure every talk around 3 key ideas.',
      'Record yourself speaking and watch it back — highly effective.',
    ],
    attachments: [{ name: 'Presentation_Checklist.pdf' }],
    rating: 4,
  },
  {
    id: 'p3', mentorName: 'Yuki Tanaka', date: 'February 10, 2026',
    sessionType: 'Machine Learning Fundamentals Q&A', duration: '60 min',
    tags: ['Career', 'Product'],
    sessionNotes: [
      'Bias-variance tradeoff — memorise this for interviews.',
      'Walkthrough of gradient descent with a hands-on notebook.',
    ],
    attachments: [],
    rating: 5,
  },
];

// ── Stat Card ──────────────────────────────────────────────────────────────────
const StatCard = ({ icon, label, value, sub, accent }) => (
  <div className={`bg-white rounded-[2rem] p-5 border border-slate-100 shadow-lg shadow-slate-200/20 flex items-start gap-4`}>
    <div className={`p-3 rounded-xl flex-shrink-0 ${accent}`}>{icon}</div>
    <div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-sm font-bold text-slate-700">{label}</p>
      {sub && <p className="text-xs text-slate-400 font-medium mt-0.5">{sub}</p>}
    </div>
  </div>
);

// ── Upcoming Session Card ─────────────────────────────────────────────────────
const UpcomingCard = ({ s }) => {
  const days = Math.ceil((new Date(s.date) - new Date()) / 86400000);
  return (
    <div className="bg-white rounded-[2rem] p-5 border border-slate-100 shadow-lg shadow-slate-200/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${avColor(s.avatar)} text-white font-bold text-base flex items-center justify-center shadow-md flex-shrink-0`}>
          {s.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate-900 text-base">{s.mentorName}</h3>
          <p className="text-xs text-slate-400 font-medium truncate">{s.mentorRole}</p>
          <p className="text-xs text-slate-600 font-medium mt-2 italic">"{s.topic}"</p>
        </div>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-xl flex-shrink-0
          ${days <= 3 ? 'bg-rose-50 text-rose-600 border border-rose-100'
          : days <= 7 ? 'bg-amber-50 text-amber-600 border border-amber-100'
          : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
          {days === 0 ? 'Today' : days === 1 ? 'Tomorrow' : `In ${days}d`}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <span className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded-lg text-xs font-bold">
          <Calendar className="w-3 h-3" />
          {new Date(s.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {s.time}
        </span>
        <span className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 text-slate-600 border border-slate-100 rounded-lg text-xs font-bold">
          <Clock className="w-3 h-3" /> {s.duration}min
        </span>
        <span className="px-2.5 py-1 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-lg text-xs font-bold">
          {s.plan} Plan
        </span>
      </div>

      <div className="flex gap-2 mt-4 pt-4 border-t border-slate-50">
        <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all">
          <Video className="w-3.5 h-3.5" /> Join Call
        </button>
        <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all">
          Reschedule
        </button>
      </div>
    </div>
  );
};

// ── Past Session Card ─────────────────────────────────────────────────────────
const PastCard = ({ s }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/20 overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start gap-4">
          <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${avColor(s.mentorName[0])} text-white font-bold text-sm flex items-center justify-center shadow-md flex-shrink-0`}>
            {s.mentorName[0]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <div>
                <h3 className="font-bold text-slate-900 text-base leading-tight">{s.sessionType}</h3>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  with <span className="text-blue-600 font-bold">{s.mentorName}</span> · {s.date}
                </p>
              </div>
              <div className="flex items-center gap-0.5 flex-shrink-0">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3.5 h-3.5 ${i < s.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />
                ))}
              </div>
            </div>

            {/* Tags + duration */}
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span className="flex items-center gap-1 px-2.5 py-1 bg-slate-50 border border-slate-100 text-slate-500 rounded-lg text-xs font-bold">
                <Clock className="w-3 h-3" /> {s.duration}
              </span>
              {s.tags.map(tag => (
                <span key={tag} className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${tagColor(tag)}`}>{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setOpen(o => !o)}
          className="w-full flex items-center justify-center gap-1.5 mt-4 pt-4 border-t border-slate-50 text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors"
        >
          {open ? 'Hide details' : 'View notes & attachments'}
          {open ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Expanded details */}
      {open && (
        <div className="px-5 pb-5 space-y-5 border-t border-slate-50 pt-4 animate-in slide-in-from-top-2 duration-200">
          {/* Notes */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Session Notes</h4>
            <div className="space-y-2">
              {s.sessionNotes.map((note, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-700 font-medium leading-relaxed">{note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Attachments */}
          {s.attachments.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Attachments</h4>
              <div className="space-y-2">
                {s.attachments.map((a, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-100 rounded-xl hover:bg-blue-100 transition-colors cursor-pointer">
                    <FileText className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span className="text-sm font-bold text-blue-700 flex-1 truncate">{a.name}</span>
                    <Download className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ── Loading skeleton ──────────────────────────────────────────────────────────
const Skeleton = () => (
  <div className="animate-pulse space-y-4">
    {[1, 2].map(i => (
      <div key={i} className="bg-white rounded-[2rem] p-5 border border-slate-100 h-40" />
    ))}
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────
const Sessions = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm]   = useState('');
  const [sortBy, setSortBy]           = useState('recent');
  const [apiLoading, setApiLoading]   = useState(true);

  const [upcoming, setUpcoming]       = useState([]);
  const [past, setPast]               = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    if (!user?.$id) { setApiLoading(false); return; }
    const fetch = async () => {
      try {
        const data = await getMenteeBookings(user.$id);
        const docs = data.documents || [];
        const now  = new Date();

        setUpcoming(docs
          .filter(d => new Date(d.sessionDate) > now && d.status !== 'cancelled')
          .map(d => ({
            id: d.$id,
            mentorName: d.mentorName || 'Your Mentor',
            mentorRole: d.mentorRole || '',
            avatar: (d.mentorName || 'M')[0],
            plan: d.plan || 'Basic',
            date: d.sessionDate,
            time: new Date(d.sessionDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            duration: d.duration || 60,
            topic: d.notes || 'Mentorship session',
          }))
        );

        setPast(docs
          .filter(d => new Date(d.sessionDate) <= now || d.status === 'completed')
          .map(d => ({
            id: d.$id,
            mentorName: d.mentorName || 'Mentor',
            date: new Date(d.sessionDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            sessionType: d.notes || 'Mentorship Session',
            duration: `${d.duration || 60} min`,
            tags: ['Session'],
            sessionNotes: d.notes ? [d.notes] : [],
            attachments: [],
            rating: 5,
          }))
        );
      } catch (err) {
        console.error('[Sessions] fetch error:', err);
      } finally {
        setApiLoading(false);
      }
    };
    fetch();
  }, [user]);

  // Use demo data if no real bookings
  const displayUpcoming = upcoming.length > 0 ? upcoming : (!apiLoading ? DEMO_UPCOMING : []);
  const displayPast     = past.length     > 0 ? past     : (!apiLoading ? DEMO_PAST     : []);

  const filteredPast = useMemo(() => {
    let list = displayPast.filter(s =>
      !searchTerm ||
      s.mentorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.sessionType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.date.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (sortBy === 'recent') list = [...list].reverse();
    return list;
  }, [displayPast, searchTerm, sortBy]);

  const totalMins  = displayPast.length * 55; // approx
  const avgRating  = displayPast.length
    ? (displayPast.reduce((s, p) => s + (p.rating || 5), 0) / displayPast.length).toFixed(1)
    : '—';

  return (
    <div className="min-h-screen bg-[#F8FAFC] relative overflow-x-hidden">
      {/* Background */}
      <div className="fixed top-0 left-0 w-full h-[800px] bg-gradient-to-b from-blue-50/50 via-indigo-50/30 to-transparent pointer-events-none z-0" />
      <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-100/40 blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10">
        <Navigation />
        <Sidenav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} currentRoute="/dashboard/sessions" />

        <button onClick={() => setSidebarOpen(true)}
          className="fixed bottom-6 right-6 z-50 lg:hidden bg-blue-600 text-white p-4 rounded-full shadow-2xl shadow-blue-600/40 hover:scale-105 transition-transform">
          <Filter className="w-6 h-6" />
        </button>

        <div className="pt-32 md:pt-24 px-4 sm:px-6 lg:px-8 lg:pl-28 max-w-[1600px] mx-auto pb-12">

          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 animate-in slide-in-from-bottom-4 duration-500">
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Learning Journey</p>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Sessions</span>
              </h1>
            </div>
          </header>

          {apiLoading ? (
            <Skeleton />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 animate-in slide-in-from-bottom-8 duration-700">

              {/* ── LEFT: Upcoming + Past ─────────────────────────────────── */}
              <div className="lg:col-span-8 space-y-8">

                {/* Upcoming Sessions */}
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="font-bold text-slate-900 text-xl">Upcoming Sessions</h2>
                      <p className="text-xs text-slate-400 font-medium">{displayUpcoming.length} scheduled</p>
                    </div>
                  </div>

                  {displayUpcoming.length === 0 ? (
                    <div className="bg-white rounded-[2.5rem] p-12 flex flex-col items-center text-center border border-dashed border-slate-200">
                      <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-3">
                        <Calendar className="w-7 h-7 text-blue-400" />
                      </div>
                      <h3 className="font-bold text-slate-700 mb-1">No upcoming sessions</h3>
                      <p className="text-slate-400 text-sm font-medium">Book a session with one of your mentors to get started.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {displayUpcoming.map(s => <UpcomingCard key={s.id} s={s} />)}
                    </div>
                  )}
                </section>

                {/* Past Sessions */}
                <section>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-50 rounded-xl text-slate-600">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="font-bold text-slate-900 text-xl">Past Sessions</h2>
                        <p className="text-xs text-slate-400 font-medium">{displayPast.length} completed</p>
                      </div>
                    </div>

                    {/* Search + Sort */}
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Search sessions…"
                          value={searchTerm}
                          onChange={e => setSearchTerm(e.target.value)}
                          className="pl-8 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 w-44"
                        />
                      </div>
                      <select
                        value={sortBy}
                        onChange={e => setSortBy(e.target.value)}
                        className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="recent">Recent first</option>
                        <option value="oldest">Oldest first</option>
                      </select>
                    </div>
                  </div>

                  {filteredPast.length === 0 ? (
                    <div className="bg-white rounded-[2.5rem] p-10 text-center border border-dashed border-slate-200">
                      <p className="text-slate-400 text-sm font-medium">No sessions match your search.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredPast.map(s => <PastCard key={s.id} s={s} />)}
                    </div>
                  )}
                </section>
              </div>

              {/* ── RIGHT: Stats Sidebar ──────────────────────────────────── */}
              <div className="lg:col-span-4 space-y-5 animate-in slide-in-from-bottom-8 duration-700 delay-200">

                {/* Summary stats */}
                <div className="grid grid-cols-2 gap-4">
                  <StatCard
                    icon={<CheckCircle2 className="w-5 h-5" />}
                    label="Completed" value={displayPast.length}
                    sub="Total sessions"
                    accent="bg-emerald-50 text-emerald-600"
                  />
                  <StatCard
                    icon={<Calendar className="w-5 h-5" />}
                    label="Upcoming" value={displayUpcoming.length}
                    sub="Scheduled"
                    accent="bg-blue-50 text-blue-600"
                  />
                  <StatCard
                    icon={<Clock className="w-5 h-5" />}
                    label="Hours Learnt" value={`${Math.round(totalMins / 60)}h`}
                    sub="Total time"
                    accent="bg-violet-50 text-violet-600"
                  />
                  <StatCard
                    icon={<Star className="w-5 h-5" />}
                    label="Avg Rating" value={avgRating}
                    sub="Out of 5"
                    accent="bg-amber-50 text-amber-600"
                  />
                </div>

                {/* Hero payout-style dark card */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2.5rem] p-6 text-white shadow-2xl shadow-slate-900/30 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-8 -mt-8" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2.5 mb-4">
                      <div className="p-2 bg-white/10 rounded-xl"><Zap className="w-4 h-4" /></div>
                      <span className="text-slate-400 text-sm font-bold">Learning Streak</span>
                    </div>
                    <p className="text-4xl font-bold mb-1">12 days</p>
                    <p className="text-slate-400 text-xs font-medium mb-5">Keep it going — you're on fire! 🔥</p>
                    <div className="flex gap-1">
                      {[...Array(7)].map((_, i) => (
                        <div key={i} className={`flex-1 h-2 rounded-full ${i < 5 ? 'bg-blue-500' : 'bg-white/10'}`} />
                      ))}
                    </div>
                    <p className="text-slate-500 text-xs font-medium mt-2">5 / 7 days this week</p>
                  </div>
                </div>

                {/* Recent notes preview */}
                <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-lg shadow-slate-200/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600">
                      <FileText className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg">Recent Notes</h3>
                  </div>
                  <div className="space-y-3">
                    {displayPast.slice(0, 3).flatMap(s => s.sessionNotes.slice(0, 1)).map((note, i) => (
                      <div key={i} className="flex items-start gap-2.5 p-3 bg-slate-50 rounded-2xl">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                        <p className="text-xs font-medium text-slate-600 leading-relaxed line-clamp-2">{note}</p>
                      </div>
                    ))}
                    {displayPast.length === 0 && (
                      <p className="text-slate-400 text-sm text-center py-4">No notes yet</p>
                    )}
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-blue-600 rounded-[2.5rem] p-6 text-white shadow-xl shadow-blue-600/30 relative overflow-hidden">
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
                  <div className="relative z-10">
                    <ArrowUpRight className="w-6 h-6 text-blue-200 mb-3" />
                    <h3 className="font-bold text-lg mb-1">Book Your Next Session</h3>
                    <p className="text-blue-200 text-sm font-medium mb-4">Explore available mentors and schedule your next growth call.</p>
                    <a href="/listing" className="block w-full py-3 bg-white text-blue-600 rounded-xl font-bold text-sm text-center hover:bg-blue-50 transition-colors">
                      Browse Mentors →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Sessions;