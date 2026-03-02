import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logowhite.png";
import Paper from "../../assets/paper.png";

// Certification icons
import ICFIcon from "../../assets/Certifications/ICF.png";
import PCCIcon from "../../assets/Certifications/PCC.png";
import CCEIcon from "../../assets/Certifications/CCE.png";
import NCDAIcon from "../../assets/Certifications/NCDA.png";
import ACAIcon from "../../assets/Certifications/ACA.png";
import GCDFIcon from "../../assets/Certifications/GCDF.png";
import PARWCCIcon from "../../assets/Certifications/PARWCC.png";
import OthersIcon from "../../assets/Certifications/GLOBE.png";

export default function Certifications() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [otherText, setOtherText] = useState("");

  // Certification options with icons
  const certifications = [
    { label: "ICF", icon: ICFIcon },
    { label: "PCC", icon: PCCIcon },
    { label: "CCE", icon: CCEIcon },
    { label: "NCDA", icon: NCDAIcon },
    { label: "ACA", icon: ACAIcon },
    { label: "GCDF", icon: GCDFIcon },
    { label: "PARWCC", icon: PARWCCIcon },
    { label: "Others", icon: OthersIcon },
  ];

  const handleSelect = (cert) => {
    if (cert.label === "Others") {
      setSelected(prev => 
        prev.includes("Others") 
          ? prev.filter(item => item !== "Others") 
          : [...prev, "Others"]
      );
    } else {
      setSelected(prev => 
        prev.includes(cert.label)
          ? prev.filter(item => item !== cert.label)
          : [...prev, cert.label]
      );
      // Only clear otherText if "Others" is not selected
      if (!selected.includes("Others")) {
        setOtherText("");
      }
    }
  };

  const handleNext = () => {
    let result = [...selected];
    if (selected.includes("Others") && otherText) {
      result = result.filter(item => item !== "Others").concat(otherText);
    }
    console.log("Selected certifications:", result);
    navigate("/planning");
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
            src={Paper}
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
                Active coaching certifications,
                <br /> Credentials, and Education
              </h2>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#FFD93B] to-[#FFE066] rounded-full lg:hidden"></div>
            </div>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 lg:text-[#1E4AB8] text-center font-medium mt-4 lg:mt-0 px-4 leading-relaxed">
              You&apos;ve worked hard to elevate your career to where it is now.
              Share your credentials and increase interest from new prospective
              clients
            </p>
          </div>

          {/* Enhanced Certifications Grid for Mobile */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full mb-4 sm:mb-6">
            {certifications.map((cert) => (
              <button
                key={cert.label}
                onClick={() => handleSelect(cert)}
                className={`group flex items-center gap-3 sm:gap-3 p-4 sm:p-4 border-2 rounded-2xl lg:rounded-lg text-left transition-all duration-300 transform hover:scale-105 active:scale-95 relative overflow-hidden backdrop-blur-sm ${
                  selected.includes(cert.label)
                    ? "border-[#FFD93B] bg-gradient-to-r from-[#FFFBEA] to-[#FFF8DC] shadow-xl lg:shadow-none shadow-[#FFD93B]/25"
                    : "border-gray-200 lg:border-gray-300 bg-white/80 hover:border-[#1E4AB8] hover:bg-blue-50/70 shadow-lg lg:shadow-none hover:shadow-xl"
                }`}
              >
                <div className={`flex-shrink-0 w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center rounded-xl lg:rounded-lg transition-all duration-200 ${
                  selected.includes(cert.label) 
                    ? 'bg-[#FFD93B]/20 shadow-inner' 
                    : 'bg-white shadow-sm group-hover:bg-blue-50'
                }`}>
                  <img 
                    src={cert.icon} 
                    alt="" 
                    className={`w-6 h-6 sm:w-5 sm:h-5 object-contain transition-all duration-200 ${
                      selected.includes(cert.label) ? 'scale-110' : 'scale-100'
                    }`}
                  />
                </div>
                <span className={`text-sm sm:text-sm lg:text-base font-medium flex-1 transition-all duration-200 ${
                  selected.includes(cert.label) 
                    ? 'text-[#1E4AB8] font-semibold' 
                    : 'text-gray-700 lg:text-[#1E4AB8] group-hover:text-[#1E4AB8]'
                }`}>
                  {cert.label === "Others" ? "Other ________" : cert.label}
                </span>
                
                {/* Selection indicator for mobile */}
                <div className={`flex-shrink-0 w-5 h-5 sm:w-4 sm:h-4 border-2 rounded-full flex items-center justify-center transition-all duration-200 ${
                  selected.includes(cert.label)
                    ? 'border-[#FFD93B] bg-[#FFD93B] scale-110'
                    : 'border-gray-300 bg-white group-hover:border-[#1E4AB8] group-hover:scale-105'
                }`}>
                  {selected.includes(cert.label) && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>

                {/* Active State Indicator */}
                {selected.includes(cert.label) && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFD93B] to-[#FFE066] rounded-b-2xl lg:rounded-b-lg"></div>
                )}
              </button>
            ))}
          </div>

          {/* Enhanced Textbox for "Others" */}
          {selected.includes("Others") && (
            <div className="w-full mb-4 sm:mb-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-lg p-4 shadow-xl lg:shadow-none border border-gray-200 lg:border-transparent">
                <label className="block text-[#1E4AB8] font-semibold mb-3 text-sm flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Specify your certification
                </label>
                <input
                  type="text"
                  value={otherText}
                  onChange={(e) => setOtherText(e.target.value)}
                  placeholder="Enter your certification name..."
                  className="w-full border-2 border-gray-200 lg:border-gray-300 rounded-xl lg:rounded-lg p-4 text-sm sm:text-base focus:border-[#1E4AB8] focus:outline-none focus:ring-2 focus:ring-[#FFD93B] bg-white/50 backdrop-blur-sm transition-all duration-200"
                />
                {otherText && (
                  <p className="text-xs text-[#4A90E2] font-medium mt-2 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Your custom certification will be saved
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Selection Status for Mobile */}
          <div className="lg:hidden w-full mb-4 px-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Certifications selected
                </span>
                <span className={`text-sm font-bold px-2 py-1 rounded-full ${
                  selected.length > 0 
                    ? 'bg-[#FFD93B] text-[#1E4AB8]' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {selected.length}
                </span>
              </div>
              {selected.length === 0 && (
                <p className="text-xs text-gray-500 text-center">
                  Select your certifications to showcase your credentials
                </p>
              )}
              {selected.length > 0 && (
                <p className="text-xs text-[#1E4AB8] font-medium text-center">
                  {selected.length === 1 ? '1 certification selected' : `${selected.length} certifications selected`}
                </p>
              )}
            </div>
          </div>

          {/* Enhanced Buttons for Mobile */}
          <div className="flex justify-center mt-6 sm:mt-8 w-full">
            <div className="flex gap-3 sm:gap-4 w-full max-w-sm">
              <button
                onClick={() => navigate("/mentor-expert")}
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
              Showcasing your credentials helps build trust with potential mentees
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}