import React, { useState, useEffect } from 'react';
import { Users, Search, Loader2 } from 'lucide-react';
import Navigation from '../Navigation';
import Sidenav from './Sidenav';
import Footer from '../Footer';
import { getMentorBookings } from '../../services/bookingService';
import { useAuth } from '../../utils/AuthContext';

const Mentees = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState('Skills');
  const [selectedLanguage, setSelectedLanguage] = useState('Language');
  const [selectedTopic, setSelectedTopic] = useState('Topic');
  const [mentees, setMentees] = useState([]);
  const [apiLoading, setApiLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.$id) { setApiLoading(false); return; }
    const fetchBookings = async () => {
      try {
        const data = await getMentorBookings(user.$id);
        const docs = data.documents || [];
        const mapped = docs.map(d => ({
          name: d.menteeName || 'Mentee',
          courseName: d.notes || '—',
          assignments: '—',
          tests: '—',
          progress: 0,
          meeting: new Date(d.sessionDate).toLocaleDateString(),
          status: d.status === 'confirmed' ? 'Scheduled' : d.status === 'completed' ? 'Completed' : 'Pending',
        }));
        setMentees(mapped);
      } catch (err) {
        console.error('[Mentees] fetch error:', err);
      } finally {
        setApiLoading(false);
      }
    };
    fetchBookings();
  }, [user]);

  // Demo data fallback
  const demoMentees = [
    { name: 'Name of mentee', courseName: 'Course name', assignments: 'Assignments', tests: 'Tests', progress: 85, meeting: 'Meeting', status: 'Scheduled' },
    { name: 'Name of mentee', courseName: 'Course name', assignments: 'Assignments', tests: 'Tests', progress: 72, meeting: 'Meeting', status: 'Completed' },
    { name: 'Name of mentee', courseName: 'Course name', assignments: 'Assignments', tests: 'Tests', progress: 90, meeting: 'Meeting', status: 'Scheduled' },
    { name: 'Name of mentee', courseName: 'Course name', assignments: 'Assignments', tests: 'Tests', progress: 65, meeting: 'Meeting', status: 'Pending' },
    { name: 'Name of mentee', courseName: 'Course name', assignments: 'Assignments', tests: 'Tests', progress: 78, meeting: 'Meeting', status: 'Completed' },
  ];

  const displayMentees = mentees.length > 0 ? mentees : (!apiLoading ? demoMentees : []);
  const filtered = displayMentees.filter(m =>
    !searchQuery || m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700';
      case 'Completed':
        return 'bg-gradient-to-r from-green-100 to-green-200 text-green-700';
      case 'Pending':
        return 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-700';
      default:
        return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'from-green-500 to-emerald-500';
    if (progress >= 60) return 'from-blue-500 to-indigo-500';
    return 'from-yellow-500 to-orange-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Navigation/>
      <Sidenav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} currentRoute="/mentees" />

      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-20 left-4 z-30 lg:hidden bg-white/80 backdrop-blur-lg p-2 rounded-xl shadow-lg border border-white/20"
      >
      </button>

      

      {/* Main Content */}
      <div className={`pt-16 transition-all duration-300`}>
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="pt-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="pt-1 mb-8">
              <div className="bg-blue-600 text-white px-8 py-6 rounded-2xl flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-wide">Meentees</h1>
                <Users className="w-8 h-8" />
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
              <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
                <div className="text-center">
                  <div className="text-sm font-medium text-orange-700 mb-2">Assignments</div>
                  <div className="text-3xl font-bold text-orange-800 mb-2">10</div>
                  <div className="text-xs text-orange-600">100% students have submitted their assignments</div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
                <div className="text-center">
                  <div className="text-sm font-medium text-orange-700 mb-2">Tests</div>
                  <div className="text-3xl font-bold text-orange-800 mb-2">6</div>
                  <div className="text-xs text-orange-600">100% students have attended the tests today</div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
                <div className="text-center">
                  <div className="text-sm font-medium text-orange-700 mb-2">Assignments</div>
                  <div className="text-3xl font-bold text-orange-800 mb-2">10</div>
                  <div className="text-xs text-orange-600">100% students have submitted their assignments</div>
                </div>
              </div>
            </div>

            {/* Student Progress Tracker */}
            <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Student Progress Tracker</h2>
              
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, profession"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  />
                </div>
                
                <div className="flex gap-3">
                  <select 
                    value={selectedSkills}
                    onChange={(e) => setSelectedSkills(e.target.value)}
                    className="px-4 py-3 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 cursor-pointer"
                  >
                    <option>Skills</option>
                    <option>JavaScript</option>
                    <option>React</option>
                    <option>Python</option>
                  </select>
                  
                  <select
                    value={selectedLanguage} 
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="px-4 py-3 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 cursor-pointer"
                  >
                    <option>Language</option>
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                  
                  <select
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)} 
                    className="px-4 py-3 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 cursor-pointer"
                  >
                    <option>Topic</option>
                    <option>Frontend</option>
                    <option>Backend</option>
                    <option>Full Stack</option>
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-2 font-semibold text-gray-700">Name of mentee</th>
                      <th className="text-left py-4 px-2 font-semibold text-gray-700">Course name</th>
                      <th className="text-left py-4 px-2 font-semibold text-gray-700">Assignments</th>
                      <th className="text-left py-4 px-2 font-semibold text-gray-700">Tests</th>
                      <th className="text-left py-4 px-2 font-semibold text-gray-700">Meeting</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apiLoading ? (
                      <tr><td colSpan={5} className="text-center py-8"><Loader2 className="w-6 h-6 text-blue-500 animate-spin mx-auto" /></td></tr>
                    ) : filtered.length === 0 ? (
                      <tr><td colSpan={5} className="text-center py-8 text-gray-400 text-sm">No mentees yet.</td></tr>
                    ) : filtered.map((mentee, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-blue-50/50 transition-all duration-300">
                        <td className="py-4 px-2">
                          <div className="font-medium text-gray-800">{mentee.name}</div>
                        </td>
                        <td className="py-4 px-2">
                          <div className="text-gray-600">{mentee.courseName}</div>
                        </td>
                        <td className="py-4 px-2">
                          <div className="text-gray-600">{mentee.assignments}</div>
                        </td>
                        <td className="py-4 px-2">
                          <div className="text-gray-600">{mentee.tests}</div>
                        </td>
                        <td className="py-4 px-2">
                          <div className="flex flex-col space-y-2">
                            <div className="text-gray-600">{mentee.meeting}</div>
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(mentee.status)} w-fit`}>
                              {mentee.status}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

export default Mentees;