import { Search, Calendar, User, ArrowRight, TrendingUp, BookOpen, Target, Users, Lightbulb, BarChart } from 'lucide-react';
import Footer from '../components/Footer';
import resourcesImage from '../assets/image-990.avif'; // Replace with your resources hero image

function Resources() {
  const latestBlogs = [
    {
      id: 1,
      title: "Why fundamentals is important",
      author: "Rick Kurten",
      date: "20/07/2024",
      category: "Fundamentals",
      bgColor: "bg-gradient-to-br from-orange-400 to-orange-500",
      icon: <Target className="w-8 h-8 text-white" />
    },
    {
      id: 2,
      title: "Did you know? about marketing",
      author: "Sarah Johnson",
      date: "18/07/2024",
      category: "Marketing",
      bgColor: "bg-gradient-to-br from-yellow-400 to-yellow-500",
      icon: <Lightbulb className="w-8 h-8 text-white" />
    },
    {
      id: 3,
      title: "Did you know? about marketing",
      author: "Mike Davis",
      date: "16/07/2024",
      category: "Strategy",
      bgColor: "bg-gradient-to-br from-red-400 to-red-500",
      icon: <BarChart className="w-8 h-8 text-white" />
    },
    {
      id: 4,
      title: "Why is Promotion So crucial in marketing!",
      author: "Rick Kurten",
      date: "14/07/2024",
      category: "Promotion",
      bgColor: "bg-gradient-to-br from-blue-400 to-blue-500",
      icon: <TrendingUp className="w-8 h-8 text-white" />
    }
  ];

  const trendingBlogs = [
    {
      id: 5,
      title: "Why fundamentals is important",
      author: "Rick Kurten",
      date: "20/07/2024",
      category: "Fundamentals",
      bgColor: "bg-gradient-to-br from-orange-400 to-orange-500",
      icon: <Target className="w-8 h-8 text-white" />
    },
    {
      id: 6,
      title: "Did you know? about marketing",
      author: "Sarah Johnson",
      date: "18/07/2024",
      category: "Marketing",
      bgColor: "bg-gradient-to-br from-yellow-400 to-yellow-500",
      icon: <Lightbulb className="w-8 h-8 text-white" />
    },
    {
      id: 7,
      title: "Did you know? about marketing",
      author: "Mike Davis",
      date: "16/07/2024",
      category: "Strategy",
      bgColor: "bg-gradient-to-br from-red-400 to-red-500",
      icon: <BarChart className="w-8 h-8 text-white" />
    },
    {
      id: 8,
      title: "Why is Promotion So crucial in marketing!",
      author: "Rick Kurten",
      date: "14/07/2024",
      category: "Promotion",
      bgColor: "bg-gradient-to-br from-blue-400 to-blue-500",
      icon: <TrendingUp className="w-8 h-8 text-white" />
    }
  ];

  const BlogCard = ({ blog }) => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className={`${blog.bgColor} p-6 relative`}>
        <div className="flex justify-between items-start mb-4">
          <div className="bg-white/20 rounded-lg p-2">
            {blog.icon}
          </div>
          <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
            {blog.category}
          </span>
        </div>
        <h3 className="text-white font-bold text-lg mb-2 leading-tight">
          {blog.title}
        </h3>
        <div className="absolute bottom-4 right-4">
          <div className="bg-white/20 rounded-lg p-2">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>{blog.author}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{blog.date}</span>
          </div>
        </div>
        <button className="bg-[#2D488F] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1e3260] transition-colors duration-300 flex items-center space-x-1">
          <span>Read More</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-[#ECF0F6]">
      {/* Hero Section */}
      <section className="relative w-full bg-[#efeff3] px-4 md:px-8 lg:px-20 xl:px-40 pt-8 md:pt-16 lg:pt-20 pb-6 md:pb-12 lg:pb-16">
        <div className="max-w-7xl mx-auto">
          {/* White container box */}
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg p-12 md:p-12 lg:p-16">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-16 items-center min-h-[350px] md:min-h-[400px] lg:min-h-[450px]">
              {/* Text content - Always first on mobile */}
              <div className="w-full space-y-3 md:space-y-4 lg:space-y-6 text-center lg:text-left order-1">
                <h1 className="text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#2D488F] leading-tight">
                  Top Blogs
                </h1>
                <p className="text-sm md:text-base lg:text-lg xl:text-xl text-[#2D488F]/75 leading-relaxed max-w-md lg:max-w-lg mx-auto lg:mx-0">
                  Discover insights, strategies, and knowledge through our curated collection of expert articles and resources.
                </p>
              </div>
              
              {/* Illustration - Always second on mobile */}
              <div className="w-full flex justify-center lg:justify-end order-2">
                <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-md lg:max-w-lg xl:max-w-xl">
                  <img 
                    src={resourcesImage} 
                    alt="Resources illustration"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Read Our Latest Blogs Section */}
      <section className="px-6 md:px-20 lg:px-40 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2D488F] mb-8">Read our latest blogs</h2>
          
          {/* Search Bar */}
          <div className="relative mb-12">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, topic"
              className="w-full md:w-80 pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D488F] focus:border-transparent outline-none"
            />
          </div>

          {/* Latest Blogs */}
          <div className="mb-16">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-semibold text-gray-800">Latest Blogs</h3>
              <button className="text-[#2D488F] hover:text-[#1e3260] font-medium flex items-center space-x-1">
                <span>View more</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {latestBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          </div>

          {/* Trending Section */}
          <div>
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-semibold text-gray-800">Trending</h3>
              <button className="text-[#2D488F] hover:text-[#1e3260] font-medium flex items-center space-x-1">
                <span>View more</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="px-6 md:px-20 lg:px-40 py-12 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-8">Stay Updated</h2>
          <p className="text-base md:text-xl text-gray-600 text-center mb-12 leading-8">
            Subscribe to our newsletter to get the latest insights and updates delivered directly to your inbox.
          </p>
          
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="block text-sm font-medium text-gray-700 mb-2">Name</div>
                  <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500">
                    Enter your name
                  </div>
                </div>
                <div>
                  <div className="block text-sm font-medium text-gray-700 mb-2">Email</div>
                  <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500">
                    Enter your email
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <button
                  className="bg-[#2D488F] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#1e3260] transition-colors duration-300 shadow-lg hover:shadow-xl"
                >
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Resources;