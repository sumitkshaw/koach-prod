import { useState } from 'react';
import CircleCard from './CircleCard';
import { IoMdSearch } from "react-icons/io";
import c1 from '../../assets/c1.png';
import c2 from '../../assets/c2.png';
import c3 from '../../assets/c3.png';
import c4 from '../../assets/c4.png';
import c5 from '../../assets/c5.png';
import c6 from '../../assets/c6.png';



const categories = [
  'All', 'Finance', 'Education', 'Innovation', 'Startup', 'University Admission',
  'Design & Creative', 'Tech', 'Creators', 'Bitcoin & Web 3', 'Marketing'
];

const trendingFilters = ['Most Active', 'Recently Added', 'Hot Trending'];

const sampleCards = [
  {
    id: 1,
    title: 'Finance & Banking Professionals',
    category: 'Finance',
    desc:"Share knowledge in Fintech, Finance, Banking and associated industries.",
    members: '',
    likes: '2,000',
    image: c1,
    trending: 'Most Active'
  },
  {
    id: 2,
    title: 'Teacher Training & Education',
    category: 'Education',
    desc:"For those dedicated to raising standards of learning and development.",
    members: '',
    likes: '2,000',
    image: c2,
    trending: 'Most Active'
  },
  {
    id: 3,
    title: 'Sound Design',
    category: 'Innovation',
    desc:"About sound design tips, theories, technologies and solutions.",
    members: '',
    likes: '2,000',
    image: c3,
    trending: 'Recently Added'
  },
  {
    id: 4,
    title: 'Technology Startups',
    category: 'Startup',
    desc:"Dedicated to exchanging knowledge about startups and technology.",
    members: '',
    likes: '2,000',
    image: c4,
    trending: 'Recently Added'
  },
  {
    id: 5,
    title: 'UX Design, Product Design',
    category: 'Design & Creative',
    desc:"Looking to jump into ux design or product design? Join us in our journey.",
    members: '',
    likes: '2,000',
    image: c5,
    trending: 'Hot Trending'
  },
  {
    id: 6,
    title: 'Digital Marketing',
    category: 'Marketing',
    desc:"We everything from social media, SEO, content marketing, paid advertising and email marketing.",
    members: '',
    likes: '2,000',
    image: c6,
    trending: 'Hot Trending'
  }
];

const CircleDashboard = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTrending, setActiveTrending] = useState('');

  const filteredCards = sampleCards.filter(card => {
    const matchCategory = activeCategory === 'All' || card.category === activeCategory;
    const matchSearch = card.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchTrending = !activeTrending || card.trending === activeTrending;
    return  matchCategory && matchSearch && matchTrending;
  });

  return (
    <div className="max-w-screen  py-6">
      {/* Search Bar */}
      <div className="flex justify-center mx-10 mb-4">
        <div className='p-2 w-full flex  items-center bg-white max-w-md rounded-full border border-gray-300'>
            <IoMdSearch className='text-3xl text-gray-500 mx-2' />
            <input
            type="text"
            placeholder="Search"
            className="w-full text-md text-gray-500 focus:outline-none focus:ring-0 rounded-full "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </div>

      {/* Trending Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {trendingFilters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveTrending(filter === activeTrending ? '' : filter)}
            className={`border px-3 py-1 rounded-full text-md text-[#001F54] font-bold shadow-sm ${
              activeTrending === filter ? 'bg-blue-900 text-white' : 'bg-white hover:bg-blue-100'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1 text-[#001F54]  rounded-full text-sm font-bold border shadow-sm ${
              activeCategory === cat ? 'bg-blue-900 text-white' : 'bg-white hover:bg-blue-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center lg:px-20 lg:gap-20 px-10 gap-10  ">
        {filteredCards.map(card => (
          <CircleCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default CircleDashboard;