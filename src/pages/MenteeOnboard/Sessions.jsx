import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logowhite.png";
import GearsImage from "../../assets/Gear.png";

export default function Sessions() {
  const navigate = useNavigate();
  const [numberOfSessions, setNumberOfSessions] = useState("1");
  const [frequency, setFrequency] = useState("weekly");

  const handleNext = () => {
    const sessionData = {
      numberOfSessions: numberOfSessions,
      frequency: frequency
    };
    console.log("Selected session configuration:", sessionData);
    navigate("/qualities");
  };

  const handleBack = () => {
    navigate("/timeline");
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
            src={GearsImage}
            alt="Gears Illustration"
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
                About Sessions
              </h2>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#FFD93B] to-[#FFE066] rounded-full lg:hidden"></div>
            </div>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 lg:text-[#4A90E2] text-center font-medium mt-4 lg:mt-0 px-4 leading-relaxed">
              How many sessions would you like to book with your coach?
            </p>
          </div>

          {/* Enhanced Session Configuration for Mobile */}
          <div className="w-full max-w-md space-y-6 sm:space-y-6">
            {/* Enhanced Number of Sessions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-lg p-4 sm:p-5 shadow-lg lg:shadow-none border border-gray-200 lg:border-transparent">
              <label className="block text-[#1E4AB8] font-semibold mb-4 text-sm lg:font-medium">
                Number of sessions
              </label>
              <div className="relative">
                <select
                  value={numberOfSessions}
                  onChange={(e) => setNumberOfSessions(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 lg:border-gray-300 rounded-xl lg:rounded-lg bg-white text-[#1E4AB8] font-semibold focus:border-[#4A90E2] focus:outline-none focus:ring-2 focus:ring-[#FFD93B] appearance-none pr-12 shadow-sm lg:shadow-none transition-all duration-200 backdrop-blur-sm"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} session{i + 1 > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                  <svg className="w-5 h-5 text-[#4A90E2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Enhanced Frequency Selection */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-lg p-4 sm:p-5 shadow-lg lg:shadow-none border border-gray-200 lg:border-transparent">
              <label className="block text-[#1E4AB8] font-semibold mb-4 text-sm lg:font-medium text-center">
                Session frequency
              </label>
              <div className="flex justify-center">
                <div className="inline-flex items-center bg-gray-100 lg:bg-gray-100 rounded-full p-1 shadow-inner lg:shadow-none w-full max-w-xs">
                  <button
                    type="button"
                    className={`flex-1 px-4 py-3 sm:py-2.5 rounded-full text-sm font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                      frequency === 'weekly' 
                        ? 'bg-gradient-to-r from-[#4A90E2] to-[#1E4AB8] text-white shadow-lg' 
                        : 'text-gray-600 hover:text-[#4A90E2] hover:bg-white/50'
                    }`}
                    onClick={() => setFrequency('weekly')}
                  >
                    Weekly
                  </button>
                  <button
                    type="button"
                    className={`flex-1 px-4 py-3 sm:py-2.5 rounded-full text-sm font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                      frequency === 'monthly' 
                        ? 'bg-gradient-to-r from-[#4A90E2] to-[#1E4AB8] text-white shadow-lg' 
                        : 'text-gray-600 hover:text-[#4A90E2] hover:bg-white/50'
                    }`}
                    onClick={() => setFrequency('monthly')}
                  >
                    Monthly
                  </button>
                </div>
              </div>
              <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <p className="text-center text-sm font-semibold text-[#1E4AB8]">
                  {frequency === 'weekly' 
                    ? '📅 Sessions will be scheduled weekly' 
                    : '📅 Sessions will be scheduled monthly'}
                </p>
              </div>
            </div>

            {/* Enhanced Session Duration Info */}
            <div className="p-5 sm:p-5 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 lg:from-blue-50 lg:to-blue-100 rounded-2xl lg:rounded-xl text-center border-2 border-blue-200 lg:border-blue-100 shadow-xl lg:shadow-none backdrop-blur-sm">
              <div className="flex items-center justify-center mb-3">
                <div className="w-8 h-8 bg-[#FFD93B] rounded-full flex items-center justify-center mr-2">
                  <svg className="w-4 h-4 text-[#1E4AB8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-[#1E4AB8] font-bold text-lg">Session Summary</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-[#FFD93B] rounded-full"></div>
                  <p className="text-[#1E4AB8] font-semibold text-sm">
                    {numberOfSessions} {numberOfSessions === '1' ? 'session' : 'sessions'} total
                  </p>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-[#4A90E2] rounded-full"></div>
                  <p className="text-[#1E4AB8] font-semibold text-sm">
                    {frequency === 'weekly' ? 'Weekly schedule' : 'Monthly schedule'}
                  </p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-blue-200">
                <p className="text-xs text-[#4A90E2] font-medium">
                  Perfect for achieving your goals efficiently
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced Buttons for Mobile */}
          <div className="flex justify-center mt-8 sm:mt-10 w-full">
            <div className="flex gap-3 sm:gap-4 w-full max-w-sm">
              <button
                onClick={handleBack}
                className="lg:w-32 w-full sm:w-28 py-3.5 sm:py-3 text-sm sm:text-base border-2 border-[#FFD93B] text-[#1E4AB8] rounded-xl lg:rounded hover:bg-[#FFD93B] transition-all duration-200 font-semibold shadow-lg lg:shadow-none hover:shadow-xl active:scale-95 backdrop-blur-sm bg-white/80"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="lg:w-32 w-full sm:w-28 py-3.5 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-[#FFD93B] to-[#FFE066] text-[#1E4AB8] rounded-xl lg:rounded hover:opacity-90 transition-all duration-200 font-semibold shadow-lg lg:shadow-none hover:shadow-xl active:scale-95 backdrop-blur-sm"
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