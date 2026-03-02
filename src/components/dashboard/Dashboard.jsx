import React, { useState, useEffect } from 'react';
import {
  Calendar, Trophy, Users, BookOpen, Target, Award, Star, Clock,
  ChevronRight, Shield, Mail, Zap, TrendingUp, Search
} from 'lucide-react';
import Navigation from '../Navigation';
import Sidenav from './Sidenav';
import Footer from '../Footer';
import { useAuth } from '../../utils/AuthContext';
import { useToast } from '../../context/ToastContext';
import { getUserProfile } from '../../utils/database/profiles';
import ProfileWarning from '../../components/ProfileWarning';
import { getCurrentUser } from '../../utils/auth';

// --- Premium Streak Widget ---
const StreakWidget = () => {
  // Generate mock heatmap data for 30 days
  const history = Array.from({ length: 30 }, (_, i) => ({
    date: i,
    active: Math.random() > 0.3 // 70% chance of active
  }));

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-6 sm:p-8 border border-white/50 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-orange-50/50 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">

        {/* Streak Count & Fire */}
        <div className="flex items-center gap-5">
          <div className="relative shrink-0">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-tr from-orange-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30 animate-pulse">
              <Zap className="w-7 h-7 sm:w-8 sm:h-8 text-white fill-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce"></div>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Current Streak</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-none">12 Days</h2>
            <p className="text-sm font-medium text-orange-500 mt-1">You're on fire! 🔥</p>
          </div>
        </div>

        {/* Heatmap Dots */}
        <div className="flex-1 max-w-md w-full">
          <div className="flex justify-between items-end mb-2">
            <span className="text-xs font-bold text-slate-400">Last 30 Days</span>
            <span className="text-xs font-bold text-slate-400">Today</span>
          </div>
          <div className="flex flex-wrap justify-end gap-1.5">
            {history.map((day, i) => (
              <div
                key={i}
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm transition-all duration-300 ${day.active ? 'bg-orange-500 shadow-sm scale-100' : 'bg-slate-100 scale-90'}`}
                title={day.active ? "Learned" : "Missed"}
              ></div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

// --- Weekly Activity & Goal Section (New) ---
const ActivitySection = ({ className }) => {
  return (
    <div className={`bg-white rounded-[2.5rem] p-6 sm:p-8 border border-slate-100 shadow-xl shadow-slate-200/30 ${className}`}>
      <div className="flex flex-col md:flex-row gap-8 items-center">
        {/* Weekly Progress Circle */}
        <div className="shrink-0 relative group cursor-pointer">
          <div className="w-40 h-40 rounded-full bg-slate-50 flex items-center justify-center relative transform -rotate-90 transition-transform duration-700 group-hover:rotate-90">
            {/* Background Circle */}
            <svg className="w-full h-full transform scale-110" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#F1F5F9" strokeWidth="8" />
              <circle cx="50" cy="50" r="45" fill="none" stroke="url(#gradient)" strokeWidth="8" strokeDasharray="283" strokeDashoffset="56" strokeLinecap="round" />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#6366F1" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-slate-900 group-hover:scale-110 transition-transform">80%</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Goal Met</span>
          </div>
        </div>

        {/* Text & Activity Stats */}
        <div className="flex-1 w-full space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-slate-900">Weekly Target</h3>
              <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">+12% vs last week</span>
            </div>
            <p className="text-slate-500 font-medium leading-relaxed text-sm sm:text-base">
              You've completed <span className="text-slate-900 font-bold">4 out of 5</span> planned learning sessions this week. Great consistency!
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest px-1">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
            <div className="grid grid-cols-7 gap-3 h-24 items-end bg-slate-50/50 rounded-2xl p-4 border border-slate-100/50">
              {[40, 70, 30, 85, 50, 20, 0].map((h, i) => (
                <div key={i} className="w-full relative group h-full flex items-end justify-center">
                  <div
                    className={`w-full max-w-[12px] sm:max-w-[16px] rounded-full transition-all duration-500 ease-out 
                       ${h > 0 ? 'bg-gradient-to-t from-blue-500 to-indigo-500 shadow-lg shadow-blue-500/20 group-hover:to-purple-500 group-hover:shadow-indigo-500/30' : 'bg-slate-200'}`}
                    style={{ height: h > 0 ? `${h}%` : '4px' }}
                  ></div>

                  {/* Tooltip */}
                  {h > 0 && (
                    <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] py-1 px-2 rounded-lg font-bold whitespace-nowrap z-20 pointer-events-none">
                      {h} min
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showVerificationOverlay, setShowVerificationOverlay] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const { user, sendVerification } = useAuth();
  const { showToast } = useToast();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const checkVerificationStatus = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (!currentUser) { setLoading(false); return; }

        const welcomeToast = localStorage.getItem("welcome_toast");
        if (welcomeToast) {
          showToast(welcomeToast);
          localStorage.removeItem("welcome_toast");
        }

        setUserEmail(currentUser.email);
        if (!currentUser.emailVerification) {
          setShowVerificationOverlay(true);
        } else {
          loadUserProfile();
        }
      } catch (error) {
        console.error('Error checking verification:', error);
        setLoading(false);
      }
    };

    const loadUserProfile = async () => {
      if (!user?.$id) { setLoading(false); return; }
      try {
        setLoading(true);
        const profile = await getUserProfile(user.$id);
        if (!profile) {
          setTimeout(() => loadUserProfile(), 1000);
          return;
        }
        setUserProfile(profile);
        if (profile?.userType === 'mentee' && !profile.profileComplete) {
          setShowWarning(true);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    };

    checkVerificationStatus();
  }, [user]);

  const handleSendVerification = async () => {
    try {
      await sendVerification(() => { }, (message) => alert(message));
    } catch (error) {
      alert('Failed to send verification email.');
    }
  };

  const getUserDisplayName = () => userProfile?.displayName || user?.name?.split(' ')[0] || 'Friend';
  const getUserInitial = () => (userProfile?.displayName || user?.name || 'U').charAt(0).toUpperCase();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Verification Screen
  if (showVerificationOverlay) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/80 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] shadow-2xl p-8 max-w-md w-full text-center border border-slate-100">
            <Shield className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Verification Required</h2>
            <p className="text-slate-500 mb-8">Please verify your email: <span className="font-semibold text-slate-900">{userEmail}</span></p>
            <button onClick={handleSendVerification} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/30">
              Resend Verification Email
            </button>
          </div>
        </div>
      </div>
    );
  }

  // MAIN DASHBOARD UI
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-dm relative overflow-x-hidden">

      {/* 1. Background Atmosphere (Premium Touch) */}
      <div className="fixed top-0 left-0 w-full h-[800px] bg-gradient-to-b from-blue-50/50 via-indigo-50/30 to-transparent pointer-events-none z-0"></div>
      <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-100/40 blur-[120px] pointer-events-none z-0"></div>

      <div className="relative z-10">
        <Navigation />
        <Sidenav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} currentRoute="/dashboard" />

        {/* Mobile Menu Button - Fixed & Stylized */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed bottom-6 right-6 z-50 lg:hidden bg-blue-600 text-white p-4 rounded-full shadow-2xl shadow-blue-600/40 hover:scale-105 transition-transform"
        >
          <Users className="w-6 h-6" />
        </button>

        <div className="pt-32 md:pt-24 px-4 sm:px-6 lg:px-8 transition-all duration-300 lg:pl-28 max-w-[1600px] mx-auto">

          {/* 2. Header Section */}
          <header className="flex items-end justify-between gap-2 mb-4 md:mb-8 animate-in slide-in-from-bottom-4 duration-500">
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tight">
                Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{getUserDisplayName()}</span>
              </h1>
            </div>

            {/* Search Bar (Clean & Professional) */}
            <div className={`flex justify-end transition-all duration-300 ${isSearchOpen ? 'w-full md:w-auto' : 'w-auto'}`}>
              <div
                className={`flex items-center bg-white border border-slate-200 rounded-2xl shadow-sm transition-all duration-300 ease-in-out cursor-pointer
                  ${isSearchOpen ? 'w-full md:w-80 px-5 py-3 ring-2 ring-blue-100' : 'w-12 h-12 justify-center p-0 hover:bg-slate-50'}`}
                onClick={() => setIsSearchOpen(true)}
              >
                <Search
                  className={`w-5 h-5 text-slate-400 transition-colors ${isSearchOpen ? 'mr-3' : ''}`}
                  onClick={(e) => {
                    if (isSearchOpen) {
                      e.stopPropagation();
                      setIsSearchOpen(false);
                    }
                  }}
                />
                <input
                  type="text"
                  placeholder="Search anything..."
                  className={`bg-transparent border-none outline-none text-sm font-semibold text-slate-700 placeholder:text-slate-400 w-full transition-opacity duration-200
                    ${isSearchOpen ? 'block opacity-100' : 'hidden opacity-0 w-0'}`}
                  autoFocus={isSearchOpen}
                  onBlur={() => setTimeout(() => setIsSearchOpen(false), 200)}
                />
              </div>
            </div>
          </header>

          {/* 3. Bento Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

            {/* --- LEFT COLUMN (Main Content) --- */}
            <div className="lg:col-span-8 space-y-6 lg:space-y-8 animate-in slide-in-from-bottom-8 duration-700 delay-100">

              {/* A. Quick Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Time Spent', val: '12h 30m', icon: Clock, c: 'text-violet-600', b: 'bg-violet-50' },
                  { label: 'Lessons', val: '24 Done', icon: BookOpen, c: 'text-pink-600', b: 'bg-pink-50' },
                  { label: 'Points', val: '850 XP', icon: Zap, c: 'text-amber-500', b: 'bg-amber-50' },
                  { label: 'Rank', val: 'Top 10%', icon: Trophy, c: 'text-emerald-600', b: 'bg-emerald-50' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white rounded-[2rem] p-5 border border-slate-100 shadow-lg shadow-slate-200/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className={`w-10 h-10 ${stat.b} ${stat.c} rounded-2xl flex items-center justify-center mb-3`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <div className="text-lg font-bold text-slate-900 leading-tight">{stat.val}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* B. Streak Widget */}
              <StreakWidget />

              {/* B2. Weekly Activity Section (Moved here to remove gap) */}
              <ActivitySection />

              {/* C. Recent Awards (Grid) */}
              <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 border border-slate-100 shadow-xl shadow-slate-200/30">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-amber-50 rounded-xl text-amber-500"><Award className="w-6 h-6" /></div>
                  <h3 className="font-bold text-slate-900 text-xl">Recent Awards</h3>
                </div>
                <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                  {[
                    { name: 'Early Bird', icon: Star, color: 'from-amber-400 to-orange-500' },
                    { name: 'Code Wizard', icon: Star, color: 'from-blue-400 to-indigo-500' },
                    { name: 'Fast Learner', icon: Zap, color: 'from-emerald-400 to-teal-500' },
                    { name: 'Consistent', icon: Calendar, color: 'from-violet-400 to-purple-500' },
                  ].map((badge, i) => (
                    <div key={i} className="flex flex-col items-center min-w-[90px] group cursor-pointer hover:-translate-y-2 transition-transform">
                      <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr ${badge.color} p-0.5 shadow-lg mb-2 rotate-3 group-hover:rotate-6 transition-transform`}>
                        <div className="w-full h-full bg-white/90 backdrop-blur-sm rounded-[14px] flex items-center justify-center">
                          <badge.icon className="w-6 h-6 sm:w-8 sm:h-8 text-slate-700" />
                        </div>
                      </div>
                      <span className="text-xs font-bold text-slate-700">{badge.name}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* --- RIGHT COLUMN (Sidebar Widgets) --- */}
            <div className="lg:col-span-4 space-y-6 animate-in slide-in-from-bottom-8 duration-700 delay-200">

              {/* D. Up Next Card (Featured Light) */}
              <div className="bg-white rounded-[2.5rem] p-8 text-slate-900 shadow-2xl shadow-slate-200/20 relative overflow-hidden group border border-slate-100">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border border-blue-100">Up Next</span>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-slate-900">3:00 <span className="text-lg text-slate-400">PM</span></p>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold leading-tight mb-2 text-slate-900">Frontend Architecture</h3>
                  <p className="text-sm font-medium text-slate-500 mb-6">with Andrea Watson</p>
                  <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors shadow-lg">
                    Join Loop
                  </button>
                </div>
              </div>

              {/* E. Progress Goals */}
              <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-lg shadow-slate-200/20">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-5 h-5 text-rose-500" />
                  <h3 className="font-bold text-slate-900">Current Goals</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                      <span>React Mastery</span>
                      <span className="text-rose-500">75%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-rose-500 rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                      <span>Design Systems</span>
                      <span className="text-blue-500">40%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full w-2/5 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* F. This Week's Activities (Redesigned) */}
              <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-lg shadow-slate-200/20">
                <div className="flex items-center gap-3 mb-6">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <h3 className="font-bold text-slate-900 text-lg">This Week's Activities</h3>
                </div>

                <div className="space-y-0 divide-y divide-slate-50">
                  {[
                    { name: 'Andrea Watson', task: 'Watch Figma Tutorial on Auto Layout', tag: 'Front End Development', date: 'Due May 26' },
                    { name: 'David Chen', task: 'Review React Component Lifecycle', tag: 'React Mastery', date: 'Due May 28' },
                    { name: 'Sarah Miller', task: 'Complete System Design Mock Interview', tag: 'Backend Architecture', date: 'Due May 30' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start py-4 first:pt-0 last:pb-0 group">
                      {/* Avatar Circle */}
                      <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0 mt-1 shadow-inner"></div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-slate-900 text-sm leading-tight">{item.name}</h4>
                          <span className="text-xs text-slate-400 font-medium whitespace-nowrap ml-2">{item.date}</span>
                        </div>
                        <p className="text-slate-500 text-sm leading-snug mt-1 mb-1.5 line-clamp-2">{item.task}</p>
                        <p className="text-blue-600 text-xs font-bold cursor-pointer hover:underline inline-block">{item.tag}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

        {showWarning && <ProfileWarning />}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;