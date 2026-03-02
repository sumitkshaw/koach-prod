// NotFound.jsx
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

function NotFound() {
  return (
    <div className="min-h-screen bg-[#ECF0F6] flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Graphic */}
          <div className="mb-8">
            <div className="relative inline-block">
              <div className="text-9xl font-bold text-[#2D488F] opacity-20">404</div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl font-bold text-[#2D488F]">404</div>
              </div>
            </div>
          </div>

          {/* Message */}
          <h1 className="text-4xl md:text-5xl font-bold text-[#2D488F] mb-4">
            Page Not Found
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or you entered an invalid URL.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              to="/"
              className="flex items-center gap-3 bg-[#0A1F44] text-white px-8 py-4 rounded-xl shadow-lg hover:bg-[#0d2855] transition-all duration-300 transform hover:scale-105 font-semibold"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-3 bg-white text-[#0A1F44] border border-[#0A1F44] px-8 py-4 rounded-xl shadow-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 font-semibold"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
          </div>

          {/* Search Suggestion */}
          <div className="bg-white rounded-2xl shadow-md p-6 max-w-md mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <Search className="w-6 h-6 text-[#2D488F]" />
              <h3 className="text-lg font-semibold text-[#2D488F]">Can't find what you need?</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Try searching for mentors or browse our available categories.
            </p>
            <Link
              to="/listing"
              className="inline-flex items-center gap-2 text-[#2D488F] font-semibold hover:text-[#0A1F44] transition-colors duration-200"
            >
              Browse Mentors
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Additional Help */}
          <div className="mt-8 text-gray-500">
            <p>If you believe this is an error, please <a href="mailto:support@koach.live" className="text-[#2D488F] hover:underline">contact support</a>.</p>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default NotFound;