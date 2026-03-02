import KoachJourney3 from '../assets/koachjourney3.jpg';
import SkillLocation from '../assets/Skill&Location.png';
import { useNavigate } from 'react-router-dom';

const KoachJourney = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-8">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-16 mb-12 lg:mb-16">
        {/* Left Side - Text */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <h1
            className="text-[30px] lg:text-[40px] font-bold leading-tight text-gray-900 tracking-tight mt-0"
            style={{ fontFamily: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}
          >
            Unleash Your Potential.
            <br />
            <span className="text-[#2D488F]">Koach Your Career</span> to the Next Level.
          </h1>
        </div>


        {/* Right Side - Skill & Location Image */}
        <div
          id="koach-search"
          className="w-full lg:w-1/2 flex justify-center items-center"
        >
          <img
            src={SkillLocation}
            alt="Skill and Location"
            className="w-full max-w-lg h-auto object-contain rounded-xl shadow-md"
            loading="lazy"
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative rounded-3xl overflow-hidden">
        <img
          src={KoachJourney3}
          alt="Entrepreneur working"
          className="w-full h-[400px] sm:h-[500px] object-cover object-[30%_40%]"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-start justify-start p-6 sm:p-12">
          <div className="bg-white/60 p-6 sm:p-12 rounded-2xl max-w-full sm:max-w-[600px] text-black">
            <h2 className="text-2xl sm:text-4xl font-bold mb-2">Koach is for all</h2>
            <p className="text-base sm:text-lg font-medium mb-4">
              (Em)Powered by Experience. Leading the Future. Today.
            </p>
            <p className="text-base sm:text-lg font-medium">
              We connect you with World-Class coaches who&apos;ve dominated their
              fields and domains and are ready to accelerate your
              professional-career goals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KoachJourney;
