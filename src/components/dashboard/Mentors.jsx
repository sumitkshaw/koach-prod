import React, { useState } from 'react';
import { Search, Star, MapPin, Clock, Calendar, Play, Filter, Award, ChevronRight, User } from 'lucide-react';
import Navigation from '../Navigation';
import Sidenav from './Sidenav';
import Footer from '../Footer';

const Mentors = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  // Mock Data
  const mentors = [
    {
      name: "Sarah Johnson",
      role: "Lead UX Researcher",
      company: "Google",
      domains: ["UI Design", "UX Research", "Prototyping"],
      experience: "5+ Years",
      sessions: "120+",
      rating: 4.9,
      available: "Morning 9AM-4PM",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      color: "blue"
    },
    {
      name: "Michael Chen",
      role: "Senior Product Designer",
      company: "Airbnb",
      domains: ["Product Design", "Design Systems", "Figma"],
      experience: "7+ Years",
      sessions: "200+",
      rating: 4.8,
      available: "Evening 5PM-9PM",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      color: "emerald"
    },
    {
      name: "Emily Davis",
      role: "Creative Director",
      company: "Spotify",
      domains: ["Visual Design", "Brand Identity", "Color Theory"],
      experience: "4+ Years",
      sessions: "85+",
      rating: 4.9,
      available: "Morning 10AM-2PM",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      color: "rose"
    },
    {
      name: "David Kim",
      role: "UX Designer",
      company: "Microsoft",
      domains: ["User Research", "Interaction", "Wireframing"],
      experience: "6+ Years",
      sessions: "150+",
      rating: 4.7,
      available: "Afternoon 1PM-5PM",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      color: "amber"
    }
  ];

  const sessions = [
    {
      title: "Fundamentals of Finance",
      tutor: "John Mitchell",
      date: "02/06/2025",
      time: "6:00PM - 8:00PM"
    },
    {
      title: "React Components Deep Dive",
      tutor: "Sarah Wilson",
      date: "01/06/2025",
      time: "4:00PM - 6:00PM"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-dm relative overflow-x-hidden">

      {/* 1. Background Atmosphere (Matches Dashboard) */}
      <div className="fixed top-0 left-0 w-full h-[800px] bg-gradient-to-b from-blue-50/50 via-indigo-50/30 to-transparent pointer-events-none z-0"></div>
      <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-100/40 blur-[120px] pointer-events-none z-0"></div>

      <div className="relative z-10">
        <Navigation />
        <Sidenav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} currentRoute="/dashboard/mentors" />

        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed bottom-6 right-6 z-50 lg:hidden bg-blue-600 text-white p-4 rounded-full shadow-2xl shadow-blue-600/40 hover:scale-105 transition-transform"
        >
          <Filter className="w-6 h-6" />
        </button>

        <div className="pt-32 md:pt-24 px-4 sm:px-6 lg:px-8 transition-all duration-300 lg:pl-28 max-w-[1600px] mx-auto">

          {/* 2. Header Section */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4 md:mb-8 animate-in slide-in-from-bottom-4 duration-500">
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">
                Connect & Grow
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Mentor</span>
              </h1>
            </div>

            {/* Search Bar */}
            <div className="w-full md:w-96 relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 shadow-sm transition-all hover:bg-slate-50"
                placeholder="Search by name, skill, or company..."
              />
            </div>
          </header>

          {/* 3. Filter Pills */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
            {['All', 'Design', 'Development', 'Marketing', 'Leadership', 'Product'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-200
                          ${activeFilter === filter
                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                    : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50 hover:text-slate-700'
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pb-12">

            {/* --- LEFT COLUMN (Mentors List) --- */}
            <div className="lg:col-span-8 space-y-6 animate-in slide-in-from-bottom-8 duration-700 delay-100">

              {/* Featured Mentor (Large Card) */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-blue-900/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>

                <div className="relative z-10 flex flex-col sm:flex-row gap-8 items-center">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl overflow-hidden border-4 border-white/20 shadow-xl shrink-0">
                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Featured" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider">Top Rated</span>
                      <div className="flex text-yellow-300">
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                      </div>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold mb-1">Jessica Parker</h2>
                    <p className="text-blue-100 font-medium mb-4">Lead Product Designer @ Netflix</p>
                    <p className="text-blue-100/80 text-sm leading-relaxed mb-6 max-w-lg">
                      Expert in Design Systems and User Research. I help designers level up their careers and build impactful products.
                    </p>
                    <button className="bg-white text-blue-900 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg active:scale-95 transform duration-200">
                      Book a Session
                    </button>
                  </div>
                </div>
              </div>

              {/* Mentors Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mentors.map((mentor, index) => (
                  <div key={index} className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-lg shadow-slate-200/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex gap-4">
                        <div className="relative">
                          <img src={mentor.image} alt={mentor.name} className="w-16 h-16 rounded-2xl object-cover shadow-md" />
                          <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                            <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 text-lg">{mentor.name}</h3>
                          <p className="text-slate-500 text-xs font-bold uppercase tracking-wide">{mentor.role}</p>
                          <p className="text-blue-600 text-xs font-bold">{mentor.company}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-1 bg-yellow-50 text-yellow-600 px-2 py-1 rounded-lg">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="text-xs font-bold">{mentor.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {mentor.domains.map((domain, i) => (
                        <span key={i} className="px-2.5 py-1 bg-slate-50 text-slate-600 rounded-lg text-xs font-bold border border-slate-100">
                          {domain}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                      <span className="text-xs font-medium text-slate-400">{mentor.sessions} Sessions</span>
                      <button className="flex items-center gap-1 text-slate-900 font-bold text-sm hover:gap-2 transition-all group-hover:text-blue-600">
                        View Profile <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* --- RIGHT COLUMN (Sidebar Widgets) --- */}
            <div className="lg:col-span-4 space-y-6 animate-in slide-in-from-bottom-8 duration-700 delay-200">

              {/* History Widget */}
              <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-lg shadow-slate-200/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">Recent Sessions</h3>
                </div>

                <div className="space-y-4">
                  {sessions.map((session, i) => (
                    <div key={i} className="flex gap-4 items-start p-3 hover:bg-slate-50/80 rounded-2xl transition-colors cursor-pointer">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold shrink-0">
                        {session.tutor.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{session.title}</h4>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">with {session.tutor}</p>
                        <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wide">{session.date} • {session.time}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-6 py-3 rounded-xl border border-slate-200 text-slate-600 text-sm font-bold hover:bg-slate-50 transition-colors">
                  View All History
                </button>
              </div>

              {/* Quick Stats or Promo */}
              <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-lg shadow-slate-200/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-purple-50 rounded-xl text-purple-600">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">Top Skills</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['React', 'UX Design', 'Leadership', 'Python', 'Public Speaking', 'System Design'].map(skill => (
                    <span key={skill} className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-lg text-xs font-bold border border-slate-100 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 cursor-pointer transition-colors">
                      {skill}
                    </span>
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

export default Mentors;