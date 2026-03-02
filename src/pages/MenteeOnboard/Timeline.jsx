import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logowhite.png";
import CalendarImage from "../../assets/calendar.png";

export default function Timeline() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");

  // Timeline options
  const timelineOptions = [
    "Less than 3 months",
    "3-6 months", 
    "6 months",
    "About a year",
    "1 year"
  ];

  const handleSelect = (option) => {
    setSelected(option);
  };

  const handleNext = () => {
    console.log("Selected timeline:", selected);
    navigate("/sessions");
  };

  const handleBack = () => {
    navigate("/past-experience");
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#1E4AB8] text-white flex-col items-center justify-center p-8 relative">
        <img
          src={Logo}
          alt="Koach Logo"
          className="h-10 mb-8 absolute top-8 left-8"
        />
        <div className="w-full flex flex-col justify-center items-center h-full">
          <img
            src={CalendarImage}
            alt="Calendar Illustration"
            className="w-[90%] max-w-3xl h-auto"
            style={{ minHeight: "500px" }}
          />
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-blue-50 via-white to-indigo-50 lg:bg-white flex flex-col justify-center items-center px-4 sm:px-6 py-8 sm:py-12 lg:px-16 relative overflow-hidden">
        {/* Enhanced Mobile Background Elements */}
        <div className="lg:hidden absolute top-6 right-6 w-20 h-20 bg-[#FFD93B] rounded-full opacity-10 blur-2xl"></div>
        <div className="lg:hidden absolute bottom-8 left-6 w-24 h-24 bg-[#1E4AB8] rounded-full opacity-10 blur-2xl"></div>
        <div className="lg:hidden absolute top-1/3 left-8 w-14 h-14 bg-[#4A90E2] rounded-full opacity-10 blur-xl"></div>
        <div className="lg:hidden absolute bottom-1/3 right-10 w-16 h-16 bg-[#FFD93B] rounded-full opacity-10 blur-xl"></div>
        
        <div className="max-w-2xl w-full flex flex-col items-center justify-center relative z-10">
          {/* Enhanced Header for Mobile */}
          <div className="flex flex-col items-center justify-center mb-8 sm:mb-10 lg:mb-12">
            <div className="relative mb-4 sm:mb-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#1E4AB8] to-[#4A90E2] bg-clip-text text-transparent text-center leading-tight">
                Timeline
              </h2>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-[#FFD93B] to-[#FFE066] rounded-full lg:hidden"></div>
            </div>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 lg:text-[#4A90E2] text-center font-medium mt-4 lg:mt-0 px-4 leading-relaxed">
              What is your desired timeline for achieving your goals?
            </p>
          </div>

          {/* Enhanced Timeline Options for Mobile */}
          <div className="flex flex-col gap-3 sm:gap-4 w-full mb-8 sm:mb-10 lg:mb-12 max-w-md">
            {timelineOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(option)}
                className={`group relative p-4 sm:p-5 border-2 rounded-2xl lg:rounded-lg text-left transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm ${
                  selected === option
                    ? "border-[#FFD93B] bg-gradient-to-r from-[#FFFBEA] to-[#FFF8DC] shadow-lg lg:shadow-none shadow-[#FFD93B]/25"
                    : "border-gray-200 lg:border-gray-300 bg-white/80 hover:border-[#4A90E2] hover:bg-blue-50/70 shadow-md lg:shadow-none"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-sm sm:text-base font-semibold lg:font-medium transition-all duration-200 ${
                    selected === option
                      ? "text-[#1E4AB8]"
                      : "text-gray-700 lg:text-[#4A90E2] group-hover:text-[#1E4AB8]"
                  }`}>
                    {option}
                  </span>
                  
                  {/* Selection indicator */}
                  <div className={`flex-shrink-0 w-6 h-6 sm:w-5 sm:h-5 border-2 rounded-full flex items-center justify-center transition-all duration-200 ${
                    selected === option
                      ? 'border-[#FFD93B] bg-[#FFD93B] scale-110'
                      : 'border-gray-300 bg-white group-hover:border-[#4A90E2] group-hover:scale-105'
                  }`}>
                    {selected === option && (
                      <svg className="w-3 h-3 sm:w-2.5 sm:h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                
                {/* Progress bar indicator for selected state */}
                {selected === option && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFD93B] to-[#FFE066] rounded-b-2xl lg:rounded-b-lg"></div>
                )}
              </button>
            ))}
          </div>

          {/* Selection Status for Mobile */}
          <div className="lg:hidden w-full mb-6 px-4 max-w-md">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Timeline selected
                </span>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                  selected 
                    ? 'bg-[#FFD93B] text-[#1E4AB8]' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {selected ? "✓ Selected" : "Not selected"}
                </span>
              </div>
              {!selected && (
                <p className="text-xs text-gray-500 text-center">
                  Please choose your preferred timeline
                </p>
              )}
              {selected && (
                <p className="text-xs text-[#1E4AB8] font-medium text-center">
                  Ready to continue with your selection
                </p>
              )}
            </div>
          </div>

          {/* Enhanced Buttons for Mobile */}
          <div className="flex justify-center mt-4 sm:mt-6 w-full">
            <div className="flex gap-3 sm:gap-4 w-full max-w-sm">
              <button
                onClick={handleBack}
                className="lg:w-32 w-full sm:w-28 py-3.5 sm:py-3 text-sm sm:text-base border-2 border-[#FFD93B] text-[#1E4AB8] rounded-xl lg:rounded hover:bg-[#FFD93B] transition-all duration-200 font-semibold shadow-lg lg:shadow-none hover:shadow-xl active:scale-95 backdrop-blur-sm bg-white/80"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!selected}
                className={`lg:w-32 w-full sm:w-28 py-3.5 sm:py-3 text-sm sm:text-base rounded-xl lg:rounded transition-all duration-200 font-semibold shadow-lg lg:shadow-none hover:shadow-xl active:scale-95 backdrop-blur-sm ${
                  selected
                    ? "bg-gradient-to-r from-[#FFD93B] to-[#FFE066] text-[#1E4AB8] hover:opacity-90 shadow-[#FFD93B]/30" 
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}