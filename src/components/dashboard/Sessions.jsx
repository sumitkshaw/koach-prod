import React, { useState, useEffect } from 'react';
import { ChevronRight, Search, ChevronDown, ChevronUp, Clock, FileText, Calendar, Download, Plus, Loader2 } from 'lucide-react';
import Navigation from '../Navigation';
import Sidenav from './Sidenav';
import Footer from '../Footer';
import { getMenteeBookings } from '../../services/bookingService';
import { useAuth } from '../../utils/AuthContext';

const Sessions = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSessions, setExpandedSessions] = useState({});
  const [pastSessions, setPastSessions] = useState([]);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [sessionNotes, setSessionNotes] = useState([]);
  const [apiLoading, setApiLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.$id) {
      setApiLoading(false);
      return;
    }
    const fetchBookings = async () => {
      try {
        const data = await getMenteeBookings(user.$id);
        const docs = data.documents || [];
        const now = new Date();
        const upcoming = docs
          .filter(d => new Date(d.sessionDate) > now && d.status !== 'cancelled')
          .map(d => ({
            id: d.$id,
            title: `Session on ${new Date(d.sessionDate).toLocaleString()}`,
            avatar: (d.menteeName || 'Me').slice(0, 2).toUpperCase(),
            profile: 'View Booking',
          }));
        const past = docs
          .filter(d => new Date(d.sessionDate) <= now || d.status === 'completed')
          .map(d => ({
            id: d.$id,
            date: new Date(d.sessionDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            mentorName: 'Mentor Session',
            sessionType: d.notes || 'Session',
            duration: `${d.duration} min`,
            tags: ['Session'],
            sessionNotes: d.notes ? [d.notes] : [],
            attachments: [],
            attendees: [],
            status: d.status,
          }));
        setUpcomingSessions(upcoming);
        setPastSessions(past);
        setSessionNotes(upcoming.map((s, i) => ({ id: i + 1, text: s.title, notes: 'View Notes' })));
      } catch (err) {
        console.error('[Sessions] fetch error:', err);
        // Keep empty arrays — graceful empty state
      } finally {
        setApiLoading(false);
      }
    };
    fetchBookings();
  }, [user]);

  // Demo data for when no real bookings exist yet
  const demoSessionNotes = [
    { id: 1, text: 'Andrea posted 3 activities to complete', notes: 'View Notes' },
    { id: 2, text: 'Andrea posted 3 activities to complete', notes: 'View Notes' },
  ];
  const demoUpcoming = [
    { id: 1, title: 'Andrea Watson at 3:00 pm', profile: 'View Profile', avatar: 'AW' },
    { id: 2, title: 'Andrea Watson at 3:00 pm', profile: 'View Profile', avatar: 'AW' },
  ];
  const demoPast = [
    {
      id: 1, date: 'April 10th, 2024', mentorName: 'Mentor Session',
      sessionType: 'Public Speaking Help', duration: '30 min',
      tags: ['Performance', 'Leadership', 'Career', 'Marketing', 'Product'],
      sessionNotes: ['Prepare, prepare, and prepare some more. Practice—a lot.'],
      attachments: [{ name: 'More_Public_Speaking_Tips.pdf', icon: '📄' }],
      attendees: [{ name: 'Andrea Watson', task: 'Watch Figma Tutorial on Auto Layout', dueDate: 'Due May 26', avatar: 'AW', link: 'Front End Development' }],
    },
  ];

  const displayNotes = sessionNotes.length > 0 ? sessionNotes : (!apiLoading ? demoSessionNotes : []);
  const displayUpcoming = upcomingSessions.length > 0 ? upcomingSessions : (!apiLoading ? demoUpcoming : []);
  const displayPast = pastSessions.length > 0 ? pastSessions : (!apiLoading ? demoPast : []);
  const displayPastFiltered = displayPast.filter(s =>
    !searchTerm ||
    s.date?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.sessionType?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTagColor = (tag) => {
    const colors = {
      Performance: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      Leadership: 'bg-green-100 text-green-700 border-green-200',
      Career: 'bg-purple-100 text-purple-700 border-purple-200',
      Marketing: 'bg-pink-100 text-pink-700 border-pink-200',
      Product: 'bg-blue-100 text-blue-700 border-blue-200',
      Session: 'bg-blue-100 text-blue-700 border-blue-200',
    };
    return colors[tag] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const toggleSessionExpansion = (sessionId) => {
    setExpandedSessions(prev => ({ ...prev, [sessionId]: !prev[sessionId] }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation/>
      <Sidenav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} currentRoute="/dashboard/sessions" />

      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-20 left-4 z-30 lg:hidden bg-white p-2 rounded-xl shadow-lg border"
      >
      </button>

      {/* Main Content */}
      <div className={`pt-16 transition-all duration-300`}>
        <div className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
          <div className="max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="pt-11 mb-8">
              <div className="bg-blue-600 text-white px-8 py-6 rounded-2xl flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-wide">Sessions</h1>
                <Calendar className="w-8 h-8" />
              </div>
            </div>

            {apiLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
              </div>
            ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Left Column - Your Session Notes */}
              <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border">
                <div className="p-4 sm:p-6 border-b border-gray-100">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center">
                    📝 Your Session Notes
                  </h2>
                </div>
                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  {displayNotes.length === 0 ? (
                    <p className="text-sm text-gray-400">No session notes yet.</p>
                  ) : displayNotes.map((note) => (
                    <div key={note.id} className="flex items-start justify-between gap-3">
                      <div className="flex items-start space-x-2 sm:space-x-3 flex-1 min-w-0">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                          <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-600" />
                        </div>
                        <span className="text-xs sm:text-sm text-gray-700 leading-relaxed break-words">{note.text}</span>
                      </div>
                      <button className="text-blue-600 text-xs sm:text-sm font-medium hover:text-blue-800 whitespace-nowrap flex-shrink-0">
                        {note.notes}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Next Session Date */}
              <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border">
                <div className="p-4 sm:p-6 border-b border-gray-100">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center">
                    📅 Next Session Date
                  </h2>
                </div>
                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  {displayUpcoming.length === 0 ? (
                    <p className="text-sm text-gray-400">No upcoming sessions scheduled.</p>
                  ) : displayUpcoming.map((session) => (
                    <div key={session.id} className="flex items-center justify-between gap-3">
                      <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-semibold flex-shrink-0">
                          {session.avatar}
                        </div>
                        <span className="text-xs sm:text-sm text-gray-700 truncate">{session.title}</span>
                      </div>
                      <button className="text-blue-600 text-xs sm:text-sm font-medium hover:text-blue-800 whitespace-nowrap flex-shrink-0">
                        {session.profile}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            )}
            {/* Past Sessions */}
            {!apiLoading && (
            <div className="mt-6 sm:mt-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Past Sessions</h2>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <div className="flex items-center gap-2 sm:gap-4">
                    <span className="text-xs sm:text-sm text-gray-500">Sort By:</span>
                    <button className="bg-gray-800 text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium">
                      Recent
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm text-gray-500 hidden sm:inline">Search Sessions</span>
                    <div className="relative flex-1 sm:flex-none">
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                      <input
                        type="text"
                        placeholder="Search sessions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full sm:w-48 pr-8 sm:pr-10 pl-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* This Past Month Header */}
              <div className="mb-3 sm:mb-4">
                <h3 className="text-sm sm:text-base text-gray-600 font-medium">This Past Month</h3>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {displayPastFiltered.length === 0 ? (
                  <p className="text-sm text-gray-400 py-6 text-center">No past sessions yet.</p>
                ) : displayPastFiltered.map((session) => (
                  <div key={session.id} className="bg-white rounded-lg sm:rounded-xl shadow-sm border">
                    {/* Session Header */}
                    <div className="p-4 sm:p-6">
                      <div className="flex items-start sm:items-center justify-between mb-3 sm:mb-4 gap-3">
                        <div className="flex items-start sm:items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                          <div>
                            <h3 className="text-sm sm:text-base font-semibold text-gray-800">{session.date}</h3>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 mt-1">
                              <span className="text-blue-600 font-medium">{session.mentorName}</span>
                              <span className="hidden sm:inline">•</span>
                              <span>{session.sessionType}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
                          <span className="text-xs sm:text-sm text-gray-500">{session.duration}</span>
                          <button 
                            onClick={() => toggleSessionExpansion(session.id)}
                            className="text-gray-400 hover:text-gray-600 p-1"
                          >
                            {expandedSessions[session.id] ? (
                              <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
                            ) : (
                              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                        {session.tags.map((tag, index) => (
                          <span
                            key={index}
                            className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium border ${getTagColor(tag)}`}
                          >
                            {tag}
                          </span>
                        ))}
                        <button className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center text-gray-400 hover:border-gray-400">
                          <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        </button>
                      </div>

                      {/* Expanded Content */}
                      {expandedSessions[session.id] && (
                        <div className="space-y-4 sm:space-y-6 pt-3 sm:pt-4 border-t border-gray-100">
                          {/* Session Notes */}
                          <div>
                            <h4 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Session Notes</h4>
                            <div className="space-y-2 sm:space-y-3">
                              {session.sessionNotes.map((note, index) => (
                                <p key={index} className="text-xs sm:text-sm text-gray-600 leading-relaxed pl-2 sm:pl-0">
                                  • {note}
                                </p>
                              ))}
                            </div>
                          </div>

                          {/* Attachments */}
                          <div>
                            <h4 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Attachments</h4>
                            {session.attachments.map((attachment, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0" />
                                <button className="text-blue-600 text-xs sm:text-sm font-medium hover:text-blue-800 underline break-all">
                                  {attachment.name}
                                </button>
                                <Download className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                              </div>
                            ))}
                          </div>

                          {/* Links to Activities */}
                          <div>
                            <h4 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Links to Activities</h4>
                            <div className="grid grid-cols-1 gap-3 sm:gap-4">
                              {session.attendees.map((attendee, index) => (
                                <div key={index} className="flex items-start justify-between gap-3">
                                  <div className="flex items-start space-x-2 sm:space-x-3 flex-1 min-w-0">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                                      {attendee.avatar}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <p className="text-xs sm:text-sm font-semibold text-gray-800 truncate">{attendee.name}</p>
                                      <p className="text-xs text-gray-600 mb-1 break-words">{attendee.task}</p>
                                      <button className="text-blue-600 text-xs font-medium hover:text-blue-800 break-words">
                                        {attendee.link}
                                      </button>
                                    </div>
                                  </div>
                                  <div className="text-right flex-shrink-0">
                                    <p className="text-xs text-gray-600 whitespace-nowrap">{attendee.dueDate}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            )}
          </div>
        </div>
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Sessions;