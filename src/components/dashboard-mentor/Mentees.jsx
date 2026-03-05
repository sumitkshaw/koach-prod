import React, { useState, useEffect, useMemo } from 'react';
import {
  Search, Filter, Loader2, Users, TrendingUp,
  CheckCircle2, Clock, Star, Calendar, ChevronRight,
  UserCircle, BookOpen, MessageCircle
} from 'lucide-react';
import Navigation from '../Navigation';
import Sidenav from './Sidenav';
import Footer from '../Footer';
import { getMentorBookings } from '../../services/bookingService';
import { useAuth } from '../../utils/AuthContext';

// ── Status helpers ────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  confirmed:  { label: 'Active',    bg: 'bg-blue-50',    text: 'text-blue-700',    border: 'border-blue-100'    },
  Scheduled:  { label: 'Active',    bg: 'bg-blue-50',    text: 'text-blue-700',    border: 'border-blue-100'    },
  completed:  { label: 'Completed', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100' },
  Completed:  { label: 'Completed', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100' },
  pending:    { label: 'Pending',   bg: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-100'   },
  Pending:    { label: 'Pending',   bg: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-100'   },
  cancelled:  { label: 'Cancelled', bg: 'bg-rose-50',    text: 'text-rose-700',    border: 'border-rose-100'    },
};

const getStatusCfg = s => STATUS_CONFIG[s] || { label: s || 'Unknown', bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-100' };

// ── Mentee Card ───────────────────────────────────────────────────────────────
const MenteeCard = ({ mentee }) => {
  const cfg = getStatusCfg(mentee.status);
  const initials = (mentee.name || 'M').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const avatarColors = [
    'from-blue-400 to-indigo-500',
    'from-emerald-400 to-teal-500',
    'from-violet-400 to-purple-500',
    'from-rose-400 to-pink-500',
    'from-amber-400 to-orange-500',
    'from-cyan-400 to-sky-500',
  ];
  const colorIndex = (mentee.name || '').charCodeAt(0) % avatarColors.length;

  return (
    <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-lg shadow-slate-200/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col gap-4">

      {/* Top row — avatar + info + status */}
      <div className="flex items-start gap-4">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${avatarColors[colorIndex]} flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0`}>
          {mentee.avatarUrl
            ? <img src={mentee.avatarUrl} alt={mentee.name} className="w-full h-full object-cover rounded-2xl" />
            : initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-bold text-slate-900 text-base truncate">{mentee.name || 'Mentee'}</h3>
              {mentee.email && <p className="text-xs text-slate-400 font-medium truncate">{mentee.email}</p>}
            </div>
            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border flex-shrink-0 ${cfg.bg} ${cfg.text} ${cfg.border}`}>
              {cfg.label}
            </span>
          </div>
        </div>
      </div>

      {/* Plan & Session info */}
      <div className="grid grid-cols-2 gap-3">
        {mentee.plan && (
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 flex flex-col gap-0.5">
            <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">Plan</span>
            <span className="text-sm font-bold text-indigo-700">{mentee.plan}</span>
          </div>
        )}
        {mentee.sessionDate && (
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col gap-0.5">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Session
            </span>
            <span className="text-xs font-bold text-slate-700">
              {new Date(mentee.sessionDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
        )}
        {mentee.price && (
          <div className={`bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex flex-col gap-0.5 ${!mentee.plan ? 'col-span-2' : ''}`}>
            <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Revenue</span>
            <span className="text-sm font-bold text-emerald-700">${mentee.price}</span>
          </div>
        )}
      </div>

      {/* Notes */}
      {mentee.notes && (
        <p className="text-xs text-slate-500 font-medium leading-relaxed border-t border-slate-50 pt-3 line-clamp-2">
          {mentee.notes}
        </p>
      )}

      {/* Footer */}
      <div className="flex gap-2 mt-auto pt-2 border-t border-slate-50">
        <button className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-200 flex items-center justify-center gap-1.5">
          <MessageCircle className="w-3.5 h-3.5" /> Message
        </button>
        <button className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-all duration-200 flex items-center justify-center gap-1.5">
          <UserCircle className="w-3.5 h-3.5" /> Profile
        </button>
      </div>
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
const Mentees = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [mentees, setMentees] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // ── Fetch bookings for this mentor ─────────────────────────────────────
  useEffect(() => {
    if (!user?.$id) { setLoading(false); return; }
    const fetch = async () => {
      try {
        const data = await getMentorBookings(user.$id);
        const docs = data.documents || [];
        setMentees(docs.map(d => ({
          id: d._id || d.$id,
          name: d.menteeName || 'Mentee',
          email: d.menteeEmail || '',
          avatarUrl: d.menteeAvatarUrl || null,
          sessionDate: d.sessionDate,
          status: d.status || 'pending',
          plan: d.plan || null,
          price: d.price || null,
          notes: d.notes || '',
        })));
      } catch (err) {
        console.error('[Mentees] fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [user]);

  // ── Demo fallback (shown when API returns 0 bookings) ──────────────────
  const DEMO = [
    { id: 'd1', name: 'Alex Rivera',    email: 'alex@email.com',    status: 'confirmed', sessionDate: '2026-03-10T10:00:00Z', plan: 'Basic',  price: 299,  notes: 'Wants help with career transition into product design.' },
    { id: 'd2', name: 'Priya Sharma',   email: 'priya@email.com',   status: 'completed', sessionDate: '2026-02-20T14:00:00Z', plan: 'Pro',    price: 599,  notes: 'Improving portfolio and interview readiness.' },
    { id: 'd3', name: 'James Okonkwo',  email: 'james@email.com',   status: 'pending',   sessionDate: '2026-03-20T09:00:00Z', plan: 'Basic',  price: 299,  notes: 'Learning React and modern frontend patterns.' },
    { id: 'd4', name: 'Sofia Martini',  email: 'sofia@email.com',   status: 'confirmed', sessionDate: '2026-03-15T11:00:00Z', plan: 'Pro',    price: 599,  notes: 'Preparing for senior UX role interviews.' },
    { id: 'd5', name: 'Kenji Tanaka',   email: 'kenji@email.com',   status: 'completed', sessionDate: '2026-02-10T16:00:00Z', plan: 'Basic',  price: 299,  notes: 'Transitioning from engineering to design.' },
    { id: 'd6', name: 'Amara Diallo',   email: 'amara@email.com',   status: 'confirmed', sessionDate: '2026-03-25T13:00:00Z', plan: 'Pro',    price: 599,  notes: 'Building a personal brand as a design leader.' },
  ];

  const displayMentees = mentees.length > 0 ? mentees : (!loading ? DEMO : []);

  // ── Filter logic ────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let list = displayMentees;
    if (statusFilter !== 'All') {
      list = list.filter(m => {
        const cfg = getStatusCfg(m.status);
        return cfg.label === statusFilter;
      });
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(m =>
        m.name.toLowerCase().includes(q) ||
        (m.email || '').toLowerCase().includes(q) ||
        (m.plan || '').toLowerCase().includes(q)
      );
    }
    return list;
  }, [displayMentees, statusFilter, searchQuery]);

  // ── Stats ───────────────────────────────────────────────────────────────
  const totalMentees = displayMentees.length;
  const activeMentees = displayMentees.filter(m => m.status === 'confirmed' || m.status === 'Scheduled').length;
  const completedMentees = displayMentees.filter(m => m.status === 'completed' || m.status === 'Completed').length;
  const totalRevenue = displayMentees.reduce((sum, m) => sum + (Number(m.price) || 0), 0);

  const STATUS_FILTERS = ['All', 'Active', 'Completed', 'Pending'];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-dm relative overflow-x-hidden">
      {/* Background Atmosphere — matches /dashboard/mentors */}
      <div className="fixed top-0 left-0 w-full h-[800px] bg-gradient-to-b from-blue-50/50 via-indigo-50/30 to-transparent pointer-events-none z-0" />
      <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-100/40 blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10">
        <Navigation />
        <Sidenav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} currentRoute="/dashboard_mentor/mentees" />

        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed bottom-6 right-6 z-50 lg:hidden bg-blue-600 text-white p-4 rounded-full shadow-2xl shadow-blue-600/40 hover:scale-105 transition-transform"
        >
          <Filter className="w-6 h-6" />
        </button>

        <div className="pt-32 md:pt-24 px-4 sm:px-6 lg:px-8 transition-all duration-300 lg:pl-28 max-w-[1600px] mx-auto">

          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4 md:mb-8 animate-in slide-in-from-bottom-4 duration-500">
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">My Students</p>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Mentees</span>
              </h1>
            </div>
            <div className="w-full md:w-96 relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="block w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 shadow-sm transition-all hover:bg-slate-50"
                placeholder="Search by name, plan…"
              />
            </div>
          </header>

          {/* Filter Pills */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
            {STATUS_FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-200
                  ${statusFilter === f
                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                    : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50 hover:text-slate-700'
                  }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pb-12">

            {/* ── LEFT COLUMN — Mentee Cards ── */}
            <div className="lg:col-span-8 animate-in slide-in-from-bottom-8 duration-700 delay-100">

              {loading ? (
                <div className="bg-white rounded-[2.5rem] p-16 flex flex-col items-center justify-center border border-slate-100 shadow-sm gap-4">
                  <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                  <p className="text-slate-400 font-medium text-sm">Loading your mentees…</p>
                </div>
              ) : filtered.length === 0 ? (
                <div className="bg-white rounded-[2.5rem] p-16 flex flex-col items-center justify-center border border-dashed border-slate-200 text-center">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                    <Users className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-700 mb-1">
                    {searchQuery || statusFilter !== 'All' ? 'No mentees match your filters' : 'No mentees registered yet'}
                  </h3>
                  <p className="text-slate-400 text-sm font-medium">
                    {searchQuery || statusFilter !== 'All' ? 'Try adjusting your search or filter' : 'Your mentees will appear here once they book a session with you.'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filtered.map((mentee, i) => (
                    <MenteeCard key={mentee.id || i} mentee={mentee} />
                  ))}
                </div>
              )}
            </div>

            {/* ── RIGHT SIDEBAR ── */}
            <div className="lg:col-span-4 space-y-6 animate-in slide-in-from-bottom-8 duration-700 delay-200">

              {/* Stats Card */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-6 text-white shadow-2xl shadow-blue-900/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
                <div className="relative z-10">
                  <p className="text-blue-200 font-bold uppercase tracking-widest text-xs mb-4">Overview</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                      <p className="text-3xl font-bold">{totalMentees}</p>
                      <p className="text-blue-200 text-xs font-bold mt-1">Total Mentees</p>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                      <p className="text-3xl font-bold">{activeMentees}</p>
                      <p className="text-blue-200 text-xs font-bold mt-1">Active</p>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                      <p className="text-3xl font-bold">{completedMentees}</p>
                      <p className="text-blue-200 text-xs font-bold mt-1">Completed</p>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                      <p className="text-3xl font-bold">${totalRevenue.toLocaleString()}</p>
                      <p className="text-blue-200 text-xs font-bold mt-1">Revenue</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-lg shadow-slate-200/20">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">Recent Activity</h3>
                </div>

                <div className="space-y-3">
                  {loading ? (
                    <div className="flex justify-center py-4"><Loader2 className="w-5 h-5 text-blue-400 animate-spin" /></div>
                  ) : displayMentees.length === 0 ? (
                    <p className="text-slate-400 text-sm text-center py-4 font-medium">No recent activity.</p>
                  ) : displayMentees.slice(0, 4).map((m, i) => {
                    const cfg = getStatusCfg(m.status);
                    return (
                      <div key={i} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center text-blue-700 font-bold text-sm shrink-0">
                          {(m.name || 'M')[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-slate-900 text-sm truncate">{m.name}</p>
                          <p className="text-[11px] text-slate-400">
                            {m.sessionDate ? new Date(m.sessionDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—'}
                          </p>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${cfg.bg} ${cfg.text}`}>
                          {cfg.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Session Breakdown */}
              <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-lg shadow-slate-200/20">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">Plan Breakdown</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'Basic Plan',  count: displayMentees.filter(m => m.plan === 'Basic').length,  color: 'bg-blue-500' },
                    { label: 'Pro Plan',    count: displayMentees.filter(m => m.plan === 'Pro').length,    color: 'bg-indigo-500' },
                    { label: 'No Plan',     count: displayMentees.filter(m => !m.plan).length,             color: 'bg-slate-300' },
                  ].map(({ label, count, color }) => (
                    <div key={label} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${color} flex-shrink-0`} />
                      <span className="text-sm text-slate-600 font-medium flex-1">{label}</span>
                      <span className="text-sm font-bold text-slate-900">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Mentees;