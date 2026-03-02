import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoWhite from "../../assets/logowhite.png";
import LightBulb from "../../assets/light_bulb.png";

export default function MentorExpert() {
  const navigate = useNavigate();
  const [isExpert, setIsExpert] = useState(false);

  const handleNext = () => {
    console.log("Opt-in as expert:", isExpert);
    navigate("/certifications");
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
            src={LightBulb}
            alt="bulb"
            className="absolute bottom-9 w-[90%] max-w-3xl h-auto"
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
        
        <div className="max-w-2xl w-full relative z-10">
          {/* Enhanced Header for Mobile */}
          <div className="flex flex-col items-center justify-center mb-6 sm:mb-8 lg:mb-10">
            <div className="relative mb-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#1E4AB8] to-[#4A90E2] bg-clip-text text-transparent text-center leading-tight">
                Are you an Expert?
              </h2>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#FFD93B] to-[#FFE066] rounded-full lg:hidden"></div>
            </div>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 lg:text-[#1E4AB8] text-center font-medium mt-4 lg:mt-0 px-4 leading-relaxed">
              Give fast answers like a perfect pro
            </p>
          </div>

          {/* Enhanced Description Cards for Mobile */}
          <div className="mb-6 sm:mb-8 flex flex-col gap-4 sm:gap-6">
            {/* Main Feature Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-lg p-5 sm:p-6 shadow-xl lg:shadow-none border border-gray-200 lg:border-transparent">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-[#FFD93B] to-[#FFE066] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#1E4AB8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1E4AB8] mb-2">Real-time Expert Matching</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    When a mentee is stuck on a problem or has a nagging question that demands an expert&apos;s touch, ExpertFinder connects the mentee to you, in <span className="font-bold text-[#1E4AB8]">real-time</span>.
                  </p>
                </div>
              </div>
            </div>

            {/* How It Works Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-lg p-5 sm:p-6 shadow-xl lg:shadow-none border border-gray-200 lg:border-transparent">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-[#4A90E2] to-[#1E4AB8] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1E4AB8] mb-2">Instant Connection</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    ExpertFinder instantly identifies qualified experts like yourself to answer a mentee&apos;s time sensitive questions and provide immediate guidance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Checkbox Section for Mobile */}
          <div className="mb-6 sm:mb-10 bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-lg p-5 sm:p-6 shadow-xl lg:shadow-none border border-gray-200 lg:border-transparent">
            <div className="flex items-start gap-4">
              {/* Custom Checkbox */}
              <div className="relative">
                <input
                  type="checkbox"
                  id="expertOptIn"
                  checked={isExpert}
                  onChange={() => setIsExpert(!isExpert)}
                  className="sr-only" // Hide default checkbox
                />
                <div 
                  onClick={() => setIsExpert(!isExpert)}
                  className={`w-6 h-6 border-2 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 ${
                    isExpert 
                      ? 'bg-[#1E4AB8] border-[#1E4AB8] scale-110' 
                      : 'bg-white border-gray-300 hover:border-[#4A90E2] hover:scale-105'
                  }`}
                >
                  {isExpert && (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
              
              <div className="flex-1">
                <label 
                  htmlFor="expertOptIn" 
                  className="text-lg font-bold text-[#1E4AB8] cursor-pointer block mb-2"
                  onClick={() => setIsExpert(!isExpert)}
                >
                  Opt in as an Expert
                </label>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Join our network of verified experts to help mentees with real-time questions and guidance. 
                  <span className="text-xs text-gray-500 block mt-1">(Optional - You can change this later)</span>
                </p>
                
                {/* Benefits List */}
                {isExpert && (
                  <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                    <h4 className="text-sm font-semibold text-[#1E4AB8] mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Expert Benefits:
                    </h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Get matched with mentees needing immediate help</li>
                      <li>• Build your reputation as a trusted expert</li>
                      <li>• Help more people in your areas of expertise</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Status Indicator for Mobile */}
          <div className="lg:hidden w-full mb-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  Expert Status
                </span>
                <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                  isExpert 
                    ? 'bg-[#FFD93B] text-[#1E4AB8]' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {isExpert ? 'Expert Mode' : 'Standard Mentor'}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                {isExpert 
                  ? 'You will be available for real-time expert matching' 
                  : 'Continue as a standard mentor (can change later)'}
              </p>
            </div>
          </div>

          {/* Enhanced Buttons for Mobile */}
          <div className="flex justify-center mt-6 sm:mt-8 w-full">
            <div className="flex gap-3 sm:gap-4 w-full max-w-sm">
              <button
                onClick={() => navigate("/skills")}
                className="w-full sm:w-28 lg:w-40 py-3.5 sm:py-3 text-sm sm:text-base border-2 border-[#FFD93B] text-[#1E4AB8] rounded-xl lg:rounded hover:bg-[#FFD93B] transition-all duration-200 font-semibold shadow-lg lg:shadow-none hover:shadow-xl active:scale-95 backdrop-blur-sm bg-white/80 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back
              </button>
              <button
                onClick={handleNext}
                className="w-full sm:w-28 lg:w-40 py-3.5 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-[#FFD93B] to-[#FFE066] text-[#1E4AB8] rounded-xl lg:rounded hover:opacity-90 transition-all duration-200 font-semibold shadow-lg lg:shadow-none hover:shadow-xl active:scale-95 backdrop-blur-sm flex items-center justify-center gap-2"
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
              Expert mode helps you reach more mentees who need immediate assistance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}