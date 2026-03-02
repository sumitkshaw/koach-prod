import { useState, useEffect, useRef } from "react";
import { Menu, Search, Bell, User, LogOut, Settings } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import image3 from "../assets/image3.png";
import { useAuth } from "../utils/AuthContext";
import { FaCloud } from "react-icons/fa";
import { useModal } from "../context/ModalContext";

function Navigation() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [showResourcesDropdown, setShowResourcesDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Notification States
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Welcome to Koach! Complete your profile to get started.", time: "2m ago", read: false },
    { id: 2, message: "New mentor available in your area.", time: "1h ago", read: false },
    { id: 3, message: "Your circle has new activity.", time: "3h ago", read: false },
  ]);

  // Profile Menu States
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);

  // Mobile Profile Menu States
  const [showMobileProfileMenu, setShowMobileProfileMenu] = useState(false);
  const mobileProfileRef = useRef(null);

  // Mobile Notification States
  const [showMobileNotifications, setShowMobileNotifications] = useState(false);
  const mobileNotificationRef = useRef(null);

  const navigate = useNavigate();
  const { openModal } = useModal();

  // Get dashboard type from localStorage or determine from current path
  const getStoredDashboardType = () => {
    // Check if we're currently on a dashboard route
    if (location.pathname.startsWith('/dashboard_mentor')) {
      localStorage.setItem('dashboardType', 'mentor');
      return 'mentor';
    } else if (location.pathname.startsWith('/dashboard')) {
      localStorage.setItem('dashboardType', 'mentee');
      return 'mentee';
    }

    // Fallback to stored value or default
    const stored = localStorage.getItem('dashboardType');
    return stored || 'mentee'; // default to mentee if nothing stored
  };

  const [dashboardType, setDashboardType] = useState(getStoredDashboardType);

  useEffect(() => {
    // Update dashboard type when location changes
    if (location.pathname.startsWith('/dashboard_mentor')) {
      setDashboardType('mentor');
      localStorage.setItem('dashboardType', 'mentor');
    } else if (location.pathname.startsWith('/dashboard')) {
      setDashboardType('mentee');
      localStorage.setItem('dashboardType', 'mentee');
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowResourcesDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileProfileRef.current && !mobileProfileRef.current.contains(event.target)) {
        setShowMobileProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileNotificationRef.current && !mobileNotificationRef.current.contains(event.target)) {
        setShowMobileNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getDashboardPath = () => {
    return dashboardType === 'mentor' ? "/dashboard_mentor" : "/dashboard";
  };

  const handleDashboardNavigation = () => {
    const dashboardPath = getDashboardPath();
    navigate(dashboardPath);
  };

  const handleBecomeMentor = () => {
    // Open mentor-signup modal
    openModal('mentor-signup');
    setIsMenuOpen(false);
  };

  // Check if current path matches nav link
  const isActive = (path) => {
    return location.pathname === path ||
      (path === '/' && location.pathname === '/') ||
      (path !== '/' && location.pathname.startsWith(path));
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
              className="cursor-pointer"
            >
              <img src={image3} alt="Koach" className="h-10 w-auto" />
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-10 ml-16">
            {/* Navigation Links with underline animation */}
            <div className="flex space-x-10">
              <a
                href="/about"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/about");
                }}
                className="group relative text-gray-700 hover:text-gray-900 text-lg font-medium tracking-wide py-2 px-1 transition-colors duration-200"
              >
                About Us
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#2D488F] to-blue-500 transform origin-left transition-transform duration-300 ${isActive('/about') ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100`}></span>
              </a>

              <a
                href="/circles"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/circles");
                }}
                className="group relative text-gray-700 hover:text-gray-900 text-lg font-medium tracking-wide py-2 px-1 transition-colors duration-200"
              >
                Circle
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#2D488F] to-blue-500 transform origin-left transition-transform duration-300 ${isActive('/circles') ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100`}></span>
              </a>

              <a
                href="/listing"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/listing");
                }}
                className="group relative text-gray-700 hover:text-gray-900 text-lg font-medium tracking-wide py-2 px-1 transition-colors duration-200"
              >
                Koach
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#2D488F] to-blue-500 transform origin-left transition-transform duration-300 ${isActive('/listing') ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100`}></span>
              </a>

              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/contact");
                }}
                className="group relative text-gray-700 hover:text-gray-900 text-lg font-medium tracking-wide py-2 px-1 transition-colors duration-200"
              >
                Contact
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#2D488F] to-blue-500 transform origin-left transition-transform duration-300 ${isActive('/contact') ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100`}></span>
              </a>

              {/* Dashboard link - only show when user is logged in */}
              {user && (
                <a
                  href={getDashboardPath()}
                  onClick={(e) => {
                    e.preventDefault();
                    handleDashboardNavigation();
                  }}
                  className="group relative text-gray-700 hover:text-gray-900 text-lg font-medium tracking-wide py-2 px-1 transition-colors duration-200"
                >
                  Dashboard
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#2D488F] to-blue-500 transform origin-left transition-transform duration-300 ${isActive('/dashboard') || isActive('/dashboard_mentor') ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100`}></span>
                </a>
              )}
            </div>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  {/* Profile Section */}
                  <div className="flex items-center space-x-4">
                    {/* Notification Icon */}
                    <div className="relative" ref={notificationRef}>
                      <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-200 relative focus:outline-none"
                      >
                        <Bell className="w-5 h-5" />
                        {notifications.length > 0 && (
                          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        )}
                        {notifications.length > 0 && (
                          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white font-bold ring-2 ring-white">
                            {notifications.length}
                          </span>
                        )}
                      </button>

                      {/* Notification Dropdown */}
                      {showNotifications && (
                        <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-[60] animate-in fade-in slide-in-from-top-2 duration-200">
                          <div className="p-3 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
                            <h3 className="font-semibold text-gray-900 text-sm">Notifications</h3>
                            <button
                              className="text-xs text-[#2D488F] hover:text-blue-700 font-medium transition-colors"
                              onClick={() => setNotifications([])}
                            >
                              Clear all
                            </button>
                          </div>
                          <div className="max-h-80 overflow-y-auto custom-scrollbar">
                            {notifications.length > 0 ? (
                              notifications.map((notif) => (
                                <div key={notif.id} className="p-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 cursor-pointer group">
                                  <div className="flex gap-3">
                                    <div className="flex-shrink-0 mt-1">
                                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-800 leading-snug group-hover:text-[#2D488F] transition-colors">{notif.message}</p>
                                      <p className="text-xs text-gray-400 mt-1 font-medium">{notif.time}</p>
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="p-8 text-center text-gray-500 text-sm">
                                <p>No new notifications</p>
                              </div>
                            )}
                          </div>
                          <div className="p-2 bg-gray-50 text-center border-t border-gray-100">
                            <button className="text-xs text-[#2D488F] hover:text-blue-800 font-medium transition-colors w-full py-1">
                              View all notifications
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    {/* Profile Picture with Dropdown */}
                    <div className="relative" ref={profileRef}>
                      <div
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-r from-[#2D488F] to-blue-500 text-white font-medium text-sm shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                      >
                        {getInitials(user.name || user.email)}
                      </div>

                      {/* Profile Dropdown */}
                      {showProfileMenu && (
                        <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-[60] animate-in fade-in slide-in-from-top-2 duration-200">
                          <div className="p-4 border-b border-gray-50 bg-gray-50/50">
                            <p className="font-semibold text-gray-900 truncate">{user.name || user.email?.split('@')[0] || "User"}</p>
                            <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>
                          </div>

                          <div className="p-2">
                            <button
                              onClick={() => {
                                setShowProfileMenu(false);
                                navigate(`${getDashboardPath()}/settings`);
                              }}
                              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                              <User className="w-4 h-4 text-gray-400" />
                              My Profile
                            </button>

                            <button
                              onClick={() => {
                                setShowProfileMenu(false);
                                handleDashboardNavigation();
                              }}
                              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                              <Settings className="w-4 h-4 text-gray-400" />
                              Dashboard
                            </button>

                            <div className="h-px bg-gray-100 my-1"></div>

                            <button
                              onClick={() => {
                                localStorage.removeItem('dashboardType');
                                logout(navigate);
                              }}
                              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <LogOut className="w-4 h-4" />
                              Logout
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Become a Mentor Button */}
                  <button
                    onClick={handleBecomeMentor}
                    className="text-gray-600 hover:text-gray-900 px-4 py-2 text-sm font-medium border border-gray-200 hover:border-gray-300 rounded-md transition-all duration-200 hover:shadow-sm"
                  >
                    Become a Mentor
                  </button>

                  {/* Login Button */}
                  <button
                    onClick={() => openModal('login')}
                    className="text-gray-600 hover:text-gray-900 px-4 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    Log in
                  </button>

                  {/* Get Started Button */}
                  <button
                    onClick={() => openModal('signup')}
                    className="bg-gradient-to-r from-[#2D488F] to-blue-500 text-white px-5 py-2.5 rounded-md text-sm font-medium hover:shadow-md transition-all duration-200 hover:opacity-95"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Hamburger with "Menu" text - SIMPLIFIED VERSION */}
          <div className="md:hidden flex items-center gap-4">
            {/* Mobile Notification Icon */}
            {user && (
              <div className="relative" ref={mobileNotificationRef}>
                <button
                  onClick={() => setShowMobileNotifications(!showMobileNotifications)}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-200 relative focus:outline-none"
                >
                  <Bell className="w-5 h-5" />
                  {notifications.length > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                  )}
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white font-bold ring-2 ring-white">
                      {notifications.length}
                    </span>
                  )}
                </button>

                {/* Mobile Notification Dropdown */}
                {showMobileNotifications && (
                  <div className="absolute top-full right-[-60px] mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-[60] animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-3 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
                      <h3 className="font-semibold text-gray-900 text-sm">Notifications</h3>
                      <button
                        className="text-xs text-[#2D488F] hover:text-blue-700 font-medium transition-colors"
                        onClick={() => setNotifications([])}
                      >
                        Clear all
                      </button>
                    </div>
                    <div className="max-h-80 overflow-y-auto custom-scrollbar">
                      {notifications.length > 0 ? (
                        notifications.map((notif) => (
                          <div key={notif.id} className="p-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 cursor-pointer group">
                            <div className="flex gap-3">
                              <div className="flex-shrink-0 mt-1">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              </div>
                              <div>
                                <p className="text-sm text-gray-800 leading-snug group-hover:text-[#2D488F] transition-colors">{notif.message}</p>
                                <p className="text-xs text-gray-400 mt-1 font-medium">{notif.time}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center text-gray-500 text-sm">
                          <p>No new notifications</p>
                        </div>
                      )}
                    </div>
                    <div className="p-2 bg-gray-50 text-center border-t border-gray-100">
                      <button className="text-xs text-[#2D488F] hover:text-blue-800 font-medium transition-colors w-full py-1">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Profile Icon */}
            {user && (
              <div className="relative" ref={mobileProfileRef}>
                <div
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-r from-[#2D488F] to-blue-500 text-white font-medium text-sm shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                  onClick={() => setShowMobileProfileMenu(!showMobileProfileMenu)}
                >
                  {getInitials(user.name || user.email)}
                </div>

                {/* Mobile Profile Dropdown */}
                {showMobileProfileMenu && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-[60] animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-4 border-b border-gray-50 bg-gray-50/50">
                      <p className="font-semibold text-gray-900 truncate">{user.name || user.email?.split('@')[0] || "User"}</p>
                      <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>
                    </div>

                    <div className="p-2">
                      <button
                        onClick={() => {
                          setShowMobileProfileMenu(false);
                          navigate(`${getDashboardPath()}/settings`);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <User className="w-4 h-4 text-gray-400" />
                        My Profile
                      </button>

                      <button
                        onClick={() => {
                          setShowMobileProfileMenu(false);
                          handleDashboardNavigation();
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <Settings className="w-4 h-4 text-gray-400" />
                        Dashboard
                      </button>

                      <div className="h-px bg-gray-100 my-1"></div>

                      <button
                        onClick={() => {
                          localStorage.removeItem('dashboardType');
                          logout(navigate);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center gap-2">
              {/* Menu text */}
              <span className={`text-sm font-medium transition-all duration-300 select-none ${isMenuOpen ? 'text-gray-900' : 'text-gray-600'
                }`}>
                {isMenuOpen ? 'Close' : 'Menu'}
              </span>

              {/* Simplified hamburger/X button */}
              <button
                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all duration-300 focus:outline-none"
                onClick={toggleMenu}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? (
                  // X icon - simple and clean
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  // Hamburger icon
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu with slide in/fade out animation */}
        <div
          ref={menuRef}
          className={`md:hidden absolute top-16 right-4 bg-white/95 backdrop-blur-md shadow-2xl p-6 rounded-3xl w-72 z-50 space-y-4 border border-gray-100 transition-all duration-300 ease-out ${isMenuOpen
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
            }`}
        >
          <a
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="block text-gray-700 hover:text-gray-900 py-3 px-4 rounded-2xl hover:bg-gray-50/70 transition-all duration-200 font-medium tracking-wide hover:translate-x-1 hover:shadow-sm"
          >
            Home
          </a>

          <a
            href="/about"
            onClick={() => setIsMenuOpen(false)}
            className="block text-gray-700 hover:text-gray-900 py-3 px-4 rounded-2xl hover:bg-gray-50/70 transition-all duration-200 font-medium tracking-wide hover:translate-x-1 hover:shadow-sm"
          >
            About Us
          </a>

          <a
            href="/circles"
            onClick={() => setIsMenuOpen(false)}
            className="block text-gray-700 hover:text-gray-900 py-3 px-4 rounded-2xl hover:bg-gray-50/70 transition-all duration-200 font-medium tracking-wide hover:translate-x-1 hover:shadow-sm"
          >
            Circle
          </a>

          <a
            href="/listing"
            onClick={() => setIsMenuOpen(false)}
            className="block text-gray-700 hover:text-gray-900 py-3 px-4 rounded-2xl hover:bg-gray-50/70 transition-all duration-200 font-medium tracking-wide hover:translate-x-1 hover:shadow-sm"
          >
            Koach
          </a>

          <a
            href="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="block text-gray-700 hover:text-gray-900 py-3 px-4 rounded-2xl hover:bg-gray-50/70 transition-all duration-200 font-medium tracking-wide hover:translate-x-1 hover:shadow-sm"
          >
            Contact
          </a>

          {/* Dashboard link for mobile - only show when user is logged in */}
          {user && (
            <a
              href={getDashboardPath()}
              onClick={(e) => {
                e.preventDefault();
                handleDashboardNavigation();
                setIsMenuOpen(false);
              }}
              className="block text-gray-700 hover:text-gray-900 py-3 px-4 rounded-2xl hover:bg-gray-50/70 transition-all duration-200 font-medium tracking-wide hover:translate-x-1 hover:shadow-sm"
            >
              Dashboard
            </a>
          )}

          {user ? (
            <div className="flex items-center gap-3 py-3 px-4 rounded-2xl bg-gradient-to-r from-gray-50/30 to-gray-50/30 hover:bg-gray-50/50 transition-all duration-200 hover:translate-x-1 hover:shadow-sm">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-[#2D488F] to-blue-500 text-white font-medium shadow-sm hover:shadow-md transition-all duration-200">
                {getInitials(user.name || user.email)}
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem('dashboardType');
                  logout(navigate);
                  setIsMenuOpen(false);
                }}
                className="text-sm text-gray-600 hover:text-gray-900 bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-gray-300 px-5 py-2 rounded-full transition-all duration-200 font-medium hover:shadow-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Become a Mentor Button for Mobile - Updated styling */}
              <button
                onClick={handleBecomeMentor}
                className="w-full text-gray-600 hover:text-gray-900 text-sm bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-gray-300 px-6 py-3 rounded-full text-center transition-all duration-200 font-medium hover:translate-x-1 hover:shadow-sm"
              >
                Become a Mentor
              </button>

              <button
                onClick={() => {
                  openModal('login');
                  setIsMenuOpen(false);
                }}
                className="w-full text-gray-600 hover:text-gray-900 text-sm bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-gray-300 px-6 py-3 rounded-full text-center transition-all duration-200 font-medium hover:translate-x-1 hover:shadow-sm"
              >
                Log in
              </button>

              <button
                onClick={() => {
                  openModal('signup');
                  setIsMenuOpen(false);
                }}
                className="block w-full text-white hover:text-[#2D488F] text-sm bg-gradient-to-r from-[#2D488F] to-blue-500 hover:bg-white border hover:border-[#2D488F] px-6 py-3 rounded-full text-center transition-all duration-200 font-medium shadow-sm hover:shadow hover:translate-x-1"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;