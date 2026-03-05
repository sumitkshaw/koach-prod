import logoWhite from "../assets/logowhite.png"
import { FaLinkedinIn, FaInstagram, FaXTwitter } from "react-icons/fa6";
export default function Footer() {
  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: <FaLinkedinIn size={30} />,
      href: 'https://www.linkedin.com/company/koachoff/',
    },
    {
      name: 'Instagram',
      icon: <FaInstagram size={30} />,
      href: 'https://www.instagram.com/koachoff/',
    },
    {
      name: 'Twitter',
      icon: <FaXTwitter size={30} />,
      href: 'https://x.com/KoachOff',
    },
    // 
  ];
  return (
    <div className='relative z-10 isolate w-full bg-[#030917] py-8 mt-12'>
      <div className='max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-0 mb-8'>
        <img src={logoWhite} className='mb-4 w-auto h-8 sm:h-10' />
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0'>
          <div className='text-[#F5E649] text-left mt-2 text-lg sm:text-xl md:text-[26px] mb-2 font-bold'>Where <span className='text-white'>Clarity</span> Meets <span className='text-white'>Action</span></div>
          <div className='flex gap-4 sm:gap-5'>
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-blue-400 text-white transition-colors duration-200"
                aria-label={`Follow us on ${link.name}`}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
        <hr className='border-[#F5E649] mt-4 sm:mt-6 border '></hr>
        <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-x-40 text-white text-left mt-8 lg:mt-14'>
          <div>
            <span className='text-sm sm:text-base md:text-[20px] font-bold'>PLATFORM</span>
            <ul>
              <li className="my-2 sm:my-3 hover:underline cursor-pointer text-xs sm:text-sm md:text-base"><a href="/listing">Browse mentors</a></li>
              <li className="my-2 sm:my-3 hover:underline cursor-pointer text-xs sm:text-sm md:text-base"><a href="/signup">Become a Mentor</a></li>
            </ul>
          </div>
          <div>
            <span className='text-sm sm:text-base md:text-[20px] font-bold'>RESOURCES</span>
            <ul>
              <li className="my-2 sm:my-3 hover:underline cursor-pointer text-xs sm:text-sm md:text-base"><a href="#">Newsletter</a></li>
              <li className="my-2 sm:my-3 hover:underline cursor-pointer text-xs sm:text-sm md:text-base"><a href="#">Blogs</a></li>
            </ul>
          </div>
          <div>
            <span className='text-sm sm:text-base md:text-[20px] font-bold'> COMPANY</span>
            <ul>
              <li className="my-2 sm:my-3 hover:underline cursor-pointer text-xs sm:text-sm md:text-base"><a href="/about">About</a></li>
              <li className="my-2 sm:my-3 hover:underline cursor-pointer text-xs sm:text-sm md:text-base"><a href="/privacy">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <span className='text-sm sm:text-base md:text-[20px] font-bold'>SUPPORT</span>
            <ul>
              <li className="my-2 sm:my-3 hover:underline cursor-pointer text-xs sm:text-sm md:text-base"><a href="/faq">FAQ</a></li>
              <li className="my-2 sm:my-3 hover:underline cursor-pointer text-xs sm:text-sm md:text-base"><a href="/contact">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}