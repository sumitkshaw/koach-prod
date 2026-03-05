import React, { useState, useMemo } from 'react';
import {
  Filter, DollarSign, TrendingUp, TrendingDown, Users,
  Calendar, ArrowUpRight, ArrowDownRight, Clock,
  CreditCard, Download, ChevronRight, Wallet,
  CheckCircle2, AlertCircle, BarChart3
} from 'lucide-react';
import Navigation from '../Navigation';
import Sidenav from './Sidenav';
import Footer from '../Footer';

// ── Demo data ─────────────────────────────────────────────────────────────────
const MONTHLY_EARNINGS = [
  { month: 'Sep', amount: 1200 },
  { month: 'Oct', amount: 1750 },
  { month: 'Nov', amount: 2100 },
  { month: 'Dec', amount: 1400 },
  { month: 'Jan', amount: 2600 },
  { month: 'Feb', amount: 3100 },
  { month: 'Mar', amount: 2850 },
];

const TRANSACTIONS = [
  { id: 'TXN-001', mentee: 'Alex Rivera',    plan: 'Pro',   amount: 599,  date: '2026-03-01', status: 'paid',    avatar: 'A' },
  { id: 'TXN-002', mentee: 'Priya Sharma',   plan: 'Basic', amount: 299,  date: '2026-02-28', status: 'paid',    avatar: 'P' },
  { id: 'TXN-003', mentee: 'James Okonkwo',  plan: 'Pro',   amount: 599,  date: '2026-02-25', status: 'pending', avatar: 'J' },
  { id: 'TXN-004', mentee: 'Sofia Martini',  plan: 'Basic', amount: 299,  date: '2026-02-20', status: 'paid',    avatar: 'S' },
  { id: 'TXN-005', mentee: 'Kenji Tanaka',   plan: 'Pro',   amount: 599,  date: '2026-02-15', status: 'paid',    avatar: 'K' },
  { id: 'TXN-006', mentee: 'Amara Diallo',   plan: 'Basic', amount: 299,  date: '2026-02-10', status: 'failed',  avatar: 'A' },
  { id: 'TXN-007', mentee: 'Lena Fischer',   plan: 'Pro',   amount: 599,  date: '2026-02-05', status: 'paid',    avatar: 'L' },
  { id: 'TXN-008', mentee: 'Omar Al-Farsi',  plan: 'Basic', amount: 299,  date: '2026-01-30', status: 'paid',    avatar: 'O' },
];

const UPCOMING = [
  { mentee: 'Alex Rivera',   plan: 'Pro',   amount: 599, renewalDate: '2026-04-01', avatar: 'A' },
  { mentee: 'Kenji Tanaka',  plan: 'Pro',   amount: 599, renewalDate: '2026-04-15', avatar: 'K' },
  { mentee: 'Lena Fischer',  plan: 'Pro',   amount: 599, renewalDate: '2026-04-05', avatar: 'L' },
  { mentee: 'James Okonkwo', plan: 'Basic', amount: 299, renewalDate: '2026-03-25', avatar: 'J' },
];

// ── Mini Bar Chart ────────────────────────────────────────────────────────────
const MiniBarChart = ({ data }) => {
  const max = Math.max(...data.map(d => d.amount));
  return (
    <div className="flex items-end gap-1.5 h-24 w-full">
      {data.map((d, i) => {
        const pct = (d.amount / max) * 100;
        const isLast = i === data.length - 1;
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group relative">
            {/* Tooltip */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
              ${d.amount.toLocaleString()}
            </div>
            <div
              className={`w-full rounded-t-lg transition-all duration-300 ${isLast ? 'bg-blue-600' : 'bg-blue-200 group-hover:bg-blue-400'}`}
              style={{ height: `${pct}%` }}
            />
            <span className="text-[10px] font-bold text-slate-400">{d.month}</span>
          </div>
        );
      })}
    </div>
  );
};

