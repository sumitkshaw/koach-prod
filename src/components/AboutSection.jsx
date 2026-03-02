import { useEffect, useRef } from "react";
import Mentee from "../assets/Mentee 7.png";
import Shade from "../assets/Shade.png";
import AS1 from "../assets/AS1.png";
import AS2 from "../assets/AS2.png";
import AS3 from "../assets/AS3.png";
import AS4 from "../assets/AS4.png";
import Calender from "../assets/Calender.png";
import Message from "../assets/Message.png";

const AnimatedImage = ({ src, className, delay = 0 }) => {
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "opacity-100",
            "translate-x-0",
            "blur-none"
          );
          entry.target.classList.remove(
            "opacity-0",
            "-translate-x-8",
            "blur-sm"
          );
        }
      });
    });

    const { current } = domRef;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  return (
    <img
      ref={domRef}
      src={src}
      className={`${className} transition-all duration-1000 ease-in-out opacity-0 -translate-x-8 blur-sm transform`}
      style={{ transitionDelay: `${delay}ms` }}
      alt=""
    />
  );
};

export default function AboutSection() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-12 lg:py-16 xl:py-20">
      {/* Section 1 */}
      <div className="flex flex-col lg:flex-row items-start gap-8 sm:gap-12 lg:gap-16 xl:gap-20 mb-16 sm:mb-20 lg:mb-2 xl:mb-4">
        <div className="lg:w-1/2 space-y-4 sm:space-y-6 lg:pr-8 xl:pr-12">
          <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight">
            Global Reach with Multilingual Support
          </h2>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 leading-relaxed">
            Koach is a global platform that supports cross-border growth. We
            offer a wide range of linguistic options to ensure that language
            does not stand in the way of your success.
          </p>
        </div>
        <div className="relative lg:w-1/2 w-full mt-4 lg:mt-0 min-h-[300px] sm:min-h-[400px] lg:min-h-[450px] xl:min-h-[500px]">
          <img
            src={Shade}
            className="object-cover w-full h-[250px] sm:h-[300px] lg:h-[350px] xl:h-[400px] rounded-xl"
            alt="Background shade"
          />
          <img
            src={Mentee}
            alt="dashboard"
            className="absolute inset-0 w-3/4 sm:w-4/5 lg:w-3/4 xl:w-4/5 h-auto mx-auto mt-6 sm:mt-8 lg:mt-10 xl:mt-12"
          />
          <AnimatedImage
            src={AS1}
            className="absolute w-20 sm:w-28 md:w-36 lg:w-48 xl:w-60 top-12 sm:top-16 lg:top-20 xl:top-24 left-1/2 -translate-x-1/2"
            delay={300}
          />
          <AnimatedImage
            src={AS2}
            className="absolute w-28 sm:w-36 md:w-44 lg:w-48 xl:w-52 -top-4 sm:-top-6 lg:-top-8 xl:-top-10 left-4 sm:left-6 lg:left-8 xl:left-12"
            delay={600}
          />
        </div>
      </div>

      {/* Section 2 */}
      <div className="flex flex-col-reverse lg:flex-row items-start gap-8 sm:gap-12 lg:gap-16 xl:gap-20 mb-16 sm:mb-20 lg:mb-2 xl:mb-4">
        <div className="relative lg:w-1/2 w-full mt-4 lg:mt-0 min-h-[300px] sm:min-h-[400px] lg:min-h-[450px] xl:min-h-[500px]">
          <img
            src={Shade}
            className="object-cover w-full h-[250px] sm:h-[300px] lg:h-[350px] xl:h-[400px] rounded-xl"
            alt="Background shade"
          />
          <img
            src={Mentee}
            alt="dashboard"
            className="absolute inset-0 w-3/4 sm:w-4/5 lg:w-3/4 xl:w-4/5 h-auto mx-auto mt-6 sm:mt-8 lg:mt-10 xl:mt-12"
          />
          <AnimatedImage
            src={Calender}
            className="absolute w-20 sm:w-28 lg:w-32 xl:w-40 top-0 sm:top-1 lg:top-2 xl:top-2 -left-4 sm:-left-6 lg:-left-8 xl:-left-10"
            delay={300}
          />
          <AnimatedImage
            src={Message}
            className="absolute w-32 sm:w-44 lg:w-52 xl:w-60 top-10 sm:top-14 lg:top-16 xl:top-20 -right-1 sm:right-0 lg:right-2 xl:right-4"
            delay={600}
          />
          <AnimatedImage
            src={AS3}
            className="absolute w-full max-w-[280px] sm:max-w-[350px] lg:max-w-[420px] xl:max-w-[500px] top-44 sm:top-52 lg:top-60 xl:top-72 left-0"
            delay={900}
          />
        </div>
        <div className="lg:w-1/2 space-y-4 sm:space-y-6 lg:pl-8 xl:pl-12">
          <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight">
            Expert Coaches & Mentors
          </h2>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 leading-relaxed">
            Koach has a unique principle that all the professionals working on
            its site are highly qualified professionals. Each of our coaches and
            mentors is a practicing coach with many years of experience in this
            particular industry.
          </p>
        </div>
      </div>

      {/* Section 3 */}
      <div className="flex flex-col lg:flex-row items-start gap-8 sm:gap-12 lg:gap-16 xl:gap-20">
        <div className="lg:w-1/2 space-y-4 sm:space-y-6 lg:pr-8 xl:pr-12">
          <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight">
            Rigorous Selection Process
          </h2>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 leading-relaxed">
            If you think being a mentor or a coach at Koach is for anyone, you
            are completely wrong. Those who are part of the Koach platform
            should be trusted and such a particular area requires precision.
          </p>
        </div>
        <div className="relative lg:w-1/2 w-full mt-4 lg:mt-0 flex justify-center min-h-[300px] sm:min-h-[400px] lg:min-h-[450px] xl:min-h-[500px]">
          <img
            src={Shade}
            className="object-cover w-full h-[250px] sm:h-[300px] lg:h-[350px] xl:h-[400px] rounded-xl"
            alt="Background shade"
          />
          <img
            src={Mentee}
            alt="dashboard"
            className="absolute inset-0 w-3/4 sm:w-4/5 lg:w-3/4 xl:w-4/5 h-auto mx-auto mt-6 sm:mt-8 lg:mt-10 xl:mt-12"
          />
          <AnimatedImage
            src={AS4}
            className="absolute w-[180px] sm:w-[220px] md:w-[260px] lg:w-[320px] xl:w-[420px] top-20 sm:top-28 lg:top-32 xl:top-40"
            delay={300}
          />
        </div>
      </div>
    </div>
  );
}