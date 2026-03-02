import React, { useState, useRef, useEffect } from 'react';
import { Settings as SettingsIcon, User, Bell, Target, BookOpen, Users, Shield, HelpCircle, ExternalLink, Globe, Calendar, MapPin, Briefcase, Star, Mail, Phone, Map, Linkedin, Link as LinkIcon, Edit2, Download, FileText, Menu, ChevronDown, Check, Flame, Trophy, Clock, CheckCircle, Smartphone } from 'lucide-react';
import Navigation from '../Navigation';
import Sidenav from './Sidenav';
import Footer from '../Footer';

import { useAuth } from '../../utils/AuthContext';

const Settings1 = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Profile');

  // Status Dropdown State
  const [careerStatus, setCareerStatus] = useState('Open to Work');
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const statusRef = useRef(null);
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(null);

  // Load saved profile image
  useEffect(() => {
    if (user?.$id) {
      const savedImage = localStorage.getItem(`profile_image_${user.$id}`);
      if (savedImage) {
        setProfileImage(savedImage);
      }
    }
  }, [user]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setProfileImage(base64String);
        if (user?.$id) {
          localStorage.setItem(`profile_image_${user.$id}`, base64String);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const careerOptions = [
    { label: 'Open to Work', color: 'text-emerald-600', icon: Target, bg: 'bg-emerald-50' },
    { label: 'Currently Employed', color: 'text-blue-600', icon: Briefcase, bg: 'bg-blue-50' },
    { label: 'Freelancing', color: 'text-purple-600', icon: Star, bg: 'bg-purple-50' },
    { label: 'Not Looking', color: 'text-slate-500', icon: Shield, bg: 'bg-slate-50' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (statusRef.current && !statusRef.current.contains(event.target)) {
        setStatusDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const sidebarItems = [
    { name: 'General', icon: SettingsIcon },
    { name: 'Profile', icon: User },
    // { name: 'Notifications', icon: Bell },
    { name: 'Goals', icon: Target },
    { name: 'Password & Privacy', icon: Shield },
    // { name: 'Security & 2FA', icon: Shield }
  ];

  const ProfileContent = () => (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8 animate-in slide-in-from-bottom-4 duration-700">
      {/* Left Column (Main Content) */}
      <div className="xl:col-span-8 space-y-6 lg:space-y-8">

        {/* Main Header Card */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/20 border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none group-hover:bg-blue-100/50 transition-colors duration-500"></div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
            {/* Avatar */}
            <div className="relative group flex-shrink-0">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              <div
                className={`w-28 h-28 lg:w-32 lg:h-32 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-[2rem] flex items-center justify-center text-white text-4xl font-bold shadow-2xl shadow-blue-500/30 overflow-hidden transform group-hover:scale-105 transition-all duration-300 ${profileImage ? 'bg-white' : ''}`}
              >
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  getInitials(user?.name || user?.email)
                )}
              </div>
              <button
                onClick={() => fileInputRef.current.click()}
                className="absolute -bottom-2 -right-2 bg-white p-3 rounded-2xl shadow-lg border border-slate-100 text-blue-600 hover:text-blue-700 hover:scale-110 transition-all"
              >
                <Edit2 className="w-5 h-5" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left w-full min-w-0 space-y-4">
              <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 truncate max-w-[200px] md:max-w-md tracking-tight">{user?.name || "User Name"}</h2>
                  <p className="text-slate-500 font-medium text-lg">Mentee • Software Engineer</p>
                </div>
                <button className="flex items-center gap-2 bg-[#0077B5] text-white px-6 py-3 rounded-xl hover:bg-[#006097] transition-all shadow-lg shadow-blue-500/20 text-sm font-bold whitespace-nowrap hover:-translate-y-1">
                  <Linkedin className="w-4 h-4" />
                  <span>Connect LinkedIn</span>
                </button>
              </div>

              {/* Internal Tabs */}
              <div className="flex items-center gap-1 bg-slate-50/50 p-1.5 rounded-2xl w-fit mx-auto md:mx-0 border border-slate-100/50">
                <button className="px-5 py-2.5 bg-white text-slate-900 font-bold rounded-xl shadow-sm text-sm">Overview</button>
                <button className="px-5 py-2.5 text-slate-500 font-bold hover:text-slate-700 hover:bg-slate-100/50 rounded-xl transition-all text-sm">Notes</button>
                <button className="px-5 py-2.5 text-slate-500 font-bold hover:text-slate-700 hover:bg-slate-100/50 rounded-xl transition-all text-sm">History</button>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information Form */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/20 border border-slate-100">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <User className="w-5 h-5" />
              </div>
              Personal Information
            </h3>
            <button className="text-slate-400 hover:text-blue-600 transition-colors p-2 hover:bg-blue-50 rounded-xl">
              <Edit2 className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Email Field */}
            <div className="group">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100 hover:border-blue-200 hover:bg-slate-50 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex-shrink-0 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5 block">Email Address</label>
                  <input
                    type="email"
                    defaultValue={user?.email}
                    disabled
                    className="w-full bg-transparent border-none text-slate-900 font-bold p-0 focus:ring-0 text-base h-auto placeholder-slate-400 truncate"
                  />
                </div>
              </div>
            </div>

            {/* Language Field */}
            <div className="group">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100 hover:border-blue-200 hover:bg-slate-50 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex-shrink-0 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                  <Globe className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5 block">Language</label>
                  <input
                    type="text"
                    defaultValue="English, Spanish"
                    className="w-full bg-transparent border-none text-slate-900 font-bold p-0 focus:ring-0 text-base h-auto placeholder-slate-400"
                  />
                </div>
              </div>
            </div>

            <div className="group">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100 hover:border-blue-200 hover:bg-slate-50 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex-shrink-0 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5 block">Job Title</label>
                  <input
                    type="text"
                    defaultValue="Software Engineer"
                    className="w-full bg-transparent border-none text-slate-900 font-bold p-0 focus:ring-0 text-base h-auto placeholder-slate-400"
                  />
                </div>
              </div>
            </div>

            <div className="group">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100 hover:border-blue-200 hover:bg-slate-50 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex-shrink-0 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5 block">Location</label>
                  <input
                    type="text"
                    placeholder="Add Location"
                    className="w-full bg-transparent border-none text-slate-900 font-bold p-0 focus:ring-0 text-base h-auto placeholder-slate-400"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label className="text-sm font-bold text-slate-900 mb-3 block ml-1">Learning Bio</label>
              <textarea
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 text-base text-slate-700 resize-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium leading-relaxed"
                rows="4"
                placeholder="Tell us about yourself..."
              ></textarea>
            </div>

          </div>
        </div>

        {/* Resume/Download Section */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/20 border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6 hover:-translate-y-1 transition-transform duration-300">
          <div className="flex items-center gap-6 w-full sm:w-auto">
            <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 shadow-sm">
              <FileText className="w-8 h-8" />
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-slate-900 truncate text-lg">resume-file.pdf</h4>
              <p className="text-sm text-slate-500 font-medium truncate">2.4 MB • Uploaded on Feb 2, 2024</p>
            </div>
          </div>
          <button className="w-full sm:w-auto bg-[#2D488F] text-white px-8 py-4 rounded-xl text-sm font-bold hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 whitespace-nowrap hover:scale-105">
            <Download className="w-5 h-5" />
            Download Resume
          </button>
        </div>
      </div>

      {/* Right Column (Widgets) */}
      <div className="xl:col-span-4 space-y-6">

        {/* Learning Activity Widget */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/20 border border-slate-100">
          <h3 className="font-bold text-slate-900 mb-6 text-xl flex items-center gap-2">
            <Flame className="w-6 h-6 text-orange-500 fill-orange-500" />
            Learning Activity
          </h3>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-orange-50 border border-orange-100/50 hover:bg-white hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-orange-500 shadow-sm border border-orange-100 group-hover:scale-110 transition-transform duration-300">
                <Flame className="w-6 h-6 fill-current" />
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <p className="text-2xl font-bold text-slate-900">12</p>
                  <span className="text-xs font-bold text-orange-600 tracking-wider">DAYS</span>
                </div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wide">Current Streak</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-100/50 hover:bg-white hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-blue-500 shadow-sm border border-blue-100 group-hover:scale-105 transition-transform duration-300">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <p className="text-2xl font-bold text-slate-900">145</p>
                  <span className="text-xs font-bold text-blue-600 tracking-wider">TOTAL</span>
                </div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wide">Days Learning</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-purple-50 border border-purple-100/50 hover:bg-white hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-purple-500 shadow-sm border border-purple-100 group-hover:scale-105 transition-transform duration-300">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <p className="text-2xl font-bold text-slate-900">24</p>
                  <span className="text-xs font-bold text-purple-600 tracking-wider">SESSIONS</span>
                </div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wide">Completed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Career Status Widget Dropdown */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/20 border border-slate-100 relative z-20" ref={statusRef}>
          <h3 className="font-bold text-slate-900 mb-6 text-xl">Career Status</h3>
          <div
            className="bg-slate-50 rounded-2xl p-4 flex justify-between items-center cursor-pointer hover:bg-slate-100 transition-all border border-slate-200 group relative"
            onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
          >
            <div className="flex items-center gap-3">
              <div className={`w-2.5 h-2.5 rounded-full ${careerOptions.find(o => o.label === careerStatus)?.color.replace('text-', 'bg-') || 'bg-slate-400'} animate-pulse`}></div>
              <span className={`text-sm font-bold transition-colors ${careerOptions.find(o => o.label === careerStatus)?.color || 'text-slate-700'}`}>
                {careerStatus}
              </span>
            </div>
            <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${statusDropdownOpen ? 'rotate-180' : ''}`} />
          </div>

          {/* Dropdown Menu */}
          {statusDropdownOpen && (
            <div className="absolute top-[85%] left-8 right-8 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
              {careerOptions.map((option) => (
                <div
                  key={option.label}
                  className="flex items-center gap-3 p-4 hover:bg-slate-50 cursor-pointer transition-colors border-b border-slate-50 last:border-0"
                  onClick={() => {
                    setCareerStatus(option.label);
                    setStatusDropdownOpen(false);
                  }}
                >
                  <div className={`p-2 rounded-lg ${option.bg} ${option.color}`}>
                    <option.icon className="w-4 h-4" />
                  </div>
                  <span className={`text-sm font-bold ${option.label === careerStatus ? 'text-slate-900' : 'text-slate-500'}`}>
                    {option.label}
                  </span>
                  {option.label === careerStatus && <Check className="w-4 h-4 ml-auto text-blue-600" />}
                </div>
              ))}
            </div>
          )}
        </div>


        {/* Social presence widget */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/20 border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-900 text-xl">Social Accounts</h3>
            <button className="text-blue-600 text-sm font-bold hover:underline">Edit</button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-white hover:shadow-lg transition-all group cursor-pointer">
              <div className="w-12 h-12 bg-[#0077B5] rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                <Linkedin className="w-6 h-6" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-bold text-slate-900 truncate">LinkedIn</p>
                <p className="text-xs text-slate-500 truncate font-medium mt-0.5 group-hover:text-blue-600">linkedin.com/in/user</p>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-blue-500" />
            </div>

            <div className="flex items-center gap-4 p-4 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-gray-200 hover:bg-white hover:shadow-lg transition-all group cursor-pointer">
              <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg shadow-slate-900/30 group-hover:scale-110 transition-transform">
                <LinkIcon className="w-6 h-6" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-bold text-slate-900 truncate">Portfolio</p>
                <p className="text-xs text-slate-500 truncate font-medium mt-0.5 group-hover:text-amber-600">portfolio.com</p>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-slate-900" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );

  const GeneralContent = () => (
    <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-xl shadow-slate-200/20 border border-slate-100 animate-in slide-in-from-bottom-4 duration-700">
      <h3 className="text-2xl font-bold text-slate-900 mb-4">General Settings</h3>
      <p className="text-slate-500 font-medium text-lg">General settings content will be displayed here.</p>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'Profile':
        return <ProfileContent />;
      case 'General':
        return <GeneralContent />;
      default:
        return (
          <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-xl shadow-slate-200/20 border border-slate-100 animate-in slide-in-from-bottom-4 duration-700">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">{activeTab}</h3>
            <p className="text-slate-500 font-medium text-lg">{activeTab} settings content will be displayed here.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-dm relative overflow-x-hidden">

      {/* Background Atmosphere */}
      <div className="fixed top-0 left-0 w-full h-[800px] bg-gradient-to-b from-blue-50/50 via-indigo-50/30 to-transparent pointer-events-none z-0"></div>
      <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-100/40 blur-[120px] pointer-events-none z-0"></div>

      <div className="relative z-10">
        <Navigation />
        <Sidenav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} currentRoute="/dashboard/settings" />

        {/* Main Content - Dynamic Left Margin */}
        <div className={`pt-24 transition-all duration-300 ${sidebarOpen ? 'lg:ml-20' : 'lg:ml-0'}`}>
          <div className="px-4 sm:px-6 lg:px-8 py-8 flex justify-center">
            <div className="w-full max-w-[1400px]">
              {/* Page Header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pl-4">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                    Account <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Settings</span>
                  </h1>
                </div>
              </div>

              {/* Layout Grid */}
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Settings Sidebar - Sticky & Premium */}
                <div className="w-full lg:w-72 flex-shrink-0">
                  <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/20 border border-slate-100 overflow-hidden lg:sticky lg:top-32 p-4">
                    <nav className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-2 custom-scrollbar p-1">
                      {sidebarItems.map((item) => {
                        const IconComponent = item.icon;
                        const isActive = activeTab === item.name;

                        return (
                          <button
                            key={item.name}
                            onClick={() => setActiveTab(item.name)}
                            className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 text-sm font-bold whitespace-nowrap lg:whitespace-normal group flex-shrink-0 ${isActive
                              ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-100'
                              : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                              }`}
                          >
                            <IconComponent className={`w-5 h-5 flex-shrink-0 transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}`} />
                            <span>{item.name}</span>
                            {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse hidden lg:block"></div>}
                          </button>
                        );
                      })}
                    </nav>
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 min-w-0">
                  {renderContent()}
                </div>
              </div>
            </div>
          </div>

          <div className="pb-8">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings1;