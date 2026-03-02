import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoWhite from "../../assets/logowhite.png";
import UsingComputer from "../../assets/UsingComputer.png";

import TransitionalIcon from "../../assets/expert-symbols/transitional.png";
import CareerIcon from "../../assets/expert-symbols/career.png";
import ExecutiveIcon from "../../assets/expert-symbols/executive.png";
import SalesIcon from "../../assets/expert-symbols/sales.png";
import LeadershipIcon from "../../assets/expert-symbols/leadership.png";
import PerformanceIcon from "../../assets/expert-symbols/performance.png";
import MarketingIcon from "../../assets/expert-symbols/marketing.png";
import DevOpsIcon from "../../assets/expert-symbols/devops.png";
import SuccessIcon from "../../assets/expert-symbols/success.png";

export default function MentorExperience() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);

  const expertiseOptions = [
    { label: "Transitional", icon: TransitionalIcon },
    { label: "Career", icon: CareerIcon },
    { label: "Executive", icon: ExecutiveIcon },
    { label: "Sales", icon: SalesIcon },
    { label: "Leadership", icon: LeadershipIcon },
    { label: "Performance", icon: PerformanceIcon },
    { label: "Marketing", icon: MarketingIcon },
    { label: "Dev ops/IT", icon: DevOpsIcon },
    { label: "Success", icon: SuccessIcon },
  ];

  const handleSelect = (option) => {
    setSelected(prev =>
      prev.includes(option)
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const handleNext = () => {
    if (selected.length > 0) {
      console.log("Selected expertise:", selected);
      navigate("/skills");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#1E4AB8] flex-col justify-between items-center p-8">
        {/* Logo */}
        <div className="w-full text-left">
          <img src={LogoWhite} alt="Logo" className="h-10" />
        </div>
        {/* Illustration */}
        <div className="flex-grow flex justify-center items-center">
          <img
            src={UsingComputer}
            alt="Mentor Expertise"
            className="w-[644px] h-[476px] object-contain"
            style={{ maxWidth: "644px", maxHeight: "476px" }}
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
        
        <div className="max-w-2xl w-full text-center relative z-10">
          {/* Enhanced Header for Mobile */}
          <div className="flex flex-col items-center justify-center mb-6 sm:mb-8 lg:mb-10">
            <div className="relative mb-4">
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-bold bg-gradient-to-r from-[#1E4AB8] to-[#4A90E2] bg-clip-text text-transparent text-center leading-tight">
                Your Expertise
              </h2>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#FFD93B] to-[#FFE066] rounded-full lg:hidden"></div>
            </div>
            <p className="text-sm sm:text-base lg:text-base text-gray-600 lg:text-gray-600 mt-4 lg:mt-0 px-4 leading-relaxed">
              Select your primary coaching niches
            </p>
          </div>

          {/* Enhanced Expertise Grid for Mobile */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6 justify-center mb-6 sm:mb-8">
            {expertiseOptions.map((option, index) => (
              <div
                key={option.label}
                onClick={() => handleSelect(option.label)}
                className={`group cursor-pointer flex items-center py-4 sm:py-4 lg:py-5 px-3 sm:px-4 border-2 rounded-2xl lg:rounded-md transition-all duration-300 transform hover:scale-105 active:scale-95 relative overflow-hidden backdrop-blur-sm
                  ${
                    selected.includes(option.label)
                      ? "bg-gradient-to-r from-[#1E4AB8] to-[#4A90E2] text-white border-[#FFD93B] shadow-xl lg:shadow-none shadow-blue-500/25"
                      : "border-gray-200 lg:border-[#001F54] text-gray-700 lg:text-[#001F54] bg-white/80 hover:bg-blue-50/70 hover:border-[#4A90E2] shadow-lg lg:shadow-none hover:shadow-xl"
                  }`}
              >
                {/* Selection Indicator */}
                <div className={`absolute top-2 right-2 w-5 h-5 sm:w-4 sm:h-4 border-2 rounded-full flex items-center justify-center transition-all duration-200 ${
                  selected.includes(option.label)
                    ? 'border-white bg-white scale-110'
                    : 'border-gray-300 bg-white group-hover:border-[#4A90E2] group-hover:scale-105'
                }`}>
                  {selected.includes(option.label) && (
                    <svg className="w-3 h-3 text-[#1E4AB8]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>

                <img
                  src={option.icon}
                  alt={option.label + " icon"}
                  className={`h-7 w-7 sm:h-7 sm:w-7 lg:h-8 lg:w-8 mr-3 sm:mr-3 lg:mr-4 transition-all duration-200 ${
                    selected.includes(option.label) 
                      ? "filter invert brightness-0 scale-110" 
                      : "filter group-hover:scale-105"
                  }`}
                  style={{
                    filter: selected.includes(option.label)
                      ? "invert(100%) brightness(200%)"
                      : "invert(27%) sepia(94%) saturate(749%) hue-rotate(191deg) brightness(92%) contrast(101%)"
                  }}
                />
                <span className={`font-medium text-sm sm:text-sm lg:text-base transition-all duration-200 ${
                  selected.includes(option.label) ? 'font-semibold' : ''
                }`}>
                  {option.label}
                </span>

                {/* Active State Indicator */}
                {selected.includes(option.label) && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFD93B] to-[#FFE066] rounded-b-2xl lg:rounded-b-md"></div>
                )}
              </div>
            ))}
          </div>

          {/* Selection Status for Mobile */}
          <div className="lg:hidden w-full mb-6 px-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Expertise selected
                </span>
                <span className={`text-sm font-bold px-2 py-1 rounded-full ${
                  selected.length > 0 
                    ? 'bg-[#FFD93B] text-[#1E4AB8]' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {selected.length} / {expertiseOptions.length}
                </span>
              </div>
              {selected.length === 0 && (
                <p className="text-xs text-gray-500 text-center">
                  Please select at least one expertise area
                </p>
              )}
              {selected.length > 0 && (
                <p className="text-xs text-[#1E4AB8] font-medium text-center">
                  {selected.length === 1 ? '1 expertise selected' : `${selected.length} expertise areas selected`}
                </p>
              )}
            </div>
          </div>

          {/* Enhanced Buttons for Mobile */}
          <div className="flex justify-center mt-6 sm:mt-8 w-full">
            <div className="flex gap-3 sm:gap-4 w-full max-w-sm">
              <button
                onClick={() => navigate("/bio-step1")}
                className="w-full sm:w-28 lg:w-40 py-3.5 sm:py-3 text-sm sm:text-base border-2 border-[#FFD93B] text-[#1E4AB8] rounded-xl lg:rounded hover:bg-[#FFD93B] transition-all duration-200 font-semibold shadow-lg lg:shadow-none hover:shadow-xl active:scale-95 backdrop-blur-sm bg-white/80 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={selected.length === 0}
                className={`w-full sm:w-28 lg:w-40 py-3.5 sm:py-3 text-sm sm:text-base rounded-xl lg:rounded transition-all duration-200 font-semibold shadow-lg lg:shadow-none hover:shadow-xl active:scale-95 backdrop-blur-sm flex items-center justify-center gap-2 ${
                  selected.length > 0
                    ? "bg-gradient-to-r from-[#FFD93B] to-[#FFE066] text-[#1E4AB8] hover:opacity-90 shadow-[#FFD93B]/30" 
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Next
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Additional Info for Mobile */}
          <div className="lg:hidden mt-6 text-center">
            <p className="text-xs text-gray-500 px-4">
              Choose the expertise areas where you can provide the most value as a mentor
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}