import { Search, Star, Filter, Heart, Loader2 } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Footer from '../../components/Footer';
import Sidenav1 from './Sidenav1';
import Navigation from '../../components/Navigation';
import { getMentors } from '../../services/mentorService';

function Listing() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mentors, setMentors] = useState([]);
  const [apiLoading, setApiLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [filters, setFilters] = useState({
    availableASAP: false,
    hourlyCharges: null,
    ratings: null,
    experience: null,
    serviceCategory: null,
    industry: null,
    location: null,
    language: null,
    skillset: null
  });
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch mentors from backend
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setApiLoading(true);
        setApiError(null);
        const data = await getMentors();
        // Map Appwrite docs to local shape
        const mapped = (data.documents || []).map((doc) => ({
          id: doc.$id,
          name: doc.name || 'Unknown Mentor',
          country: doc.country || '',
          role: doc.title || 'Mentor',
          company: doc.company || '',
          experience: doc.yearsOfExperience ? `${doc.yearsOfExperience} years` : '',
          rating: doc.rating ?? 0,
          image: doc.avatarUrl || null,
          badge: doc.badge || null,
          badgeType: doc.badgeType || 'secondary',
          serviceCategory: (doc.skills && doc.skills[0]) || '',
          industry: doc.industry || '',
          location: doc.location || '',
          language: doc.language || 'english',
          skillset: doc.skills || [],
          hourlyCharge: doc.hourlyRate || 0,
        }));
        setMentors(mapped);
      } catch (err) {
        console.error('[Listing] Failed to fetch mentors:', err);
        setApiError('Could not load mentors. Please check the backend is running.');
      } finally {
        setApiLoading(false);
      }
    };
    fetchMentors();
  }, []);

  // Apply homepage filters when component mounts or location state changes
  useEffect(() => {
    if (location.state?.fromHomepage && location.state?.filters) {
      setFilters(prev => ({ ...prev, ...location.state.filters }));
      if (location.state.searchQuery) setSearchQuery(location.state.searchQuery);
      setSidebarOpen(true);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Legacy hardcoded data — only shown when backend has no mentors yet
  const fallbackMentors = [
    {
      id: 1,
      name: 'Alex Bricks',
      country: '🇨🇦',
      role: 'Backend developer',
      company: 'Apple',
      experience: '2 years',
      rating: 4.9,
      image: AlexBricks,
      badge: 'Available ASAP',
      badgeType: 'primary',
      topContributor: true,
      serviceCategory: 'backend',
      industry: 'technology',
      location: 'north-america',
      language: 'english',
      skillset: ['javascript', 'nodejs'],
      hourlyCharge: 100
    },
    {
      id: 2,
      name: 'Danny Blue',
      country: '🇮🇪',
      role: 'Frontend developer',
      company: 'Samsung',
      experience: '2 years',
      rating: 4.8,
      image: DannyBlue,
      badge: 'Available ASAP',
      badgeType: 'primary',
      serviceCategory: 'frontend',
      industry: 'technology',
      location: 'europe',
      language: 'english',
      skillset: ['javascript', 'react'],
      hourlyCharge: 80
    },
    {
      id: 3,
      name: 'Jessica Barney',
      country: '🇫🇷',
      role: 'Marketing Head',
      company: 'PWC',
      experience: '6 years',
      rating: 4.0,
      image: '/jessica.png',
      badge: 'New mentor',
      badgeType: 'secondary',
      serviceCategory: 'marketing',
      industry: 'finance',
      location: 'europe',
      language: 'french',
      skillset: ['marketing-strategy'],
      hourlyCharge: 150
    },
    {
      id: 4,
      name: 'Bianca Lorenzo',
      country: '🇮🇹',
      role: 'IT project manager',
      company: 'GitLab',
      experience: '2 years',
      rating: 4.8,
      image: BiancaLorenzo,
      badge: 'Available ASAP',
      badgeType: 'primary',
      serviceCategory: 'project-management',
      industry: 'technology',
      location: 'europe',
      language: 'italian',
      skillset: ['project-management'],
      hourlyCharge: 120
    },
    {
      id: 5,
      name: 'Jennifer Smith',
      country: '🇦🇺',
      role: 'Security analyst',
      company: 'Deloitte',
      experience: '2 years',
      rating: 5.0,
      image: JenniferSmith,
      badge: 'Top 1%',
      badgeType: 'gold',
      serviceCategory: 'security',
      industry: 'consulting',
      location: 'australia',
      language: 'english',
      skillset: ['python'],
      hourlyCharge: 200
    },
    {
      id: 6,
      name: 'Bobby Roy',
      country: '🇦🇺',
      role: 'Network engineer',
      company: 'IBM',
      experience: '2 years',
      rating: 4.7,
      image: BobbyRoy,
      serviceCategory: 'networking',
      industry: 'technology',
      location: 'australia',
      language: 'english',
      skillset: ['python'],
      hourlyCharge: 90
    }
  ];

  // Use API mentors if available, otherwise fall back to demo data
  const displayMentors = mentors.length > 0 ? mentors : (apiLoading ? [] : fallbackMentors);

  // Apply filters function
  const applyFilters = () => {
    console.log('Applying filters:', filters);
  };

  // Filter mentors based on search and filters
  const filteredMentors = useMemo(() => {
    return displayMentors.filter(mentor => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!mentor.name.toLowerCase().includes(query) &&
          !mentor.role.toLowerCase().includes(query) &&
          !mentor.company.toLowerCase().includes(query)) {
          return false;
        }
      }

      // Available ASAP filter
      if (filters.availableASAP && mentor.badge !== 'Available ASAP') {
        return false;
      }

      // Rating filter
      if (filters.ratings) {
        const minRating = parseFloat(filters.ratings);
        if (mentor.rating < minRating) {
          return false;
        }
      }

      // Experience filter
      if (filters.experience) {
        const expYears = parseInt(mentor.experience);
        if (filters.experience === '1-2' && expYears > 2) return false;
        if (filters.experience === '3-5' && (expYears < 3 || expYears > 5)) return false;
        if (filters.experience === '5+' && expYears < 5) return false;
        if (filters.experience === '10+' && expYears < 10) return false;
      }

      // Hourly charges filter
      if (filters.hourlyCharges) {
        const [min, max] = filters.hourlyCharges.split('-').map(Number);
        if (max && (mentor.hourlyCharge < min || mentor.hourlyCharge > max)) {
          return false;
        } else if (!max && mentor.hourlyCharge < min) {
          return false;
        }
      }

      // Service category filter
      if (filters.serviceCategory && mentor.serviceCategory !== filters.serviceCategory) {
        return false;
      }

      // Industry filter
      if (filters.industry && mentor.industry !== filters.industry) {
        return false;
      }

      // Location filter
      if (filters.location && mentor.location !== filters.location) {
        return false;
      }

      // Language filter
      if (filters.language && mentor.language !== filters.language) {
        return false;
      }

      // Skillset filter
      if (filters.skillset && !mentor.skillset.includes(filters.skillset)) {
        return false;
      }

      return true;
    });
  }, [displayMentors, searchQuery, filters]);

  // Navigate to mentor profile by ID
  const handleCardClick = (mentor) => {
    if (mentor.id) {
      navigate(`/listing/${mentor.id}`);
    } else {
      navigate('/listing/jessica');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-dm relative overflow-x-hidden">

      {/* Background Atmosphere (Matches Dashboard) */}
      <div className="fixed top-0 left-0 w-full h-[800px] bg-gradient-to-b from-blue-50/50 via-indigo-50/30 to-transparent pointer-events-none z-0"></div>
      <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-100/40 blur-[120px] pointer-events-none z-0"></div>

      <div className="relative z-10">
        <Navigation />

        {/* Sidenav with filter props */}
        <Sidenav1
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          filters={filters}
          setFilters={setFilters}
          applyFilters={applyFilters}
        />

        {/* Main Content */}
        {/* Added extra padding-top on mobile (pt-44) to clear the fixed 'Sort by' button */}
        <div className={`transition-all duration-500 pt-44 lg:pt-28 ${sidebarOpen ? 'lg:ml-80' : 'lg:ml-0'}`}>
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">

            {/* Header Section */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4 md:mb-8 animate-in slide-in-from-bottom-4 duration-500">
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">
                  Explore
                </p>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                  Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Perfect Mentor</span>
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{filteredMentors.length} results found</span>
                  {Object.values(filters).some(filter => filter && filter !== false) && (
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                      Filters active
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {/* Desktop Filter Toggle */}
                <div className="hidden lg:block relative">
                  <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-2xl shadow-sm transition-all duration-300 font-bold text-sm border
                                    ${sidebarOpen ? 'bg-blue-600 text-white border-blue-600 shadow-blue-500/30' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                  >
                    <Filter className="w-4 h-4" />
                    <span>{sidebarOpen ? 'Hide Filters' : 'Show Filters'}</span>
                  </button>
                </div>

                {/* Search Bar */}
                <div className="relative group w-full md:w-80">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search Name, Role, Company..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 shadow-sm transition-all hover:bg-slate-50"
                  />
                </div>
              </div>
            </header>

            {/* Mentors Grid */}
            <section className="animate-in slide-in-from-bottom-8 duration-700 delay-100">
              {apiLoading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
                  <p className="text-slate-500 font-medium">Loading mentors…</p>
                </div>
              ) : apiError ? (
                <div className="flex flex-col items-center justify-center py-20 bg-red-50 rounded-[2.5rem] border border-dashed border-red-200">
                  <p className="text-red-600 font-medium">{apiError}</p>
                </div>
              ) : filteredMentors.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white/50 backdrop-blur-sm rounded-[2.5rem] border border-dashed border-slate-300">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
                    <Search className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-700 mb-1">No mentors found</h3>
                  <p className="text-slate-500 font-medium">Try adjusting your filters or search terms</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                  {filteredMentors.map((mentor) => (
                    <div
                      key={mentor.id}
                      onClick={() => handleCardClick(mentor)}
                      className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-lg shadow-slate-200/20 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group flex flex-col h-full relative overflow-hidden"
                    >
                      {/* Availability Badge */}
                      {mentor.badge && (
                        <div className={`absolute top-6 left-6 z-10 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wide border shadow-sm backdrop-blur-md
                                            ${mentor.badgeType === 'primary' ? 'bg-blue-50/90 text-blue-700 border-blue-100' :
                            mentor.badgeType === 'gold' ? 'bg-yellow-50/90 text-yellow-700 border-yellow-100' :
                              'bg-slate-50/90 text-slate-700 border-slate-100'
                          }
                                        `}>
                          {mentor.badge}
                        </div>
                      )}

                      {/* Image Section */}
                      <div className="relative mb-6">
                        <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 shadow-inner">
                          <img
                            src={mentor.image}
                            alt={mentor.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>
                        <button className="absolute bottom-3 right-3 p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg text-slate-400 hover:text-red-500 hover:scale-110 transition-all">
                          <Heart className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Content Section */}
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                                {mentor.name}
                              </h3>
                              <span className="text-xl filter grayscale group-hover:grayscale-0 transition-all">{mentor.country}</span>
                            </div>
                            <p className="text-sm font-medium text-slate-500 flex items-center gap-1.5">
                              <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md text-xs font-bold">{mentor.role}</span>
                              <span>@</span>
                              <span className="font-bold text-slate-700">{mentor.company}</span>
                            </p>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-1 rounded-lg border border-amber-100">
                              <Star className="w-3.5 h-3.5 fill-current" />
                              <span className="text-xs font-bold">{mentor.rating}</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Experience</span>
                            <span className="text-sm font-bold text-slate-700">{mentor.experience}</span>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Hourly</span>
                            <div className="flex items-baseline">
                              <span className="text-lg font-bold text-slate-900">${mentor.hourlyCharge}</span>
                              <span className="text-xs font-medium text-slate-400">/hr</span>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </section>

          </div>
          <Footer />
        </div>

      </div>
    </div>
  );
}

export default Listing;