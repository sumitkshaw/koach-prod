import React from 'react';
import { Menu, X, LayoutDashboard, Users, TrendingUp, Calendar, MessageSquare } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidenav = ({ sidebarOpen, setSidebarOpen, currentRoute = '/dashboard_mentor' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Use actual current location instead of prop for active state
  const actualCurrentRoute = location.pathname;

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const navigationItems = [
    { name: 'Dashboard', icon: LayoutDashboard, route: '/dashboard_mentor' },
    { name: 'My Mentees', icon: Users, route: '/dashboard_mentor/mentees' },
    { name: 'Earnings', icon: TrendingUp, route: '/dashboard_mentor/earnings' },
    { name: 'Calendar', icon: Calendar, route: '/dashboard_mentor/calendar' },
    { name: 'Messages', icon: MessageSquare, route: '/dashboard_mentor/messages' },
  ];

  const bottomItems = [
    { name: 'Start Conversation', route: '/dashboard_mentor/start-conversation' },
    { name: 'Find Mentors', route: '/dashboard_mentor/find-mentors' },
    { name: 'Ask an Expert', route: '/dashboard_mentor/ask-expert' },
    { name: 'Product Feature Request', route: '/dashboard_mentor/feature-request' },
  ];

  const handleNavigation = (route) => {
    navigate(route);
    
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logout clicked');
    navigate('/login');
  };

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-20 left-4 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-xl shadow-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Backdrop Blur Overlay for Mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 bg-gradient-to-b from-slate-900 via-blue-900 to-indigo-900 text-white transition-transform duration-500 ease-in-out z-40 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } w-64 shadow-2xl backdrop-blur-sm flex flex-col lg:top-16 lg:h-[calc(100vh-4rem)]`}>
        
        {/* Mobile Header Spacer - only on mobile */}
        <div className="h-16 lg:hidden"></div>
        
        {/* Top Navigation */}
        <div className="p-4 pt-16 flex-1 overflow-y-auto">
          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = actualCurrentRoute === item.route;
              
              return (
                <div
                  key={item.route}
                  onClick={() => handleNavigation(item.route)}
                  className={`flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-all duration-300 text-sm font-medium ${
                    isActive 
                      ? 'bg-yellow-400 text-black shadow-lg' 
                      : 'text-white hover:bg-white hover:bg-opacity-10 hover:shadow-lg backdrop-blur-sm'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{item.name}</span>
                </div>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="p-4 border-t border-white/10 flex-shrink-0">
          {/* Bottom Navigation Items */}
          <div className="space-y-2 mb-6">
            {bottomItems.map((item) => (
              <div
                key={item.route}
                onClick={() => handleNavigation(item.route)}
                className="cursor-pointer text-yellow-400 text-sm font-medium hover:text-yellow-300 transition-colors duration-200 py-1"
              >
                {item.name}
              </div>
            ))}
          </div>

          {/* Bottom Icons */}
          <div className="flex items-center justify-between mb-4">
            {/* Notifications */}
            <div 
              className="relative cursor-pointer hover:scale-110 transition-transform duration-200"
              onClick={() => handleNavigation('/dashboard_mentor/notifications')}
            >
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">2</span>
              </div>
            </div>

            {/* Profile */}
            <div 
              className="cursor-pointer hover:scale-110 transition-transform duration-200"
              onClick={() => handleNavigation('/dashboard_mentor/profile')}
            >
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            </div>

            {/* Settings */}
            <div 
              className="cursor-pointer hover:scale-110 transition-transform duration-200"
              onClick={() => handleNavigation('/dashboard_mentor/settings')}
            >
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Logout */}
          <div 
            onClick={handleLogout}
            className="text-center text-white text-sm font-medium cursor-pointer hover:text-yellow-400 transition-colors duration-200"
          >
            Logout
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidenav;