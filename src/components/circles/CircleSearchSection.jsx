import { Search } from 'lucide-react';
import { useState } from 'react';
import r1 from '../../assets/circle/r1.png';

const CircleSearchSection = () => {
  const [selectedTag, setSelectedTag] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const popularSearches = [
    'Finance',
    'Education',
    'Innovation',
    'Startup',
    'Tech',
    'Design & Creative',
    'University Admission',
    'Marketing'
  ];

  const handleTagClick = (tag) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
    } else {
      setSelectedTag(tag);
    }
  };

  const handleViewAll = () => {
    // Navigate to all interests page
    console.log('View all clicked');
  };

  return (
    <section className="relative w-full bg-[#efeff3] px-4 md:px-8 lg:px-20 xl:px-40 py-8 md:py-12 lg:py-16">
      {/* Background Image - Full Color */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: `url(${r1})` }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* White container box - Same size as previous */}
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg p-6 md:p-8 lg:p-12">
          {/* Search Bar */}
          <div className="mb-6 md:mb-8">
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-[#2D488F]/40" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by interests"
                className="w-full pl-12 pr-4 py-3 md:py-4 text-sm md:text-base text-[#2D488F] placeholder-[#2D488F]/50 bg-white border-2 border-[#2D488F]/20 rounded-full focus:outline-none focus:border-[#2D488F]/40 transition-colors"
              />
            </div>
          </div>

          {/* Popular Searches */}
          <div className="space-y-4">
            <h3 className="text-base md:text-lg font-semibold text-[#2D488F]/80 text-center md:text-left px-2">
              Popular Searches
            </h3>
            
            {/* Tags Grid */}
            <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start">
              {popularSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleTagClick(search)}
                  className={`px-4 md:px-5 py-2 md:py-2.5 text-xs md:text-sm font-medium rounded-full transition-all duration-200 border-2 ${
                    selectedTag === search
                      ? 'bg-[#2D488F] text-white border-[#2D488F] shadow-md shadow-blue-200'
                      : 'text-[#2D488F] bg-white border-[#2D488F]/20 hover:bg-[#2D488F]/5 hover:border-[#2D488F]/40'
                  } hover:scale-105 active:scale-95`}
                >
                  {search}
                </button>
              ))}
              
              {/* View All Button */}
              <button 
                onClick={handleViewAll}
                className="px-4 md:px-5 py-2 md:py-2.5 text-xs md:text-sm font-medium text-[#2D488F] bg-transparent hover:bg-[#2D488F]/5 rounded-full transition-all duration-200 border border-transparent hover:border-[#2D488F]/20 flex items-center gap-1 hover:scale-105 active:scale-95"
              >
                View all
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CircleSearchSection;