// ── Status config ─────────────────────────────────────────────────────────────
const STATUS_CFG = {
  paid:    { label: 'Paid',    bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100', icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
  pending: { label: 'Pending', bg: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-100',   icon: <Clock className="w-3.5 h-3.5" /> },
  failed:  { label: 'Failed',  bg: 'bg-rose-50',    text: 'text-rose-700',    border: 'border-rose-100',    icon: <AlertCircle className="w-3.5 h-3.5" /> },
};

// Avatar gradient map
const AVATAR_COLORS = [
  'from-blue-400 to-indigo-500',
  'from-emerald-400 to-teal-500',
  'from-violet-400 to-purple-500',
  'from-rose-400 to-pink-500',
  'from-amber-400 to-orange-500',
  'from-cyan-400 to-sky-500',
];
const avatarColor = (letter) => AVATAR_COLORS[letter.charCodeAt(0) % AVATAR_COLORS.length];

// ── Main Component ────────────────────────────────────────────────────────────
const Earnings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [withdrawModal, setWithdrawModal] = useState(false);

  const TABS = ['All', 'Paid', 'Pending', 'Failed'];

  const filtered = useMemo(() => {
    if (activeTab === 'All') return TRANSACTIONS;
    return TRANSACTIONS.filter(t => t.status === activeTab.toLowerCase());
  }, [activeTab]);

  // ── Key stats ──────────────────────────────────────────────────────────────
  const totalEarned = TRANSACTIONS.filter(t => t.status === 'paid').reduce((s, t) => s + t.amount, 0);
  const thisMonth = TRANSACTIONS.filter(t => t.status === 'paid' && t.date.startsWith('2026-03')).reduce((s, t) => s + t.amount, 0);
  const lastMonth = TRANSACTIONS.filter(t => t.status === 'paid' && t.date.startsWith('2026-02')).reduce((s, t) => s + t.amount, 0);
  const growthPct = lastMonth > 0 ? Math.round(((thisMonth - lastMonth) / lastMonth) * 100) : 0;
  const pendingAmount = TRANSACTIONS.filter(t => t.status === 'pending').reduce((s, t) => s + t.amount, 0);
  const availablePayout = Math.round(totalEarned * 0.875); // 12.5% platform fee
  const upcomingRevenue = UPCOMING.reduce((s, u) => s + u.amount, 0);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-dm relative overflow-x-hidden">
      {/* Background Atmosphere */}
      <div className="fixed top-0 left-0 w-full h-[800px] bg-gradient-to-b from-blue-50/50 via-indigo-50/30 to-transparent pointer-events-none z-0" />
      <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-100/40 blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10">
        <Navigation />
        <Sidenav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} currentRoute="/dashboard_mentor/earnings" />

        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed bottom-6 right-6 z-50 lg:hidden bg-blue-600 text-white p-4 rounded-full shadow-2xl shadow-blue-600/40 hover:scale-105 transition-transform"
        >
          <Filter className="w-6 h-6" />
        </button>

        <div className="pt-32 md:pt-24 px-4 sm:px-6 lg:px-8 transition-all duration-300 lg:pl-28 max-w-[1600px] mx-auto">

          {/* ── Header ─────────────────────────────────────────────────────── */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 animate-in slide-in-from-bottom-4 duration-500">
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Financial Overview</p>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Earnings</span>
              </h1>
            </div>
            <button
              onClick={() => setWithdrawModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-blue-600 transition-all shadow-lg shadow-slate-900/20 self-start md:self-auto"
            >
              <Wallet className="w-4 h-4" />
              Withdraw Funds
            </button>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pb-12">

            {/* ── LEFT MAIN COLUMN ──────────────────────────────────────────── */}
            <div className="lg:col-span-8 space-y-6 animate-in slide-in-from-bottom-8 duration-700 delay-100">

              {/* Stat Cards row */}
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                {/* Total Earned */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] p-6 text-white shadow-xl shadow-blue-900/20 relative overflow-hidden col-span-2 sm:col-span-1">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-8 -mt-8" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="p-2 bg-white/20 rounded-xl">
                        <DollarSign className="w-4 h-4" />
                      </div>
                      <span className="text-blue-200 text-sm font-bold">Total Earned</span>
                    </div>
                    <p className="text-4xl font-bold mb-1">${totalEarned.toLocaleString()}</p>
                    <p className="text-blue-200 text-xs font-medium">All-time platform earnings</p>
                  </div>
                </div>

                {/* This Month */}
                <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-lg shadow-slate-200/20 col-span-2 sm:col-span-1">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <span className="text-slate-500 text-sm font-bold">This Month</span>
                  </div>
                  <p className="text-4xl font-bold text-slate-900 mb-1">${thisMonth.toLocaleString()}</p>
                  <div className={`flex items-center gap-1 text-xs font-bold ${growthPct >= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                    {growthPct >= 0
                      ? <ArrowUpRight className="w-3.5 h-3.5" />
                      : <ArrowDownRight className="w-3.5 h-3.5" />}
                    {Math.abs(growthPct)}% vs last month
                  </div>
                </div>

                {/* Pending */}
                <div className="bg-white rounded-[2rem] p-5 border border-slate-100 shadow-lg shadow-slate-200/20">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 bg-amber-50 rounded-xl text-amber-500">
                      <Clock className="w-4 h-4" />
                    </div>
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-wide">Pending</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">${pendingAmount.toLocaleString()}</p>
                  <p className="text-xs text-slate-400 font-medium mt-1">Awaiting payment</p>
                </div>

                {/* Available Payout */}
                <div className="bg-white rounded-[2rem] p-5 border border-slate-100 shadow-lg shadow-slate-200/20">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-wide">Available</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">${availablePayout.toLocaleString()}</p>
                  <p className="text-xs text-slate-400 font-medium mt-1">Ready to withdraw</p>
                </div>
              </div>

              {/* Earnings Chart */}
              <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-lg shadow-slate-200/20">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
                      <BarChart3 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">Monthly Earnings</h3>
                      <p className="text-xs text-slate-400 font-medium">Last 7 months</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-xl">
                    <TrendingUp className="w-3.5 h-3.5" />
                    +{growthPct}% growth
                  </div>
                </div>
                <MiniBarChart data={MONTHLY_EARNINGS} />
              </div>

              {/* Transaction History */}
              <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-lg shadow-slate-200/20">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-slate-50 rounded-xl text-slate-600">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg">Transaction History</h3>
                  </div>
                  <button className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors">
                    <Download className="w-3.5 h-3.5" /> Export
                  </button>
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-2 mb-5 overflow-x-auto pb-1 scrollbar-hide">
                  {TABS.map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200
                        ${activeTab === tab
                          ? 'bg-slate-900 text-white shadow-md'
                          : 'bg-slate-50 text-slate-500 border border-slate-200 hover:bg-slate-100'
                        }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Transaction Rows */}
                <div className="space-y-2">
                  {filtered.length === 0 ? (
                    <p className="text-center text-slate-400 py-8 text-sm font-medium">No transactions found.</p>
                  ) : filtered.map((txn, i) => {
                    const cfg = STATUS_CFG[txn.status];
                    return (
                      <div key={txn.id} className="flex items-center gap-4 p-3.5 rounded-2xl hover:bg-slate-50 transition-colors group">
                        {/* Avatar */}
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${avatarColor(txn.avatar)} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                          {txn.avatar}
                        </div>
                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-slate-900 text-sm truncate">{txn.mentee}</p>
                          <p className="text-xs text-slate-400 font-medium">{txn.id} · {txn.plan} Plan</p>
                        </div>
                        {/* Date */}
                        <div className="hidden sm:block text-right">
                          <p className="text-xs text-slate-400 font-medium">
                            {new Date(txn.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                        </div>
                        {/* Amount */}
                        <p className="font-bold text-slate-900 text-sm">${txn.amount}</p>
                        {/* Status */}
                        <span className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold border flex-shrink-0 ${cfg.bg} ${cfg.text} ${cfg.border}`}>
                          {cfg.icon} {cfg.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* ── RIGHT SIDEBAR ─────────────────────────────────────────────── */}
            <div className="lg:col-span-4 space-y-6 animate-in slide-in-from-bottom-8 duration-700 delay-200">

              {/* Payout Info Card */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2.5rem] p-6 text-white shadow-2xl shadow-slate-900/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-8 -mt-8" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="p-2 bg-white/10 rounded-xl">
                      <Wallet className="w-4 h-4" />
                    </div>
                    <span className="text-slate-400 text-sm font-bold">Next Payout</span>
                  </div>
                  <p className="text-3xl font-bold mb-1">${availablePayout.toLocaleString()}</p>
                  <p className="text-slate-400 text-xs font-medium mb-5">Estimated · 12.5% platform fee applied</p>
                  <div className="space-y-2.5 border-t border-white/10 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-xs">Gross earnings</span>
                      <span className="text-sm font-bold">${totalEarned.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-xs">Platform fee (12.5%)</span>
                      <span className="text-sm font-bold text-rose-400">-${(totalEarned - availablePayout).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-white/10 pt-2.5">
                      <span className="text-white text-xs font-bold">Net payout</span>
                      <span className="text-base font-bold text-emerald-400">${availablePayout.toLocaleString()}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setWithdrawModal(true)}
                    className="w-full mt-5 py-3 bg-white text-slate-900 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors"
                  >
                    Request Withdrawal
                  </button>
                </div>
              </div>

              {/* Upcoming Renewals */}
              <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-lg shadow-slate-200/20">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">Upcoming Revenue</h3>
                    <p className="text-xs text-slate-400 font-medium">Subscription renewals</p>
                  </div>
                </div>

                <div className="space-y-3 mb-5">
                  {UPCOMING.map((u, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-colors">
                      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${avatarColor(u.avatar)} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                        {u.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-slate-900 text-sm truncate">{u.mentee}</p>
                        <p className="text-[11px] text-slate-400 font-medium">
                          Renews {new Date(u.renewalDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {u.plan}
                        </p>
                      </div>
                      <span className="text-sm font-bold text-emerald-600">${u.amount}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-indigo-500 font-bold uppercase tracking-wider">Expected Next Month</p>
                    <p className="text-2xl font-bold text-indigo-700 mt-0.5">${upcomingRevenue.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-indigo-100 rounded-xl text-indigo-600">
                    <Calendar className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-lg shadow-slate-200/20">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">Quick Stats</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'Active Subscriptions',   value: UPCOMING.length,       sub: 'Paying mentees'        },
                    { label: 'Avg. per Mentee',         value: `$${Math.round(totalEarned / (TRANSACTIONS.filter(t => t.status === 'paid').length || 1))}`, sub: 'Per transaction' },
                    { label: 'Success Rate',            value: `${Math.round((TRANSACTIONS.filter(t => t.status === 'paid').length / TRANSACTIONS.length) * 100)}%`, sub: 'Payments collected' },
                  ].map(({ label, value, sub }) => (
                    <div key={label} className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors">
                      <div>
                        <p className="text-sm font-bold text-slate-900">{label}</p>
                        <p className="text-xs text-slate-400 font-medium">{sub}</p>
                      </div>
                      <span className="text-base font-bold text-blue-600">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* ── Withdraw Modal ─────────────────────────────────────────────────── */}
      {withdrawModal && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setWithdrawModal(false)}
        >
          <div
            className="bg-white rounded-[2.5rem] shadow-2xl p-8 max-w-md w-full animate-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Request Withdrawal</h3>
                <p className="text-xs text-slate-400 font-medium">Funds arrive in 3–5 business days</p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 mb-5 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-medium">Available Balance</span>
                <span className="font-bold text-slate-900">${availablePayout.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-medium">Processing Fee</span>
                <span className="font-bold text-rose-500">-$2.50</span>
              </div>
              <div className="flex justify-between text-sm border-t border-slate-200 pt-2">
                <span className="font-bold text-slate-900">You'll receive</span>
                <span className="font-bold text-emerald-600">${(availablePayout - 2.5).toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase tracking-wide">Amount</label>
                <input
                  type="number"
                  defaultValue={availablePayout}
                  max={availablePayout}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase tracking-wide">Bank Account (last 4 digits)</label>
                <input
                  type="text"
                  placeholder="**** **** **** 1234"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setWithdrawModal(false)}
                className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 text-sm font-bold hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setWithdrawModal(false)}
                className="flex-1 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-blue-600 transition-all shadow-lg"
              >
                Confirm Withdrawal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Earnings;