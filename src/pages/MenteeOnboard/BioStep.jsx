import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logowhite.png";
import BrazucaPlanning from "../../assets/brazuca_planning.png";

export default function BioStep() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    location: "",
    institution: "",
    role: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.institution.trim()) newErrors.institution = "Institution is required";
    if (!formData.role) newErrors.role = "Please select your role";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      //store formData in context or backend here
      navigate("/past-experience");
    }
  };

  const isFormValid = () => {
    return (
      formData.firstName.trim() &&
      formData.lastName.trim() &&
      formData.email.trim() &&
      formData.location.trim() &&
      formData.institution.trim() &&
      formData.role
    );
  };

  return (
    <div className="min-h-screen flex font-proxima">
      {/* Left Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#1E4AB8] text-white flex-col items-center justify-center p-8 relative">
        <img src={Logo} alt="Koach Logo" className="h-10 mb-8 absolute top-8 left-8" />
        <div className="w-full flex flex-col justify-center items-center h-full">
          <img
            src={BrazucaPlanning}
            alt="Illustration"
            className="w-[90%] max-w-3xl h-auto"
            style={{ minHeight: "500px" }}
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 bg-gradient-to-br from-blue-50 via-white to-indigo-50 lg:bg-white px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
        <div className="w-full max-w-xl">
          {/* Enhanced Heading for Mobile */}
          <div className="flex flex-col items-center justify-center mb-6 sm:mb-8 lg:mb-8">
            {/* Enhanced Mobile Background Elements */}
            <div className="lg:hidden absolute top-6 right-6 w-20 h-20 bg-[#FFD93B] rounded-full opacity-10 blur-2xl"></div>
            <div className="lg:hidden absolute bottom-8 left-6 w-24 h-24 bg-[#1E4AB8] rounded-full opacity-10 blur-2xl"></div>
            <div className="lg:hidden absolute top-1/3 left-8 w-14 h-14 bg-[#4A90E2] rounded-full opacity-10 blur-xl"></div>
            <div className="lg:hidden absolute bottom-1/3 right-10 w-16 h-16 bg-[#FFD93B] rounded-full opacity-10 blur-xl"></div>
            
            <div className="relative mb-4">
              <h1 className="text-2xl sm:text-3xl lg:text-3xl font-bold bg-gradient-to-r from-[#1E4AB8] to-[#4A90E2] bg-clip-text text-transparent text-center leading-tight relative z-10">
                Your Bio
              </h1>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#FFD93B] to-[#FFE066] rounded-full lg:hidden"></div>
            </div>
            <p className="text-sm sm:text-base text-gray-600 lg:text-[#1E4AB8] text-center relative z-10 mt-4 lg:mt-0 px-4">
              Help us get to know you better
            </p>
          </div>

          {/* Enhanced Form for Mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-4 lg:gap-4">
            {/* First Name */}
            <div className="flex flex-col sm:col-span-1">
              <label className="text-[#1E4AB8] mb-3 font-semibold text-sm lg:font-medium flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                First name
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
                className={`border-2 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#FFD93B] focus:border-transparent bg-white/80 backdrop-blur-sm shadow-sm lg:shadow-none transition-all duration-200 ${
                  errors.firstName ? "border-red-500 bg-red-50/50" : "border-gray-200 lg:border-[#1E4AB8] hover:border-[#4A90E2]"
                }`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.firstName}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div className="flex flex-col sm:col-span-1">
              <label className="text-[#1E4AB8] mb-3 font-semibold text-sm lg:font-medium flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Last name
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
                className={`border-2 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#FFD93B] focus:border-transparent bg-white/80 backdrop-blur-sm shadow-sm lg:shadow-none transition-all duration-200 ${
                  errors.lastName ? "border-red-500 bg-red-50/50" : "border-gray-200 lg:border-[#1E4AB8] hover:border-[#4A90E2]"
                }`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.lastName}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col sm:col-span-2">
              <label className="text-[#1E4AB8] mb-3 font-semibold text-sm lg:font-medium flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                className={`border-2 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#FFD93B] focus:border-transparent bg-white/80 backdrop-blur-sm shadow-sm lg:shadow-none transition-all duration-200 ${
                  errors.email ? "border-red-500 bg-red-50/50" : "border-gray-200 lg:border-[#1E4AB8] hover:border-[#4A90E2]"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Location */}
            <div className="flex flex-col sm:col-span-2">
              <label className="text-[#1E4AB8] mb-3 font-semibold text-sm lg:font-medium flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Location
              </label>
              <input
                type="text"
                name="location"
                placeholder="Enter your location"
                value={formData.location}
                onChange={handleChange}
                className={`border-2 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#FFD93B] focus:border-transparent bg-white/80 backdrop-blur-sm shadow-sm lg:shadow-none transition-all duration-200 ${
                  errors.location ? "border-red-500 bg-red-50/50" : "border-gray-200 lg:border-[#1E4AB8] hover:border-[#4A90E2]"
                }`}
              />
              {errors.location && (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.location}
                </p>
              )}
            </div>

            {/* Institution */}
            <div className="flex flex-col sm:col-span-2">
              <label className="text-[#1E4AB8] mb-3 font-semibold text-sm lg:font-medium flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Institution Name
              </label>
              <input
                type="text"
                name="institution"
                placeholder="Enter your institution name"
                value={formData.institution}
                onChange={handleChange}
                className={`border-2 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#FFD93B] focus:border-transparent bg-white/80 backdrop-blur-sm shadow-sm lg:shadow-none transition-all duration-200 ${
                  errors.institution ? "border-red-500 bg-red-50/50" : "border-gray-200 lg:border-[#1E4AB8] hover:border-[#4A90E2]"
                }`}
              />
              {errors.institution && (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.institution}
                </p>
              )}
            </div>

            {/* Role */}
            <div className="flex flex-col sm:col-span-2">
              <label className="text-[#1E4AB8] mb-3 font-semibold text-sm lg:font-medium flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={`border-2 rounded-xl px-4 py-3.5 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#FFD93B] focus:border-transparent shadow-sm lg:shadow-none transition-all duration-200 appearance-none ${
                  errors.role ? "border-red-500 bg-red-50/50" : "border-gray-200 lg:border-[#1E4AB8] hover:border-[#4A90E2]"
                }`}
              >
                <option value="">Select your role</option>
                <option value="student">Student</option>
                <option value="professional">Professional</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.role}
                </p>
              )}
            </div>
          </div>

          {/* Progress Indicator for Mobile */}
          <div className="lg:hidden mt-6 mb-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Form Progress
                </span>
                <span className={`text-sm font-bold px-2 py-1 rounded-full ${
                  isFormValid() 
                    ? 'bg-green-500 text-white' 
                    : 'bg-[#FFD93B] text-[#1E4AB8]'
                }`}>
                  {isFormValid() ? 'Ready' : 'Incomplete'}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-[#4A90E2] to-[#1E4AB8] h-2 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${(Object.values(formData).filter(value => value.toString().trim()).length / Object.values(formData).length) * 100}%` 
                  }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                {isFormValid() ? 'All fields completed!' : 'Fill all fields to continue'}
              </p>
            </div>
          </div>

          {/* Enhanced Buttons for Mobile */}
          <div className="flex justify-center mt-6 sm:mt-8 w-full relative z-10">
            <div className="flex gap-3 sm:gap-4 w-full max-w-sm">
              <button
                onClick={() => navigate("/welcome-step")}
                className="lg:w-40 w-full sm:w-32 py-3.5 sm:py-3 text-sm sm:text-base border-2 border-[#FFD93B] text-[#1E4AB8] rounded-xl hover:bg-[#FFD93B] transition-all duration-200 font-semibold shadow-lg lg:shadow-none hover:shadow-xl active:scale-95 backdrop-blur-sm bg-white/80 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!isFormValid()}
                className={`lg:w-40 w-full sm:w-32 py-3.5 sm:py-3 text-sm sm:text-base rounded-xl transition-all duration-200 font-semibold shadow-lg lg:shadow-none hover:shadow-xl active:scale-95 backdrop-blur-sm flex items-center justify-center gap-2 ${
                  isFormValid()
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
        </div>
      </div>
    </div>
  );
}