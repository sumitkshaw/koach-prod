import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logowhite.png";
import Gear from "../../assets/Gear.png";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function Clients() {
  const navigate = useNavigate();
  const [clients, setClients] = useState(1);

  const increase = () => setClients(clients + 1);
  const decrease = () => {
    if (clients > 1) setClients(clients - 1);
  };

  const handleNext = () => {
    console.log("Number of clients saved:", clients);
    navigate("/goals");
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
            src={Gear}
            alt="Gear Illustration"
            className="w-[90%] max-w-2xl h-auto"
            style={{ minHeight: "500px" }}
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-blue-50 via-white to-indigo-50 lg:bg-white flex flex-col justify-center items-center px-4 sm:px-6 py-8 sm:py-12 lg:px-16 relative overflow-hidden">
        {/* Enhanced Mobile Background Elements */}
        <div className="lg:hidden absolute top-6 right-6 w-20 h-20 bg-[#FFD93B] rounded-full opacity-10 blur-2xl"></div>
        <div className="lg:hidden absolute bottom-8 left-6 w-24 h-24 bg-[#1E4AB8] rounded-full opacity-10 blur-2xl"></div>
        <div className="lg:hidden absolute top-1/3 left-8 w-14 h-14 bg-[#4A90E2] rounded-full opacity-10 blur-xl"></div>
        <div className="lg:hidden absolute bottom-1/3 right-10 w-16 h-16 bg-[#FFD93B] rounded-full opacity-10 blur-xl"></div>
        
        <div className="max-w-2xl w-full flex flex-col items-center justify-center relative z-10">
          {/* Enhanced Header for Mobile */}
          <div className="flex flex-col items-center justify-center mb-6 sm:mb-8 lg:mb-10">
            <div className="relative mb-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#1E4AB8] to-[#4A90E2] bg-clip-text text-transparent text-center leading-tight">
                Number of Clients
              </h2>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#FFD93B] to-[#FFE066] rounded-full lg:hidden"></div>
            </div>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 lg:text-[#1E4AB8] text-center font-medium mt-4 lg:mt-0 px-4 leading-relaxed">
              How many new clients are you able to comfortably manage at once?
            </p>
          </div>

          {/* Enhanced Client Selection Section */}
          <div className="w-full mb-6 sm:mb-8">
            {/* Enhanced Header with Icon */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-[#FFD93B] to-[#FFE066] rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-[#1E4AB8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="text-center">
                <h3 className="text-lg sm:text-xl font-bold text-[#1E4AB8]">
                  Client Capacity
                </h3>
                <p className="text-sm text-gray-600">Set your comfortable limit</p>
              </div>
            </div>

            {/* Enhanced Number Selector Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-lg p-6 shadow-xl lg:shadow-sm border border-gray-200 lg:border-transparent">
              <label className="block text-[#1E4AB8] font-bold text-sm lg:text-lg mb-4 text-center">
                Number of clients you can manage
              </label>
              
              <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl lg:rounded-lg p-4 border-2 border-[#1E4AB8]/20">
                {/* Decrease Button */}
                <button 
                  onClick={decrease}
                  disabled={clients <= 1}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
                    clients <= 1 
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                      : 'bg-white text-[#1E4AB8] hover:bg-[#FFD93B] hover:scale-105 active:scale-95 shadow-lg'
                  }`}
                >
                  <ChevronDown className="w-6 h-6" />
                </button>

                {/* Number Display */}
                <div className="flex flex-col items-center">
                  <span className="text-4xl sm:text-5xl font-bold text-[#1E4AB8]">
                    {clients}
                  </span>
                  <span className="text-sm text-gray-600 mt-1">
                    {clients === 1 ? 'client' : 'clients'}
                  </span>
                </div>

                {/* Increase Button */}
                <button 
                  onClick={increase}
                  className="w-12 h-12 rounded-xl flex items-center justify-center bg-white text-[#1E4AB8] hover:bg-[#FFD93B] transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                >
                  <ChevronUp className="w-6 h-6" />
                </button>
              </div>

              {/* Progress Indicator */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-600 mb-2">
                  <span>Minimum</span>
                  <span>Recommended: 3-5</span>
                  <span>Maximum</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-[#4A90E2] to-[#1E4AB8] h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(clients / 10) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Client Capacity Status for Mobile */}
          <div className="lg:hidden w-full mb-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Your Capacity
                </span>
                <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                  clients >= 3 
                    ? 'bg-green-100 text-green-600' 
                    : clients >= 2
                    ? 'bg-[#FFD93B] text-[#1E4AB8]'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {clients >= 3 ? 'Optimal' : clients >= 2 ? 'Good' : 'Minimum'}
                </span>
              </div>
              <p className="text-xs text-gray-500 text-center">
                {clients === 1 
                  ? 'Starting with 1 client is perfect for building experience' 
                  : clients <= 3
                  ? 'Great! You can provide focused attention to each client'
                  : 'You have good capacity to manage multiple clients effectively'
                }
              </p>
            </div>
          </div>

          {/* Tips Card for Mobile */}
          <div className="lg:hidden w-full mb-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
              <h4 className="text-sm font-semibold text-[#1E4AB8] mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Capacity Tips:
              </h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Consider your available time and energy</li>
                <li>• Quality over quantity - focus on delivering great results</li>
                <li>• You can adjust this later as your schedule changes</li>
              </ul>
            </div>
          </div>

          {/* Enhanced Buttons for Mobile */}
          <div className="flex justify-center mt-6 sm:mt-8 w-full">
            <div className="flex gap-3 sm:gap-4 w-full max-w-sm">
              <button
                onClick={() => navigate("/planning")}
                className="w-full sm:w-32 lg:w-44 py-3.5 sm:py-3 text-sm sm:text-base border-2 border-[#FFD93B] text-[#1E4AB8] rounded-xl lg:rounded hover:bg-[#FFD93B] transition-all duration-200 font-semibold shadow-lg lg:shadow-none hover:shadow-xl active:scale-95 backdrop-blur-sm bg-white/80 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back
              </button>
              <button
                onClick={handleNext}
                className="w-full sm:w-32 lg:w-44 py-3.5 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-[#FFD93B] to-[#FFE066] text-[#1E4AB8] rounded-xl lg:rounded hover:opacity-90 transition-all duration-200 font-semibold shadow-lg lg:shadow-none hover:shadow-xl active:scale-95 backdrop-blur-sm flex items-center justify-center gap-2"
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
              Setting realistic client numbers helps maintain quality coaching for everyone
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}