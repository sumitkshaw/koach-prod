import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logowhite.png";
import SpeakingImage from "../../assets/Speaking.png";

export default function Qualities() {
  const navigate = useNavigate();
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedTraits, setSelectedTraits] = useState([]);

  // Skills and expertise areas
  const skills = [
    "Interview skills", "Networking", "Marketing", "Stress Management",
    "Sales", "Time management", "Communication", "Goal Setting",
    "Negotiation", "Customer Success", "Productivity and Performance", "Career Change",
    "Start ups", "Confidence Building", "Leadership",
    "Resume Writing", "Finding a job",  
  ];

  // Personal traits
  const traits = [
    "Directive", "Encouraging", "Patient", "Challenging",
    "Collaborative", "Enthusiastic", "Creative"
  ];

  const handleSkillToggle = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else if (selectedSkills.length < 5) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleTraitToggle = (trait) => {
    setSelectedTraits(prev => 
      prev.includes(trait) 
        ? prev.filter(t => t !== trait)
        : [...prev, trait]
    );
  };

  const handleNext = () => {
    const userData = {
      selectedSkills: selectedSkills,
      selectedTraits: selectedTraits
    };
    console.log("Selected user preferences:", userData);
    navigate("/reasons");
  };

  const handleBack = () => {
    navigate("/sessions");
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
            src={SpeakingImage}
            alt="Speaking Illustration"
            className="w-[90%] max-w-3xl h-auto"
            style={{ minHeight: "500px" }}
          />
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-blue-50 via-white to-indigo-50 lg:bg-white flex flex-col justify-center items-center px-4 sm:px-6 py-6 sm:py-8 lg:px-16 relative overflow-hidden">
        {/* Enhanced Mobile Background Elements */}
        <div className="lg:hidden absolute top-6 right-6 w-20 h-20 bg-[#FFD93B] rounded-full opacity-10 blur-2xl"></div>
        <div className="lg:hidden absolute bottom-8 left-6 w-24 h-24 bg-[#1E4AB8] rounded-full opacity-10 blur-2xl"></div>
        <div className="lg:hidden absolute top-1/3 left-8 w-14 h-14 bg-[#4A90E2] rounded-full opacity-10 blur-xl"></div>
        <div className="lg:hidden absolute bottom-1/3 right-10 w-16 h-16 bg-[#FFD93B] rounded-full opacity-10 blur-xl"></div>
        
        <div className="max-w-2xl w-full flex flex-col items-center justify-center relative z-10">
          {/* Enhanced Header for Mobile */}
          <div className="flex flex-col items-center justify-center mb-6 sm:mb-8 lg:mb-6">
            <div className="relative mb-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#1E4AB8] to-[#4A90E2] bg-clip-text text-transparent text-center leading-tight">
                Understanding You
              </h2>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#FFD93B] to-[#FFE066] rounded-full lg:hidden"></div>
            </div>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 lg:text-[#4A90E2] text-center font-medium mt-4 lg:mt-0 px-4 leading-relaxed">
              Are there any specific qualities or areas of expertise you seek in Koach?
            </p>
            <div className="mt-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
              <p className="text-xs sm:text-sm text-[#1E4AB8] font-semibold text-center">
                * Choose a maximum of 5 skills
              </p>
            </div>
          </div>

          {/* Enhanced Skills Section */}
          <div className="w-full mb-6 sm:mb-8 lg:mb-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-lg p-4 sm:p-5 shadow-lg lg:shadow-none border border-gray-200 lg:border-transparent mb-4">
              <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-[#1E4AB8] to-[#4A90E2] bg-clip-text text-transparent text-center mb-4 flex items-center justify-center gap-2">
                <svg className="w-5 h-5 text-[#FFD93B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Skills & Expertise
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                {skills.map((skill, index) => (
                  <button
                    key={index}
                    onClick={() => handleSkillToggle(skill)}
                    disabled={!selectedSkills.includes(skill) && selectedSkills.length >= 5}
                    className={`px-4 sm:px-4 py-3 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 backdrop-blur-sm ${
                      selectedSkills.includes(skill)
                        ? "bg-gradient-to-r from-[#4A90E2] to-[#1E4AB8] text-white shadow-lg shadow-blue-500/25"
                        : selectedSkills.length >= 5
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-300"
                          : "bg-white/90 border-2 border-gray-200 lg:border-[#4A90E2] text-gray-700 lg:text-[#4A90E2] hover:bg-gradient-to-r hover:from-[#4A90E2] hover:to-[#1E4AB8] hover:text-white hover:border-transparent shadow-md hover:shadow-lg"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
              
              {/* Enhanced Selection Counter */}
              <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#1E4AB8]">
                    Skills Selected:
                  </span>
                  <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                    selectedSkills.length > 0 
                      ? 'bg-[#FFD93B] text-[#1E4AB8]' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {selectedSkills.length}/5
                  </div>
                </div>
                {selectedSkills.length >= 5 && (
                  <p className="text-xs text-[#4A90E2] font-medium text-center mt-2">
                    Maximum selection reached. Deselect some to choose others.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Enhanced Traits Section */}
          <div className="w-full mb-6 sm:mb-8 lg:mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-lg p-4 sm:p-5 shadow-lg lg:shadow-none border border-gray-200 lg:border-transparent">
              <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-[#1E4AB8] to-[#4A90E2] bg-clip-text text-transparent text-center mb-4 flex items-center justify-center gap-2">
                <svg className="w-5 h-5 text-[#FFD93B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
                Coaching Style Preferences
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 text-center mb-4">
                What kind of coaching approach works best for you?
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                {traits.map((trait, index) => (
                  <button
                    key={index}
                    onClick={() => handleTraitToggle(trait)}
                    className={`px-4 sm:px-4 py-3 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 backdrop-blur-sm ${
                      selectedTraits.includes(trait)
                        ? "bg-gradient-to-r from-[#4A90E2] to-[#1E4AB8] text-white shadow-lg shadow-blue-500/25"
                        : "bg-white/90 border-2 border-gray-200 lg:border-[#4A90E2] text-gray-700 lg:text-[#4A90E2] hover:bg-gradient-to-r hover:from-[#4A90E2] hover:to-[#1E4AB8] hover:text-white hover:border-transparent shadow-md hover:shadow-lg"
                    }`}
                  >
                    {trait}
                  </button>
                ))}
              </div>
              
              {/* Traits Selection Status */}
              <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#1E4AB8]">
                    Styles Selected:
                  </span>
                  <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                    selectedTraits.length > 0 
                      ? 'bg-[#FFD93B] text-[#1E4AB8]' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {selectedTraits.length}
                  </div>
                </div>
                {selectedTraits.length === 0 && (
                  <p className="text-xs text-gray-500 text-center mt-1">
                    Select your preferred coaching styles (optional)
                  </p>
                )}
              </div>
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