import React from 'react';
import Hero from '../components/Hero';
import MetricSection from '../components/MetricSection';
import KoachJourney from '../components/koachJourney';
import AboutSection from '../components/AboutSection';
import Testimonials from '../components/Testimonials';
import JoinSection from '../components/JoinSection';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';

const Home = () => {
    return (
        <div className="min-h-screen bg-[#F8FAFC] font-dm relative overflow-x-hidden">
            {/* Background Atmosphere (Premium Touch matching Dashboard) */}
            <div className="fixed top-0 left-0 w-full h-[800px] bg-gradient-to-b from-blue-50/50 via-indigo-50/30 to-transparent pointer-events-none z-0"></div>
            <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-100/40 blur-[120px] pointer-events-none z-0"></div>

            <div className="relative z-10">
                <Navigation />
                <Hero />
                <MetricSection />
                <KoachJourney />
                <AboutSection />
                <Testimonials />
                <JoinSection />
                <Footer />
            </div>
        </div>
    );
};

export default Home;
