import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logowhite.png";
import GroupImage from "../assets/Group.png";

export default function AboutMe() {
  const [bio, setBio] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    console.log("Bio submitted:", bio);
    // Save bio to backend / firestore here
    navigate("/welcome-step#"); //next onboarding step
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#1E4AB8] flex-col p-8 relative">
        {/* Logo */}
        <img src={Logo} alt="Koach Logo" className="h-10 mb-8 absolute top-8 left-8" />
        {/* Illustration */}
        <img
          src={GroupImage}
          alt="Group"
          className="absolute bottom-0 left-0 w-full object-cover"
          style={{ height: "60%", minHeight: "350px" }}
        />
      </div>
      {/* Right Panel */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center items-center px-8 py-12 lg:px-16">
        <div className="max-w-2xl w-full flex flex-col items-center justify-center">
          {/* Header */}
          <div className="flex flex-col items-center justify-center mb-10">
            <h2 className="text-4xl font-bold text-[#1E4AB8] mb-3 text-center">About Me</h2>
            <p className="text-lg text-[#1E4AB8] text-center font-medium">
              Tell us a bit about yourself to help us find your perfect mentor
            </p>
          </div>

          {/* Textarea with label and word count inside */}
                    <div className="mb-8 relative w-full flex justify-center">
            <div className="w-full relative">
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full h-96 px-4 pt-4 pb-8 border border-gray-300 rounded-lg resize-none focus:border-[#1E4AB8] focus:outline-none text-base"
                maxLength={750}
              />
              {/* Custom colored placeholder */}
              {!bio && (
                <div className="absolute top-4 right-4 pointer-events-none select-none text-left w-[calc(100%-2rem)]">
                  <span className="text-[#1E4AB8] font-medium text-base block">
                    Tell us about you
                  </span>
                  <span className="text-[#90B6F9] text-sm font-normal block">
                    (You can talk about your goals, likes and interests)
                  </span>
                </div>
              )}
              {/* Word count inside textarea box */}
              <div className="absolute bottom-4 right-4 text-sm text-gray-500 pointer-events-none select-none">
                {bio.length}/750 words
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center mt-10 w-full">
            <div className="flex gap-8 w-full justify-center">
              <button
                onClick={() => navigate("/bio-step")}
                className="w-44 py-3 border border-[#FFD93B] text-[#1E4AB8] rounded hover:bg-[#FFD93B] transition"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="w-44 py-3 bg-[#FFD93B] text-[#1E4AB8] rounded hover:opacity-90 transition"
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
