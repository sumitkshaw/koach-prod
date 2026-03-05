import React, { useState, useMemo } from 'react';
import {
  ChevronLeft, ChevronRight, Filter, Calendar,
  Clock, Video, CheckCircle2, XCircle, AlertCircle,
  Plus, Users, ArrowRight, Loader2
} from 'lucide-react';
import Navigation from '../Navigation';
import Sidenav from './Sidenav';
import Footer from '../Footer';

// ─── Demo sessions data ────────────────────────────────────────────────────────
// Keyed by "YYYY-MM-DD"
const SESSIONS = {
  '2026-03-10': [
    { id: 1, mentee: 'Alex Rivera',   time: '10:00 AM', duration: 60, plan: 'Pro',   type: 'Video Call',        status: 'confirmed', topic: 'Portfolio review & career roadmap', avatar: 'A' },
    { id: 2, mentee: 'Priya Sharma',  time: '3:00 PM',  duration: 45, plan: 'Basic', type: 'Video Call',        status: 'confirmed', topic: 'Resume feedback session',          avatar: 'P' },
  ],
  '2026-03-13': [
    { id: 3, mentee: 'James Okonkwo', time: '11:00 AM', duration: 60, plan: 'Basic', type: 'Video Call',        status: 'pending',   topic: 'React fundamentals deep dive',    avatar: 'J' },
  ],
  '2026-03-15': [
    { id: 4, mentee: 'Sofia Martini', time: '2:00 PM',  duration: 60, plan: 'Pro',   type: 'Video Call',        status: 'confirmed', topic: 'Mock interview prep (UX role)',    avatar: 'S' },
    { id: 5, mentee: 'Kenji Tanaka',  time: '4:30 PM',  duration: 30, plan: 'Basic', type: 'Quick Check-in',    status: 'confirmed', topic: 'Progress check',                  avatar: 'K' },
  ],
  '2026-03-20': [
    { id: 6, mentee: 'Amara Diallo',  time: '10:00 AM', duration: 60, plan: 'Pro',   type: 'Video Call',        status: 'confirmed', topic: 'Brand strategy & storytelling',    avatar: 'A' },
  ],
  '2026-03-25': [
    { id: 7, mentee: 'Lena Fischer',  time: '1:00 PM',  duration: 60, plan: 'Pro',   type: 'Video Call',        status: 'confirmed', topic: 'Design systems workshop',         avatar: 'L' },
    { id: 8, mentee: 'Omar Al-Farsi', time: '5:00 PM',  duration: 45, plan: 'Basic', type: 'Q&A',               status: 'pending',   topic: 'Career pivot questions',          avatar: 'O' },
  ],
  '2026-03-28': [
    { id: 9, mentee: 'Alex Rivera',   time: '10:00 AM', duration: 60, plan: 'Pro',   type: 'Video Call',        status: 'confirmed', topic: 'Month 2 goals review',            avatar: 'A' },
  ],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const AVATAR_COLORS = [
  'from-blue-400 to-indigo-500',
  'from-emerald-400 to-teal-500',
  'from-violet-400 to-purple-500',
  'from-rose-400 to-pink-500',
  'from-amber-400 to-orange-500',
  'from-cyan-400 to-sky-500',
];
const avatarColor = (ch) => AVATAR_COLORS[ch.charCodeAt(0) % AVATAR_COLORS.length];

const STATUS_CFG = {
  confirmed: { label: 'Confirmed', bg: 'bg-emerald-50',  text: 'text-emerald-700', border: 'border-emerald-100', icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
  pending:   { label: 'Pending',   bg: 'bg-amber-50',    text: 'text-amber-700',   border: 'border-amber-100',   icon: <AlertCircle  className="w-3.5 h-3.5" /> },
  cancelled: { label: 'Cancelled', bg: 'bg-rose-50',     text: 'text-rose-700',    border: 'border-rose-100',    icon: <XCircle      className="w-3.5 h-3.5" /> },
};

const pad = (n) => String(n).padStart(2, '0');
const toKey = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAY_NAMES   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

// ─── Session Card ─────────────────────────────────────────────────────────────
const SessionCard = ({ s }) => {
  const cfg = STATUS_CFG[s.status] || STATUS_CFG.pending;
  return (
    <div className="bg-white rounded-[2rem] p-5 border border-slate-100 shadow-lg shadow-slate-200/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${avatarColor(s.avatar)} flex items-center justify-center text-white font-bold text-base shadow-md flex-shrink-0`}>
          {s.avatar}
        </div>

        <div className="flex-1 min-w-0">
          {/* Name + Status */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="min-w-0">
              <h3 className="font-bold text-slate-900 text-base truncate">{s.mentee}</h3>
              <p className="text-xs text-slate-400 font-medium truncate">{s.topic}</p>
            </div>
            <span className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold border flex-shrink-0 ${cfg.bg} ${cfg.text} ${cfg.border}`}>
              {cfg.icon} {cfg.label}
            </span>
          </div>

          {/* Meta pills */}
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded-lg text-xs font-bold">
              <Clock className="w-3 h-3" /> {s.time} · {s.duration}min
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 text-slate-600 border border-slate-100 rounded-lg text-xs font-bold">
              <Video className="w-3 h-3" /> {s.type}
            </span>
            <span className="px-2.5 py-1 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-lg text-xs font-bold">
              {s.plan} Plan
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
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

// ─── Main Component ───────────────────────────────────────────────────────────
const Calen = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Calendar state — start on March 2026
  const today = new Date(2026, 2, 5); // treat today as 5-Mar-2026 for demo
  const [viewYear,  setViewYear]  = useState(2026);
  const [viewMonth, setViewMonth] = useState(2); // 0-indexed = March
  const [selectedKey, setSelectedKey] = useState(toKey(2026, 2, 10)); // pre-select a date with sessions

  // Navigate months
  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else                 { setViewMonth(m => m - 1); }
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else                  { setViewMonth(m => m + 1); }
  };

  // Build calendar grid
  const calDays = useMemo(() => {
    const firstDow = new Date(viewYear, viewMonth, 1).getDay();
    const daysInM  = new Date(viewYear, viewMonth + 1, 0).getDate();
    const daysInP  = new Date(viewYear, viewMonth, 0).getDate();
    const cells = [];

    // Trailing prev-month
    for (let i = firstDow - 1; i >= 0; i--)
      cells.push({ day: daysInP - i, cur: false, key: null });

    // Current month
    for (let d = 1; d <= daysInM; d++) {
      const key = toKey(viewYear, viewMonth, d);
      cells.push({
        day: d,
        cur: true,
        key,
        isToday: viewYear === today.getFullYear() && viewMonth === today.getMonth() && d === today.getDate(),
        hasSession: !!SESSIONS[key],
      });
    }

    // Leading next-month
    const rem = 42 - cells.length;
    for (let d = 1; d <= rem; d++)
      cells.push({ day: d, cur: false, key: null });

    return cells;
  }, [viewYear, viewMonth]);

  const selectedSessions = SESSIONS[selectedKey] || [];

  // Sidebar stats
  const allSessions   = Object.values(SESSIONS).flat();
  const totalThisMonth= allSessions.length;
  const confirmed     = allSessions.filter(s => s.status === 'confirmed').length;
  const pending       = allSessions.filter(s => s.status === 'pending').length;

  // Today's sessions
  const todayKey = toKey(today.getFullYear(), today.getMonth(), today.getDate());
  const todaySessions = SESSIONS[todayKey] || [];

  // Parse selected date for display
  const [sy, sm, sd] = selectedKey ? selectedKey.split('-').map(Number) : [0,0,0];
  const selDateLabel = selectedKey
    ? `${MONTH_NAMES[sm - 1]} ${sd}, ${sy}`
    : 'Select a date';

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-dm relative overflow-x-hidden">
      {/* Background Atmosphere */}
      <div className="fixed top-0 left-0 w-full h-[800px] bg-gradient-to-b from-blue-50/50 via-indigo-50/30 to-transparent pointer-events-none z-0" />
      <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-100/40 blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10">
        <Navigation />
        <Sidenav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} currentRoute="/dashboard_mentor/calendar" />

        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed bottom-6 right-6 z-50 lg:hidden bg-blue-600 text-white p-4 rounded-full shadow-2xl shadow-blue-600/40 hover:scale-105 transition-transform"
        >
          <Filter className="w-6 h-6" />
        </button>

        <div className="pt-32 md:pt-24 px-4 sm:px-6 lg:px-8 transition-all duration-300 lg:pl-28 max-w-[1600px] mx-auto pb-12">

          {/* ── Header ──────────────────────────────────────────────────── */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 animate-in slide-in-from-bottom-4 duration-500">
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Schedule</p>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Calendar</span>
              </h1>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-blue-600 transition-all shadow-lg self-start md:self-auto">
              <Plus className="w-4 h-4" /> New Session
            </button>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

            {/* ── LEFT: Calendar + Mini Stats ──────────────────────────── */}
            <div className="lg:col-span-4 space-y-6 animate-in slide-in-from-bottom-8 duration-700 delay-100">

              {/* Calendar Widget */}
              <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-lg shadow-slate-200/20">
                {/* Month nav */}
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-bold text-slate-900 text-lg">
                    {MONTH_NAMES[viewMonth]} {viewYear}
                  </h2>
                  <div className="flex gap-1">
                    <button onClick={prevMonth} className="w-8 h-8 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-center transition-colors">
                      <ChevronLeft className="w-4 h-4 text-slate-600" />
                    </button>
                    <button onClick={nextMonth} className="w-8 h-8 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-center transition-colors">
                      <ChevronRight className="w-4 h-4 text-slate-600" />
                    </button>
                  </div>
                </div>

                {/* Day name headers */}
                <div className="grid grid-cols-7 mb-2">
                  {DAY_NAMES.map(d => (
                    <div key={d} className="text-center text-[11px] font-bold text-slate-400 py-1">{d[0]}</div>
                  ))}
                </div>

                {/* Day cells */}
                <div className="grid grid-cols-7 gap-0.5">
                  {calDays.map((cell, i) => {
                    const isSelected = cell.key === selectedKey;
                    return (
                      <button
                        key={i}
                        disabled={!cell.cur}
                        onClick={() => cell.key && setSelectedKey(cell.key)}
                        className={`relative h-9 w-full rounded-xl text-xs font-bold transition-all duration-150
                          ${!cell.cur
                            ? 'text-slate-300 cursor-default'
                            : isSelected
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                            : cell.isToday
                            ? 'bg-slate-900 text-white'
                            : cell.hasSession
                            ? 'bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-100'
                            : 'text-slate-700 hover:bg-slate-50'
                          }`}
                      >
                        {cell.day}
                        {cell.hasSession && !isSelected && (
                          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-4 text-xs font-medium text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" /> Has sessions
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-900 inline-block" /> Today
                  </span>
                </div>
              </div>

              {/* This Month Stats */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-6 text-white shadow-xl shadow-blue-900/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-8 -mt-8" />
                <div className="relative z-10">
                  <p className="text-blue-200 font-bold uppercase tracking-widest text-xs mb-4">March Overview</p>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm text-center">
                      <p className="text-2xl font-bold">{totalThisMonth}</p>
                      <p className="text-blue-200 text-[11px] font-bold mt-0.5">Total</p>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm text-center">
                      <p className="text-2xl font-bold">{confirmed}</p>
                      <p className="text-blue-200 text-[11px] font-bold mt-0.5">Confirmed</p>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm text-center">
                      <p className="text-2xl font-bold">{pending}</p>
                      <p className="text-blue-200 text-[11px] font-bold mt-0.5">Pending</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Today's Sessions */}
              <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-lg shadow-slate-200/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Today's Sessions</h3>
                    <p className="text-xs text-slate-400 font-medium">
                      {MONTH_NAMES[today.getMonth()]} {today.getDate()}, {today.getFullYear()}
                    </p>
                  </div>
                </div>

                {todaySessions.length === 0 ? (
                  <div className="py-6 text-center">
                    <p className="text-slate-400 text-sm font-medium">No sessions today.</p>
                    <p className="text-slate-300 text-xs mt-1">Enjoy your free time! ☀️</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {todaySessions.map((s) => {
                      const cfg = STATUS_CFG[s.status] || STATUS_CFG.pending;
                      return (
                        <div key={s.id} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-colors">
                          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${avatarColor(s.avatar)} text-white font-bold text-sm flex items-center justify-center flex-shrink-0`}>
                            {s.avatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-slate-900 text-sm truncate">{s.mentee}</p>
                            <p className="text-[11px] text-slate-400 font-medium">{s.time} · {s.duration}min</p>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${cfg.bg} ${cfg.text}`}>
                            {cfg.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Upcoming Mentees Quick List */}
              <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-lg shadow-slate-200/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-slate-50 rounded-xl text-slate-600">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">Active Mentees</h3>
                </div>
                <div className="space-y-2.5">
                  {['Alex Rivera', 'Priya Sharma', 'James Okonkwo', 'Sofia Martini', 'Kenji Tanaka'].map((name, i) => {
                    const av = name[0];
                    return (
                      <div key={i} className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${avatarColor(av)} text-white font-bold text-xs flex items-center justify-center flex-shrink-0`}>
                          {av}
                        </div>
                        <span className="text-sm font-bold text-slate-700 flex-1">{name}</span>
                        <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ── RIGHT: Session List for Selected Day ─────────────────── */}
            <div className="lg:col-span-8 animate-in slide-in-from-bottom-8 duration-700 delay-200">

              {/* Day Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{selDateLabel}</h2>
                  <p className="text-sm text-slate-400 font-medium mt-0.5">
                    {selectedSessions.length === 0
                      ? 'No sessions scheduled'
                      : `${selectedSessions.length} session${selectedSessions.length > 1 ? 's' : ''} scheduled`}
                  </p>
                </div>
                {selectedSessions.length > 0 && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 text-blue-600 rounded-2xl text-xs font-bold">
                    <Clock className="w-3.5 h-3.5" />
                    {selectedSessions.reduce((s, x) => s + x.duration, 0)} min total
                  </div>
                )}
              </div>

              {selectedSessions.length === 0 ? (
                <div className="bg-white rounded-[2.5rem] p-16 flex flex-col items-center justify-center border border-dashed border-slate-200 text-center">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                    <Calendar className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-700 mb-2">No sessions on this day</h3>
                  <p className="text-slate-400 text-sm font-medium mb-6 max-w-xs">
                    Select a highlighted date on the calendar to view scheduled sessions, or add a new one.
                  </p>
                  <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-blue-600 transition-all">
                    <Plus className="w-4 h-4" /> Schedule Session
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedSessions.map((session) => (
                    <SessionCard key={session.id} s={session} />
                  ))}

                  {/* Add session card */}
                  <button className="w-full bg-white rounded-[2rem] p-5 border border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-200 flex items-center justify-center gap-3 text-slate-400 hover:text-blue-600 group">
                    <div className="w-10 h-10 rounded-2xl border-2 border-dashed border-slate-300 group-hover:border-blue-400 flex items-center justify-center transition-colors">
                      <Plus className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold">Add another session on this day</span>
                  </button>
                </div>
              )}

              {/* Weekly Overview Strip */}
              <div className="mt-8 bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-lg shadow-slate-200/20">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg">Upcoming This Month</h3>
                  </div>
                </div>
                <div className="space-y-2">
                  {Object.entries(SESSIONS)
                    .sort(([a], [b]) => new Date(a) - new Date(b))
                    .map(([dateKey, sessions]) => {
                      const [dy, dm, dd] = dateKey.split('-').map(Number);
                      const isSelected = dateKey === selectedKey;
                      return (
                        <button
                          key={dateKey}
                          onClick={() => setSelectedKey(dateKey)}
                          className={`w-full flex items-center gap-4 p-3.5 rounded-2xl transition-all text-left
                            ${isSelected ? 'bg-blue-50 border border-blue-100' : 'hover:bg-slate-50'}`}
                        >
                          {/* Date badge */}
                          <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0 ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                            <span className="text-[10px] font-bold uppercase tracking-wide opacity-70">
                              {MONTH_NAMES[dm - 1].slice(0, 3)}
                            </span>
                            <span className="text-lg font-bold leading-none">{dd}</span>
                          </div>

                          {/* Session summary */}
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-slate-900 text-sm">
                              {sessions.length} session{sessions.length > 1 ? 's' : ''} scheduled
                            </p>
                            <p className="text-xs text-slate-400 font-medium truncate">
                              {sessions.map(s => s.mentee).join(', ')}
                            </p>
                          </div>

                          {/* Duration */}
                          <div className="text-right flex-shrink-0">
                            <p className="text-xs font-bold text-slate-600">{sessions.reduce((s, x) => s + x.duration, 0)}min</p>
                            <p className="text-[11px] text-slate-400">total</p>
                          </div>

                          <ArrowRight className={`w-4 h-4 flex-shrink-0 transition-colors ${isSelected ? 'text-blue-500' : 'text-slate-300'}`} />
                        </button>
                      );
                    })}
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

export default Calen;