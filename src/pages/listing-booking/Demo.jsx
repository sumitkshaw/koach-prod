import { Star, Heart, Linkedin, Twitter, ChevronLeft, ChevronRight, Calendar, Briefcase, GraduationCap, MapPin, Mail, Phone, CheckCircle, X, User, Lock, Clock, CreditCard, ShieldCheck, MessageSquare, PenTool } from 'lucide-react';
import { useState, useEffect } from 'react';
import Footer from '../../components/Footer';
import Navigation from '../../components/Navigation';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../utils/AuthContext';

function Demo() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
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
  const [showReviewPopup, setShowReviewPopup] = useState(false); // New state for review popup

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
  useEffect(() => {
    window.scrollTo(0, 0);
    const handleRouteChange = () => window.scrollTo(0, 0);
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  // --- Data ---
  const mentor = {
    name: 'Jessica Barney',
    role: 'Marketing Head',
    company: 'PWC',
    location: 'Paris, France',
    experienceSummary: '6+ years building, growing & scaling high-performing B2B Marketing teams',
    rating: 4,
    isNewMentor: true,
    skills: ['Digital Marketing', 'Go To Market', 'Design', 'Growth Marketing', 'Strategy', 'Sales', 'Scaling Teams'],
    about: "MSc Engineer by training. Marketeer by passion. I hold an MBA degree and have led Sales and Marketing both in SMBs and Multinational Corporations. My approach is data driven and customer centric, I'm fascinated by human behaviour and that informs my approach on every project.",
    experience: [
      {
        title: 'Marketing Head',
        company: 'PWC, USA',
        period: 'June 2023 - Current',
        description: 'Assisted in developing marketing strategies for social media campaigns. Analyzed consumer data to support targeted advertising efforts.'
      },
      {
        title: 'Customer Service Representative',
        company: 'DHL, Germany',
        period: 'January 2022 - May 2023',
        description: 'Responded to customer inquiries and resolved issues effectively. Trained new staff on company protocols and customer service excellence.'
      }
    ],
    education: {
      degree: 'Master of Arts in Marketing',
      institution: 'Northeastern University'
    },
    reviews: [
      { name: 'Jane Doe', rating: 3, title: 'Supervisor at Company Name', comment: 'A dedicated team player with excellent problem-solving skills. Highly recommended.' },
      { name: 'John Smith', rating: 4, title: 'Professor at University Name', comment: 'An outstanding student with a strong work ethic and leadership qualities.' }
    ]
  };

  const timeSlots = ['8:00 AM', '10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM', '6:00 PM'];

  const plans = [
    {
      name: 'Basic Plan',
      price: 330,
      features: ['2 Calls a month', 'Resume Feedback', 'Unlimited Q&A via chat', 'Career guidance'],
      recommended: true
    }
  ];

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
    // In a real app, you would submit the review here
    // For now, we can show a toast or just close the popup
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

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-dm relative overflow-x-hidden">

      {/* Background Atmosphere */}
      <div className="fixed top-0 left-0 w-full h-[800px] bg-gradient-to-b from-blue-50/50 via-indigo-50/30 to-transparent pointer-events-none z-0"></div>
      <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-100/40 blur-[120px] pointer-events-none z-0"></div>

      <div className="relative z-10">
        <Navigation />

        <section className="px-4 sm:px-6 lg:px-8 py-28 max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Left Column - Profile Info */}
            <div className="lg:col-span-8 space-y-8 animate-in slide-in-from-bottom-8 duration-700">

              {/* Profile Card */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/20 relative overflow-hidden">
                <div className="flex flex-col md:flex-row gap-8 relative z-10">
                  {/* Profile Image */}
                  <div className="relative flex-shrink-0 mx-auto md:mx-0">
                    <div className="w-48 h-48 md:w-56 md:h-56 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-[2rem] p-1 shadow-lg">
                      <img src="/jessica.png" alt="Profile" className="w-full h-full object-cover rounded-[1.8rem]" />
                    </div>
                    {mentor.isNewMentor && (
                      <div className="absolute -top-3 -right-3 bg-white text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border border-blue-100 shadow-sm">
                        New mentor
                      </div>
                    )}
                  </div>
                  {/* Profile Details */}
                  <div className="flex-1 text-center md:text-left space-y-4">
                    <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4">
                      <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{mentor.name}</h1>
                        <p className="text-xl font-bold text-blue-600 mb-2">
                          {mentor.role} <span className="text-slate-400 font-normal">@</span> {mentor.company}
                        </p>
                        <p className="text-slate-500 font-medium leading-relaxed max-w-xl">{mentor.experienceSummary}</p>
                      </div>
                      <div className="flex flex-col items-center md:items-end gap-3">
                        <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-3 py-1.5 rounded-xl border border-amber-100">
                          <Star className="w-5 h-5 fill-current" />
                          <span className="text-lg font-bold">{mentor.rating}</span>
                        </div>
                        <button onClick={() => setIsFavorite(!isFavorite)} className={`p-3 rounded-full transition-all ${isFavorite ? 'bg-rose-50 text-rose-500' : 'bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-500'}`}>
                          <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-4 text-slate-500 text-sm font-medium">
                      <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg"><MapPin className="w-4 h-4" /><span>{mentor.location}</span></div>
                      <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg"><Clock className="w-4 h-4" /><span>6+ Years Exp.</span></div>
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
                      {mentor.skills.map((skill, index) => (
                        <span key={index} className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold uppercase tracking-wide border border-slate-100 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-colors cursor-default">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* About Section */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600"><User className="w-6 h-6" /></div>
                  <h2 className="text-2xl font-bold text-slate-900">About</h2>
                </div>
                <p className="text-slate-600 leading-loose text-lg font-medium">{mentor.about}</p>
              </div>

              {/* Professional Experience */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/20">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600"><Briefcase className="w-6 h-6" /></div>
                  <h2 className="text-2xl font-bold text-slate-900">Experience</h2>
                </div>
                <div className="space-y-8 relative before:absolute before:left-[19px] before:top-4 before:h-full before:w-0.5 before:bg-slate-100">
                  {mentor.experience.map((exp, index) => (
                    <div key={index} className="relative pl-12">
                      <div className="absolute left-0 top-1.5 w-10 h-10 bg-white border-4 border-indigo-100 rounded-full flex items-center justify-center z-10"><div className="w-3 h-3 bg-indigo-600 rounded-full"></div></div>
                      <h3 className="text-xl font-bold text-slate-900">{exp.title}</h3>
                      <p className="text-blue-600 font-bold text-sm mb-2">{exp.company} <span className="text-slate-400 font-medium">•</span> {exp.period}</p>
                      <p className="text-slate-600 leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600"><GraduationCap className="w-6 h-6" /></div>
                  <h2 className="text-2xl font-bold text-slate-900">Education</h2>
                </div>
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm"><GraduationCap className="w-6 h-6 text-slate-400" /></div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{mentor.education.degree}</h3>
                    <p className="text-slate-500 font-medium">{mentor.education.institution}</p>
                  </div>
                </div>
              </div>

              {/* Reviews Section */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/20">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-amber-50 rounded-xl text-amber-600">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Reviews</h2>
                  </div>
                  <button
                    onClick={() => setShowReviewPopup(true)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors shadow-lg hover:shadow-slate-900/20"
                  >
                    <PenTool className="w-4 h-4" />
                    Write a Review
                  </button>
                </div>

                <div className="space-y-6">
                  {mentor.reviews.map((review, index) => (
                    <div key={index} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center font-bold text-blue-700">
                            {review.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900">{review.name}</h4>
                            <p className="text-xs text-slate-500 font-medium">{review.title}</p>
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed font-medium">"{review.comment}"</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column - Booking & Plans */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28 h-fit animate-in slide-in-from-bottom-8 duration-700 delay-200">

              {/* CTA / Calendar Card */}
              <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-xl shadow-slate-200/20 text-center">
                <div className="inline-block p-3 bg-blue-50 rounded-2xl text-blue-600 mb-4"><Calendar className="w-6 h-6" /></div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Book a Session</h3>
                <p className="text-slate-500 text-sm mb-6">Select a date and time to schedule your 1-on-1 mentorship session.</p>

                {/* Calendar Widget */}
                <div className="bg-slate-50 rounded-[2rem] p-4 mb-6">
                  <div className="flex items-center justify-between mb-4 px-2">
                    <h4 className="font-bold text-slate-900">{monthNames[currentMonth]} {currentYear}</h4>
                    <div className="flex gap-1">
                      <button onClick={() => { if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); } else { setCurrentMonth(currentMonth - 1); } }} className="p-1 hover:bg-white rounded-lg transition-colors"><ChevronLeft className="w-4 h-4 text-slate-400" /></button>
                      <button onClick={() => { if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); } else { setCurrentMonth(currentMonth + 1); } }} className="p-1 hover:bg-white rounded-lg transition-colors"><ChevronRight className="w-4 h-4 text-slate-400" /></button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <span key={d} className="text-xs font-bold text-slate-400 text-center">{d}</span>)}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {generateCalendar().map((day, index) => {
                      const available = isDateAvailable(day);
                      const unavailable = isDateUnavailable(day);
                      return (
                        <button
                          key={index}
                          onClick={() => handleDateSelect(day)}
                          disabled={!day}
                          className={`aspect-square flex items-center justify-center text-xs font-bold rounded-lg transition-all ${!day ? 'invisible' : day === selectedDate ? 'bg-blue-600 text-white shadow-md' : unavailable ? 'bg-slate-100 text-slate-300 cursor-not-allowed' : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                            }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slots */}
                {selectedDate && (
                  <div className="grid grid-cols-2 gap-2 mb-6 animate-in slide-in-from-top-2">
                    {timeSlots.map((time, index) => (
                      <button key={index} onClick={() => setSelectedTime(time)} className={`py-2 rounded-xl text-xs font-bold transition-all ${selectedTime === time ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-200 hover:text-blue-600'}`}>{time}</button>
                    ))}
                  </div>
                )}

                <button
                  onClick={handleIntroCallRequest}
                  disabled={!selectedDate || !selectedTime || isDateUnavailable(selectedDate)}
                  className={`w-full py-4 rounded-xl font-bold text-sm transition-all shadow-lg ${!selectedDate || !selectedTime || isDateUnavailable(selectedDate) ? 'bg-slate-100 text-slate-300 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:scale-[1.02]'}`}
                >
                  Request Intro Call
                </button>
                {bookingError && <p className="text-rose-500 text-xs font-bold mt-3 bg-rose-50 py-2 rounded-lg">{bookingError}</p>}
              </div>

              {/* Plans Widget (Restored & Styled to Theme) */}
              <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/20 overflow-hidden border border-slate-100">
                {/* Header */}
                <div className="bg-[#1e293b] text-white text-center py-5">
                  <h3 className="text-xl font-bold tracking-tight">Mentorship Plans</h3>
                </div>

                {plans.map((plan, index) => (
                  <div key={index} className="flex flex-col">
                    {/* Plan Name Strip (Carousel Style) */}
                    <div className="bg-amber-400 py-3 px-6 flex items-center justify-between">
                      <button className="text-amber-800/60 hover:text-amber-900 transition-colors"><ChevronLeft className="w-5 h-5" /></button>
                      <h4 className="text-lg font-bold text-slate-900">{plan.name}</h4>
                      <button className="text-amber-800/60 hover:text-amber-900 transition-colors"><ChevronRight className="w-5 h-5" /></button>
                    </div>

                    <div className="p-8">
                      <ul className="space-y-4 mb-8">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-900"></div>
                            <span className="text-slate-600 font-medium">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="text-center mb-6 pt-6 border-t border-slate-100">
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-5xl font-bold text-slate-900">${plan.price}</span>
                          <span className="text-slate-400 font-medium">/month</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleOptClick(plan)}
                        className="w-full bg-[#1e293b] text-white py-4 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg hover:shadow-slate-800/25"
                      >
                        OPT
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>
      </div>

      <Footer />

      {/* --- Popups --- */}

      {/* 1. Intro Call Popup */}
      {showIntroCallPopup && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowIntroCallPopup(false)}>
          <div className="bg-white rounded-[2rem] shadow-2xl p-8 max-w-md w-full animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-900">Intro Call Goal</h3>
              <button onClick={() => setShowIntroCallPopup(false)} className="p-2 hover:bg-slate-100 rounded-full"><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <p className="text-slate-500 font-medium mb-4 text-sm">Briefly describe what you'd like to achieve in this 15-min call.</p>
            <textarea value={callGoal} onChange={(e) => setCallGoal(e.target.value)} placeholder="E.g. I want to discuss my career transition..." className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6 resize-none" />
            <button onClick={handleIntroCallSubmit} disabled={!callGoal.trim()} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Confirm Request</button>
          </div>
        </div>
      )}

      {/* 2. Session Confirmation Popup */}
      {showSessionDetails && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowSessionDetails(false)}>
          <div className="bg-white rounded-[2rem] shadow-2xl p-8 max-w-md w-full animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4"><Calendar className="w-8 h-8 text-green-500" /></div>
              <h3 className="text-2xl font-bold text-slate-900">Confirm Session</h3>
            </div>
            <button onClick={handleConfirmSession} className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-colors">Confirm Booking</button>
          </div>
        </div>
      )}

      {/* 3. Mentorship Plan Details Popup (Redesigned) */}
      {showMentorshipPlan && selectedPlan && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowMentorshipPlan(false)}>
          <div className="bg-white rounded-[2rem] shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>

            {/* Left Column - Profile Sidebar */}
            <div className="w-full md:w-1/3 bg-slate-50 p-8 flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-slate-100">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-white shadow-lg mb-4">
                <img src="/jessica.png" alt="Profile" className="w-full h-full object-cover rounded-full" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{mentor.name}</h3>
              <p className="text-slate-500 text-sm font-medium mb-8">{mentor.role} at {mentor.company}</p>

              <div className="w-full space-y-4 mb-8">
                <div className="flex justify-between items-center py-2 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Experience</span>
                  <span className="text-slate-900 font-bold">6+ years</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Sessions</span>
                  <span className="text-slate-900 font-bold">200+</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Rating</span>
                  <div className="flex items-center gap-1 font-bold text-slate-900">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> 4.0
                  </div>
                </div>
              </div>

              <button onClick={() => setShowMentorshipPlan(false)} className="w-full py-3 border-2 border-[#1e293b] text-[#1e293b] font-bold rounded-xl hover:bg-[#1e293b] hover:text-white transition-colors">
                View Full Profile
              </button>
            </div>

            {/* Right Column - Plan Details */}
            <div className="w-full md:w-2/3 p-8 md:p-10 relative">
              <button onClick={() => setShowMentorshipPlan(false)} className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-slate-400" />
              </button>

              <h2 className="text-2xl font-bold text-slate-900 mb-6">Mentorship Plan - {selectedPlan.name}</h2>

              <div className="bg-blue-50/50 rounded-2xl p-6 mb-8">
                <h4 className="font-bold text-slate-900 mb-4">What's included:</h4>
                <ul className="space-y-3">
                  {selectedPlan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 font-medium">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold text-slate-900">Total</span>
                <span className="text-3xl font-bold text-slate-900">${selectedPlan.price}.00</span>
              </div>
              <p className="text-slate-500 text-sm mb-8">Billed monthly. Cancel anytime.</p>

              <button
                onClick={handleContinueToPayment}
                className="w-full bg-[#1e293b] text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all shadow-lg hover:shadow-slate-800/25 mb-4"
              >
                Continue with {selectedPlan.name}
              </button>

              <p className="text-xs text-slate-400 text-center mb-8">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>

              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <ShieldCheck className="w-5 h-5 text-green-500" />
                <span>Secure payment. All transactions are encrypted and secure.</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 4. Payment Page (Overlay) */}
      {showPaymentPage && (
        <div className="fixed inset-0 bg-slate-50 z-[60] overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 py-12">
            <button onClick={() => setShowPaymentPage(false)} className="flex items-center gap-2 text-slate-500 font-bold mb-8 hover:text-slate-900"><ChevronLeft className="w-5 h-5" /> Back to Plan</button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">Checkout</h2>
                  <p className="text-slate-500 font-medium">Complete your purchase safely and securely.</p>
                </div>
                <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/20">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Total Due</p>
                      <p className="text-4xl font-bold text-slate-900">${selectedPlan?.price}</p>
                    </div>
                    <div className="px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full uppercase">Secure SSL</div>
                  </div>
                  <form onSubmit={handlePaymentSubmit} className="space-y-5">
                    <div className="space-y-1">
                      <label className="text-sm font-bold text-slate-700">Card Number</label>
                      <div className="relative">
                        <input type="text" name="cardNumber" value={paymentDetails.cardNumber} onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: formatCardNumber(e.target.value) })} placeholder="0000 0000 0000 0000" className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                        <CreditCard className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-sm font-bold text-slate-700">Expiry</label>
                        <input type="text" name="expiryDate" value={paymentDetails.expiryDate} onChange={(e) => setPaymentDetails({ ...paymentDetails, expiryDate: formatExpiryDate(e.target.value) })} placeholder="MM/YY" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-bold text-slate-700">CVV</label>
                        <div className="relative">
                          <input type="text" name="cvv" value={paymentDetails.cvv} onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })} placeholder="123" className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                          <Lock className="absolute right-4 top-3.5 w-4 h-4 text-slate-400" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-bold text-slate-700">Name on Card</label>
                      <input type="text" name="nameOnCard" value={paymentDetails.nameOnCard} onChange={(e) => setPaymentDetails({ ...paymentDetails, nameOnCard: e.target.value })} placeholder="John Doe" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    <button type="submit" className="w-full bg-[#1e293b] text-white py-4 rounded-xl font-bold shadow-lg hover:bg-slate-800 transition-all mt-4">Pay ${selectedPlan?.price}</button>
                  </form>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-blue-600 text-white rounded-[2rem] p-8 shadow-xl shadow-blue-500/20">
                  <h3 className="text-xl font-bold mb-4">Order Summary</h3>
                  <div className="flex justify-between items-center py-4 border-b border-blue-500/50">
                    <span className="font-medium text-blue-100">{selectedPlan?.name}</span>
                    <span className="font-bold">${selectedPlan?.price}</span>
                  </div>
                  <div className="flex justify-between items-center py-4 text-lg">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">${selectedPlan?.price}</span>
                  </div>
                </div>
                <div className="flex gap-4 items-center p-4 bg-white rounded-2xl border border-slate-100">
                  <ShieldCheck className="w-10 h-10 text-green-500 flex-shrink-0" />
                  <p className="text-xs text-slate-500 font-medium">Your payment information is encrypted and secure. We never store your full card details.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Success Page (Overlay) */}
      {showSuccessPage && (
        <div className="fixed inset-0 bg-white z-[70] flex flex-col items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8 animate-bounce">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Payment Successful!</h2>
          <p className="text-slate-500 text-lg font-medium mb-12 text-center max-w-md">You have successfully subscribed to the <strong>{selectedPlan?.name}</strong>. A confirmation email has been sent to you.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => navigate('/dashboard')} className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all">Go to Dashboard</button>
            <button onClick={() => { setShowSuccessPage(false); setShowPaymentPage(false); setShowMentorshipPlan(false); }} className="px-8 py-4 bg-slate-50 text-slate-700 rounded-xl font-bold hover:bg-slate-100 transition-all">Back to Listing</button>
          </div>
        </div>
      )}

      {/* 6. Write Review Popup */}
      {showReviewPopup && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowReviewPopup(false)}>
          <div className="bg-white rounded-[2rem] shadow-2xl p-8 max-w-md w-full animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-900">Write a Review</h3>
              <button onClick={() => setShowReviewPopup(false)} className="p-2 hover:bg-slate-100 rounded-full"><X className="w-5 h-5 text-slate-400" /></button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} type="button" className="focus:outline-none">
                      <Star className="w-8 h-8 text-slate-200 hover:text-amber-400 hover:fill-amber-400 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Your Review</label>
                <textarea
                  placeholder="Share your experience with this mentor..."
                  className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  required
                ></textarea>
              </div>

              <button type="submit" className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal (Booking) */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowSuccessModal(false)}>
          <div className="bg-white rounded-[2rem] shadow-2xl p-8 max-w-sm w-full animate-in zoom-in-95 duration-200 text-center" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle className="w-10 h-10 text-green-600" /></div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Booking Confirmed!</h3>
            <p className="text-slate-500 font-medium text-sm mb-8">You will receive a confirmation email shortly.</p>
            <button onClick={() => setShowSuccessModal(false)} className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">Close</button>
          </div>
        </div>
      )}

    </div>
  );
}

export default Demo;