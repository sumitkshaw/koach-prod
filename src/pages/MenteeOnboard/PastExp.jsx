import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logowhite.png";
import DrummerImage from "../../assets/drummer.png";

import Option1Icon from "../../assets/experience/option1.png";
import Option2Icon from "../../assets/experience/option2.png";
import Option3Icon from "../../assets/experience/option3.png";
import Option4Icon from "../../assets/experience/option4.png";
import Option5Icon from "../../assets/experience/option5.png";
import Option6Icon from "../../assets/experience/option6.png";
import Option7Icon from "../../assets/experience/option7.png";
import Option8Icon from "../../assets/experience/option8.png";

export default function WhoIsAdam() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);

  const experiences = [
    { 
      label: "I am a graduating senior looking to start professional mentoring", 
      icon: Option1Icon 
    },
    { 
      label: "I recently graduated college seeking mentorship", 
      icon: Option2Icon 
    },
    { 
      label: "I am a new pro (1-5 years experience) seeking mentorship", 
      icon: Option3Icon 
    },
    { 
      label: "I want to extend of enhance my skills", 
      icon: Option4Icon 
    },
    { 
      label: "Transitioning career or job", 
      icon: Option5Icon 
    },
    { 
      label: "Seeking promotion", 
      icon: Option6Icon 
    },
    { 
      label: "Transitioning into mid manager or senior level role", 
      icon: Option7Icon 
    },
    { 
      label: "I am an entrepreneur experiencing a roadblock", 
      icon: Option8Icon 
    },
  ];

  const handleSelect = (experience) => {
    setSelected(prev => 
      prev.includes(experience.label)
        ? prev.filter(item => item !== experience.label)
        : [...prev, experience.label]
    );
  };

  const handleNext = () => {
    console.log("Selected experiences:", selected);
    navigate("/timeline");
  };

  const handleBack = () => {
    navigate("/bio-step");
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
            src={DrummerImage}
            alt="Drummer Illustration"
            className="w-[90%] max-w-3xl h-auto"
            style={{ minHeight: "500px" }}
          />
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-blue-50 via-white to-indigo-50 lg:bg-white flex flex-col justify-center items-center px-4 sm:px-6 py-8 sm:py-12 lg:px-16 relative overflow-hidden">
        {/* Enhanced Mobile Background Elements */}
        <div className="lg:hidden absolute top-4 right-4 w-24 h-24 bg-[#FFD93B] rounded-full opacity-10 blur-2xl"></div>
        <div className="lg:hidden absolute bottom-6 left-4 w-20 h-20 bg-[#1E4AB8] rounded-full opacity-10 blur-2xl"></div>
        <div className="lg:hidden absolute top-1/2 left-6 w-16 h-16 bg-[#4A90E2] rounded-full opacity-10 blur-xl"></div>
        <div className="lg:hidden absolute bottom-20 right-8 w-12 h-12 bg-[#FFD93B] rounded-full opacity-10 blur-xl"></div>
        
        <div className="max-w-2xl w-full flex flex-col items-center justify-center relative z-10">
          {/* Enhanced Header for Mobile */}
          <div className="flex flex-col items-center justify-center mb-6 sm:mb-8 lg:mb-10">
            <div className="relative mb-3 sm:mb-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#1E4AB8] to-[#4A90E2] bg-clip-text text-transparent text-center leading-tight">
                Who is Adam?
              </h2>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#FFD93B] to-[#FFE066] rounded-full lg:hidden"></div>
            </div>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 lg:text-[#4A90E2] text-center font-medium mt-4 lg:mt-0 px-2">
              Tell us about your experience
            </p>
          </div>

          {/* Enhanced Experience Options for Mobile */}
          <div className="flex flex-col gap-3 sm:gap-4 w-full mb-6 sm:mb-8">
            {experiences.map((experience, index) => (
              <button
                key={index}
                onClick={() => handleSelect(experience)}
                className={`flex items-start sm:items-center gap-3 sm:gap-4 p-4 sm:p-4 border-2 rounded-2xl lg:rounded-full text-left transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] group ${
                  selected.includes(experience.label)
                    ? "border-[#FFD93B] bg-gradient-to-r from-[#FFFBEA] to-[#FFF8DC] shadow-lg lg:shadow-none lg:bg-[#FFFBEA] shadow-[#FFD93B]/20"
                    : "border-gray-200 lg:border-gray-300 bg-white/80 backdrop-blur-sm hover:border-[#4A90E2] hover:bg-blue-50/70 shadow-md lg:shadow-none"
                }`}
              >
                <div className={`flex-shrink-0 w-10 h-10 sm:w-8 sm:h-8 lg:w-6 lg:h-6 flex items-center justify-center rounded-xl lg:rounded-lg transition-all duration-200 ${
                  selected.includes(experience.label) 
                    ? 'bg-[#FFD93B]/20 shadow-inner' 
                    : 'bg-white shadow-sm group-hover:bg-blue-50'
                }`}>
                  <img 
                    src={experience.icon} 
                    alt="" 
                    className={`w-5 h-5 sm:w-4 sm:h-4 object-contain transition-all duration-200 ${
                      selected.includes(experience.label) ? 'scale-110' : 'scale-100'
                    }`}
                  />
                </div>
                <span className={`font-medium flex-1 text-left text-sm sm:text-sm leading-5 sm:leading-6 transition-all duration-200 ${
                  selected.includes(experience.label) 
                    ? 'text-[#1E4AB8] font-semibold' 
                    : 'text-gray-700 lg:text-[#4A90E2] group-hover:text-[#1E4AB8]'
                }`}>
                  {experience.label}
                </span>
                
                {/* Selection indicator for mobile */}
                <div className={`flex-shrink-0 w-5 h-5 sm:w-4 sm:h-4 border-2 rounded-full flex items-center justify-center transition-all duration-200 mt-0.5 lg:mt-0 ${
                  selected.includes(experience.label)
                    ? 'border-[#FFD93B] bg-[#FFD93B]'
                    : 'border-gray-300 bg-white group-hover:border-[#4A90E2]'
                }`}>
                  {selected.includes(experience.label) && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Selection Counter for Mobile */}
          <div className="lg:hidden w-full mb-4 px-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  Options selected
                </span>
                <span className={`text-sm font-bold px-2 py-1 rounded-full ${
                  selected.length > 0 
                    ? 'bg-[#FFD93B] text-[#1E4AB8]' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {selected.length} / {experiences.length}
                </span>
              </div>
              {selected.length === 0 && (
                <p className="text-xs text-gray-500 mt-1 text-center">
                  Please select at least one option to continue
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
                disabled={selected.length === 0}
                className={`lg:w-32 w-full sm:w-28 py-3.5 sm:py-3 text-sm sm:text-base rounded-xl lg:rounded transition-all duration-200 font-semibold shadow-lg lg:shadow-none hover:shadow-xl active:scale-95 backdrop-blur-sm ${
                  selected.length > 0
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