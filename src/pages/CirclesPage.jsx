// CirclesPage.jsx — flashy browse page with live API data
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Users, TrendingUp, DollarSign, Palette, Briefcase,
  Code, Zap, Loader2, Lock, ArrowRight, Sparkles
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useAuth } from '../utils/AuthContext';
import { getCircles, joinCircle, seedCircles } from '../services/circlesService';
import { useModal } from '../context/ModalContext';

// Generated circle cover images
import cResearch    from '../assets/circle/c_research.png';
import cPromotion   from '../assets/circle/c_promotion.png';
import cFinance     from '../assets/circle/c_finance.png';
import cDesign      from '../assets/circle/c_design.png';
import cInnovation  from '../assets/circle/c_innovation.png';
import cAnimation   from '../assets/circle/c_animation.png';
import cSoftwareDev from '../assets/circle/c_softwaredev.png';
import cCareer      from '../assets/circle/c_career.png';

const SLUG_COVER = {
  'research': cResearch,
  'promotion': cPromotion,
  'finance-budgeting': cFinance,
  'design-thinking': cDesign,
  'innovation': cInnovation,
  'animation': cAnimation,
  'software-dev': cSoftwareDev,
  'career': cCareer,
};

const CATEGORIES = [
  { label: 'All',       icon: Sparkles  },
  { label: 'Marketing', icon: TrendingUp },
  { label: 'Finance',   icon: DollarSign },
  { label: 'Design',    icon: Palette   },
  { label: 'Technology',icon: Zap       },
  { label: 'Business',  icon: Briefcase },
  { label: 'Community', icon: Users     },
];

// Category → subtle gradient overlay for card tops
const COVER_TINT = {
  Marketing:  'from-blue-600/30 to-indigo-600/20',
  Finance:    'from-emerald-600/30 to-teal-600/20',
  Design:     'from-purple-600/30 to-pink-600/20',
  Technology: 'from-orange-500/30 to-amber-500/20',
  Business:   'from-sky-600/30 to-blue-500/20',
  Community:  'from-rose-500/30 to-pink-500/20',
  General:    'from-slate-600/20 to-gray-600/10',
};

const POPULAR_TAGS = ['Finance', 'Education', 'Innovation', 'Startup', 'Tech', 'Design', 'Marketing'];

