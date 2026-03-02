import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import image3 from "../assets/image3.png";
import { useAuth } from "../utils/AuthContext";

function OnboardingNav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleLogout = () => {
    logout(navigate);
  };

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Koach Logo - Non-clickable */}
          <div className="flex-shrink-0">
            <div className="cursor-default">
              <img src={image3} alt="Koach" className="h-10 w-auto" />
            </div>
          </div>

          {/* Logout Button - Visible on all screens */}
          {user && (
            <div className="flex items-center space-x-3">
              {/* Profile Initials */}
              <div
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-r from-[#2D488F] to-blue-500 text-white font-medium text-sm shadow-sm"
                title={user.displayName || user.email}
              >
                {getInitials(user.displayName || user.email)}
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-gray-900 px-4 py-2 text-sm font-medium border border-gray-200 hover:border-gray-300 rounded-md transition-all duration-200 hover:shadow-sm"
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default OnboardingNav;