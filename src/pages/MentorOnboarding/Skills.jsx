import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logowhite.png";
import Planning from "../../assets/brazuca_planning.png";

export default function AboutMe() {
  const [skill_bio, setSkillBio] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    console.log("Skills submitted:", skill_bio);
    // Save bio to backend / firestore here
    navigate("/mentor-expert"); //next onboarding step
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#1E4AB8] text-white flex-col items-center justify-center p-8 relative">
        <img src={Logo} alt="Koach Logo" className="h-10 mb-8 absolute top-8 left-8" />
        <div className="w-full flex flex-col justify-center items-center h-full">
          <img
            src={Planning}
            alt="Illustration"
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
          <div className="flex flex-col items-center justify-center mb-6 sm:mb-8 lg:mb-10">
            <div className="relative mb-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#1E4AB8] to-[#4A90E2] bg-clip-text text-transparent text-center leading-tight">
                Skills and Expertise
              </h2>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#FFD93B] to-[#FFE066] rounded-full lg:hidden"></div>
            </div>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 lg:text-[#1E4AB8] text-center font-medium mt-4 lg:mt-0 px-4 leading-relaxed">
              Briefly list your key skills and areas of expertise
            </p>
          </div>

          {/* Enhanced Textarea Section for Mobile */}
          <div className="mb-6 sm:mb-8 relative w-full flex justify-center">
            <div className="w-full relative">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-lg p-4 shadow-xl lg:shadow-none border border-gray-200 lg:border-transparent">
                {/* Label with Icon */}
                <label className="block text-[#1E4AB8] mb-4 font-semibold text-sm lg:font-medium flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Your Professional Summary
                </label>
                
                <div className="relative">
                  <textarea
                    value={skill_bio}
                    onChange={(e) => setSkillBio(e.target.value)}
                    className="w-full h-48 sm:h-56 lg:h-64 px-4 pt-4 pb-12 border-2 border-gray-200 lg:border-gray-300 rounded-xl lg:rounded-lg resize-none focus:border-[#1E4AB8] focus:outline-none focus:ring-2 focus:ring-[#FFD93B] text-sm sm:text-base bg-white/50 backdrop-blur-sm transition-all duration-200 placeholder-transparent"
                    maxLength={750}
                    placeholder="Tell us about your experience and skills..."
                  />
                  
                  {/* Enhanced Custom Placeholder */}
                  {!skill_bio && (
                    <div className="absolute top-4 left-4 pointer-events-none select-none">
                      <span className="text-[#1E4AB8] font-medium text-sm block">
                        Tell us about you
                      </span>
                      <span className="text-[#90B6F9] text-xs font-normal block mt-1">
                        Share your experience, skills, and what makes you unique as a mentor...
                      </span>
                    </div>
                  )}
                  
                  {/* Enhanced Word Count and Progress */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-[#4A90E2] to-[#1E4AB8] h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(skill_bio.length / 750) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 font-medium">
                        {skill_bio.length}/750
                      </span>
                    </div>
                    
                    {/* Character Status */}
                    <div className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      skill_bio.length > 700 
                        ? 'bg-red-100 text-red-600' 
                        : skill_bio.length > 0
                        ? 'bg-green-100 text-green-600'
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {skill_bio.length > 700 ? 'Almost full' : skill_bio.length > 0 ? 'Good' : 'Start typing'}
                    </div>
                  </div>
                </div>
                
                {/* Writing Tips */}
                <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <p className="text-xs text-[#1E4AB8] font-medium flex items-center gap-2">
                    <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Tip: Include your key skills, experience level, and what you&apos;re passionate about mentoring.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Preview for Mobile */}
          {skill_bio && (
            <div className="lg:hidden w-full mb-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-gray-200">
                <h4 className="text-sm font-semibold text-[#1E4AB8] mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Preview
                </h4>
                <p className="text-xs text-gray-600 line-clamp-3">
                  {skill_bio}
                </p>
              </div>
            </div>
          )}

          {/* Enhanced Buttons for Mobile */}
          <div className="flex justify-center mt-6 sm:mt-8 w-full">
            <div className="flex gap-3 sm:gap-4 w-full max-w-sm">
              <button
                onClick={() => navigate("/mentor-experience")}
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
              This helps mentees understand how you can help them grow professionally
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}