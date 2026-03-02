import { useNavigate } from "react-router-dom";
import Logo from "./../../assets/logowhite.png";
import WelcomeAboardImage from "./../../assets/welcomeAboard.png";

export default function WelcomeUser() {
  const navigate = useNavigate();

  const handleConfirm = () => {
    console.log("User confirmed welcome aboard");
    navigate("/dashboard");
  };

  const handleBack = () => {
    navigate("/reasons");
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
            src={WelcomeAboardImage}
            alt="Welcome Aboard"
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
        <div className="lg:hidden absolute top-20 left-1/4 w-12 h-12 bg-[#1E4AB8] rounded-full opacity-10 blur-lg"></div>
        
        <div className="max-w-2xl w-full flex flex-col items-center justify-center h-full relative z-10">
          {/* Enhanced Header for Mobile */}
          <div className="flex flex-col items-center justify-center flex-1 w-full">
            {/* Celebration Icon */}
            <div className="mb-6 sm:mb-8 relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-[#FFD93B] to-[#FFE066] rounded-full flex items-center justify-center shadow-xl animate-bounce">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#1E4AB8]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              </div>
              {/* Floating particles */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#4A90E2] rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-[#FFD93B] rounded-full opacity-60 animate-pulse delay-75"></div>
              <div className="absolute top-4 -right-4 w-3 h-3 bg-[#1E4AB8] rounded-full opacity-60 animate-pulse delay-150"></div>
            </div>

            {/* Enhanced Main Heading */}
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-[#1E4AB8] via-[#4A90E2] to-[#1E4AB8] bg-clip-text text-transparent mb-4 sm:mb-6 text-center leading-tight">
                Welcome aboard!
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#FFD93B] to-[#FFE066] rounded-full mx-auto mb-4 lg:hidden"></div>
              <p className="text-lg sm:text-xl lg:text-3xl text-gray-700 lg:text-[#1E4AB8] text-center font-medium px-4 leading-relaxed">
                You are finally ready to have a look around.
              </p>
            </div>

            {/* Success Message Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-lg p-5 sm:p-6 shadow-xl lg:shadow-none border border-gray-200 lg:border-transparent mb-6 sm:mb-8 w-full max-w-md">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#1E4AB8]">Profile Complete!</h3>
              </div>
              <p className="text-sm text-gray-600 text-center">
                Your profile has been successfully set up. You can now explore your dashboard and start your journey with Koach.
              </p>
            </div>

            {/* Enhanced Buttons Container */}
            <div className="flex flex-col gap-4 sm:gap-6 w-full max-w-sm">
              {/* Enhanced Confirm Button */}
              <button
                onClick={handleConfirm}
                className="group relative w-full py-4 sm:py-5 bg-gradient-to-r from-[#FFD93B] to-[#FFE066] text-[#1E4AB8] rounded-xl lg:rounded font-bold text-lg sm:text-xl hover:opacity-90 transition-all duration-300 shadow-2xl hover:shadow-3xl active:scale-95 transform backdrop-blur-sm overflow-hidden"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Explore Dashboard
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>

              {/* Enhanced Back Button */}
              <button
                onClick={handleBack}
                className="w-full py-3.5 sm:py-3 border-2 border-[#FFD93B] text-[#1E4AB8] rounded-xl lg:rounded hover:bg-[#FFD93B] transition-all duration-200 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl active:scale-95 backdrop-blur-sm bg-white/80"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back
                </span>
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-6 sm:mt-8 text-center">
              <p className="text-xs text-gray-500">
                Need help? Our support team is here for you 24/7
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}