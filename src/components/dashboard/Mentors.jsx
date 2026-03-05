import React, { useState, useEffect, useMemo } from 'react';
import {
  Search, Star, Clock, Filter, Award, ChevronRight,
  Loader2, BookOpen, Sparkles, UserCheck, ArrowRight, Calendar
} from 'lucide-react';
import Navigation from '../Navigation';
import Sidenav from './Sidenav';
import Footer from '../Footer';
import { getMenteeBookings } from '../../services/bookingService';
import { getMentors } from '../../services/mentorService';
import { useAuth } from '../../utils/AuthContext';
import { useNavigate } from 'react-router-dom';

// ── Fallback recommended data (shown when API has no mentors) ─────────────────
const FALLBACK_MENTORS = [
  {
    id: 'f1', name: 'Sarah Johnson', role: 'Lead UX Researcher', company: 'Google',
    skills: ['UI Design', 'UX Research', 'Prototyping'], experience: '5 years',
    rating: 4.9, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=256&q=80',
    hourlyCharge: 150, serviceCategory: 'design', badge: 'Top Rated', badgeType: 'gold',
  },
  {
    id: 'f2', name: 'Michael Chen', role: 'Senior Product Designer', company: 'Airbnb',
    skills: ['Product Design', 'Design Systems', 'Figma'], experience: '7 years',
    rating: 4.8, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=256&q=80',
    hourlyCharge: 180, serviceCategory: 'design', badge: 'Available ASAP', badgeType: 'primary',
  },
  {
    id: 'f3', name: 'Emily Davis', role: 'Creative Director', company: 'Spotify',
    skills: ['Visual Design', 'Brand Identity', 'Color Theory'], experience: '4 years',
    rating: 4.9, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=256&q=80',
    hourlyCharge: 130, serviceCategory: 'design', badge: null, badgeType: 'secondary',
  },
  {
    id: 'f4', name: 'David Kim', role: 'UX Designer', company: 'Microsoft',
    skills: ['User Research', 'Interaction', 'Wireframing'], experience: '6 years',
    rating: 4.7, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=256&q=80',
    hourlyCharge: 120, serviceCategory: 'design', badge: null, badgeType: 'secondary',
  },
  {
    id: 'f5', name: 'Priya Nair', role: 'Full Stack Engineer', company: 'Stripe',
    skills: ['React', 'Node.js', 'AWS'], experience: '5 years',
    rating: 4.9, image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=256&q=80',
    hourlyCharge: 200, serviceCategory: 'backend', badge: 'Top 1%', badgeType: 'gold',
  },
  {
    id: 'f6', name: 'James Okafor', role: 'ML Engineer', company: 'DeepMind',
    skills: ['Python', 'TensorFlow', 'MLOps'], experience: '8 years',
    rating: 5.0, image: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=256&q=80',
    hourlyCharge: 250, serviceCategory: 'data-science', badge: 'Available ASAP', badgeType: 'primary',
  },
];

// ── Rating stars helper ──────────────────────────────────────────────────────
const RatingStars = ({ rating }) => (
  <div className="flex items-center gap-1 bg-amber-50 border border-amber-100 text-amber-600 px-2 py-1 rounded-lg">
    <Star className="w-3 h-3 fill-current" />
    <span className="text-xs font-bold">{Number(rating).toFixed(1)}</span>
  </div>
);

