import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, User } from "lucide-react";
import StudyingImage from "../assets/image32.png";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const testimonials = [
    { 
      id: 1, 
      name: "Mayara Baffin", 
      role: "Mentor", 
      rating: 5, 
      text: "I love Koach so much! From features that let me instantly match with high quality prospects and more. The platform has been instrumental in growing my coaching practice." 
    },
    { 
      id: 2, 
      name: "Cara Angelo", 
      role: "Senior Architect", 
      rating: 5, 
      text: "The coaching platform is exceptional. It's helped me connect with amazing mentors and grow my skills exponentially. Highly recommend to anyone looking to advance their career." 
    },
    { 
      id: 3, 
      name: "Amelia Engstorm", 
      role: "Mentor", 
      rating: 5, 
      text: "Outstanding experience! The quality of coaches and the seamless matching process makes this platform stand out. It's been a game-changer for my professional development." 
    }
  ];

  const goToPrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      // Only for mobile - desktop shows static 3 reviews
      setActiveIndex((current) => (current === 0 ? testimonials.length - 1 : current - 1));
      setIsAnimating(false);
    }, 300);
  };

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      // Only for mobile - desktop shows static 3 reviews  
      setActiveIndex((current) => (current === testimonials.length - 1 ? 0 : current + 1));
      setIsAnimating(false);
    }, 300);
  };

  const StarRating = ({ count = 5 }) => (
    <div className="flex mb-3">
      {[...Array(count)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-0.5" />
      ))}
    </div>
  );

  const getVisibleTestimonials = () => {
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
    const itemsToShow = isDesktop ? 3 : 1;
    const result = [];
    
    for (let i = 0; i < itemsToShow; i++) {
      const index = (activeIndex + i) % testimonials.length;
      result.push({ ...testimonials[index], displayIndex: i });
    }
    return result;
  };

  const getTotalPages = () => {
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
    return isDesktop ? Math.ceil(testimonials.length / 3) : testimonials.length;
  };

  const getCurrentPage = () => {
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
    return isDesktop ? Math.floor(activeIndex / 3) : activeIndex;
  };

  return (
    <div className="w-full">
      {/* Header Section - Redesigned Banner */}
      <div className="w-full relative mb-12">
        {/* Slimmer Banner Background */}
        <div className="w-full bg-[#1e3a8a] px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 sm:w-32 h-16 sm:h-32 opacity-10">
            <div className="w-full h-full bg-white rounded-full transform translate-x-4 sm:translate-x-8 -translate-y-4 sm:-translate-y-8"></div>
          </div>
          <div className="absolute top-2 sm:top-4 right-2 sm:right-4 w-8 sm:w-16 h-8 sm:h-16 opacity-10">
            <div className="w-full h-full bg-white rounded-full"></div>
          </div>
          
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* Left side - Oversized Image Container */}
              <div className="w-full lg:w-auto flex justify-center lg:justify-start relative">
                <div className="w-56 h-56 sm:w-80 sm:h-72 lg:w-96 lg:h-88 xl:w-104 xl:h-96 relative z-10 -ml-4 lg:-ml-8 -mt-8 lg:-mt-12">
                  <img 
                    src={StudyingImage} 
                    alt="Person studying with laptop" 
                    className="w-full h-full object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl items-center justify-center hidden">
                    <User className="w-16 h-16 sm:w-20 sm:h-20 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Right side - Content shifted more to the right */}
              <div className="flex-1 text-center lg:text-left lg:ml-20 xl:ml-32 lg:pr-20 xl:pr-40">
                <div className="text-yellow-400 text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 sm:mb-4">
                  #1 Go-to coaching platform for next
                </div>
                <div className="text-white/80 text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-6 sm:mb-8">
                  Gen coaches, startups and VC's
                </div>
                <div className="flex justify-center lg:justify-start space-x-8 sm:space-x-16 lg:space-x-20">
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white">200</div>
                    <div className="text-white/80 text-sm sm:text-base">Coaches</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white">40+</div>
                    <div className="text-white/80 text-sm sm:text-base">Sessions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Additional spacing for image overflow */}
        <div className="block lg:hidden h-8"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Testimonials Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">What our Customers say</h2>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#2D488F]">about us</h3>
        </div>

        <div className="relative px-4 sm:px-8 lg:px-12">
          {/* Navigation Buttons - Hidden on mobile, visible on larger screens */}
          <button
            onClick={goToPrevious}
            className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors duration-200"
            disabled={isAnimating}
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <button
            onClick={goToNext}
            className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors duration-200"
            disabled={isAnimating}
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Testimonials Container - Fixed for 3 testimonials only */}
          <div className="overflow-hidden">
            {/* Desktop: Show all 3 testimonials */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full">
                  <div className="bg-[#F8FAFC] rounded-2xl shadow-md p-6 h-full border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                        <User className="w-6 h-6 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 text-base">{testimonial.name}</h4>
                        <p className="text-gray-500 text-sm">{testimonial.role}</p>
                      </div>
                      <div className="text-[#2D488F] text-xs font-medium bg-[#EEF2FF] px-2 py-1 rounded">
                        Mentor
                      </div>
                    </div>
                    
                    <StarRating count={testimonial.rating} />
                    
                    <p className="text-gray-600 text-base leading-relaxed">{testimonial.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile/Tablet: Carousel effect */}
            <div className="lg:hidden">
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ 
                  transform: `translateX(-${activeIndex * 100}%)`
                }}
              >
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="flex-none w-full px-2"
                  >
                    <div className="bg-[#F8FAFC] rounded-2xl shadow-md p-4 sm:p-6 h-full border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                          <User className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 text-sm sm:text-base">{testimonial.name}</h4>
                          <p className="text-gray-500 text-xs sm:text-sm">{testimonial.role}</p>
                        </div>
                        <div className="text-[#4F46E5] text-xs font-medium bg-[#EEF2FF] px-2 py-1 rounded">
                          Mentor
                        </div>
                      </div>
                      
                      <StarRating count={testimonial.rating} />
                      
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{testimonial.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Navigation Buttons */}
          <div className="flex justify-center space-x-4 mt-6 lg:hidden">
            <button
              onClick={goToPrevious}
              className="bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors duration-200"
              disabled={isAnimating}
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={goToNext}
              className="bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors duration-200"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Dots Indicator - Only show on mobile/tablet */}
          <div className="flex justify-center mt-6 sm:mt-8 space-x-2 lg:hidden">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => !isAnimating && setActiveIndex(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors duration-200 ${
                  index === activeIndex ? 'bg-[#4F46E5]' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}