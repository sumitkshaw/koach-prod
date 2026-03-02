import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoWhite from "../assets/logowhite.png";
import WelcomeImage from "../assets/welcome_1.png";
import MenteeImage from "../assets/mentee.png";
import MentorImage from "../assets/mentor.png";

export default function Welcome() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleNext = () => {
    if (selected === "mentee") {
      navigate("/bio-step");
    } else if (selected === "mentor") {
      navigate("/bio-step1");
    }
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-gradient-to-b from-blue-50 to-white lg:bg-none">

      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#1E4AB8] flex-col justify-between items-center p-8">
        {/* Logo */}
        <div className="w-full text-left">
          <img src={LogoWhite} alt="Logo" className="h-10" />
        </div>
        {/* Illustration */}
        <div className="flex-grow flex justify-center items-center">
          <img
            src={WelcomeImage}
            alt="Welcome"
            className="max-w-2xl w-full h-auto"
            style={{ minHeight: "400px" }}
          />
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 bg-white/90 lg:bg-white backdrop-blur-sm lg:backdrop-blur-none flex flex-col justify-center items-center px-4 py-6 sm:px-6 sm:py-12 lg:px-16 relative overflow-hidden">
        {/* Enhanced Mobile Background Elements */}
        <div className="lg:hidden absolute top-6 right-6 w-20 h-20 bg-[#FFD93B] rounded-full opacity-10 blur-2xl"></div>
        <div className="lg:hidden absolute bottom-8 left-6 w-24 h-24 bg-[#1E4AB8] rounded-full opacity-10 blur-2xl"></div>
        <div className="lg:hidden absolute top-1/3 left-8 w-14 h-14 bg-[#4A90E2] rounded-full opacity-10 blur-xl"></div>
        <div className="lg:hidden absolute bottom-1/3 right-10 w-16 h-16 bg-[#FFD93B] rounded-full opacity-10 blur-xl"></div>
        
        <div className="max-w-2xl w-full flex flex-col items-center justify-center relative z-10">
          {/* Enhanced Header for Mobile */}
          <div className="flex flex-col items-center justify-center mb-8 sm:mb-10 lg:mb-10">
            <div className="relative mb-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#1E4AB8] to-[#4A90E2] bg-clip-text text-transparent text-center leading-tight">
                Welcome to Koach
              </h2>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-[#FFD93B] to-[#FFE066] rounded-full lg:hidden"></div>
            </div>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 lg:text-[#4A90E2]/90 text-center font-medium mt-4 lg:mt-0 px-4 leading-relaxed">
              Your accelerated professional growth starts here. Answer a few quick questions
              (takes ~3 mins) to find your ideal coach!
            </p>
            
            {/* Time Estimate Badge for Mobile */}
            <div className="lg:hidden mt-4 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-200">
              <p className="text-xs font-semibold text-[#1E4AB8] flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Takes only 3 minutes
              </p>
            </div>
          </div>

          {/* Enhanced Options for Mobile */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-12 justify-center mb-6 sm:mb-8 w-full px-2 sm:px-0">
            {/* Mentee Option */}
            <div
              onClick={() => setSelected("mentee")}
              className={`group cursor-pointer border-2 rounded-2xl lg:rounded-xl p-6 sm:p-8 w-full sm:w-64 lg:w-72 h-52 sm:h-72 lg:h-80 flex flex-col items-center justify-center transition-all duration-300 active:scale-95 relative overflow-hidden backdrop-blur-sm ${
                selected === "mentee" 
                  ? "border-[#FFD93B] shadow-2xl bg-gradient-to-br from-blue-50/80 to-indigo-50/80" 
                  : "border-gray-200 hover:border-[#4A90E2] bg-white/80 hover:bg-blue-50/50 shadow-lg hover:shadow-xl"
              }`}
            >
              {/* Selection Indicator */}
              <div className={`absolute top-4 right-4 w-6 h-6 border-2 rounded-full flex items-center justify-center transition-all duration-200 ${
                selected === "mentee"
                  ? 'border-[#FFD93B] bg-[#FFD93B] scale-110'
                  : 'border-gray-300 bg-white group-hover:border-[#4A90E2] group-hover:scale-105'
              }`}>
                {selected === "mentee" && (
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>

              <div className="flex flex-col items-center justify-center flex-1">
                <img 
                  src={MenteeImage} 
                  alt="Mentee" 
                  className={`h-28 sm:h-36 lg:h-40 mb-4 sm:mb-6 transition-all duration-300 ${
                    selected === "mentee" ? 'scale-110' : 'group-hover:scale-105'
                  }`} 
                />
                <p className="text-[#1E4AB8] font-bold text-lg sm:text-xl text-center">
                  Mentee
                </p>
                <p className="text-xs text-gray-600 text-center mt-2 hidden sm:block">
                  Looking for guidance and mentorship
                </p>
              </div>

              {/* Active State Indicator */}
              {selected === "mentee" && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFD93B] to-[#FFE066] rounded-b-2xl"></div>
              )}
            </div>

            {/* Mentor Option */}
            <div
              onClick={() => setSelected("mentor")}
              className={`group cursor-pointer border-2 rounded-2xl lg:rounded-xl p-6 sm:p-8 w-full sm:w-64 lg:w-72 h-52 sm:h-72 lg:h-80 flex flex-col items-center justify-center transition-all duration-300 active:scale-95 relative overflow-hidden backdrop-blur-sm ${
                selected === "mentor" 
                  ? "border-[#FFD93B] shadow-2xl bg-gradient-to-br from-blue-50/80 to-indigo-50/80" 
                  : "border-gray-200 hover:border-[#4A90E2] bg-white/80 hover:bg-blue-50/50 shadow-lg hover:shadow-xl"
              }`}
            >
              {/* Selection Indicator */}
              <div className={`absolute top-4 right-4 w-6 h-6 border-2 rounded-full flex items-center justify-center transition-all duration-200 ${
                selected === "mentor"
                  ? 'border-[#FFD93B] bg-[#FFD93B] scale-110'
                  : 'border-gray-300 bg-white group-hover:border-[#4A90E2] group-hover:scale-105'
              }`}>
                {selected === "mentor" && (
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>

              <div className="flex flex-col items-center justify-center flex-1">
                <img 
                  src={MentorImage} 
                  alt="Mentor" 
                  className={`h-28 sm:h-36 lg:h-40 mb-4 sm:mb-6 transition-all duration-300 ${
                    selected === "mentor" ? 'scale-110' : 'group-hover:scale-105'
                  }`} 
                />
                <p className="text-[#1E4AB8] font-bold text-lg sm:text-xl text-center">
                  Mentor
                </p>
                <p className="text-xs text-gray-600 text-center mt-2 hidden sm:block">
                  Ready to guide and mentor others
                </p>
              </div>

              {/* Active State Indicator */}
              {selected === "mentor" && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFD93B] to-[#FFE066] rounded-b-2xl"></div>
              )}
            </div>
          </div>

          {/* Selection Status for Mobile */}
          <div className="lg:hidden w-full mb-6 px-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Role selected
                </span>
                <span className={`text-sm font-bold px-2 py-1 rounded-full ${
                  selected 
                    ? 'bg-[#FFD93B] text-[#1E4AB8]' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {selected ? selected.charAt(0).toUpperCase() + selected.slice(1) : 'Not selected'}
                </span>
              </div>
              {!selected && (
                <p className="text-xs text-gray-500 text-center">
                  Please select your role to continue
                </p>
              )}
              {selected && (
                <p className="text-xs text-[#1E4AB8] font-medium text-center">
                  Ready to start your {selected} journey!
                </p>
              )}
            </div>
          </div>

          {/* Enhanced Buttons for Mobile */}
          <div className="flex justify-center mt-6 sm:mt-8 w-full">
            <div className="flex gap-3 sm:gap-4 w-full max-w-sm">
              <button
                onClick={handleNext}
                disabled={!selected}
                className={`w-full py-3.5 sm:py-4 text-sm sm:text-base rounded-xl lg:rounded transition-all duration-200 font-semibold shadow-xl lg:shadow-none hover:shadow-2xl active:scale-95 backdrop-blur-sm flex items-center justify-center gap-2 ${
                  selected
                    ? "bg-gradient-to-r from-[#FFD93B] to-[#FFE066] text-[#1E4AB8] hover:opacity-90 shadow-[#FFD93B]/30" 
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {selected ? (
                  <>
                    Continue as {selected}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                ) : (
                  'Select an option'
                )}
              </button>
            </div>
          </div>

          {/* Additional Info for Mobile */}
          <div className="lg:hidden mt-6 text-center">
            <p className="text-xs text-gray-500">
              Your journey to professional growth starts with one click
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}