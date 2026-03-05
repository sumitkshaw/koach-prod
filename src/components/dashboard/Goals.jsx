import React, { useState } from 'react';
import {
  Plus, Target, Trophy, Flame, CheckCircle2,
  Circle, Clock, Filter, ChevronRight, Star,
  BookOpen, Code2, Megaphone, Users, Lightbulb, Award
} from 'lucide-react';
import Navigation from '../Navigation';
import Sidenav from './Sidenav';
import Footer from '../Footer';

// ── Domain → Icon map ─────────────────────────────────────────────────────────
const DOMAIN_ICONS = {
  'Frontend Dev':       <Code2 className="w-4 h-4" />,
  'Leadership':         <Users className="w-4 h-4" />,
  'Public Speaking':    <Megaphone className="w-4 h-4" />,
  'System Design':      <Lightbulb className="w-4 h-4" />,
  'Product Management': <Star className="w-4 h-4" />,
  'UX Design':          <BookOpen className="w-4 h-4" />,
};

const DOMAIN_COLORS = {
  'Frontend Dev':       { bg: 'bg-blue-50',    text: 'text-blue-700',    border: 'border-blue-100',    bar: 'bg-blue-500',    icon: 'bg-blue-100 text-blue-600' },
  'Leadership':         { bg: 'bg-violet-50',  text: 'text-violet-700',  border: 'border-violet-100',  bar: 'bg-violet-500',  icon: 'bg-violet-100 text-violet-600' },
  'Public Speaking':    { bg: 'bg-rose-50',    text: 'text-rose-700',    border: 'border-rose-100',    bar: 'bg-rose-500',    icon: 'bg-rose-100 text-rose-600' },
  'System Design':      { bg: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-100',   bar: 'bg-amber-500',   icon: 'bg-amber-100 text-amber-600' },
  'Product Management': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100', bar: 'bg-emerald-500', icon: 'bg-emerald-100 text-emerald-600' },
  'UX Design':          { bg: 'bg-indigo-50',  text: 'text-indigo-700',  border: 'border-indigo-100',  bar: 'bg-indigo-500',  icon: 'bg-indigo-100 text-indigo-600' },
};

// ── Initial goals data ────────────────────────────────────────────────────────
const INITIAL_GOALS = [
  {
    id: 1, title: 'Master React & TypeScript', domain: 'Frontend Dev', progress: 62,
    dueDate: '2026-04-30', priority: 'high',
    tasks: [
      { id: 1, text: 'Complete TypeScript generics module', done: true,  due: 'Mar 5' },
      { id: 2, text: 'Build a custom hook library',         done: true,  due: 'Mar 12' },
      { id: 3, text: 'Write unit tests with Vitest',        done: false, due: 'Mar 20' },
      { id: 4, text: 'Deploy a full-stack React app',       done: false, due: 'Apr 1' },
    ]
  },
  {
    id: 2, title: 'Improve Public Speaking', domain: 'Public Speaking', progress: 35,
    dueDate: '2026-05-15', priority: 'medium',
    tasks: [
      { id: 5, text: 'Watch TED Talks analysis course',          done: true,  due: 'Feb 28' },
      { id: 6, text: 'Record 3 practice presentations',         done: false, due: 'Mar 25' },
      { id: 7, text: 'Present at local dev meetup',             done: false, due: 'Apr 10' },
    ]
  },
  {
    id: 3, title: 'System Design Fundamentals', domain: 'System Design', progress: 80,
    dueDate: '2026-03-31', priority: 'high',
    tasks: [
      { id: 8,  text: 'Study CAP theorem & distributed systems', done: true,  due: 'Feb 15' },
      { id: 9,  text: 'Design a URL shortener end-to-end',       done: true,  due: 'Feb 22' },
      { id: 10, text: 'Mock system design interview (mentor)',    done: true,  due: 'Mar 1'  },
      { id: 11, text: 'Review caching strategies',               done: false, due: 'Mar 28' },
    ]
  },
  {
    id: 4, title: 'Become a Team Lead', domain: 'Leadership', progress: 20,
    dueDate: '2026-06-30', priority: 'low',
    tasks: [
      { id: 12, text: 'Read "The Manager\'s Path"',     done: true,  due: 'Mar 10' },
      { id: 13, text: 'Lead a sprint planning session', done: false, due: 'Apr 15' },
      { id: 14, text: 'Mentor a junior engineer',       done: false, due: 'May 1'  },
    ]
  },
];

// ── Goal Card ─────────────────────────────────────────────────────────────────
const GoalCard = ({ goal, onToggleTask }) => {
  const [expanded, setExpanded] = useState(false);
  const c = DOMAIN_COLORS[goal.domain] || DOMAIN_COLORS['Frontend Dev'];
  const icon = DOMAIN_ICONS[goal.domain];
  const completed = goal.tasks.filter(t => t.done).length;
  const total     = goal.tasks.length;
  const daysLeft  = Math.ceil((new Date(goal.dueDate) - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/20 overflow-hidden hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
      {/* Top accent bar */}
      <div className={`h-1.5 w-full ${c.bar}`} />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-start gap-3 min-w-0">
            <div className={`p-2.5 rounded-xl flex-shrink-0 ${c.icon}`}>{icon}</div>
            <div className="min-w-0">
              <h3 className="font-bold text-slate-900 text-base leading-tight">{goal.title}</h3>
              <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-lg text-xs font-bold border ${c.bg} ${c.text} ${c.border}`}>
                {goal.domain}
              </span>
            </div>
          </div>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-xl flex-shrink-0
            ${goal.priority === 'high'   ? 'bg-rose-50 text-rose-600 border border-rose-100'
            : goal.priority === 'medium' ? 'bg-amber-50 text-amber-600 border border-amber-100'
            :                              'bg-slate-50 text-slate-500 border border-slate-100'}`}>
            {goal.priority[0].toUpperCase() + goal.priority.slice(1)}
          </span>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-slate-500">{completed}/{total} tasks</span>
            <span className="text-sm font-bold text-slate-900">{goal.progress}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div className={`h-2 rounded-full transition-all duration-500 ${c.bar}`} style={{ width: `${goal.progress}%` }} />
          </div>
        </div>

        {/* Due date */}
        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-1.5 text-xs font-bold
            ${daysLeft < 10 ? 'text-rose-500' : daysLeft < 30 ? 'text-amber-500' : 'text-slate-400'}`}>
            <Clock className="w-3.5 h-3.5" />
            {daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors"
          >
            {expanded ? 'Hide tasks' : 'View tasks'}
            <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`} />
          </button>
        </div>

        {/* Task list (expandable) */}
        {expanded && (
          <div className="mt-4 pt-4 border-t border-slate-100 space-y-2.5 animate-in slide-in-from-top-2 duration-200">
            {goal.tasks.map(task => (
              <button
                key={task.id}
                onClick={() => onToggleTask(goal.id, task.id)}
                className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left group"
              >
                {task.done
                  ? <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  : <Circle className="w-4 h-4 text-slate-300 mt-0.5 flex-shrink-0 group-hover:text-blue-400 transition-colors" />
                }
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${task.done ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                    {task.text}
                  </p>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5">Due {task.due}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ── Add Goal Modal ────────────────────────────────────────────────────────────
const AddGoalModal = ({ onClose, onSave }) => {
  const [form, setForm] = useState({ title: '', domain: 'Frontend Dev', priority: 'medium', dueDate: '' });
  const domains = Object.keys(DOMAIN_ICONS);
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 max-w-md w-full animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600"><Target className="w-5 h-5" /></div>
          <h3 className="font-bold text-slate-900 text-xl">Add New Goal</h3>
        </div>
        <div className="space-y-4 mb-6">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase tracking-wide">Goal Title</label>
            <input value={form.title} onChange={e => setForm({...form, title: e.target.value})}
              placeholder="e.g. Master System Design"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase tracking-wide">Domain</label>
              <select value={form.domain} onChange={e => setForm({...form, domain: e.target.value})}
                className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500">
                {domains.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase tracking-wide">Priority</label>
              <select value={form.priority} onChange={e => setForm({...form, priority: e.target.value})}
                className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase tracking-wide">Target Date</label>
            <input type="date" value={form.dueDate} onChange={e => setForm({...form, dueDate: e.target.value})}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 text-sm font-bold hover:bg-slate-50 transition-colors">Cancel</button>
          <button
            onClick={() => { if (form.title && form.dueDate) { onSave(form); onClose(); } }}
            disabled={!form.title || !form.dueDate}
            className="flex-1 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-blue-600 transition-all disabled:opacity-40"
          >Save Goal</button>
        </div>
      </div>
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
const Goals = () => {
  const [sidebarOpen, setSidebarOpen]   = useState(false);
  const [goals, setGoals]               = useState(INITIAL_GOALS);
  const [filter, setFilter]             = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // Toggle task done/undone
  const handleToggleTask = (goalId, taskId) => {
    setGoals(prev => prev.map(g => {
      if (g.id !== goalId) return g;
      const tasks = g.tasks.map(t => t.id === taskId ? { ...t, done: !t.done } : t);
      const done  = tasks.filter(t => t.done).length;
      return { ...g, tasks, progress: Math.round((done / tasks.length) * 100) };
    }));
  };

  // Add goal
  const handleSaveGoal = (form) => {
    const newGoal = {
      id: Date.now(), title: form.title, domain: form.domain,
      progress: 0, dueDate: form.dueDate, priority: form.priority, tasks: [],
    };
    setGoals(prev => [...prev, newGoal]);
  };

  const FILTERS = ['All', 'In Progress', 'Almost Done', 'Just Started'];

  const filtered = goals.filter(g => {
    if (filter === 'All')          return true;
    if (filter === 'In Progress')  return g.progress > 0 && g.progress < 100;
    if (filter === 'Almost Done')  return g.progress >= 70;
    if (filter === 'Just Started') return g.progress < 30;
    return true;
  });

  // Stats
  const totalGoals    = goals.length;
  const completedGoals = goals.filter(g => g.progress === 100).length;
  const avgProgress   = goals.length ? Math.round(goals.reduce((s, g) => s + g.progress, 0) / goals.length) : 0;
  const streakDays    = 12; // demo streak

  // This week's pending tasks across all goals
  const weekTasks = goals.flatMap(g =>
    g.tasks
      .filter(t => !t.done)
      .slice(0, 1)           // top 1 pending per goal
      .map(t => ({ ...t, domain: g.domain, goalTitle: g.title }))
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-dm relative overflow-x-hidden">
      {/* Background */}
      <div className="fixed top-0 left-0 w-full h-[800px] bg-gradient-to-b from-blue-50/50 via-indigo-50/30 to-transparent pointer-events-none z-0" />
      <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-100/40 blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10">
        <Navigation />
        <Sidenav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} currentRoute="/dashboard/goals" />

        <button onClick={() => setSidebarOpen(true)}
          className="fixed bottom-6 right-6 z-50 lg:hidden bg-blue-600 text-white p-4 rounded-full shadow-2xl shadow-blue-600/40 hover:scale-105 transition-transform">
          <Filter className="w-6 h-6" />
        </button>

        <div className="pt-32 md:pt-24 px-4 sm:px-6 lg:px-8 lg:pl-28 max-w-[1600px] mx-auto">

          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 animate-in slide-in-from-bottom-4 duration-500">
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Track & Achieve</p>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Goals</span>
              </h1>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-blue-600 transition-all shadow-lg self-start md:self-auto"
            >
              <Plus className="w-4 h-4" /> Add Goal
            </button>
          </header>

          {/* Filter Pills */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
            {FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-200
                  ${filter === f ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'}`}>
                {f}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pb-12">

            {/* ── LEFT: Goal Cards ──────────────────────────────────────── */}
            <div className="lg:col-span-8 space-y-4 animate-in slide-in-from-bottom-8 duration-700 delay-100">
              {filtered.length === 0 ? (
                <div className="bg-white rounded-[2.5rem] p-16 flex flex-col items-center text-center border border-dashed border-slate-200">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                    <Target className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-700 mb-2">No goals match this filter</h3>
                  <p className="text-slate-400 text-sm font-medium mb-6">Try a different filter or add a new goal.</p>
                  <button onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-blue-600 transition-all">
                    <Plus className="w-4 h-4" /> Add Goal
                  </button>
                </div>
              ) : (
                filtered.map(goal => (
                  <GoalCard key={goal.id} goal={goal} onToggleTask={handleToggleTask} />
                ))
              )}
            </div>

            {/* ── RIGHT: Stats Sidebar ──────────────────────────────────── */}
            <div className="lg:col-span-4 space-y-6 animate-in slide-in-from-bottom-8 duration-700 delay-200">

              {/* Progress Summary */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-6 text-white shadow-xl shadow-blue-900/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-8 -mt-8" />
                <div className="relative z-10">
                  <p className="text-blue-200 font-bold uppercase tracking-widest text-xs mb-4">Overview</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                      <p className="text-3xl font-bold">{totalGoals}</p>
                      <p className="text-blue-200 text-xs font-bold mt-1">Total Goals</p>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                      <p className="text-3xl font-bold">{avgProgress}%</p>
                      <p className="text-blue-200 text-xs font-bold mt-1">Avg Progress</p>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                      <p className="text-3xl font-bold">{completedGoals}</p>
                      <p className="text-blue-200 text-xs font-bold mt-1">Completed</p>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                      <div className="flex items-center gap-1.5">
                        <Flame className="w-5 h-5 text-orange-300" />
                        <p className="text-3xl font-bold">{streakDays}</p>
                      </div>
                      <p className="text-blue-200 text-xs font-bold mt-1">Day Streak</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* This Week's Focus */}
              <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-lg shadow-slate-200/20">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 bg-amber-50 rounded-xl text-amber-600">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">This Week's Focus</h3>
                    <p className="text-xs text-slate-400 font-medium">Top pending tasks</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {weekTasks.length === 0 ? (
                    <p className="text-slate-400 text-sm text-center py-4">All caught up! 🎉</p>
                  ) : weekTasks.map(task => {
                    const c = DOMAIN_COLORS[task.domain] || DOMAIN_COLORS['Frontend Dev'];
                    return (
                      <div key={task.id} className="flex items-start gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-colors">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${c.bar}`} />
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-slate-900 leading-snug">{task.text}</p>
                          <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                            <span className={`${c.text} font-bold`}>{task.domain}</span> · Due {task.due}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Domain breakdown */}
              <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-lg shadow-slate-200/20">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 bg-violet-50 rounded-xl text-violet-600">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">Progress by Domain</h3>
                </div>
                <div className="space-y-4">
                  {goals.map(g => {
                    const c = DOMAIN_COLORS[g.domain] || DOMAIN_COLORS['Frontend Dev'];
                    return (
                      <div key={g.id}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`text-xs font-bold ${c.text}`}>{g.domain}</span>
                          <span className="text-xs font-bold text-slate-600">{g.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5">
                          <div className={`h-1.5 rounded-full transition-all duration-500 ${c.bar}`} style={{ width: `${g.progress}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Motivation quote */}
              <div className="bg-slate-900 rounded-[2.5rem] p-6 text-white relative overflow-hidden">
                <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-white/5 rounded-full blur-xl" />
                <div className="relative z-10">
                  <Trophy className="w-6 h-6 text-amber-400 mb-3" />
                  <p className="text-sm font-medium leading-relaxed text-slate-300 italic">
                    "The secret of getting ahead is getting started."
                  </p>
                  <p className="text-xs text-slate-500 font-bold mt-2">— Mark Twain</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {showAddModal && (
        <AddGoalModal onClose={() => setShowAddModal(false)} onSave={handleSaveGoal} />
      )}
    </div>
  );
};

export default Goals;