export default function CirclesPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { openModal } = useModal();

  const [circles, setCircles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState({});
  const [joined, setJoined] = useState({});
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);

  // Staggered card animation
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        let data = await getCircles();
        if (!data || data.length === 0) {
          await seedCircles();
          data = await getCircles();
        }
        setCircles(data);
        setTimeout(() => setVisible(true), 80);
      } catch (err) {
        console.error('Failed to load circles:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = circles.filter(c => {
    const matchCat = category === 'All' || c.category === category;
    const q = (selectedTag || search).toLowerCase();
    const matchSearch = !q ||
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      (c.tags || []).some(t => t.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  const handleJoin = async (e, slug) => {
    e.stopPropagation();
    if (!isAuthenticated) { openModal('login'); return; }
    if (joined[slug] || joining[slug]) return;
    setJoining(p => ({ ...p, [slug]: true }));
    try {
      await joinCircle(slug);
      setJoined(p => ({ ...p, [slug]: true }));
      setCircles(prev => prev.map(c => c.slug === slug ? { ...c, memberCount: c.memberCount + 1 } : c));
    } catch (err) {
      console.error(err);
    } finally {
      setJoining(p => ({ ...p, [slug]: false }));
    }
  };

  const CircleCard = ({ circle, index }) => {
    const cover = SLUG_COVER[circle.slug];
    const tint  = COVER_TINT[circle.category] || COVER_TINT.General;
    const isJoined  = joined[circle.slug];
    const isJoining = joining[circle.slug];

    return (
      <div
        onClick={() => navigate(`/circles/${circle.slug}`)}
        className="group bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/20
                   hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-300/30
                   transition-all duration-300 cursor-pointer overflow-hidden"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: `opacity 400ms ${index * 60}ms, transform 400ms ${index * 60}ms, box-shadow 250ms, translate 250ms`,
        }}
      >
        {/* Cover image */}
        <div className="relative h-36 w-full overflow-hidden">
          {cover ? (
            <>
              <img
                src={cover}
                alt={circle.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${tint}`} />
            </>
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${tint} flex items-center justify-center`}>
              <Users className="w-10 h-10 text-white/30" />
            </div>
          )}
          {/* Category badge */}
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-slate-700
                           text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            {circle.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          <h3 className="font-bold text-slate-900 text-lg leading-tight group-hover:text-blue-700 transition-colors">
            {circle.name}
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
            {circle.description}
          </p>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1,2,3].map(k => (
                  <div key={k} className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 border-2 border-white shadow-sm" />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-500">
                {(circle.memberCount || 0).toLocaleString()} members
              </span>
            </div>

            <button
              onClick={(e) => handleJoin(e, circle.slug)}
              disabled={isJoining}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all active:scale-95 shadow-sm
                ${isJoined
                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-200 cursor-default'
                  : 'bg-slate-900 text-white hover:bg-blue-700 shadow-slate-900/20'}`}
            >
              {isJoining ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> :
               isJoined  ? '✓ Joined' :
               !isAuthenticated ? <><Lock className="w-3.5 h-3.5" /> Join</> :
               'Join Circle'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Group filtered circles by category for "section" display
  const grouped = {};
  if (category === 'All' && !search && !selectedTag) {
    filtered.forEach(c => {
      if (!grouped[c.category]) grouped[c.category] = [];
      grouped[c.category].push(c);
    });
  }
  const isGrouped = category === 'All' && !search && !selectedTag;

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-dm relative overflow-x-hidden">

      {/* ── Background atmosphere ── */}
      <div className="fixed top-0 left-0 w-full h-[800px] bg-gradient-to-b from-blue-50/60 via-indigo-50/30 to-transparent pointer-events-none z-0" />
      <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-100/40 blur-[120px] pointer-events-none z-0" />
      <div className="fixed top-[20%] left-[-8%] w-[400px] h-[400px] rounded-full bg-blue-100/30 blur-[100px] pointer-events-none z-0" />

      <div className="relative z-10">
        <Navigation />

        {/* ── Hero ── */}
        <section className="px-4 sm:px-6 lg:px-8 pt-32 pb-12 max-w-7xl mx-auto text-center">
          <div className="mb-5 inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md border border-slate-100"
            style={{ animation: 'slideDown 0.6s ease both' }}>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-bold text-slate-600">
              {circles.length} Live Communities
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight mb-5"
            style={{ animation: 'slideUp 0.7s ease both 0.05s' }}>
            Find your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Circle.
            </span>{' '}
            Grow together.
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto mb-12"
            style={{ animation: 'slideUp 0.7s ease both 0.1s' }}>
            Curated spaces where professionals with shared interests learn, debate, and grow.
            Think subreddits — but for your career.
          </p>

          {/* ── Search bento ── */}
          <div
            className="bg-white rounded-[2.5rem] p-5 md:p-8 max-w-4xl mx-auto shadow-xl shadow-slate-200/30 border border-slate-100
                       hover:scale-[1.005] transition-transform duration-300"
            style={{ animation: 'slideUp 0.7s ease both 0.15s' }}
          >
            <div className="relative mb-5">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={e => { setSearch(e.target.value); setSelectedTag(null); }}
                placeholder="Search communities, topics, or skills…"
                className="w-full pl-14 pr-5 py-4 bg-slate-50 rounded-2xl text-base font-medium
                           text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>

            {/* Popular tags */}
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Popular:</span>
              {POPULAR_TAGS.map(tag => (
                <button
                  key={tag}
                  onClick={() => { setSelectedTag(t => t === tag ? null : tag); setSearch(''); }}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all active:scale-95
                    ${selectedTag === tag
                      ? 'bg-slate-900 text-white shadow-lg'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Category tabs (horizontal scroll) ── */}
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-8"
          style={{ animation: 'slideUp 0.7s ease both 0.2s' }}>

          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map(({ label, icon: Icon }) => (
              <button
                key={label}
                onClick={() => setCategory(label)}
                className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-2xl border text-sm font-bold
                             transition-all duration-200 active:scale-95
                  ${category === label
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-900/20 scale-105'
                    : 'bg-white text-slate-600 border-slate-100 hover:border-blue-200 hover:text-blue-700 hover:shadow-md'}`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Circle grid (grouped or flat) ── */}
        <section className="px-4 sm:px-6 lg:px-8 pb-20 max-w-7xl mx-auto space-y-14">
          {loading ? (
            <div className="flex items-center justify-center py-28 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin mr-3" />
              <span className="font-semibold">Loading communities…</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-28 text-slate-400">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-semibold text-lg">No circles found</p>
              <p className="text-sm mt-1">Try a different search or category</p>
            </div>
          ) : isGrouped ? (
            // Grouped by category
            Object.entries(grouped).map(([cat, items]) => (
              <div key={cat} className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{cat}</h2>
                    <p className="text-slate-500 text-sm mt-0.5">Top communities in {cat.toLowerCase()}</p>
                  </div>
                  <button
                    onClick={() => setCategory(cat)}
                    className="hidden md:flex items-center gap-1.5 px-5 py-2.5 bg-white border border-slate-200 text-slate-700
                               rounded-xl font-bold text-sm hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm">
                    Explore {cat} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {items.map((c, i) => <CircleCard key={c._id || c.slug} circle={c} index={i} />)}
                </div>
              </div>
            ))
          ) : (
            // Flat grid for filtered/search
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((c, i) => <CircleCard key={c._id || c.slug} circle={c} index={i} />)}
            </div>
          )}
        </section>
      </div>

      <Footer />

      <style>{`
        @keyframes slideDown { from { opacity: 0; transform: translateY(-12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp   { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </div>
  );
}