// ── Booked Mentor Card ───────────────────────────────────────────────────────
const BookedMentorCard = ({ booking, onViewProfile }) => {
  const initials = (booking.mentorName || 'M').split(' ').map(n => n[0]).join('').slice(0, 2);
  return (
    <div className="bg-white rounded-[2rem] p-5 border border-slate-100 shadow-lg shadow-slate-200/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0">
          {booking.mentorAvatarUrl
            ? <img src={booking.mentorAvatarUrl} alt={booking.mentorName} className="w-full h-full object-cover rounded-2xl" />
            : initials}
        </div>
        <div className="min-w-0">
          <h3 className="font-bold text-slate-900 truncate">{booking.mentorName || 'Your Mentor'}</h3>
          {booking.mentorRole && <p className="text-xs text-slate-500 font-medium truncate">{booking.mentorRole}</p>}
          {booking.mentorCompany && <p className="text-xs text-blue-600 font-bold truncate">{booking.mentorCompany}</p>}
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border
          ${booking.status === 'confirmed' || booking.status === 'Scheduled'
            ? 'bg-blue-50 text-blue-700 border-blue-100'
            : booking.status === 'completed' || booking.status === 'Completed'
            ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
            : 'bg-amber-50 text-amber-700 border-amber-100'
          }`}>
          {booking.status === 'confirmed' ? 'Scheduled' : booking.status === 'completed' ? 'Completed' : booking.status}
        </span>
        {booking.plan && (
          <span className="px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold border border-indigo-100">
            {booking.plan} Plan
          </span>
        )}
      </div>

      {booking.sessionDate && (
        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
          <Calendar className="w-3.5 h-3.5" />
          <span>{new Date(booking.sessionDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
      )}

      <button
        onClick={() => onViewProfile(booking.mentorId)}
        className="w-full mt-auto py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-bold hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-200 flex items-center justify-center gap-1.5"
      >
        View Profile <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

// ── Recommended Mentor Card ──────────────────────────────────────────────────
const RecommendedMentorCard = ({ mentor, onViewProfile }) => {
  const skills = mentor.skills || mentor.skillset || [];
  return (
    <div
      onClick={() => onViewProfile(mentor.id || mentor.$id)}
      className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-lg shadow-slate-200/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex gap-3.5">
          <div className="relative flex-shrink-0">
            {mentor.image || mentor.avatarUrl
              ? <img src={mentor.image || mentor.avatarUrl} alt={mentor.name} className="w-14 h-14 rounded-2xl object-cover shadow-md" />
              : <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-slate-600 font-bold text-lg">{(mentor.name || 'M')[0]}</div>
            }
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
              <div className="w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
            </div>
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-slate-900 text-base leading-tight group-hover:text-blue-600 transition-colors">{mentor.name}</h3>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wide mt-0.5 truncate">{mentor.role}</p>
            <p className="text-blue-600 text-xs font-bold truncate">{mentor.company}</p>
          </div>
        </div>
        <RatingStars rating={mentor.rating || 0} />
      </div>

      {skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {skills.slice(0, 3).map((skill, i) => (
            <span key={i} className="px-2.5 py-1 bg-slate-50 text-slate-600 rounded-lg text-xs font-bold border border-slate-100">
              {skill}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Hourly Rate</span>
          <span className="text-base font-bold text-blue-600">${mentor.hourlyCharge || mentor.hourlyRate || 0}<span className="text-xs font-normal text-slate-400">/hr</span></span>
        </div>
        <button className="flex items-center gap-1 text-slate-900 font-bold text-sm hover:gap-2 transition-all group-hover:text-blue-600">
          Book Now <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
const Mentors = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookedMentors, setBookedMentors] = useState([]);
  const [allMentors, setAllMentors] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [loadingMentors, setLoadingMentors] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  // ── Fetch booked mentors ─────────────────────────────────────────────────
  useEffect(() => {
    if (!user?.$id) { setLoadingBookings(false); return; }
    const fetchBookings = async () => {
      try {
        const data = await getMenteeBookings(user.$id);
        const docs = data.documents || [];
        // Deduplicate by mentorId — keep latest booking per mentor
        const byMentor = {};
        docs.forEach(d => {
          if (!byMentor[d.mentorId] || new Date(d.sessionDate) > new Date(byMentor[d.mentorId].sessionDate)) {
            byMentor[d.mentorId] = d;
          }
        });
        setBookedMentors(Object.values(byMentor).map(d => ({
          bookingId: d._id || d.$id,
          mentorId: d.mentorId,
          mentorName: d.mentorName || 'Your Mentor',
          mentorRole: d.mentorRole || '',
          mentorCompany: d.mentorCompany || '',
          mentorAvatarUrl: d.mentorAvatarUrl || null,
          sessionDate: d.sessionDate,
          status: d.status,
          plan: d.plan || null,
          notes: d.notes || '',
        })));
      } catch (err) {
        console.error('[Mentors] bookings fetch error:', err);
      } finally {
        setLoadingBookings(false);
      }
    };
    fetchBookings();
  }, [user]);

  // ── Fetch all mentors for recommendations ────────────────────────────────
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const data = await getMentors();
        const docs = (data.documents || []).map(doc => ({
          id: doc._id || doc.$id,
          name: doc.name || 'Mentor',
          role: doc.title || 'Mentor',
          company: doc.company || '',
          skills: doc.skills || [],
          experience: doc.yearsOfExperience ? `${doc.yearsOfExperience} years` : '',
          rating: doc.rating ?? 0,
          image: doc.avatarUrl || null,
          hourlyCharge: doc.hourlyRate || 0,
          badge: doc.badge || null,
          badgeType: doc.badgeType || 'secondary',
          serviceCategory: doc.skills?.[0] || '',
        }));
        setAllMentors(docs);
      } catch (err) {
        console.error('[Mentors] mentors fetch error:', err);
      } finally {
        setLoadingMentors(false);
      }
    };
    fetchMentors();
  }, []);

  // ── Derive recommended = all mentors not already booked ──────────────────
  const bookedMentorIds = useMemo(() => new Set(bookedMentors.map(b => b.mentorId)), [bookedMentors]);

  const recommendedMentors = useMemo(() => {
    const base = allMentors.length > 0 ? allMentors : (!loadingMentors ? FALLBACK_MENTORS : []);
    const filtered = base.filter(m => !bookedMentorIds.has(m.id));
    if (!searchQuery) return filtered;
    const q = searchQuery.toLowerCase();
    return filtered.filter(m =>
      m.name.toLowerCase().includes(q) ||
      m.role.toLowerCase().includes(q) ||
      m.company.toLowerCase().includes(q) ||
      (m.skills || []).some(s => s.toLowerCase().includes(q))
    );
  }, [allMentors, bookedMentorIds, loadingMentors, searchQuery]);

  const filteredBooked = useMemo(() => {
    if (!searchQuery) return bookedMentors;
    const q = searchQuery.toLowerCase();
    return bookedMentors.filter(b =>
      b.mentorName.toLowerCase().includes(q) ||
      b.mentorRole.toLowerCase().includes(q)
    );
  }, [bookedMentors, searchQuery]);

  const handleViewProfile = (mentorId) => {
    if (mentorId && !mentorId.startsWith('f')) {
      navigate(`/listing/${mentorId}`);
    }
  };

  const totalSessions = bookedMentors.length;
  const completedSessions = bookedMentors.filter(b => b.status === 'completed' || b.status === 'Completed').length;
  const activeSessions = totalSessions - completedSessions;

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-dm relative overflow-x-hidden">
      {/* Background Atmosphere */}
      <div className="fixed top-0 left-0 w-full h-[800px] bg-gradient-to-b from-blue-50/50 via-indigo-50/30 to-transparent pointer-events-none z-0" />
      <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-100/40 blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10">
        <Navigation />
        <Sidenav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} currentRoute="/dashboard/mentors" />

        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed bottom-6 right-6 z-50 lg:hidden bg-blue-600 text-white p-4 rounded-full shadow-2xl shadow-blue-600/40 hover:scale-105 transition-transform"
        >
          <Filter className="w-6 h-6" />
        </button>

        <div className="pt-32 md:pt-24 px-4 sm:px-6 lg:px-8 transition-all duration-300 lg:pl-28 max-w-[1600px] mx-auto">

          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 animate-in slide-in-from-bottom-4 duration-500">
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Connect & Grow</p>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Mentors</span>
              </h1>
            </div>
            <div className="w-full md:w-96 relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="block w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 shadow-sm transition-all hover:bg-slate-50"
                placeholder="Search by name, skill, or company…"
              />
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pb-12">

            {/* ── LEFT COLUMN ── */}
            <div className="lg:col-span-8 space-y-8 animate-in slide-in-from-bottom-8 duration-700 delay-100">

              {/* Section 1: My Booked Mentors */}
              <section>
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-900 text-xl">My Mentors</h2>
                    <p className="text-sm text-slate-500 font-medium">Mentors you've booked sessions with</p>
                  </div>
                </div>

                {loadingBookings ? (
                  <div className="bg-white rounded-[2.5rem] p-12 flex items-center justify-center border border-slate-100 shadow-sm">
                    <Loader2 className="w-7 h-7 text-blue-500 animate-spin" />
                  </div>
                ) : filteredBooked.length === 0 ? (
                  <div className="bg-white rounded-[2.5rem] p-12 flex flex-col items-center justify-center border border-dashed border-slate-200 text-center">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                      <BookOpen className="w-8 h-8 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-700 mb-1">No mentors booked yet</h3>
                    <p className="text-slate-400 text-sm font-medium mb-6">Find a mentor below and book your first session!</p>
                    <button
                      onClick={() => navigate('/listing')}
                      className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-blue-600 transition-all"
                    >
                      Browse Mentors
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredBooked.map((booking, i) => (
                      <BookedMentorCard key={booking.bookingId || i} booking={booking} onViewProfile={handleViewProfile} />
                    ))}
                  </div>
                )}
              </section>

              {/* Section 2: Recommended Mentors */}
              <section>
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 bg-purple-50 rounded-xl text-purple-600">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-900 text-xl">Recommended for You</h2>
                    <p className="text-sm text-slate-500 font-medium">Top mentors matching your interests</p>
                  </div>
                </div>

                {loadingMentors ? (
                  <div className="bg-white rounded-[2.5rem] p-12 flex items-center justify-center border border-slate-100 shadow-sm">
                    <Loader2 className="w-7 h-7 text-purple-500 animate-spin" />
                  </div>
                ) : recommendedMentors.length === 0 ? (
                  <div className="bg-white rounded-[2.5rem] p-10 flex flex-col items-center text-center border border-dashed border-slate-200">
                    <p className="text-slate-400 font-medium">
                      {searchQuery ? 'No mentors match your search.' : 'No recommendations available right now.'}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recommendedMentors.map((mentor, i) => (
                      <RecommendedMentorCard key={mentor.id || i} mentor={mentor} onViewProfile={handleViewProfile} />
                    ))}
                  </div>
                )}
              </section>
            </div>

            {/* ── RIGHT SIDEBAR ── */}
            <div className="lg:col-span-4 space-y-6 animate-in slide-in-from-bottom-8 duration-700 delay-200">

              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-6 text-white shadow-2xl shadow-blue-900/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
                <div className="relative z-10">
                  <p className="text-blue-200 font-bold uppercase tracking-widest text-xs mb-4">Your Progress</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                      <p className="text-3xl font-bold">{totalSessions}</p>
                      <p className="text-blue-200 text-xs font-bold mt-1">Total Mentors</p>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                      <p className="text-3xl font-bold">{activeSessions}</p>
                      <p className="text-blue-200 text-xs font-bold mt-1">Active</p>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm col-span-2">
                      <p className="text-3xl font-bold">{completedSessions}</p>
                      <p className="text-blue-200 text-xs font-bold mt-1">Completed Sessions</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Sessions Widget */}
              <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-lg shadow-slate-200/20">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">Recent Sessions</h3>
                </div>

                <div className="space-y-3">
                  {loadingBookings ? (
                    <div className="flex justify-center py-6"><Loader2 className="w-5 h-5 text-blue-400 animate-spin" /></div>
                  ) : bookedMentors.length === 0 ? (
                    <p className="text-sm text-slate-400 text-center py-4 font-medium">No sessions yet.</p>
                  ) : bookedMentors.slice(0, 3).map((b, i) => (
                    <div key={i} className="flex gap-3 items-start p-3 hover:bg-slate-50/80 rounded-2xl transition-colors cursor-pointer">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center text-blue-700 font-bold shrink-0 text-sm">
                        {(b.mentorName || 'M')[0]}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-slate-900 text-sm truncate">{b.mentorName}</h4>
                        <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                          {b.sessionDate ? new Date(b.sessionDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                        </p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ml-auto shrink-0
                        ${b.status === 'confirmed' ? 'bg-blue-50 text-blue-600' : b.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                        {b.status === 'confirmed' ? 'Active' : b.status === 'completed' ? 'Done' : b.status}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => navigate('/listing')}
                  className="w-full mt-5 py-3 rounded-xl border border-slate-200 text-slate-600 text-sm font-bold hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-200"
                >
                  Find More Mentors
                </button>
              </div>

              {/* Top Skills Widget */}
              <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-lg shadow-slate-200/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-purple-50 rounded-xl text-purple-600">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">Explore Skills</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['React', 'UX Design', 'Leadership', 'Python', 'Public Speaking', 'System Design', 'Product', 'Data Science'].map(skill => (
                    <button
                      key={skill}
                      onClick={() => setSearchQuery(skill)}
                      className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-lg text-xs font-bold border border-slate-100 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 cursor-pointer transition-colors"
                    >
                      {skill}
                    </button>
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