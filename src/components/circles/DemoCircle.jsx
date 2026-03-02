import { Share2, Flag, Bookmark, ThumbsUp, MessageCircle, Users, Calendar, MapPin, ArrowLeft, TrendingUp, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import uxDesignImage from '../../assets/circle/r1.png';
import Footer from '../../components/Footer';

function DemoCircle() {
  const [isFollowing, setIsFollowing] = useState(false);

  // Add this useEffect to reset scroll position
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Optional: Also reset scroll position when navigating back/forward
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  const circleInfo = {
    name: "User Experience Design",
    category: "Product Designer",
    location: "Global",
    members: "2.5k",
    posts: "1.2k",
    description: "Every UX designer has a unique set of tools that power their process—from research to wireframing to prototyping and testing. Whether you rely on industry staples or niche gems, your toolkit says a lot about how you work.",
    coverImage: uxDesignImage,
    rules: [
      {
        number: 1,
        text: "Consectetur nunc purus nullam. Phasellus feugiat lectus pharetra ultrices."
      },
      {
        number: 2,
        text: "At donec nulla ut lorem in. Pulvinar feugiat lectus pharetra ultrices. Sodales porttitor mauris in euismod a mi commodo bibendum. Mauris at mauris euismod non elit."
      },
      {
        number: 3,
        text: "Et erat ipsum nunc mi lectus enim lectus odin. Laoreet pulvinar mauris euismod non elit."
      }
    ],
    recentPosts: [
      {
        id: 1,
        title: "What's in Your UX Toolkit Right Now?",
        author: "Sarah Johnson",
        role: "Product Designer @Google",
        preview: "Every UX designer has a unique set of tools that power their process—from research to wireframing to prototyping and testing. Whether you rely on industry staples or niche gems, your toolkit says a lot about how you work.",
        likes: 234,
        comments: 45,
        date: "2 days ago"
      },
      {
        id: 2,
        title: "What's in Your UX Toolkit Right Now?",
        author: "Mike Chen",
        role: "Product Designer @Google",
        preview: "Every UX designer has a unique set of tools that power their process—from research to wireframing to prototyping and testing. Whether you rely on industry staples or niche gems, your toolkit says a lot about how you work.",
        likes: 189,
        comments: 32,
        date: "3 days ago"
      }
    ],
    thoughts: [
      { id: 1, author: "John Doe", text: "Every UX designer has a unique set of tools that power their process.", color: "bg-slate-50" },
      { id: 2, author: "Jane Smith", text: "Every UX designer has a unique set of tools that power their process.", color: "bg-blue-50" },
      { id: 3, author: "Alex Brown", text: "Every UX designer has a unique set of tools that power their process.", color: "bg-indigo-50" },
      { id: 4, author: "Emily White", text: "Every UX designer has a unique set of tools that power their process.", color: "bg-violet-50" },
      { id: 5, author: "Chris Black", text: "Every UX designer has a unique set of tools that power their process.", color: "bg-purple-50" }
    ]
  };

  const PostCard = ({ post }) => (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md hover:border-gray-300 transition-all duration-300">
      <div className="p-6">
        {/* Post Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {post.author.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">{post.author}</h4>
              <p className="text-xs text-gray-500">{post.role}</p>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-xs text-gray-400">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.date}</span>
          </div>
        </div>

        {/* Post Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-3 hover:text-[#2D488F] cursor-pointer transition-colors">
          {post.title}
        </h3>

        {/* Post Preview */}
        <p className="text-sm text-gray-600 mb-5 line-clamp-3 leading-relaxed">{post.preview}</p>

        {/* Post Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-5">
            <button className="flex items-center space-x-1.5 text-gray-500 hover:text-[#2D488F] transition-colors group">
              <ThumbsUp className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">{post.likes}</span>
            </button>
            <button className="flex items-center space-x-1.5 text-gray-500 hover:text-[#2D488F] transition-colors group">
              <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">{post.comments}</span>
            </button>
          </div>
          <div className="flex items-center space-x-1">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bookmark className="w-4 h-4 text-gray-500" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Share2 className="w-4 h-4 text-gray-500" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Flag className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 md:px-8 lg:px-20 xl:px-40 py-4">
          <button className="flex items-center space-x-2 text-gray-600 hover:text-[#2D488F] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium text-sm">Back to Circles</span>
          </button>
        </div>
      </div>

      {/* Hero Section with Cover Image */}
      <section className="bg-white">
        <div className="px-4 md:px-8 lg:px-20 xl:px-40 py-0">
          <div className="max-w-7xl mx-auto">
            {/* Cover Image */}
            <div className="relative h-72 md:h-80 lg:h-96 rounded-2xl overflow-hidden mt-6 mb-6">
              <img 
                src={circleInfo.coverImage} 
                alt={circleInfo.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#2D488F] text-xs font-semibold rounded-full">
                    Research Forum
                  </span>
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium rounded-full flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>Trending</span>
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{circleInfo.name}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-white/95">
                  <span className="flex items-center space-x-1.5">
                    <Users className="w-4 h-4" />
                    <span className="font-medium">{circleInfo.members} Members</span>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <MessageCircle className="w-4 h-4" />
                    <span className="font-medium">{circleInfo.posts} Posts</span>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <MapPin className="w-4 h-4" />
                    <span className="font-medium">{circleInfo.location}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pb-8 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 ${
                    isFollowing
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                      : 'bg-[#2D488F] text-white hover:bg-[#1e3260]'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow Circle'}
                </button>
                <button className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300">
                  View Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About and Rules Section */}
      <section className="px-4 md:px-8 lg:px-20 xl:px-40 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* About */}
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About this Circle</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{circleInfo.description}</p>
            </div>

            {/* Rules */}
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Community Guidelines</h3>
              <ol className="space-y-4">
                {circleInfo.rules.map((rule) => (
                  <li key={rule.number} className="flex space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-[#2D488F] text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {rule.number}
                    </span>
                    <p className="text-sm text-gray-600 leading-relaxed">{rule.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="px-4 md:px-8 lg:px-20 xl:px-40 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Posts */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Recent Discussions</h2>
                <button className="px-4 py-2 bg-[#2D488F] text-white rounded-lg text-sm font-semibold hover:bg-[#1e3260] transition-colors">
                  New Post
                </button>
              </div>
              {circleInfo.recentPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Thoughts */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-5">Community Insights</h3>
                <div className="space-y-3">
                  {circleInfo.thoughts.map((thought) => (
                    <div key={thought.id} className={`${thought.color} p-4 rounded-lg border border-gray-100`}>
                      <p className="text-xs text-gray-500 mb-2 font-medium">{thought.author}</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{thought.text}</p>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-5 py-2.5 text-[#2D488F] font-semibold hover:bg-gray-50 rounded-lg transition-colors border border-gray-200 flex items-center justify-center space-x-2">
                  <span>Share Your Insight</span>
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </button>
              </div>

              {/* Stats Card */}
              <div className="bg-gradient-to-br from-[#2D488F] to-[#1e3260] rounded-xl p-6 text-white">
                <h3 className="text-lg font-bold mb-4">Circle Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/80">Active Today</span>
                    <span className="font-bold">847</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/80">New This Week</span>
                    <span className="font-bold">156</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/80">Growth Rate</span>
                    <span className="font-bold text-green-300">+12%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default DemoCircle;