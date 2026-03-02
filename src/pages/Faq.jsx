import { useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircle, Users, Calendar, Shield, Star, HelpCircle } from 'lucide-react';
import Footer from '../components/Footer';
import FaqImg from '../assets/FaqImg.png';

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is Koach and how does it work for mentors?",
      answer: "Koach is a platform that connects mentors with individuals seeking guidance in their careers, education, or personal development. As a mentor, you'll be matched with mentees who align with your expertise and interests.",
      category: "getting-started",
      icon: <Users className="w-5 h-5" />
    },
    {
      question: "How do I become a mentor on Koach?",
      answer: "Simply sign up, complete your mentor profile, select your areas of expertise, and set your availability. Our team may review your profile before you're matched with mentees.",
      category: "getting-started",
      icon: <Users className="w-5 h-5" />
    },
    {
      question: "Is there a qualification or experience requirement?",
      answer: "Yes. We look for professionals with at least 10 years of relevant experience, strong communication skills, and a passion for guiding others.",
      category: "getting-started",
      icon: <Shield className="w-5 h-5" />
    },
    {
      question: "How do I schedule sessions with mentees?",
      answer: "You set your availability, and mentees can book time within those windows. You'll get notifications for upcoming sessions and can manage your calendar through the platform.",
      category: "scheduling",
      icon: <Calendar className="w-5 h-5" />
    },
    {
      question: "Can I reschedule or cancel a session?",
      answer: "Yes, mentors can reschedule or cancel with advance notice. We encourage clear communication to respect everyone's time.",
      category: "scheduling",
      icon: <Calendar className="w-5 h-5" />
    },
    {
      question: "How long is each session?",
      answer: "Sessions typically last 60 minutes, but this can vary based on your preferences and mentee needs.",
      category: "scheduling",
      icon: <Calendar className="w-5 h-5" />
    },
    {
      question: "What kind of support should I provide?",
      answer: "Mentors are expected to provide thoughtful guidance, share insights from their own experiences, and help mentees develop clarity and confidence in their goals.",
      category: "mentoring",
      icon: <MessageCircle className="w-5 h-5" />
    },
    {
      question: "Can I decline a mentee request?",
      answer: "Yes, you have full control over which mentees you choose to work with.",
      category: "mentoring",
      icon: <Shield className="w-5 h-5" />
    },
    {
      question: "What topics can I mentor on?",
      answer: "Anything you have credible experience in - marketing, brand building, sales, career navigation.",
      category: "mentoring",
      icon: <MessageCircle className="w-5 h-5" />
    },
    {
      question: "Is mentoring on Koach paid or volunteer-based?",
      answer: "Koach offers both options. You can choose to volunteer your time or set a rate for paid sessions, depending on the platform model and your preference.",
      category: "payment",
      icon: <Star className="w-5 h-5" />
    },
    {
      question: "Are there any incentives or recognition for mentors?",
      answer: "Yes! Active mentors may receive platform recognition, access to exclusive networking events, feedback from mentees, and more.",
      category: "payment",
      icon: <Star className="w-5 h-5" />
    },
    {
      question: "How does Koach ensure safety and professionalism?",
      answer: "All users must adhere to our community guidelines. We vet mentors and monitor sessions to ensure a safe, respectful experience for all.",
      category: "safety",
      icon: <Shield className="w-5 h-5" />
    },
    {
      question: "How is feedback handled?",
      answer: "Mentees can rate and review sessions. Feedback helps maintain quality and can boost your visibility on the platform.",
      category: "feedback",
      icon: <Star className="w-5 h-5" />
    },
    {
      question: "Can I connect with other mentors?",
      answer: "Absolutely! Koach offers community features like mentor forums, group events, and knowledge-sharing circles.",
      category: "community",
      icon: <Users className="w-5 h-5" />
    },
    {
      question: "How many mentees I can have?",
      answer: "You can work with multiple mentees, depending on your availability and energy.",
      category: "mentoring",
      icon: <Users className="w-5 h-5" />
    },
    {
      question: "What are the boundaries I should maintain as a mentor?",
      answer: "Mentors should offer guidance, not therapy, and avoid financial, romantic, or overly personal entanglements. Keep your communication professional and within the Koach platform when possible.",
      category: "safety",
      icon: <Shield className="w-5 h-5" />
    },
    {
      question: "What tools does Koach offer to help me mentor effectively?",
      answer: "Koach provides scheduling, messaging, session notes, and optional goal tracking. You'll also have access to mentor guides, conversation starters, and industry insights.",
      category: "tools",
      icon: <HelpCircle className="w-5 h-5" />
    },
    {
      question: "Can I access past session history or notes?",
      answer: "Yes, you can view past session summaries and notes to maintain continuity with each mentee.",
      category: "tools",
      icon: <HelpCircle className="w-5 h-5" />
    }
  ];

  const categoryColors = {
    'getting-started': 'bg-blue-50 border-blue-200 text-blue-800',
    'scheduling': 'bg-green-50 border-green-200 text-green-800',
    'mentoring': 'bg-purple-50 border-purple-200 text-purple-800',
    'payment': 'bg-yellow-50 border-yellow-200 text-yellow-800',
    'safety': 'bg-red-50 border-red-200 text-red-800',
    'feedback': 'bg-orange-50 border-orange-200 text-orange-800',
    'community': 'bg-indigo-50 border-indigo-200 text-indigo-800',
    'tools': 'bg-gray-50 border-gray-200 text-gray-800'
  };

  const categoryNames = {
    'getting-started': 'Getting Started',
    'scheduling': 'Scheduling',
    'mentoring': 'Mentoring',
    'payment': 'Payment & Incentives',
    'safety': 'Safety & Guidelines',
    'feedback': 'Feedback & Reviews',
    'community': 'Community',
    'tools': 'Tools & Features'
  };

  return (
    <div className="w-full bg-[#ECF0F6]">
      {/* Hero Section */}
      <section className="relative w-full bg-[#efeff3] px-4 md:px-8 lg:px-20 xl:px-40 pt-8 md:pt-16 lg:pt-20 pb-6 md:pb-12 lg:pb-16">
        <div className="max-w-7xl mx-auto">
          {/* White container box */}
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg p-12 md:p-12 lg:p-16">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-16 items-center min-h-[350px] md:min-h-[400px] lg:min-h-[450px]">
              {/* Text content - Always first on mobile */}
              <div className="w-full space-y-3 md:space-y-4 lg:space-y-6 text-center lg:text-left order-1">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-gradient-to-r from-[#2D488F] to-[#122350] p-3 rounded-full">
                    <HelpCircle className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#2D488F] leading-tight">
                    Frequently Asked Questions
                  </h1>
                </div>
                <div className="w-24 h-1.5 bg-gradient-to-r from-[#2D488F] to-[#122350] mb-2 rounded-full transform transition-all duration-500 hover:w-32 mx-auto lg:mx-0"></div>
                <p className="text-sm md:text-base lg:text-lg xl:text-xl text-[#2D488F]/75 leading-relaxed max-w-md lg:max-w-lg mx-auto lg:mx-0">
                  Find answers to common questions about becoming a mentor on Koach. Can't find what you're looking for? 
                  <span className="font-semibold"> Contact our support team!</span>
                </p>
              </div>
              
              {/* Illustration - Always second on mobile */}
              <div className="w-full flex justify-center lg:justify-end order-2">
                <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-md lg:max-w-lg xl:max-w-xl">
                  <img 
                    src={FaqImg} 
                    alt="Contact illustration showing people collaborating"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="px-6 md:px-20 lg:px-40 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="space-y-1">
                {faqs.map((faq, index) => (
                  <div 
                    key={index} 
                    className={`border-2 rounded-xl transition-all duration-300 hover:shadow-md ${
                      openIndex === index 
                        ? 'border-[#2D488F] bg-blue-50' 
                        : 'border-gray-200 bg-white hover:border-blue-200'
                    }`}
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full flex justify-between items-center p-4 md:p-6 text-left focus:outline-none transition-all duration-200"
                    >
                      <div className="flex items-start space-x-4 flex-1">
                        <div className={`p-2 rounded-lg ${categoryColors[faq.category]} flex-shrink-0 mt-1`}>
                          {faq.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${categoryColors[faq.category]}`}>
                              {categoryNames[faq.category]}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-[#122350] leading-6">
                            {faq.question}
                          </h3>
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        {openIndex === index ? (
                          <div className="bg-[#2D488F] p-2 rounded-full">
                            <ChevronUp className="w-5 h-5 text-white" />
                          </div>
                        ) : (
                          <div className="bg-gray-200 p-2 rounded-full hover:bg-[#2D488F] hover:text-white transition-colors duration-200">
                            <ChevronDown className="w-5 h-5 text-gray-600 hover:text-white" />
                          </div>
                        )}
                      </div>
                    </button>
                    
                    {openIndex === index && (
                      <div className="px-4 md:px-6 pb-4 md:pb-6">
                        <div className="ml-12 md:ml-16">
                          <div className="bg-white p-4 md:p-6 rounded-lg border-l-4 border-[#2D488F] shadow-sm">
                            <p className="text-base text-gray-700 leading-7">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-12 bg-gradient-to-r from-[#2D488F] to-[#122350] rounded-2xl p-8 md:p-12 text-white shadow-lg">
            <div className="text-center">
              <div className="bg-white bg-opacity-20 p-4 rounded-full inline-block mb-6">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Still have questions?</h2>
              <p className="text-lg mb-6 opacity-90">
                Our support team is here to help you get started as a mentor on Koach.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="bg-white bg-opacity-20 px-6 py-3 rounded-full">
                  <span className="font-semibold">📧 Email: support@koach.live</span>
                </div>
                <div className="bg-white bg-opacity-20 px-6 py-3 rounded-full">
                  <span className="font-semibold">💬 Live Chat Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default FAQ;