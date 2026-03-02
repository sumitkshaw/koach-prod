import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, ChevronDown, Users, Calendar, FileText, Target } from 'lucide-react';
import Navigation from '../Navigation';
import Sidenav from './Sidenav';
import Footer from '../Footer';

const Calen = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date(2025, 4, 1)); // May 2025
  const [selectedDate, setSelectedDate] = useState(13);
  const [searchTerm, setSearchTerm] = useState('');

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const events = [
    {
      id: 1,
      title: "Event Purpose",
      mentor: "Mentor",
      invitedGuests: "(# any)",
      date: "Date",
      time: "Join meet 30 minutes early",
      access: "Access to study materials/ submissions",
      goal: "Goal of the meeting",
      instructions: "Other instructions",
      priority: "high"
    },
    {
      id: 2,
      title: "Event Purpose",
      mentor: "Mentor",
      invitedGuests: "(# any)",
      date: "Date",
      time: "Join meet 30 minutes early",
      access: "Access to study materials/ submissions",
      goal: "Goal of the meeting",
      instructions: "Other instructions",
      priority: "medium"
    },
    {
      id: 3,
      title: "Event Purpose",
      mentor: "Mentor",
      invitedGuests: "(# any)",
      date: "Date",
      time: "Join meet 30 minutes early",
      access: "Access to study materials/ submissions",
      goal: "Goal of the meeting",
      instructions: "Other instructions",
      priority: "low"
    }
  ];

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Previous month's trailing days
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 0);
    const daysInPrevMonth = prevMonth.getDate();
    
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
        isToday: false
      });
    }

    // Current month days
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = today.getDate() === day && 
                     today.getMonth() === currentDate.getMonth() && 
                     today.getFullYear() === currentDate.getFullYear();
      
      days.push({
        day,
        isCurrentMonth: true,
        isToday,
        hasEvent: day === 13 || day === 20 || day === 27 // Sample event days
      });
    }

    // Next month's leading days
    const totalCells = 42; // 6 weeks * 7 days
    const remainingCells = totalCells - days.length;
    for (let day = 1; day <= remainingCells; day++) {
      days.push({
        day,
        isCurrentMonth: false,
        isToday: false
      });
    }

    return days;
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Navigation/>
      <Sidenav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} currentRoute="/dashboard/calendar" />

      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-20 left-4 z-30 lg:hidden bg-white/80 backdrop-blur-lg p-2 rounded-xl shadow-lg border border-white/20"
      >
      </button>

      
      {/* Main Content */}
      <div className={`pt-16 transition-all duration-300`}>
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto">

            <div className="pt-4 sm:pt-6 mb-6 sm:mb-8">
              <div className="bg-blue-600 text-white px-4 sm:px-6 md:px-8 py-4 sm:py-6 rounded-xl sm:rounded-2xl flex items-center justify-between shadow-lg">
                <h1 className="text-xl sm:text-2xl font-bold tracking-wide">Calendar</h1>
                <Calendar className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
            </div>

            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Left Side - Calendar */}
              <div className="lg:col-span-1">
                <div className="bg-white/70 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
                  {/* Calendar Header */}
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-gray-800">
                      {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h2>
                    <div className="flex items-center space-x-1">
                      <button 
                        onClick={() => navigateMonth(-1)}
                        className="w-8 h-8 bg-white/50 hover:bg-white/70 rounded-lg flex items-center justify-center transition-all"
                      >
                        <ChevronLeft className="w-4 h-4 text-gray-600" />
                      </button>
                      <button 
                        onClick={() => navigateMonth(1)}
                        className="w-8 h-8 bg-white/50 hover:bg-white/70 rounded-lg flex items-center justify-center transition-all"
                      >
                        <ChevronRight className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                      <div key={index} className="text-center text-xs font-semibold text-gray-500 p-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {generateCalendarDays().map((dayObj, index) => (
                      <button
                        key={index}
                        onClick={() => dayObj.isCurrentMonth && setSelectedDate(dayObj.day)}
                        className={`
                          relative w-8 h-8 text-xs rounded-lg transition-all duration-200
                          ${dayObj.isCurrentMonth 
                            ? dayObj.isToday
                              ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold'
                              : selectedDate === dayObj.day
                                ? 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 font-semibold'
                                : dayObj.hasEvent
                                  ? 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 hover:bg-yellow-200'
                                  : 'text-gray-700 hover:bg-gray-100'
                            : 'text-gray-400'
                          }
                        `}
                      >
                        {dayObj.day}
                        {dayObj.hasEvent && dayObj.isCurrentMonth && (
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></div>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Search for people */}
                  <div className="mt-6 pt-4 border-t border-gray-200/50">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>Search for people</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Events */}
              <div className="lg:col-span-3">
                <div className="mb-6">
                  {/* Today Filter */}
                  <div className="flex items-center gap-4 mb-4">
                    <button className="px-4 py-2 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-white/70 transition-all">
                      Today
                    </button>
                    <button className="px-4 py-2 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-white/70 transition-all flex items-center gap-2">
                      May
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Search and Filters */}
                  <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search by name, profession"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                    <div className="flex gap-2">
                      <select className="px-4 py-2.5 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                        <option>Tags</option>
                        <option>Work</option>
                        <option>Personal</option>
                        <option>Study</option>
                      </select>
                      <select className="px-4 py-2.5 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                        <option>Mentors</option>
                        <option>All Mentors</option>
                        <option>Available</option>
                        <option>Busy</option>
                      </select>
                      <select className="px-4 py-2.5 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                        <option>Topic</option>
                        <option>UX Design</option>
                        <option>Finance</option>
                        <option>Development</option>
                      </select>
                      <select className="px-4 py-2.5 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                        <option>Time</option>
                        <option>Morning</option>
                        <option>Afternoon</option>
                        <option>Evening</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Events List */}
                <div className="space-y-4">
                  {events.map((event, index) => (
                    <div key={event.id} className="bg-white/70 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
                      <div className="flex flex-col lg:flex-row gap-6">
                        {/* Left Content */}
                        <div className="flex-1">
                          {/* Event Header */}
                          <div className="flex items-center gap-3 mb-4">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-800">{event.title}</h3>
                            <div className="flex gap-1">
                              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            </div>
                          </div>

                          {/* Event Details */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className="mb-2">
                                <span className="font-semibold text-gray-700">Mentor:</span>
                                <div className="text-gray-600">{event.mentor}</div>
                              </div>
                              <div className="mb-2">
                                <span className="font-semibold text-gray-700">Invited Guests {event.invitedGuests}:</span>
                              </div>
                              <div className="mb-2">
                                <span className="font-semibold text-gray-700">{event.date}</span>
                              </div>
                              <div className="mb-2">
                                <span className="font-semibold text-gray-700">Time:</span>
                                <div className="text-gray-600">• {event.time}</div>
                                <div className="text-gray-600">• {event.instructions}</div>
                              </div>
                            </div>
                            <div>
                              <div className="mb-2">
                                <span className="font-semibold text-gray-700">{event.access}</span>
                              </div>
                              <div className="mb-2">
                                <span className="font-semibold text-gray-700">{event.goal}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right Actions */}
                        <div className="flex flex-col gap-3 lg:w-48">
                          <button className="w-full bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-500 hover:to-amber-500 text-gray-800 font-bold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                            Join Event
                          </button>
                          <button className="w-full bg-white/50 hover:bg-white/70 border border-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md">
                            Reschedule Event
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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

export default Calen;