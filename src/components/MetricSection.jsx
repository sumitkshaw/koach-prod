import tcs from '../assets/tcs2.png';
import airbus from '../assets/airbus.png';
import ebay from '../assets/ebay.png';
import pwc from '../assets/PWC.png';
import StudyingImage from "../assets/image100.png";
import { User } from "lucide-react";


function MetricSection() {
  const companies = [
    {
      id: 1,
      image: ebay,
      alt: "eBay",
      h: 40,
      w: 110,
    },
    {
      id: 2,
      image: pwc,
      alt: "PwC",
      h: 70,
      w: 100,
      marginTop: -40, // Fixed: camelCase
    },
    {
      id: 3,
      image: airbus,
      alt: "Airbus",
      h: 30,
      w: 150,
    },
    {
      id: 4,
      image: tcs,
      alt: "TCS",
      h: 38,
      w: 60,
      marginTop: -8, // Fixed: camelCase
    },
  ];

  return (
    <div className="bg-transparent py-0">


      {/* Custom CSS for marquee animation */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          animation: marquee 15s linear infinite;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4"> {/* Fixed: changed from max-w-9xl to max-w-7xl */}
        <div className="font-bold text-[22px] text-gray-800 text-center mb-12"> {/* Fixed: text-black-800 to text-gray-800 */}
          A{' '}
          <a
            href="https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/the-social-economy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-[#2D488F] hover:text-[#1d2f5e] transition-colors"
          >
            McKinsey
          </a>{' '}
          report states that employees spend 1.8 hours every day—9.3 hours per week, on average searching.
        </div>

        <div className="font-bold text-[24px] text-gray-800 text-center mb-8"> {/* Fixed: text-black-800 to text-gray-800 */}
          Learn from the founders/operators of top brands
        </div>

        <div className="flex items-center justify-center">
          <div className="w-full md:w-[600px] h-[80px] pt-10 overflow-hidden relative">
            <div className="flex min-w-max gap-12 animate-marquee">
              {/* Fixed: Proper key generation for duplicated array */}
              {[...companies, ...companies].map((company, index) => (
                <div
                  key={`${company.id}-${index}`} // Fixed: unique keys for duplicated items
                  className="flex-shrink-0" // Fixed: prevent shrinking
                  style={{
                    height: `${company.h}px`, // Fixed: added px unit
                    width: `${company.w}px`,  // Fixed: added px unit
                    marginTop: company.marginTop ? `${company.marginTop}px` : '0px', // Fixed: camelCase and px unit
                  }}
                >
                  <img
                    src={company.image}
                    alt={company.alt}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-full mx-auto mt-16">
        {/* Stats section */}
        <div className="w-full relative mb-12">
          {/* Updated Banner with new design aesthetic */}
          <div className="w-full bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 relative overflow-hidden">
            {/* Decorative elements inspired by the reference image */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-yellow-400 rounded-full opacity-20 -translate-x-10 -translate-y-10"></div>
            <div className="absolute top-4 left-16 w-12 h-12 bg-green-400 rounded-full opacity-30"></div>
            <div className="absolute top-2 left-32 w-8 h-8 bg-purple-400 rounded-full opacity-25"></div>
            <div className="absolute top-12 right-20 w-6 h-6 bg-orange-400 rounded-full opacity-30"></div>
            <div className="absolute bottom-4 right-4 w-16 h-16 bg-white/10 rounded-lg rotate-12"></div>
            <div className="absolute bottom-8 right-32 w-12 h-12 bg-white/5 rounded-lg -rotate-12"></div>

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

                {/* Right side - Content with updated text from reference */}
                <div className="flex-1 text-center lg:text-left lg:ml-20 xl:ml-32 lg:pr-20 xl:pr-40">
                  <div className="text-white/90 text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 sm:mb-4">
                    Koach is for all
                  </div>
                  <div className=" text-yellow-400 text-base sm:text-lg lg:text-xl xl:text-2xl mb-6 sm:mb-8 leading-relaxed">
                    Empowered by Experienced Coaching and Future-Ready
                  </div>
                  <div className="text-white/80 text-sm sm:text-base lg:text-lg leading-relaxed mb-8">
                    We connect you with World-Class coaches who've dismantled their fields, and domains who are ready to accelerate your professional/career goals.
                  </div>
                  <div className="flex justify-center lg:justify-start space-x-8 sm:space-x-16 lg:space-x-20">
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: Additional spacing for image overflow */}
          <div className="block lg:hidden h-0"></div>
        </div>
      </div>
    </div>
  );
}

export default MetricSection;