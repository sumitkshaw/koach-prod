import React, { useState } from 'react';
import { X, ChevronRight, Filter, ChevronDown } from 'lucide-react';

const Sidenav1 = ({ sidebarOpen, setSidebarOpen, filters, setFilters, applyFilters }) => {
  const [expandedFilters, setExpandedFilters] = useState({});
  const [availabilityDates, setAvailabilityDates] = useState({ from: '', to: '' });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleFilterExpansion = (filterName) => {
    setExpandedFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  const sortOptions = [
    { name: 'Available ASAP', type: 'toggle', key: 'availableASAP' },
    { name: 'Hourly charges', type: 'dropdown', key: 'hourlyCharges' },
    { name: 'Ratings', type: 'dropdown', key: 'ratings' },
    { name: 'Years of experience', type: 'dropdown', key: 'experience' },
    { name: 'Service category', type: 'dropdown', key: 'serviceCategory' },
    { name: 'Industry', type: 'dropdown', key: 'industry' },
    { name: 'Location', type: 'dropdown', key: 'location' },
    { name: 'Language', type: 'dropdown', key: 'language' },
    { name: 'Skill-set', type: 'dropdown', key: 'skillset' },
  ];

  // Dropdown options for each filter
  const dropdownOptions = {
    ratings: [
      { label: '4.5+', value: '4.5' },
      { label: '4.0+', value: '4.0' },
      { label: '3.5+', value: '3.5' },
      { label: '3.0+', value: '3.0' }
    ],
    experience: [
      { label: '1-2 years', value: '1-2' },
      { label: '3-5 years', value: '3-5' },
      { label: '5+ years', value: '5+' },
      { label: '10+ years', value: '10+' }
    ],
    hourlyCharges: [
      { label: '$0-$50', value: '0-50' },
      { label: '$50-$100', value: '50-100' },
      { label: '$100-$200', value: '100-200' },
      { label: '$200+', value: '200+' }
    ],
    serviceCategory: [
      { label: 'Backend Development', value: 'backend' },
      { label: 'Frontend Development', value: 'frontend' },
      { label: 'Marketing', value: 'marketing' },
      { label: 'Project Management', value: 'project-management' },
      { label: 'Security', value: 'security' },
      { label: 'Networking', value: 'networking' }
    ],
    industry: [
      { label: 'Technology', value: 'technology' },
      { label: 'Finance', value: 'finance' },
      { label: 'Consulting', value: 'consulting' },
      { label: 'Manufacturing', value: 'manufacturing' }
    ],
    location: [
      { label: 'North America', value: 'north-america' },
      { label: 'Europe', value: 'europe' },
      { label: 'Australia', value: 'australia' },
      { label: 'Asia', value: 'asia' }
    ],
    language: [
      { label: 'English', value: 'english' },
      { label: 'French', value: 'french' },
      { label: 'Italian', value: 'italian' },
      { label: 'Spanish', value: 'spanish' }
    ],
    skillset: [
      { label: 'JavaScript', value: 'javascript' },
      { label: 'React', value: 'react' },
      { label: 'Node.js', value: 'nodejs' },
      { label: 'Python', value: 'python' },
      { label: 'Marketing Strategy', value: 'marketing-strategy' },
      { label: 'Project Management', value: 'project-management' }
    ]
  };

  const handleToggleChange = (key) => {
    setFilters(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleDropdownSelect = (key, value) => {
    // Clear the filter if the same option is clicked again
    setFilters(prev => ({
      ...prev,
      [key]: prev[key] === value ? null : value
    }));
  };

  const handleClearFilters = () => {
    const clearedFilters = {};
    sortOptions.forEach(option => {
      if (option.type === 'toggle') {
        clearedFilters[option.key] = false;
      } else {
        clearedFilters[option.key] = null;
      }
    });
    setFilters(clearedFilters);
    setAvailabilityDates({ from: '', to: '' });
  };

  const handleShowResults = () => {
    applyFilters();
    if (window.innerWidth < 1024) {
      toggleSidebar();
    }
  };

  return (
    <>
      {/* Filter Toggle Button for Mobile */}
      <button
        onClick={toggleSidebar}
        className="fixed top-20 left-4 z-50 lg:hidden flex items-center gap-2 transition-all duration-300 group"
      >
        {/* Icon Container with Background */}
        <div className={`p-3 rounded-xl shadow-2xl transition-all duration-300 ${
          sidebarOpen 
            ? 'bg-white rotate-90' 
            : 'bg-gradient-to-r from-blue-100 to-indigo-400'
        }`}>
          <div className="transition-transform duration-300">
            {sidebarOpen ? (
              <X className={`w-5 h-5 ${sidebarOpen ? 'text-gray-900' : 'text-white'}`} />
            ) : (
              <Filter className="w-5 h-5 text-white" />
            )}
          </div>
        </div>
        
        {/* Text Container - Plain text, no background */}
        <div className="flex flex-col items-start">
          <span className={`text-sm font-medium transition-all duration-300 ${
            sidebarOpen ? 'text-white' : 'text-gray-700'
          }`}>
            {sidebarOpen ? 'Hide' : 'Sort by'}
          </span>
          <span className="text-xs text-gray-500 font-normal">
            Filters
          </span>
        </div>
      </button>

      {/* Backdrop Overlay for Mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 bg-[#0A1F44] text-white transition-transform duration-500 ease-in-out z-40 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } w-80 shadow-2xl flex flex-col lg:top-16 lg:h-[calc(100vh-4rem)]`}>
        
        {/* Close Button - Mobile Only */}
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 lg:hidden text-white hover:text-gray-300 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Mobile Header Spacer */}
        <div className="h-28 lg:hidden"></div>
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-8">
          
          {/* Availability Section */}
          {/* <div className="mb-8 lg:mt-0">
            <h3 className="text-xl font-bold mb-4">Availability</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Select date</label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="date"
                    placeholder="From"
                    value={availabilityDates.from}
                    onChange={(e) => setAvailabilityDates(prev => ({ ...prev, from: e.target.value }))}
                    className="bg-white text-gray-800 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <input
                    type="date"
                    placeholder="To"
                    value={availabilityDates.to}
                    onChange={(e) => setAvailabilityDates(prev => ({ ...prev, to: e.target.value }))}
                    className="bg-white text-gray-800 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
              </div>
            </div>
          </div> */}

          {/* Sort By Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Sort by</h3>
              <button 
                onClick={handleClearFilters}
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                Clear all
              </button>
            </div>

            <div className="space-y-1">
              {sortOptions.map((option) => (
                <div key={option.key}>
                  {option.type === 'toggle' ? (
                    <div className="flex items-center justify-between py-3 border-b border-white/10">
                      <span className="text-sm font-medium">{option.name}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={filters[option.key] || false}
                          onChange={() => handleToggleChange(option.key)}
                        />
                        {/* Updated: Changed background to yellow when checked */}
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                      </label>
                    </div>
                  ) : (
                    <div className="border-b border-white/10">
                      <div 
                        className="flex items-center justify-between py-3 cursor-pointer hover:bg-[#112a5c] transition-colors"
                        onClick={() => toggleFilterExpansion(option.key)}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{option.name}</span>
                          {filters[option.key] && (
                            <span className="text-xs bg-yellow-400 text-gray-900 px-2 py-0.5 rounded-full">
                              ✓
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          {expandedFilters[option.key] ? (
                            <ChevronDown className="w-5 h-5 text-gray-400 transition-transform duration-300" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-400 transition-transform duration-300" />
                          )}
                        </div>
                      </div>
                      
                      {/* Dropdown Options */}
                      {expandedFilters[option.key] && dropdownOptions[option.key] && (
                        <div className="pb-3 pl-2">
                          <div className="space-y-2">
                            {dropdownOptions[option.key].map((opt) => (
                              <label 
                                key={opt.value}
                                className="flex items-center gap-2 cursor-pointer hover:text-gray-300 transition-colors"
                                onClick={() => handleDropdownSelect(option.key, opt.value)}
                              >
                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                  filters[option.key] === opt.value 
                                    ? 'border-yellow-400 bg-yellow-400' 
                                    : 'border-gray-400'
                                }`}>
                                  {filters[option.key] === opt.value && (
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#0A1F44]"></div>
                                  )}
                                </div>
                                <span className="text-sm text-gray-300">{opt.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Show Results Button */}
        <div className="p-6 border-t border-white/10 flex-shrink-0">
          <button 
            onClick={handleShowResults}
            className="w-full bg-yellow-400 text-gray-900 py-3 rounded-lg font-bold hover:bg-yellow-500 transition-colors shadow-lg"
          >
            Show results
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidenav1;