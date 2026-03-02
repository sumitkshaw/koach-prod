import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../utils/AuthContext";
import Footer from "../components/Footer";
import Logo from "../assets/image3.png";
import leftPan from "../assets/welcome.png";

const Welcome = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [userType, setUserType] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchUserName = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/onboarding/getTempData");
        if (response.data?.name) {
          setName(response.data.name);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserName();
  }, [user, navigate]);

  const handleSubmit = async () => {
    if (!userType) {
      alert("Please select an option");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/onboarding/save", {
        step: 2,
        data: { roleInfo: { userType } },
      });
      navigate("/bio");
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to save data. Please try again.");
    }
  };

  const handleLogout = async () => {
    await logout(navigate);
  };

  const initials = name
    ? name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 px-4 py-8">
        
        {/* Logo positioned above container */}
        <div className="w-full max-w-7xl mx-auto mb-6 px-4">
          <img src={Logo} alt="Logo" className="h-16 w-auto" />
        </div>

        {/* Main Container */}
        <div className="flex items-center justify-center">
          <div className="flex flex-col lg:flex-row items-center lg:items-stretch w-full max-w-7xl rounded-3xl overflow-hidden shadow-2xl bg-white/80 backdrop-blur-lg min-h-[85vh]">

            {/* Left Panel - Enhanced Image */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-white to-blue-50 p-8">
              <div className="relative">
                <img
                  src={leftPan}
                  alt="Welcome"
                  className="object-contain max-h-[600px] w-auto drop-shadow-lg"
                />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-200/30 rounded-full blur-xl"></div>
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-yellow-200/40 rounded-full blur-lg"></div>
              </div>
            </div>

            {/* Right Panel - Enhanced Content */}
            <div className="w-full lg:w-1/2 p-8 sm:p-12 text-[#2D488F] flex flex-col justify-between bg-gradient-to-br from-white to-blue-50/30">
              <div>
                {/* Header Section */}
                <div className="flex justify-between items-start mb-8">
                  <div className="flex-1">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-2">
                      Welcome to{" "}
                      <span className="bg-gradient-to-r from-[#2D488F] to-[#4A90E2] bg-clip-text text-transparent">
                        Koach
                      </span>
                      ,
                    </h1>
                    <h2 className="text-xl sm:text-2xl font-semibold text-[#2A4FB0]">
                      {name || "User"}!
                    </h2>
                  </div>
                  
                  {/* User Avatar and Logout */}
                  <div className="flex items-center gap-4 ml-4">
                    <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#2D488F] to-[#4A90E2] text-white font-bold rounded-full shadow-lg">
                      {initials}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="text-sm px-5 py-2.5 border-2 border-[#2D488F] rounded-full font-medium hover:bg-[#2D488F] hover:text-white transition-all duration-300 hover:shadow-lg"
                    >
                      Logout
                    </button>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8 p-6 bg-white/60 rounded-2xl border border-blue-100">
                  <p className="text-lg leading-relaxed text-gray-700">
                    Your accelerated professional growth starts here. Answer a few
                    quick questions to find your ideal coach!
                  </p>
                </div>

                {/* Role Selection */}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold mb-6 text-[#2D488F]">You are</h3>
                  <div className="space-y-4">
                    <label className="flex items-center justify-between p-5 bg-white/70 rounded-xl border-2 border-transparent hover:border-[#2A4FB0]/30 cursor-pointer transition-all duration-300 hover:shadow-md group">
                      <span className="text-lg font-medium text-gray-700 group-hover:text-[#2D488F] transition-colors">
                        Coach/Mentor
                      </span>
                      <input
                        type="radio"
                        name="userType"
                        value="coach"
                        checked={userType === "coach"}
                        onChange={() => setUserType("coach")}
                        className="w-6 h-6 text-[#2A4FB0] focus:ring-[#2A4FB0] focus:ring-2"
                      />
                    </label>
                    
                    <label className="flex items-center justify-between p-5 bg-white/70 rounded-xl border-2 border-transparent hover:border-[#2A4FB0]/30 cursor-pointer transition-all duration-300 hover:shadow-md group">
                      <span className="text-lg font-medium text-gray-700 group-hover:text-[#2D488F] transition-colors">
                        Looking to be mentored
                      </span>
                      <input
                        type="radio"
                        name="userType"
                        value="mentee"
                        checked={userType === "mentee"}
                        onChange={() => setUserType("mentee")}
                        className="w-6 h-6 text-[#2A4FB0] focus:ring-[#2A4FB0] focus:ring-2"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Enhanced Action Buttons */}
              <div className="flex gap-4 justify-end pt-6">
                <button
                  onClick={() => navigate(-1)}
                  className="px-8 py-3 bg-white border-2 border-[#2D488F] text-[#2D488F] font-semibold rounded-xl hover:bg-[#2D488F] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-gradient-to-r from-[#F5E649] to-[#F0D000] text-[#2D488F] font-semibold rounded-xl hover:from-[#F0D000] hover:to-[#E6C200] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Welcome;