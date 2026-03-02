import { Linkedin, Target, Users, TrendingUp, CheckCircle, Heart, ArrowRight, Eye } from 'lucide-react';
import raj from '../assets/dashhboard.png';
import yukti from '../assets/compp.png';
import Footer from '../components/Footer';
import contactImage from '../assets/image-332.avif';
import image1 from '../assets/image01.jpg';
import image3 from '../assets/image03.jpg';
import Navigation from '../components/Navigation';

function About() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-dm relative overflow-x-hidden">

      {/* Background Atmosphere */}
      <div className="fixed top-0 left-0 w-full h-[800px] bg-gradient-to-b from-blue-50/50 via-indigo-50/30 to-transparent pointer-events-none z-0"></div>
      <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-100/40 blur-[120px] pointer-events-none z-0"></div>

      <div className="relative z-10">
        <Navigation />

        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 pt-32 pb-16 max-w-7xl mx-auto">
          <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/20 overflow-hidden relative border border-slate-100 p-8 md:p-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 space-y-6">
                <div className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-bold uppercase tracking-wider">About Us</div>
                <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
                  Empowering bold, informed <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">decisions.</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-500 leading-relaxed font-medium">
                  Because your future deserves clarity, not guesswork.
                </p>
              </div>
              <div className="order-1 lg:order-2 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
                  <img src={contactImage} alt="About Us" className="relative z-10 w-full max-w-md object-contain hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-16 border border-slate-100 shadow-xl shadow-slate-200/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
                  <Eye className="w-4 h-4" /> Our Vision
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
                  Clarity. Confidence. <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Career guidance that gets Gen Z.</span>
                </h2>
              </div>

              <div className="space-y-6">
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
                  Koach is a career mentorship platform built for students and early professionals who are figuring it out—and for mentors who remember what that felt like.
                </p>
                <div className="p-6 bg-slate-50 rounded-2xl border-l-4 border-indigo-500">
                  <p className="text-slate-700 font-medium italic">
                    "We believe that one great conversation can change everything. But too often, career advice is generic, outdated, or buried under noise."
                  </p>
                </div>
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
                  So we created Koach: a space where young people connect with real mentors who listen, guide, and help them move forward.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why We Exist & Who We ARE */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Why We Exist */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-xl shadow-slate-200/20">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 text-indigo-600">
                <Target className="w-7 h-7" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Why We Exist?</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">Because talent is everywhere</h3>
                  <p className="text-slate-500 font-medium">— but support isn't.</p>
                </div>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Whether it's choosing a major, landing that first job, or navigating self-doubt, Gen Z faces big decisions in a noisy, uncertain world. Most platforms offer content. We offer people.
                </p>
              </div>
            </div>

            {/* Koach's Approach */}
            <div className="bg-blue-50 rounded-[2.5rem] p-8 md:p-12 border border-blue-100">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 text-blue-600 shadow-sm">
                <Users className="w-7 h-7" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Approach</h2>
              <p className="text-slate-600 leading-loose text-lg font-medium">
                Koach pairs human mentorship with smart structure — so mentees get guidance they can actually act on, and mentors get a meaningful way to give back without burning out.
              </p>
            </div>
          </div>

          {/* Who We Are Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Users, title: "Students", subtitle: "Stuck in 'what now' mode" },
              { icon: TrendingUp, title: "Professionals", subtitle: "In career pivot mode" },
              { icon: Heart, title: "Mentors", subtitle: "Want to empower, not preach" }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-[2rem] p-8 text-center border border-slate-100 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="w-16 h-16 mx-auto bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-900">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{item.title}</h3>
                <p className="text-slate-500 font-medium">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Differentiators */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-16 border border-slate-100 shadow-xl shadow-slate-200/20">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What Makes Us Different?</h2>
              <p className="text-slate-500 font-medium text-lg">No fluff. No gatekeeping. Just better decisions.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                {[
                  { icon: Target, title: "Structured, not stressful", desc: "Every session is goal-based and guided." },
                  { icon: CheckCircle, title: "Curated mentors", desc: "Quality over quantity. Not a free-for-all." },
                  { icon: TrendingUp, title: "Progress tracking", desc: "Mentors set and see growth, not just talk." },
                  { icon: Users, title: "Mentor-first design", desc: "You choose when, how, and who you coach." },
                  { icon: Heart, title: "Built for Inclusion", desc: "Centering first-gen, LGBTQ+, and underrepresented voices.", highlight: true },
                ].map((item, i) => (
                  <div key={i} className={`flex items-start gap-4 p-4 rounded-2xl transition-colors ${item.highlight ? 'bg-pink-50 border border-pink-100' : 'bg-slate-50 hover:bg-slate-100'}`}>
                    <div className={`p-2 rounded-xl flex-shrink-0 ${item.highlight ? 'bg-white text-pink-500' : 'bg-white text-blue-600 shadow-sm'}`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className={`font-bold text-lg ${item.highlight ? 'text-pink-900' : 'text-slate-900'}`}>{item.title}</h3>
                      <p className={`${item.highlight ? 'text-pink-700' : 'text-slate-500'} font-medium`}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 translate-x-4 md:translate-x-0">
                <div className="space-y-4 mt-12">
                  <img src={raj} alt="Dashboard" className="w-full rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="space-y-4">
                  <img src={yukti} alt="Mobile View" className="w-full rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-slate-900 mb-16">Meet the Team</h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {[
              { name: "Rajneesh Sharma", role: "Executive Firefighter", img: image1, link: "https://www.linkedin.com/in/therajneeshsharma/" },
              { name: "Yukti Mannikeri", role: "Roadmap Ruler", img: image3, link: "https://www.linkedin.com/in/yuktibm/" }
            ].map((member, i) => (
              <div key={i} className="group bg-white rounded-[2.5rem] p-4 pr-8 flex items-center gap-6 border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-300">
                <img src={member.img} alt={member.name} className="w-24 h-24 rounded-[2rem] object-cover shadow-md group-hover:scale-110 transition-transform duration-500" />
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                  <p className="text-blue-600 font-bold text-sm mb-2">{member.role}</p>
                  <a href={member.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-slate-400 hover:text-blue-600 transition-colors text-sm font-bold">
                    <Linkedin className="w-4 h-4" /> Connect
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
      <Footer />
    </div>
  );
}

export default About;