import { useState, useEffect } from 'react'
import image1 from '../assets/image2222.png'
import image2 from '../assets/image1111.png'
import image3 from '../assets/image3333.png'
import Female from '../assets/Female.png'
import Triangle from '../assets/Triangle.png'
import { useNavigate } from "react-router-dom";
import { useModal } from '../context/ModalContext';

const MENTORS = [
  {
    id: 1,
    image: image1,
    name: "Christina Diane Warner",
    role: "Marketing Manager at",
    company: "Cloudfare"
  },
  {
    id: 2,
    image: image2,
    name: "Jaspal Singh",
    role: "Principal Software Engineer",
    company: "TCS"
  },
  {
    id: 3,
    image: image3,
    name: "Rajiv Agarwal",
    role: "Finance and Insurance Professional",
    company: "Ex-Willis Group"
  }
];

export default function JoinSection() {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const nextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % MENTORS.length);
  };

  const prevCard = () => {
    setCurrentCardIndex((prev) => (prev - 1 + MENTORS.length) % MENTORS.length);
  };

  const MentorCard = ({ mentor }) => (
    <div className="flex-shrink-0 w-80 md:mx-6 mx-4">
      <div className="relative bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 p-8 h-96 flex flex-col justify-between group">
        {/* Subtle geometric accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2D488F] to-[#4A63A8] rounded-t-xl"></div>

        {/* Professional badge */}
        <div className="absolute top-4 right-4 bg-[#2D488F] bg-opacity-5 rounded-full px-3 py-1">
          <span className="text-[#2D488F] text-xs font-semibold">MENTOR</span>
        </div>

        {/* Profile Image */}
        <div className="flex justify-center mt-4">
          <div className="relative">
            <img
              src={mentor.image}
              alt={mentor.name}
              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md ring-2 ring-gray-100 group-hover:ring-[#2D488F] group-hover:ring-opacity-20 transition-all duration-300"
            />
            {/* Professional status indicator */}
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 border-3 border-white rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Mentor Info */}
        <div className="text-center flex-1 flex flex-col justify-center">
          <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-[#2D488F] transition-colors duration-300">
            {mentor.name}
          </h3>
          <div className="space-y-1">
            <p className="text-sm text-gray-600 font-medium">{mentor.role}</p>
            <p className="text-sm font-bold text-[#2D488F] bg-[#2D488F] bg-opacity-5 rounded-full px-3 py-1 inline-block">
              {mentor.company}
            </p>
          </div>
        </div>

        {/* Professional action button */}
        <div className="mt-4 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
          <button className="w-full bg-[#2D488F] text-white py-2 rounded-lg text-sm font-semibold hover:bg-[#1e3266] transition-colors duration-200">
            Connect
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className='max-w-[1400px] px-4 py-12 mx-auto text-center'>
      <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-[#2D488F]'>
        Find your mentor:<br />
        Infinite Possibilities
      </h2>

      <p className='text-gray-600 mb-12 max-w-2xl mx-auto text-base sm:text-lg'>
        Lorem ipsum dolor sit amet consectetur. Habitant gravida blandit mi in sit mi posuere nibh. Turpis lectus quis sed fermentum mi.
      </p>

      {/* Professional Banner Section with Cards */}
      <div className='bg-gradient-to-br from-slate-50 to-gray-50 border-t border-gray-100 py-12 -mx-4 mb-12 relative'>
        {/* Desktop Navigation Buttons */}
        <button className="hidden md:block absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full p-3 shadow-md hover:shadow-lg hover:border-[#2D488F] transition-all duration-200">
          <svg className="w-5 h-5 text-[#2D488F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button className="hidden md:block absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full p-3 shadow-md hover:shadow-lg hover:border-[#2D488F] transition-all duration-200">
          <svg className="w-5 h-5 text-[#2D488F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Mobile Navigation Buttons */}
        <button
          onClick={prevCard}
          className="md:hidden absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full p-3 shadow-md hover:shadow-lg hover:border-[#2D488F] transition-all duration-200"
        >
          <svg className="w-5 h-5 text-[#2D488F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextCard}
          className="md:hidden absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full p-3 shadow-md hover:shadow-lg hover:border-[#2D488F] transition-all duration-200"
        >
          <svg className="w-5 h-5 text-[#2D488F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Desktop: Scrollable Cards Container */}
        <div className="hidden md:block overflow-x-auto scrollbar-hide px-16">
          <div className="flex justify-center gap-8">
            <MentorCard mentor={MENTORS[0]} />
            <MentorCard mentor={MENTORS[1]} />
            <MentorCard mentor={MENTORS[2]} />
          </div>
        </div>

        {/* Mobile: Single Card View */}
        <div className="md:hidden flex justify-center px-16">
          {currentCardIndex === 0 && <MentorCard mentor={MENTORS[0]} />}
          {currentCardIndex === 1 && <MentorCard mentor={MENTORS[1]} />}
          {currentCardIndex === 2 && <MentorCard mentor={MENTORS[2]} />}
        </div>

        {/* Mobile: Dots Indicator */}
        <div className="md:hidden flex justify-center mt-6 space-x-2">
          {MENTORS.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentCardIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${currentCardIndex === index
                  ? 'bg-[#2D488F] scale-110'
                  : 'bg-gray-300 hover:bg-gray-400'
                }`}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-8">
          <button
            onClick={() => navigate("/listing")}
            className="bg-[#2D488F] text-white px-10 py-3 rounded-lg font-bold hover:bg-[#1e3266] transition-all duration-200 shadow-md hover:shadow-lg border border-[#2D488F]"
          >
            View All Mentors
          </button>
        </div>
      </div>

      {/* Join as Coach Section */}
      <div className='bg-[#050A30] flex flex-col-reverse md:flex-row p-6 sm:p-10 mt-20 rounded-3xl items-center gap-8'>
        <div className='w-full md:w-3/5 px-4'>
          <h2 className='text-white text-2xl sm:text-3xl md:text-4xl font-bold text-center md:text-left'>
            Join as <span className='text-[#F5E649]'>Coach</span>
          </h2>
          <p className='text-white mt-4 text-left text-base sm:text-lg leading-relaxed'>
            Are you passionate about guiding the next generation of leaders and innovators?
            At Koach, you&apos;ll have the opportunity to coach talented individuals from startups,
            VCs, and universities, helping them achieve their full potential.
          </p>
          <button
            onClick={() => openModal('mentor-signup')}
            className="text-[#2D488F] mt-6 font-bold bg-[#F5E649] px-8 py-3 hover:bg-[#f3e338] transition-colors text-lg rounded-md shadow-md">
            Join now
          </button>
        </div>

        <div className='relative h-[250px] w-[250px] sm:h-[280px] sm:w-[280px] md:h-[300px] md:w-[300px] flex-shrink-0 flex items-center justify-center'>
          <img src={Triangle} alt="Background shape" className='absolute inset-0 w-full h-full object-contain' />
          <img
            src={Female}
            alt='Coach portrait'
            className='absolute rounded-full h-[140px] w-[140px] sm:h-[160px] sm:w-[160px] md:h-[170px] md:w-[170px] object-cover z-10'
          />
        </div>
      </div>
    </div>
  )
}