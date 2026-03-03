import { Star, Heart, ChevronLeft, ChevronRight, Calendar, Briefcase, GraduationCap, MapPin, CheckCircle, X, User, Lock, Clock, CreditCard, ShieldCheck, MessageSquare, PenTool, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import Footer from '../../components/Footer';
import Navigation from '../../components/Navigation';
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from '../../utils/AuthContext';
import { getMentorById } from '../../services/mentorService';

function Demo() {
  const navigate = useNavigate();
  const { mentorId } = useParams();
  const { isAuthenticated } = useAuth();

  // ── Mentor data state ───────────────────────────────────────────────────────
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [bookingError, setBookingError] = useState('');

  // Modals & Pages States
  const [showIntroCallPopup, setShowIntroCallPopup] = useState(false);
  const [showSessionDetails, setShowSessionDetails] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showReviewPopup, setShowReviewPopup] = useState(false);

  const [showMentorshipPlan, setShowMentorshipPlan] = useState(false);
  const [showPaymentPage, setShowPaymentPage] = useState(false);
  const [showSuccessPage, setShowSuccessPage] = useState(false);

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [callGoal, setCallGoal] = useState('');

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  // Scroll to top
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // ── Fetch mentor from backend ──────────────────────────────────────────────
  useEffect(() => {
    if (!mentorId || mentorId === 'jessica') {
      navigate('/listing', { replace: true });
      return;
    }
    const fetchMentor = async () => {
      try {
        setLoading(true);
        const data = await getMentorById(mentorId);
        setMentor({
          id: data._id || data.$id,
          name: data.name || 'Unknown Mentor',
          role: data.title || 'Mentor',
          company: data.company || '',
          location: data.location || 'Remote',
          country: data.country || '',
          experienceSummary: data.bio || '',
          rating: data.rating ?? 0,
          hourlyRate: data.hourlyRate || 0,
          yearsOfExperience: data.yearsOfExperience || 0,
          isNewMentor: data.badge === 'New',
          badge: data.badge || null,
          skills: data.skills || [],
          about: data.bio || 'No bio provided.',
          avatarUrl: data.avatarUrl || null,
          language: data.language || 'English',
          industry: data.industry || '',
          experience: Array.isArray(data.experience) ? data.experience : [],
          education: data.education || {},
          reviews: Array.isArray(data.reviews) ? data.reviews : [],
          linkedIn: data.linkedIn || null,
          twitter: data.twitter || null,
        });
      } catch (err) {
        console.error('[MentorProfile] fetch error:', err);
        setFetchError('Could not load mentor profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchMentor();
  }, [mentorId, navigate]);

  // Derived plan prices based on hourly rate
  const plans = mentor ? [
    { name: 'Basic', price: Math.round((mentor.hourlyRate || 100) * 3), features: ['2 Calls a month', 'Resume Feedback', 'Unlimited Q&A via chat', 'Career guidance'], recommended: true },
    { name: 'Pro', price: Math.round((mentor.hourlyRate || 100) * 6), features: ['4 Calls a month', 'Resume Feedback', 'Unlimited Q&A via chat', 'Career guidance', 'Mock interviews', 'Priority response'], recommended: false },
  ] : [];

  const timeSlots = ['8:00 AM', '10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM', '6:00 PM'];

  // --- Calendar Logic ---
  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const today = new Date();

  const generateCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  };

  const isDateAvailable = (day) => {
    if (!day) return false;
    if (currentMonth === today.getMonth() && currentYear === today.getFullYear()) return day > today.getDate() + 10;
    if (currentYear > today.getFullYear() || (currentYear === today.getFullYear() && currentMonth > today.getMonth())) return true;
    return false;
  };

  const isDateUnavailable = (day) => {
    if (!day) return false;
    if (currentMonth === today.getMonth() && currentYear === today.getFullYear()) return day <= today.getDate() + 10;
    if (currentYear < today.getFullYear() || (currentYear === today.getFullYear() && currentMonth < today.getMonth())) return true;
    return false;
  };

  const handleDateSelect = (day) => {
    if (!day) return;
    setSelectedDate(day);
    setSelectedTime(null);
    setBookingError('');
  };

  // --- Handlers ---
  const handleIntroCallRequest = () => {
    if (!selectedDate || !selectedTime || isDateUnavailable(selectedDate)) {
      setBookingError('Please select a valid date and time.');
      return;
    }
    setBookingError('');
    setShowIntroCallPopup(true);
  };

  const handleIntroCallSubmit = () => {
    if (!callGoal.trim()) return;
    setShowIntroCallPopup(false);
    setCallGoal('');
    setShowSessionDetails(true);
  };

  const handleConfirmSession = () => {
    setShowSessionDetails(false);
    setShowSuccessModal(true);
  };

  const handleEditSession = () => {
    setShowSessionDetails(false);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    setShowReviewPopup(false);
    alert("Review submitted successfully! (Demo)");
  };

  // Plan Handlers
  const handleOptClick = (plan) => {
    setSelectedPlan(plan);
    setShowMentorshipPlan(true);
  };

  const handleContinueToPayment = () => {
    setShowMentorshipPlan(false);
    setShowPaymentPage(true);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setShowPaymentPage(false);
    setShowSuccessPage(true);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) parts.push(match.substring(i, i + 4));
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 3) return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    return v;
  };

  // ── Loading & Error States ─────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin mx-auto mb-4" />
            <p className="text-slate-500 font-medium">Loading mentor profile…</p>
          </div>
        </div>
      </div>
    );
  }
  if (fetchError || !mentor) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4"><X className="w-7 h-7 text-red-400" /></div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Mentor not found</h2>
            <p className="text-slate-500 mb-6 text-sm">{fetchError || 'This profile does not exist.'}</p>
            <button onClick={() => navigate('/listing')} className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800">← Back to Mentors</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-dm">
      <Navigation />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">

        {/* ── Hero Banner ─────────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7 mb-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-200 shadow">
              {mentor.avatarUrl
                ? <img src={mentor.avatarUrl} alt={mentor.name} className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center"><span className="text-3xl font-bold text-white">{mentor.name.charAt(0)}</span></div>}
            </div>
            {mentor.badge && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{mentor.badge}</span>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">{mentor.name}</h1>
                <p className="text-lg font-bold text-blue-600 mt-0.5">
                  {mentor.role}
                  {mentor.company && <span className="text-slate-400 font-normal"> @ {mentor.company}</span>}
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  {mentor.location && (
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg">
                      <MapPin className="w-3 h-3" /> {mentor.location}
                    </span>
                  )}
                  {mentor.yearsOfExperience > 0 && (
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg">
                      <Clock className="w-3 h-3" /> {mentor.yearsOfExperience}y exp
                    </span>
                  )}
                  {mentor.language && (
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg">
                      🌐 {mentor.language}
                    </span>
                  )}
                  {mentor.hourlyRate > 0 && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg">
                      ${mentor.hourlyRate}/hr
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="flex items-center gap-1 bg-amber-50 border border-amber-100 text-amber-600 px-3 py-1.5 rounded-xl">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-bold">{mentor.rating}</span>
                </div>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-2 rounded-xl border transition-all ${isFavorite ? 'bg-rose-50 border-rose-100 text-rose-500' : 'bg-slate-50 border-slate-100 text-slate-300 hover:text-rose-400 hover:border-rose-100'}`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {mentor.skills.slice(0, 8).map((s, i) => (
                <span key={i} className="text-sm text-slate-600 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-colors cursor-default">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Two Column Layout ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left — Content */}
          <div className="lg:col-span-7 space-y-4">

            {/* About */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-2 bg-blue-50 rounded-xl"><User className="w-4 h-4 text-blue-600" /></div>
                <h2 className="text-base font-bold text-slate-700">About</h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-[17px]">{mentor.about}</p>
            </div>

            {/* Experience */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="p-2 bg-indigo-50 rounded-xl"><Briefcase className="w-4 h-4 text-indigo-600" /></div>
                <h2 className="text-base font-bold text-slate-700">Experience</h2>
              </div>
              <div className="space-y-5 relative before:absolute before:left-[7px] before:top-2 before:h-full before:w-0.5 before:bg-slate-100">
                {mentor.experience && mentor.experience.length > 0
                  ? mentor.experience.map((exp, i) => (
                    <div key={i} className="relative pl-7">
                      <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-indigo-300 bg-white z-10" />
                      <h3 className="text-lg font-bold text-slate-900">{exp.title}</h3>
                      <p className="text-base font-bold text-blue-600 mt-0.5">
                        {exp.company} <span className="text-slate-400 font-normal">· {exp.period}</span>
                      </p>
                      {exp.description && <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">{exp.description}</p>}
                    </div>
                  ))
                  : <p className="text-sm text-slate-400 pl-7">No experience listed.</p>}
              </div>
            </div>

            {/* Education */}
            {mentor.education?.degree && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="p-2 bg-emerald-50 rounded-xl"><GraduationCap className="w-4 h-4 text-emerald-600" /></div>
                  <h2 className="text-base font-bold text-slate-700">Education</h2>
                </div>
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                    <GraduationCap className="w-6 h-6 text-slate-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{mentor.education.degree}</h3>
                    <p className="text-sm text-slate-500 mt-0.5">{mentor.education.institution}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-amber-50 rounded-xl"><MessageSquare className="w-4 h-4 text-amber-600" /></div>
                  <h2 className="text-base font-bold text-slate-700">Reviews</h2>
                </div>
                <button
                  onClick={() => setShowReviewPopup(true)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors"
                >
                  <PenTool className="w-3.5 h-3.5" /> Write Review
                </button>
              </div>
              <div className="space-y-4">
                {mentor.reviews.length > 0 ? mentor.reviews.map((review, i) => (
                  <div key={i} className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center text-sm font-bold text-blue-700 flex-shrink-0">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-base font-bold text-slate-900">{review.name}</p>
                          <p className="text-xs text-slate-400">{review.title}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5 flex-shrink-0">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className={`w-4 h-4 ${j < review.rating ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">"{review.comment}"</p>
                  </div>
                )) : (
                  <p className="text-sm text-slate-400 text-center py-6">No reviews yet. Be the first!</p>
                )}
              </div>
            </div>
          </div>

          {/* Right — Sticky Sidebar */}
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24 h-fit">

            {/* Book a Session */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="p-2 bg-blue-50 rounded-xl"><Calendar className="w-4 h-4 text-blue-600" /></div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Book a Session</h3>
                  <p className="text-sm text-slate-400">Pick a date & time below</p>
                </div>
              </div>

              {/* Calendar */}
              <div className="bg-slate-50 rounded-xl p-3 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-slate-800">{monthNames[currentMonth]} {currentYear}</h4>
                  <div className="flex gap-1">
                    <button
                      onClick={() => { if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); } else { setCurrentMonth(currentMonth - 1); } }}
                      className="p-1 hover:bg-white rounded-lg transition-colors"
                    ><ChevronLeft className="w-4 h-4 text-slate-400" /></button>
                    <button
                      onClick={() => { if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); } else { setCurrentMonth(currentMonth + 1); } }}
                      className="p-1 hover:bg-white rounded-lg transition-colors"
                    ><ChevronRight className="w-4 h-4 text-slate-400" /></button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                    <span key={i} className="text-[10px] font-bold text-slate-400 text-center">{d}</span>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {generateCalendar().map((day, index) => {
                    const unavailable = isDateUnavailable(day);
                    return (
                      <button key={index} onClick={() => handleDateSelect(day)} disabled={!day}
                        className={`aspect-square flex items-center justify-center text-xs font-bold rounded-lg transition-all
                          ${!day ? 'invisible'
                            : day === selectedDate ? 'bg-blue-600 text-white shadow'
                            : unavailable ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                            : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}>
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {selectedDate && (
                <div className="grid grid-cols-3 gap-1.5 mb-4 animate-in slide-in-from-top-2">
                  {timeSlots.map((time, i) => (
                    <button key={i} onClick={() => setSelectedTime(time)}
                      className={`py-2 rounded-lg text-xs font-bold transition-all
                        ${selectedTime === time ? 'bg-blue-600 text-white shadow' : 'bg-slate-50 text-slate-600 border border-slate-100 hover:border-blue-200 hover:text-blue-600'}`}>
                      {time}
                    </button>
                  ))}
                </div>
              )}

              <button
                onClick={handleIntroCallRequest}
                disabled={!selectedDate || !selectedTime || isDateUnavailable(selectedDate)}
                className={`w-full py-3 rounded-xl text-sm font-bold transition-all
                  ${!selectedDate || !selectedTime || isDateUnavailable(selectedDate)
                    ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90 shadow-md shadow-blue-500/20'}`}>
                Request Intro Call
              </button>
              {bookingError && <p className="text-rose-500 text-xs font-medium mt-2 text-center">{bookingError}</p>}
            </div>

            {/* Mentorship Plans */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-900">Mentorship Plans</h3>
                <p className="text-xs text-slate-400 mt-0.5">Choose a plan that fits your goals</p>
              </div>
              <div className="p-4 space-y-3">
                {plans.map((plan, i) => (
                  <div key={i} className="rounded-xl border border-slate-100 overflow-hidden hover:border-blue-200 hover:shadow-sm transition-all">
                    <div className="flex items-center justify-between px-4 py-3 bg-slate-50">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-800">{plan.name}</h4>
                        {plan.recommended && (
                          <span className="text-[10px] font-bold bg-blue-600 text-white px-1.5 py-0.5 rounded-md">Popular</span>
                        )}
                      </div>
                      <div className="flex items-baseline gap-0.5">
                        <span className="text-base font-bold text-slate-900">${plan.price}</span>
                        <span className="text-xs text-slate-400">/mo</span>
                      </div>
                    </div>
                    <div className="px-4 py-3 space-y-1.5">
                      {plan.features.slice(0, 3).map((feat, j) => (
                        <div key={j} className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-slate-600">{feat}</span>
                        </div>
                      ))}
                      {plan.features.length > 3 && (
                        <p className="text-xs text-slate-400 pl-5">+{plan.features.length - 3} more</p>
                      )}
                    </div>
                    <div className="px-4 pb-4">
                      <button onClick={() => handleOptClick(plan)}
                        className="w-full py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-blue-600 transition-all">
                        Choose {plan.name}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* --- Popups --- */}

      {/* 1. Intro Call Popup */}
      {showIntroCallPopup && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowIntroCallPopup(false)}>
          <div className="bg-white rounded-2xl shadow-2xl p-7 max-w-md w-full animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-bold text-slate-900">What's your goal?</h3>
              <button onClick={() => setShowIntroCallPopup(false)} className="p-2 hover:bg-slate-100 rounded-xl"><X className="w-4 h-4 text-slate-400" /></button>
            </div>
            <p className="text-sm text-slate-500 mb-4">Briefly describe what you'd like to achieve in this 15-min intro call.</p>
            <textarea value={callGoal} onChange={(e) => setCallGoal(e.target.value)} placeholder="E.g. I want to discuss my career transition..." className="w-full h-28 p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5 resize-none" />
            <button onClick={handleIntroCallSubmit} disabled={!callGoal.trim()} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors disabled:opacity-40">Confirm Request</button>
          </div>
        </div>
      )}

      {/* 2. Session Confirmation Popup */}
      {showSessionDetails && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowSessionDetails(false)}>
          <div className="bg-white rounded-2xl shadow-2xl p-7 max-w-md w-full animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4"><Calendar className="w-7 h-7 text-emerald-500" /></div>
              <h3 className="text-xl font-bold text-slate-900">Confirm Session</h3>
              <p className="text-sm text-slate-500 mt-1">{monthNames[currentMonth]} {selectedDate}, {currentYear} at {selectedTime}</p>
            </div>
            <button onClick={handleConfirmSession} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors">Confirm Booking</button>
          </div>
        </div>
      )}

      {/* 3. Mentorship Plan Details Popup */}
      {showMentorshipPlan && selectedPlan && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowMentorshipPlan(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            {/* Left */}
            <div className="w-full md:w-2/5 bg-slate-50 p-7 flex flex-col items-center text-center border-r border-slate-100">
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-200 to-indigo-300 mb-4 flex items-center justify-center">
                {mentor.avatarUrl
                  ? <img src={mentor.avatarUrl} alt={mentor.name} className="w-full h-full object-cover" />
                  : <span className="text-3xl font-bold text-white">{mentor.name.charAt(0)}</span>}
              </div>
              <h3 className="text-base font-bold text-slate-900">{mentor.name}</h3>
              <p className="text-sm text-slate-500 mb-6">{mentor.role} at {mentor.company}</p>
              <div className="w-full space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-slate-200">
                  <span className="text-slate-500">Experience</span>
                  <span className="font-bold text-slate-900">{mentor.yearsOfExperience}+ yrs</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-200">
                  <span className="text-slate-500">Rate</span>
                  <span className="font-bold text-slate-900">${mentor.hourlyRate}/hr</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-500">Rating</span>
                  <div className="flex items-center gap-1 font-bold text-slate-900"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {mentor.rating.toFixed(1)}</div>
                </div>
              </div>
            </div>
            {/* Right */}
            <div className="w-full md:w-3/5 p-7 relative">
              <button onClick={() => setShowMentorshipPlan(false)} className="absolute top-5 right-5 p-2 hover:bg-slate-100 rounded-xl transition-colors"><X className="w-5 h-5 text-slate-400" /></button>
              <h2 className="text-xl font-bold text-slate-900 mb-5">{selectedPlan.name} Plan</h2>
              <div className="bg-blue-50 rounded-xl p-5 mb-5">
                <h4 className="text-sm font-bold text-slate-800 mb-3">What's included</h4>
                <ul className="space-y-2.5">
                  {selectedPlan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold text-slate-900">Total</span>
                <span className="text-2xl font-bold text-slate-900">${selectedPlan.price}.00</span>
              </div>
              <p className="text-xs text-slate-400 mb-5">Billed monthly. Cancel anytime.</p>
              <button onClick={handleContinueToPayment} className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-blue-600 transition-all mb-3">Continue with {selectedPlan.name}</button>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Secure payment — all transactions are encrypted.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Payment Page */}
      {showPaymentPage && (
        <div className="fixed inset-0 bg-slate-50 z-[60] overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 py-12">
            <button onClick={() => setShowPaymentPage(false)} className="flex items-center gap-2 text-slate-500 font-bold mb-8 hover:text-slate-900 text-sm"><ChevronLeft className="w-4 h-4" /> Back to Plan</button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-1">Checkout</h2>
                  <p className="text-sm text-slate-500">Complete your purchase safely & securely.</p>
                </div>
                <div className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Total Due</p>
                      <p className="text-3xl font-bold text-slate-900">${selectedPlan?.price}</p>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full uppercase border border-emerald-100">Secure SSL</span>
                  </div>
                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1.5">Card Number</label>
                      <div className="relative">
                        <input type="text" value={paymentDetails.cardNumber} onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: formatCardNumber(e.target.value) })} placeholder="0000 0000 0000 0000" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                        <CreditCard className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1.5">Expiry</label>
                        <input type="text" value={paymentDetails.expiryDate} onChange={(e) => setPaymentDetails({ ...paymentDetails, expiryDate: formatExpiryDate(e.target.value) })} placeholder="MM/YY" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1.5">CVV</label>
                        <div className="relative">
                          <input type="text" value={paymentDetails.cvv} onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })} placeholder="123" className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                          <Lock className="absolute right-4 top-3.5 w-4 h-4 text-slate-400" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1.5">Name on Card</label>
                      <input type="text" value={paymentDetails.nameOnCard} onChange={(e) => setPaymentDetails({ ...paymentDetails, nameOnCard: e.target.value })} placeholder="John Doe" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    <button type="submit" className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold text-sm shadow hover:bg-blue-600 transition-all mt-2">Pay ${selectedPlan?.price}</button>
                  </form>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-blue-600 text-white rounded-2xl p-7 shadow-xl shadow-blue-500/20">
                  <h3 className="text-base font-bold mb-4">Order Summary</h3>
                  <div className="flex justify-between items-center py-3 border-b border-blue-500/40">
                    <span className="text-sm text-blue-100">{selectedPlan?.name} Plan</span>
                    <span className="font-bold">${selectedPlan?.price}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 text-base">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">${selectedPlan?.price}</span>
                  </div>
                </div>
                <div className="flex gap-3 items-center p-4 bg-white rounded-2xl border border-slate-100">
                  <ShieldCheck className="w-9 h-9 text-emerald-500 flex-shrink-0" />
                  <p className="text-xs text-slate-500">Your payment info is encrypted and secure. We never store your full card details.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Success Page */}
      {showSuccessPage && (
        <div className="fixed inset-0 bg-white z-[70] flex flex-col items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-7 animate-bounce">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Payment Successful!</h2>
          <p className="text-slate-500 font-medium mb-10 text-center max-w-md text-sm">You have subscribed to the <strong>{selectedPlan?.name}</strong> plan. A confirmation email has been sent.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={() => navigate('/dashboard')} className="px-7 py-3.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all">Go to Dashboard</button>
            <button onClick={() => { setShowSuccessPage(false); setShowPaymentPage(false); setShowMentorshipPlan(false); }} className="px-7 py-3.5 bg-slate-100 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all">Back to Profile</button>
          </div>
        </div>
      )}

      {/* 6. Write Review Popup */}
      {showReviewPopup && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowReviewPopup(false)}>
          <div className="bg-white rounded-2xl shadow-2xl p-7 max-w-md w-full animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-bold text-slate-900">Write a Review</h3>
              <button onClick={() => setShowReviewPopup(false)} className="p-2 hover:bg-slate-100 rounded-xl"><X className="w-4 h-4 text-slate-400" /></button>
            </div>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} type="button" className="focus:outline-none">
                      <Star className="w-7 h-7 text-slate-200 hover:text-amber-400 hover:fill-amber-400 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Your Review</label>
                <textarea placeholder="Share your experience with this mentor..." className="w-full h-28 p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" required />
              </div>
              <button type="submit" className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors">Submit Review</button>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal (Booking) */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowSuccessModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl p-7 max-w-sm w-full animate-in zoom-in-95 duration-200 text-center" onClick={e => e.stopPropagation()}>
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5"><CheckCircle className="w-8 h-8 text-emerald-600" /></div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Booking Confirmed!</h3>
            <p className="text-slate-500 text-sm mb-7">You will receive a confirmation email shortly.</p>
            <button onClick={() => setShowSuccessModal(false)} className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Demo;