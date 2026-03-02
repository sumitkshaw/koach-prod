import React, { useState, useEffect } from 'react';
import { Calendar, Trophy, Users, BookOpen, Target, Award, Star, Clock, ChevronRight, Plus, TrendingUp, Eye, ChevronDown } from 'lucide-react';
import Navigation from '../Navigation';
import Sidenav from './Sidenav';
import Footer from '../Footer';
import { useAuth } from '../../utils/AuthContext';
import { useToast } from '../../context/ToastContext';
import { getUserProfile } from '../../utils/database/profiles';

const Dashmentor = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('Last 30 days');
  const [selectedEarningsPeriod, setSelectedEarningsPeriod] = useState('July');
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { showToast } = useToast();

  // Load user profile
  useEffect(() => {
    const loadUserProfile = async () => {
      if (!user?.$id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // Show welcome toast if flagged
        const welcomeToast = localStorage.getItem("welcome_toast");
        if (welcomeToast) {
          showToast(welcomeToast);
          localStorage.removeItem("welcome_toast");
        }

        console.log('🔄 Loading mentor profile for:', user.$id);

        const profile = await getUserProfile(user.$id);

        // Auto-create profile if doesn't exist
        if (!profile) {
          console.log('📝 No mentor profile found, waiting for auto-creation...');
          // Wait for AuthContext to create profile
          setTimeout(() => {
            loadUserProfile();
          }, 1000);
          return;
        }

        setUserProfile(profile);
        console.log('✅ Mentor profile loaded:', profile);

      } catch (error) {
        console.error('❌ Error loading mentor profile:', error);
        // Don't break UI on error
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, [user]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Preparing your mentor dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  // Get mentor's display name
  const getMentorDisplayName = () => {
    if (userProfile?.displayName) return userProfile.displayName;
    if (user?.name) {
      const firstName = user.name.split(' ')[0];
      return firstName;
    }
    return 'Mentor';
  };

  // Rest of your component...

  // Get mentor's initial for avatar
  const getMentorInitial = () => {
    if (userProfile?.displayName) return userProfile.displayName.charAt(0).toUpperCase();
    if (user?.name) return user.name.charAt(0).toUpperCase();
    return 'M';
  };

  const studentProgress = [
    {
      name: "Alex Johnson",
      courseName: "React Masterclass",
      assignments: "5/8",
      tests: "3/4",
      progress: 85,
      meeting: "Tomorrow",
      status: "Scheduled"
    },
    {
      name: "Sarah Miller",
      courseName: "UX Design Fundamentals",
      assignments: "6/8",
      tests: "2/4",
      progress: 72,
      meeting: "Completed",
      status: "Completed"
    },
    {
      name: "David Chen",
      courseName: "Data Science Bootcamp",
      assignments: "7/8",
      tests: "4/4",
      progress: 90,
      meeting: "Friday",
      status: "Scheduled"
    }
  ];

  const upcomingEvents = [
    { time: "09:00", course: "React Code Review", day: "Today", date: "02 Aug 2023" },
    { time: "10:00", course: "Career Counseling", day: "Today", date: "02 Aug 2023" },
    { time: "13:00", course: "Project Feedback", day: "Today", date: "02 Aug 2023" },
    { time: "14:00", course: "Technical Interview Prep", day: "Today", date: "02 Aug 2023" }
  ];

  const profileVisits = [
    { source: "Design and creatives", count: 5 },
    { source: "Mentor referrals", count: 3 },
    { source: "Startup foundations", count: 24 },
    { source: "Tech communities", count: 12 }
  ];

  const circles = [
    {
      title: "Finance",
      description: "Share knowledge in FinTech, Finance, Banking and associated courses",
      members: 8,
      totalCircles: "12 Members",
      color: "from-blue-500 via-blue-600 to-indigo-600"
    },
    {
      title: "Design & Creative",
      description: "Share knowledge in FinTech, Finance, Banking and associated courses",
      members: 15,
      totalCircles: "8 Members",
      color: "from-orange-500 via-pink-500 to-red-600"
    },
    {
      title: "Data Science",
      description: "Share knowledge in FinTech, Finance, Banking and associated courses",
      members: 6,
      totalCircles: "5 Members",
      color: "from-purple-500 via-indigo-500 to-blue-600"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 border border-blue-200';
      case 'Completed':
        return 'bg-gradient-to-r from-green-100 to-emerald-200 text-green-700 border border-green-200';
      case 'Pending':
        return 'bg-gradient-to-r from-yellow-100 to-amber-200 text-yellow-700 border border-yellow-200';
      default:
        return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-dm relative overflow-x-hidden">
      {/* Background Atmosphere */}
      <div className="fixed top-0 left-0 w-full h-[800px] bg-gradient-to-b from-blue-50/50 via-indigo-50/30 to-transparent pointer-events-none z-0"></div>
      <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-100/40 blur-[120px] pointer-events-none z-0"></div>
      <Navigation />
      <Sidenav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} currentRoute="/dashmentor" />



      {/* Main Content */}
      {/* Main Content */}
      <div className="pt-32 md:pt-24 px-4 sm:px-6 lg:px-8 transition-all duration-300 lg:pl-28 max-w-[1600px] mx-auto relative z-10">

        {/* Header */}
        <header className="flex items-end justify-between gap-2 mb-8 animate-in slide-in-from-bottom-4 duration-500">
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tight">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{getMentorDisplayName()}!</span>
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {/* Optional Actions */}
          </div>
        </header>

        {/* 1. Quick Stats Grid (New) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Active Students', val: '12', icon: Users, c: 'text-violet-600', b: 'bg-violet-50' },
            { label: 'Courses', val: '4 Active', icon: BookOpen, c: 'text-pink-600', b: 'bg-pink-50' },
            { label: 'Rating', val: '4.9/5.0', icon: Star, c: 'text-amber-500', b: 'bg-amber-50' },
            { label: 'Hours', val: '124 Hrs', icon: Clock, c: 'text-emerald-600', b: 'bg-emerald-50' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-[2rem] p-5 border border-slate-100 shadow-lg shadow-slate-200/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className={`w-10 h-10 ${stat.b} ${stat.c} rounded-2xl flex items-center justify-center mb-3`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className="text-xl font-bold text-slate-900 leading-tight">{stat.val}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* 2. Main Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-8">

          {/* LEFT COLUMN (8 cols) */}
          <div className="lg:col-span-8 space-y-6 lg:space-y-8 animate-in slide-in-from-bottom-8 duration-700 delay-100">

            {/* Student Progress Tracker */}
            <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 border border-slate-100 shadow-xl shadow-slate-200/30">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                  <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600"><Users className="w-5 h-5" /></div>
                  Student Progress
                </h2>
                <button className="text-indigo-600 font-bold text-xs uppercase tracking-wider hover:underline">View All</button>
              </div>

              <div className="space-y-4">
                {studentProgress.map((student, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-slate-50/50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-lg hover:shadow-slate-200/20 transition-all duration-300 group cursor-pointer">
                    <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4 items-center">
                      <div className="col-span-2 sm:col-span-1 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 text-sm">{student.name.charAt(0)}</div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm">{student.name}</div>
                          <div className="text-xs font-semibold text-slate-400 mt-0.5 line-clamp-1">{student.courseName}</div>
                        </div>
                      </div>
                      <div className="hidden sm:block">
                        <div className="text-sm font-bold text-slate-700">{student.assignments}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Tasks</div>
                      </div>
                      <div className="hidden sm:block">
                        <div className="text-sm font-bold text-slate-700">{student.progress}%</div>
                        <div className="w-16 h-1.5 bg-slate-200 rounded-full mt-1 overflow-hidden">
                          <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${student.progress}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-700">{student.meeting}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Next Call</div>
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-4 flex justify-end">
                      <div className={`px-4 py-1.5 rounded-full text-xs font-bold ${getStatusColor(student.status)} border-0 shadow-sm`}>
                        {student.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Analytics Area */}
            <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 border border-slate-100 shadow-xl shadow-slate-200/30">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                  <div className="p-2.5 bg-purple-50 rounded-xl text-purple-600"><TrendingUp className="w-5 h-5" /></div>
                  Engagement Analytics
                </h2>
                <div className="relative">
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="appearance-none bg-slate-50 hover:bg-slate-100 rounded-xl px-4 py-2 pr-8 border border-slate-200 text-slate-700 font-bold text-xs focus:ring-2 focus:ring-purple-100 transition-all cursor-pointer"
                  >
                    <option>Last 30 days</option>
                    <option>This Week</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Chart */}
                <div className="h-48 bg-slate-50 rounded-2xl flex items-end justify-between p-6 px-8 border border-slate-100">
                  {[35, 55, 45, 70, 50, 85, 60, 75].map((h, i) => (
                    <div key={i} className="w-3 md:w-4 bg-gradient-to-t from-purple-500 to-indigo-500 rounded-full hover:scale-y-110 transition-transform origin-bottom duration-500" style={{ height: `${h}%` }}></div>
                  ))}
                </div>

                {/* Stats List */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Traffic Sources</h3>
                  {profileVisits.map((visit, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-100 shadow-sm">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${index % 2 === 0 ? 'bg-indigo-500' : 'bg-purple-500'}`}></div>
                        <span className="text-sm font-bold text-slate-600">{visit.source}</span>
                      </div>
                      <span className="text-sm font-bold text-slate-900">{visit.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN (4 cols) */}
          <div className="lg:col-span-4 space-y-6 animate-in slide-in-from-bottom-8 duration-700 delay-200 order-first lg:order-last">

            {/* Earnings Card (Premium Light) */}
            <div className="bg-white rounded-[2.5rem] p-8 text-slate-900 shadow-2xl shadow-slate-200/20 relative overflow-hidden group border border-slate-100">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 to-teal-500"></div>

              <div className="relative z-10 flex flex-col h-full justify-between min-h-[220px]">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold border border-emerald-100 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> +8.4%
                  </span>
                </div>

                <div>
                  <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">Total Earnings</p>
                  <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">$96,000<span className="text-2xl text-slate-400">.00</span></h3>
                  <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors shadow-lg">View Withdrawals</button>
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 border border-slate-100 shadow-xl shadow-slate-200/30">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-3">
                  <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600"><Calendar className="w-5 h-5" /></div>
                  Upcoming
                </h2>
              </div>

              <div className="space-y-0 relative">
                {/* Timeline Line */}
                <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-slate-100"></div>

                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex gap-4 relative py-3 group">
                    <div className="relative z-10 w-10 h-10 rounded-full bg-white border-4 border-blue-50 flex items-center justify-center shrink-0 shadow-sm group-hover:border-blue-100 transition-colors">
                      <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
                    </div>
                    <div className="flex-1 bg-slate-50 rounded-2xl p-4 border border-slate-100 group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-slate-900 text-sm">{event.course}</h4>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">{event.time}</span>
                      </div>
                      <p className="text-xs font-semibold text-blue-600">{event.day}, {event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* 3. Your Circles Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Your Circles</h2>
            <button className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors text-sm hover:underline">View All</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {circles.map((circle, index) => (
              <div key={index} className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/20 border border-slate-100 group hover:-translate-y-1 transition-all duration-300">
                <div className={`h-32 bg-gradient-to-r ${circle.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute bottom-4 left-6">
                    <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider mb-2 inline-block border border-white/20">Community</span>
                    <h3 className="text-white font-bold text-xl leading-tight">{circle.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-slate-500 text-sm mb-6 leading-relaxed font-medium line-clamp-2">{circle.description}</p>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex -space-x-3">
                      {Array.from({ length: Math.min(circle.members, 5) }).map((_, idx) => (
                        <div key={idx} className="w-9 h-9 bg-slate-200 rounded-full border-2 border-white flex items-center justify-center text-xs shadow-md"></div>
                      ))}
                      <div className="w-9 h-9 bg-slate-100 rounded-full border-2 border-white flex items-center justify-center shadow-md font-bold text-xs text-slate-500">
                        +4
                      </div>
                    </div>
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">{circle.totalCircles}</span>
                  </div>

                  <button className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-2xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20">
                    Join Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default Dashmentor;