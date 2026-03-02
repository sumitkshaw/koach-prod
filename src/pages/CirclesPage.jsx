import { TrendingUp, DollarSign, Palette, Briefcase, Code, Users, ArrowRight, Search, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

// Asset Imports
import research from '../assets/circle/research.png';
import promotion from '../assets/circle/promotion.png';
import finance from '../assets/circle/finance.png';
import art from '../assets/circle/art.png';
import innovation from '../assets/circle/innovation.png';
import animation from '../assets/circle/animation.png';

const CirclesPage = () => {
  const navigate = useNavigate();
  const [selectedInterest, setSelectedInterest] = useState(0);
  const [selectedTag, setSelectedTag] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const interestCategories = [
    { icon: TrendingUp, label: 'Trending', color: 'bg-yellow-50 text-yellow-600' },
    { icon: DollarSign, label: 'Finance', color: 'bg-green-50 text-green-600' },
    { icon: Palette, label: 'Design', color: 'bg-purple-50 text-purple-600' },
    { icon: Briefcase, label: 'Business', color: 'bg-blue-50 text-blue-600' },
    { icon: Code, label: 'Development', color: 'bg-indigo-50 text-indigo-600' },
    { icon: Users, label: 'Community', color: 'bg-pink-50 text-pink-600' },
    { icon: Zap, label: 'Technology', color: 'bg-orange-50 text-orange-600' },
    { icon: Palette, label: 'Creative', color: 'bg-rose-50 text-rose-600' }
  ];

  const popularSearches = [
    'Finance', 'Education', 'Innovation', 'Startup', 'Tech', 'Design', 'Marketing'
  ];

  const circleCategories = [
    {
      title: 'Marketing',
      circles: [
        { name: 'Research', members: '21k', illustration: research, bgColor: 'bg-blue-50' },
        { name: 'Promotion', members: '18k', illustration: promotion, bgColor: 'bg-purple-50' },
        { name: 'Finance & Budgeting', members: '15k', illustration: finance, bgColor: 'bg-pink-50' }
      ]
    },
    {
      title: 'Modern art and Design',
      circles: [
        { name: 'Design Thinking', members: '23k', illustration: art, bgColor: 'bg-purple-50' },
        { name: 'Innovation', members: '19k', illustration: innovation, bgColor: 'bg-yellow-50' },
        { name: 'Animation', members: '17k', illustration: animation, bgColor: 'bg-gray-50' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-dm relative overflow-x-hidden">

      {/* Background Atmosphere */}
      <div className="fixed top-0 left-0 w-full h-[800px] bg-gradient-to-b from-blue-50/50 via-indigo-50/30 to-transparent pointer-events-none z-0"></div>
      <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-100/40 blur-[120px] pointer-events-none z-0"></div>

      <div className="relative z-10">
        <Navigation />

        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 pt-32 pb-12 max-w-7xl mx-auto text-center">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md border border-slate-100 animate-in slide-in-from-top-4 duration-700">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm font-bold text-slate-600">Live Communities</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight mb-6 animate-in slide-in-from-bottom-4 duration-700">
            Find your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Circle.</span> Grow together.
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto mb-12 animate-in slide-in-from-bottom-4 duration-700 delay-100">
            Join curated communities tailored to your professional interests and passions. Connect, learn, and scale your career.
          </p>

          {/* Search Box (Bento Style) */}
          <div className="bg-white rounded-[2.5rem] p-4 md:p-8 max-w-4xl mx-auto shadow-xl shadow-slate-200/20 border border-slate-100 transform hover:scale-[1.01] transition-transform duration-300">
            <div className="relative mb-6">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for communities, topics, or skills..."
                className="w-full pl-16 pr-6 py-5 bg-slate-50 rounded-2xl text-lg font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="text-sm font-bold text-slate-400 uppercase tracking-wider mr-2">Popular:</span>
              {popularSearches.map((tag, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${selectedTag === tag ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Interests & Categories */}
        <section className="px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto space-y-16">

          {/* Interests Grid */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Browse by Interest</h2>
              <button className="text-blue-600 font-bold hover:underline flex items-center gap-1">View All <ArrowRight className="w-4 h-4" /></button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {interestCategories.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedInterest(i)}
                  className={`flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all ${selectedInterest === i ? 'bg-white border-blue-200 shadow-xl shadow-blue-100 scale-105' : 'bg-white border-slate-100 hover:border-blue-100 hover:shadow-lg'}`}
                >
                  <div className={`p-3 rounded-xl ${item.color} bg-opacity-20`}>
                    <item.icon className={`w-6 h-6 ${item.color.split(' ')[1]}`} />
                  </div>
                  <span className={`text-sm font-bold ${selectedInterest === i ? 'text-slate-900' : 'text-slate-500'}`}>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Categories */}
          {circleCategories.map((cat, i) => (
            <div key={i} className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-1">{cat.title}</h2>
                  <p className="text-slate-500 font-medium">Top trending communities in {cat.title}</p>
                </div>
                <button className="hidden md:flex px-6 py-3 bg-white text-slate-900 rounded-xl font-bold border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm">
                  Explore {cat.title}
                </button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.circles.map((circle, j) => (
                  <div key={j} className="group bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-xl shadow-slate-200/20 hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden">
                    {/* Illustration Background */}
                    <div className={`absolute bottom-0 right-0 w-32 h-32 ${circle.bgColor} rounded-tl-[2.5rem] opacity-50 transition-transform duration-500 group-hover:scale-110`}></div>
                    <img src={circle.illustration} alt={circle.name} className="absolute bottom-4 right-4 w-24 h-24 object-contain z-0 group-hover:scale-110 transition-transform duration-500" />

                    <div className="relative z-10 space-y-4">
                      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100">
                        <Users className="w-6 h-6 text-slate-900" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-1">{circle.name}</h3>
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            {[1, 2, 3].map(k => (
                              <div key={k} className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white"></div>
                            ))}
                          </div>
                          <span className="text-sm font-bold text-slate-500">{circle.members} Members</span>
                        </div>
                      </div>
                      <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors shadow-lg">
                        Join Circle
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

        </section>

      </div>
      <Footer />
    </div>
  );
};

export default CirclesPage;