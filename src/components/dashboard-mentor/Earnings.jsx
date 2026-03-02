import React, { useState } from 'react';
import { Search, Star, MapPin, Clock, Calendar, Play, Filter } from 'lucide-react';
import Navigation from '../Navigation';
import Sidenav from './Sidenav';
import Footer from '../Footer'

const Earnings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Navigation/>
      <Sidenav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} currentRoute="/dashboard/mentors" />

      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-20 left-4 z-30 lg:hidden bg-white/80 backdrop-blur-lg p-2 rounded-xl shadow-lg border border-white/20"
      >
      </button>

      {/* Main Content - Removed lg:ml-64 */}
      <div className={`pt-16 transition-all duration-300`}>
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="pt-6 mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Find Your Perfect Mentor
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">Connect with experienced professionals to accelerate your growth</p>
            </div>

            {/* Search and Filters */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-white/20 mb-6 sm:mb-8">
              <div className="flex flex-col gap-4">
                <div className="relative">
                  <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type="text"
                    placeholder="Search by name, profession..."
                    className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <select className="px-3 sm:px-4 py-2.5 sm:py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base">
                    <option>Skills</option>
                    <option>UX Design</option>
                    <option>Finance</option>
                    <option>Data Science</option>
                  </select>
                  <select className="px-3 sm:px-4 py-2.5 sm:py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base">
                    <option>Language</option>
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Spanish</option>
                  </select>
                  <select className="px-3 sm:px-4 py-2.5 sm:py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base">
                    <option>Topic</option>
                    <option>Career Growth</option>
                    <option>Technical Skills</option>
                    <option>Leadership</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Mentor Cards */}
            <div className="space-y-4 sm:space-y-6">
              {[
                {
                  name: "Sarah Johnson",
                  domains: ["UI Design", "UX Research", "Prototyping", "Wireframe", "Design", "Usability"],
                  experience: "5+ Years",
                  sessions: "120+",
                  rating: 4.9,
                  available: "Available Morning 9AM-4PM",
                  bg: "from-blue-500 to-indigo-600"
                },
                {
                  name: "Michael Chen",
                  domains: ["Product Design", "User Research", "Design Systems", "Figma", "Adobe XD", "Sketch"],
                  experience: "7+ Years",
                  sessions: "200+",
                  rating: 4.8,
                  available: "Available Evening 5PM-9PM",
                  bg: "from-green-500 to-emerald-600"
                },
                {
                  name: "Emily Davis",
                  domains: ["Visual Design", "Brand Identity", "Typography", "Color Theory", "Illustration"],
                  experience: "4+ Years",
                  sessions: "85+",
                  rating: 4.9,
                  available: "Available Morning 10AM-2PM",
                  bg: "from-pink-500 to-rose-600"
                }
              ].map((mentor, index) => (
                <div key={index} className="bg-white/70 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
                  <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                    {/* Profile Section */}
                    <div className="flex items-start gap-3 sm:gap-4 flex-1">
                      <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${mentor.bg} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                        <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white bg-opacity-30 rounded-lg sm:rounded-xl backdrop-blur-sm"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">{mentor.name}</h3>
                        <div className="mb-3">
                          <h4 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">Mentoring Domains:</h4>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {mentor.domains.map((domain, idx) => (
                              <span key={idx} className="px-2 sm:px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full text-xs sm:text-sm font-medium">
                                {domain}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>{mentor.experience} Experience</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>{mentor.sessions} Sessions</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                            <span>{mentor.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Section */}
                    <div className="lg:w-64 xl:w-80 flex flex-col justify-between">
                      <div className="mb-4">
                        <div className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium mb-3 text-center">
                          {mentor.available}
                        </div>
                        <button className="w-full bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-500 hover:to-amber-500 text-gray-800 font-bold py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base">
                          Schedule Session
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-6 sm:mt-8">
              <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors text-sm sm:text-base">
                View All
              </button>
            </div>

            {/* Completed Sessions */}
            <div className="mt-8 sm:mt-12">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Completed Sessions</h2>
                <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors text-xs sm:text-sm">See full history</button>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                {[
                  {
                    title: "Fundamentals of Finance",
                    tutor: "John Mitchell",
                    date: "02/06/2025",
                    startTime: "6:00PM",
                    endTime: "8:00PM"
                  },
                  {
                    title: "Fundamentals of Finance",
                    tutor: "Sarah Wilson",
                    date: "01/06/2025",
                    startTime: "6:00PM",
                    endTime: "8:00PM"
                  },
                  {
                    title: "Fundamentals of Finance",
                    tutor: "Mike Johnson",
                    date: "30/05/2025",
                    startTime: "5:00PM",
                    endTime: "8:00PM"
                  }
                ].map((session, index) => (
                  <div key={index} className="bg-white/70 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                        <Play className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-1">{session.title}</h3>
                        <p className="text-gray-600 mb-2 text-sm sm:text-base">Name of tutor: <span className="font-semibold">{session.tutor}</span></p>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm text-gray-600">
                          <span>{session.date}</span>
                          <span>{session.startTime} - {session.endTime}</span>
                        </div>
                        <button className="text-blue-600 text-xs sm:text-sm font-medium hover:text-blue-700 transition-colors mt-2">
                          View notes and Recording
                        </button>
                      </div>
                      <button className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-500 hover:to-amber-500 text-gray-800 font-bold py-2 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base">
                        Schedule Session
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Mentors */}
            <div className="mt-8 sm:mt-12">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Featured Mentors</h2>
                <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors text-xs sm:text-sm">See more</button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {[
                  { name: "Alex Rivera", role: "UX Designer", experience: "5+ Years of experience", bg: "from-blue-500 to-indigo-600" },
                  { name: "Maya Patel", role: "UX Designer", experience: "3+ Years of experience", bg: "from-green-500 to-emerald-600" },
                  { name: "David Kim", role: "UX Designer", experience: "7+ Years of experience", bg: "from-pink-500 to-rose-600" },
                  { name: "Lisa Chen", role: "UX Designer", experience: "4+ Years of experience", bg: "from-yellow-500 to-orange-600" }
                ].map((mentor, index) => (
                  <div key={index} className="bg-white/70 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${mentor.bg} rounded-xl sm:rounded-2xl mx-auto mb-3 sm:mb-4 flex items-center justify-center shadow-lg`}>
                      <div className="w-6 h-6 sm:w-10 sm:h-10 bg-white bg-opacity-30 rounded-lg sm:rounded-xl backdrop-blur-sm"></div>
                    </div>
                    <div className="text-center">
                      <h3 className="font-bold text-gray-800 mb-1 text-sm sm:text-base">{mentor.name}</h3>
                      <div className="text-xs sm:text-sm text-gray-600 mb-1 font-medium">{mentor.role}</div>
                      <div className="text-xs text-gray-500 mb-3">{mentor.experience}</div>
                      <div className="flex justify-center space-x-1 mb-3 sm:mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-xs sm:text-sm">
                        Connect
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Earnings;