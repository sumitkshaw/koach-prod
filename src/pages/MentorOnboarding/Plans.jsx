import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logowhite.png";
import PlanningGirl from "../../assets/PlanningGirl.png";

export default function Plans() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([
    { name: "Starter Plan", price: "$500", sessions: "2", deliverables: "" },
  ]);

  const handleChange = (index, field, value) => {
    const updatedPlans = [...plans];
    updatedPlans[index][field] = value;
    setPlans(updatedPlans);
  };

  const addPlan = () => {
    setPlans([
      ...plans,
      { name: `Plan ${plans.length + 1}`, price: "", sessions: "", deliverables: "" },
    ]);
  };

  const removePlan = (index) => {
    const updatedPlans = plans.filter((_, i) => i !== index);
    setPlans(updatedPlans);
  };

  const handleNext = () => {
    console.log("Plans saved:", plans);
    navigate("/clients");
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
            src={PlanningGirl}
            alt="Planning Illustration"
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
                Plans
              </h2>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#FFD93B] to-[#FFE066] rounded-full lg:hidden"></div>
            </div>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 lg:text-[#1E4AB8] text-center font-medium mt-4 lg:mt-0 px-4 leading-relaxed">
              View the types of plans we offer and select the one that suits you
            </p>
          </div>

          {/* Enhanced Plans Form for Mobile */}
          {plans.map((plan, index) => (
            <div key={index} className="w-full mb-4 sm:mb-6 bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-lg p-5 sm:p-6 shadow-xl lg:shadow-sm border border-gray-200 lg:border-transparent relative">
              {/* Plan Header with Remove Button */}
              <div className="flex justify-between items-center mb-4 sm:mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#FFD93B] to-[#FFE066] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#1E4AB8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#1E4AB8]">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-gray-500">Plan {index + 1}</p>
                  </div>
                </div>
                {index > 0 && (
                  <button
                    onClick={() => removePlan(index)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-200 p-2 rounded-lg hover:bg-red-50 flex items-center gap-1 text-sm font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Remove
                  </button>
                )}
              </div>

              {/* Pricing and Sessions - Enhanced Grid */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-4">
                <div className="flex flex-col">
                  <label className="block text-[#1E4AB8] font-semibold mb-2 text-sm flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    Pricing
                  </label>
                  <input
                    type="text"
                    value={plan.price}
                    onChange={(e) => handleChange(index, "price", e.target.value)}
                    placeholder="$500"
                    className="w-full border-2 border-gray-200 lg:border-gray-300 rounded-xl lg:rounded-lg p-3.5 text-sm sm:text-base focus:border-[#1E4AB8] focus:outline-none focus:ring-2 focus:ring-[#FFD93B] bg-white/50 backdrop-blur-sm transition-all duration-200"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-[#1E4AB8] font-semibold mb-2 text-sm flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Sessions
                  </label>
                  <input
                    type="number"
                    value={plan.sessions}
                    onChange={(e) => handleChange(index, "sessions", e.target.value)}
                    placeholder="2"
                    className="w-full border-2 border-gray-200 lg:border-gray-300 rounded-xl lg:rounded-lg p-3.5 text-sm sm:text-base focus:border-[#1E4AB8] focus:outline-none focus:ring-2 focus:ring-[#FFD93B] bg-white/50 backdrop-blur-sm transition-all duration-200"
                  />
                </div>
              </div>

              {/* Deliverables - Enhanced */}
              <div className="flex flex-col">
                <label className="block text-[#1E4AB8] font-semibold mb-2 text-sm flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Deliverables
                </label>
                <textarea
                  value={plan.deliverables}
                  onChange={(e) => handleChange(index, "deliverables", e.target.value)}
                  placeholder="List your plan deliverables here (e.g., weekly check-ins, progress reports, custom resources...)"
                  className="w-full border-2 border-gray-200 lg:border-gray-300 rounded-xl lg:rounded-lg p-3.5 text-sm sm:text-base focus:border-[#1E4AB8] focus:outline-none focus:ring-2 focus:ring-[#FFD93B] bg-white/50 backdrop-blur-sm transition-all duration-200 resize-none"
                  rows={3}
                />
                <p className="text-xs text-gray-500 mt-2">
                  What will your clients receive in this plan?
                </p>
              </div>
            </div>
          ))}

          {/* Enhanced Add Plan Button */}
          <button
            onClick={addPlan}
            className="w-full mb-4 sm:mb-6 py-3.5 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-dashed border-[#4A90E2] rounded-2xl lg:rounded-lg text-[#1E4AB8] font-bold hover:bg-blue-100 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2 group"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Another Plan
          </button>

          {/* Plans Summary for Mobile */}
          <div className="lg:hidden w-full mb-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Plans Created
                </span>
                <span className="text-sm font-bold px-2 py-1 rounded-full bg-[#FFD93B] text-[#1E4AB8]">
                  {plans.length}
                </span>
              </div>
              <p className="text-xs text-gray-500 text-center">
                {plans.length === 1 ? '1 plan ready' : `${plans.length} plans ready for clients`}
              </p>
            </div>
          </div>

          {/* Enhanced Buttons for Mobile */}
          <div className="flex justify-center mt-6 sm:mt-8 w-full">
            <div className="flex gap-3 sm:gap-4 w-full max-w-sm">
              <button
                onClick={() => navigate("/certifications")}
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
              Create multiple plans to offer different options for your clients
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}