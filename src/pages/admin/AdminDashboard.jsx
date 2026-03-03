// AdminDashboard.jsx — /admin/dashboard — white + blue theme
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, Briefcase, CheckCircle, XCircle, LogOut,
  Loader2, Clock, RefreshCw, TrendingUp,
} from 'lucide-react';
import {
  isAdminLoggedIn, adminLogout,
  getAdminUsers, getAdminMentors,
  approveMentor, rejectMentor,
} from '../../services/adminService';
import logoWhite from '../../assets/logowhite.png';

// Decode email from stored JWT without a library
function getAdminEmail() {
  try {
    const token = localStorage.getItem('koach_admin_token');
    if (!token) return 'admin';
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.email || 'admin';
  } catch { return 'admin'; }
}

const TABS = [
  { id: 'pending',  label: 'Pending Approval', icon: Clock },
  { id: 'mentors',  label: 'All Mentors',       icon: Briefcase },
  { id: 'users',    label: 'All Users',          icon: Users },
];

function initials(name = '') {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?';
}

function Avatar({ name, size = 9 }) {
  const palettes = ['bg-blue-500', 'bg-purple-500', 'bg-emerald-500', 'bg-orange-500', 'bg-rose-500'];
  const bg = palettes[(name || '').charCodeAt(0) % palettes.length] || 'bg-slate-400';
  return (
    <div className={`w-${size} h-${size} rounded-full ${bg} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
      {initials(name)}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color, bg }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center gap-4">
      <div className={`p-3 rounded-xl ${bg}`}>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-900">{value ?? '—'}</p>
        <p className="text-sm text-slate-500">{label}</p>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('pending');
  const [users, setUsers] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState({});
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!isAdminLoggedIn()) { navigate('/admin', { replace: true }); return; }
    const load = async () => {
      setLoading(true);
      try {
        const [u, m] = await Promise.all([getAdminUsers(), getAdminMentors()]);
        setUsers(u.users || []);
        setMentors(m.mentors || []);
      } catch (err) {
        if (err?.response?.status === 401) navigate('/admin', { replace: true });
      } finally { setLoading(false); }
    };
    load();
  }, [refreshKey]);

  const pending  = mentors.filter(m => !m.isActive);
  const approved = mentors.filter(m => m.isActive);

  const handleApprove = async (id) => {
    setActing(p => ({ ...p, [id]: 'approve' }));
    try {
      await approveMentor(id);
      setMentors(prev => prev.map(m => m._id === id ? { ...m, isActive: true } : m));
    } catch { } finally { setActing(p => ({ ...p, [id]: null })); }
  };

  const handleReject = async (id) => {
    setActing(p => ({ ...p, [id]: 'reject' }));
    try {
      await rejectMentor(id);
      setMentors(prev => prev.map(m => m._id === id ? { ...m, isActive: false } : m));
    } catch { } finally { setActing(p => ({ ...p, [id]: null })); }
  };

  const handleLogout = () => { adminLogout(); navigate('/admin', { replace: true }); };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Header ── */}
      <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <img src={logoWhite} alt="Koach" className="h-7 object-contain" style={{ filter: 'invert(1)' }} />

        <div className="flex items-center gap-2">
          <button
            onClick={() => setRefreshKey(k => k + 1)}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-500 hover:text-slate-800"
            title="Refresh data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-sm font-semibold transition-all border border-red-100"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* ── Stats ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Users}        label="Total Users"      value={users.length}    color="text-blue-600"   bg="bg-blue-50" />
          <StatCard icon={Briefcase}    label="Total Mentors"    value={mentors.length}  color="text-purple-600" bg="bg-purple-50" />
          <StatCard icon={Clock}        label="Pending Approval" value={pending.length}  color="text-amber-600"  bg="bg-amber-50" />
          <StatCard icon={TrendingUp}   label="Listed Mentors"   value={approved.length} color="text-emerald-600" bg="bg-emerald-50" />
        </div>

        {/* ── Admin Info Bar ── */}
        <div className="flex items-center justify-between mb-4 bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 text-xs font-bold">A</span>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Signed in as</p>
              <p className="text-sm font-bold text-slate-800">{getAdminEmail()}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-bold transition-all active:scale-95 shadow-sm shadow-red-200"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

        {/* ── Tabs ── */}
        <div className="flex items-center gap-2 mb-6 bg-white border border-slate-200 rounded-2xl p-1.5 w-full md:w-fit overflow-x-auto whitespace-nowrap scrollbar-hide shadow-sm">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all
                ${tab === id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}>
              <Icon className="w-4 h-4" />
              {label}
              {id === 'pending' && pending.length > 0 && (
                <span className={`ml-0.5 w-5 h-5 rounded-full text-white text-xs flex items-center justify-center font-bold
                  ${tab === id ? 'bg-white/30' : 'bg-amber-500'}`}>
                  {pending.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── Content ── */}
        {loading ? (
          <div className="flex items-center justify-center py-24 text-slate-400">
            <Loader2 className="w-7 h-7 animate-spin mr-3" /> Loading data…
          </div>
        ) : (
          <>
            {/* PENDING MENTORS */}
            {tab === 'pending' && (
              <div className="space-y-3">
                {pending.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-slate-200 p-14 text-center shadow-sm">
                    <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
                    <p className="text-slate-500 font-semibold">All caught up — no pending applications.</p>
                  </div>
                ) : pending.map(m => (
                  <div key={m._id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-blue-200 hover:shadow-md transition-all">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <Avatar name={m.name} size={10} />
                        <div>
                          <p className="font-bold text-slate-900">{m.name}</p>
                          <p className="text-sm text-slate-500">{m.title}{m.company ? ` · ${m.company}` : ''}</p>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {(m.skills || []).slice(0, 4).map(s => (
                              <span key={s} className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-lg font-medium">{s}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end justify-between w-full md:w-auto gap-3 md:gap-2 mt-2 md:mt-0 border-t md:border-t-0 border-slate-100 pt-3 md:pt-0">
                        <p className="text-sm font-semibold text-slate-400">${m.hourlyRate}/hr · {m.yearsOfExperience}y exp</p>
                        <div className="flex gap-2 w-full sm:w-auto">
                          <button onClick={() => handleReject(m._id)} disabled={!!acting[m._id]}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-red-50 hover:bg-red-100
                                       text-red-500 border border-red-100 rounded-xl text-sm font-semibold
                                       transition-all active:scale-95 disabled:opacity-40">
                            {acting[m._id] === 'reject' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <XCircle className="w-3.5 h-3.5" />}
                            Reject
                          </button>
                          <button onClick={() => handleApprove(m._id)} disabled={!!acting[m._id]}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-50 hover:bg-emerald-100
                                       text-emerald-600 border border-emerald-100 rounded-xl text-sm font-semibold
                                       transition-all active:scale-95 disabled:opacity-40">
                            {acting[m._id] === 'approve' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle className="w-3.5 h-3.5" />}
                            Approve & List
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ALL MENTORS */}
            {tab === 'mentors' && (
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                  <p className="font-semibold text-slate-700">{mentors.length} mentors total</p>
                </div>
                <div className="divide-y divide-slate-100">
                  {mentors.length === 0
                    ? <p className="text-slate-400 text-center p-12">No mentors yet.</p>
                    : mentors.map(m => (
                        <div key={m._id}
                          className="px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                          <div className="flex items-center gap-3 min-w-0">
                            <Avatar name={m.name} size={9} />
                            <div className="min-w-0">
                              <p className="font-semibold text-slate-900 text-sm truncate">{m.name}</p>
                              <p className="text-xs text-slate-400 truncate">{m.title} · {m.location}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 flex-shrink-0 w-full md:w-auto justify-between md:justify-end mt-2 md:mt-0 pt-3 border-t border-slate-100 md:border-none md:pt-0">
                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full
                              ${m.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                              {m.isActive ? '✓ Listed' : '⏳ Pending'}
                            </span>
                            <span className="text-xs text-slate-400 hidden md:block">${m.hourlyRate}/hr</span>
                            {m.isActive
                              ? <button onClick={() => handleReject(m._id)} disabled={!!acting[m._id]}
                                  className="text-xs px-3 py-1.5 bg-slate-100 hover:bg-red-50 hover:text-red-500 text-slate-500 rounded-lg transition-all border border-slate-200 disabled:opacity-40 font-medium">
                                  Unlist
                                </button>
                              : <button onClick={() => handleApprove(m._id)} disabled={!!acting[m._id]}
                                  className="text-xs px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-all border border-blue-100 disabled:opacity-40 font-medium">
                                  Approve
                                </button>
                            }
                          </div>
                        </div>
                      ))}
                </div>
              </div>
            )}

            {/* ALL USERS */}
            {tab === 'users' && (
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-slate-100">
                  <p className="font-semibold text-slate-700">{users.length} users total</p>
                </div>
                <div className="divide-y divide-slate-100">
                  {users.length === 0
                    ? <p className="text-slate-400 text-center p-12">No users yet.</p>
                    : users.map(u => (
                        <div key={u._id}
                          className="px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                          <div className="flex items-center gap-3 min-w-0">
                            <Avatar name={u.name} size={9} />
                            <div className="min-w-0">
                              <p className="font-semibold text-slate-900 text-sm truncate">{u.name || 'Unnamed User'}</p>
                              <p className="text-xs text-slate-400 truncate">{u.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 flex-shrink-0 w-full md:w-auto justify-between md:justify-end mt-2 md:mt-0 pt-3 border-t border-slate-100 md:border-none md:pt-0">
                            {u.onboardingCompleted
                              ? <span className="text-xs bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full font-bold">Onboarded</span>
                              : <span className="text-xs bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full font-bold">New</span>
                            }
                            <p className="text-xs text-slate-400 hidden md:block">
                              {u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}
                            </p>
                          </div>
                        </div>
                      ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
