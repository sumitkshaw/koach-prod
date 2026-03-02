import Footer from '../components/Footer';
import PrivacyImg from '../assets/PrivacyImg.png';

function Privacy() {
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
                <h1 className="text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#2D488F] leading-tight">
                  Privacy Policy
                </h1>
                <p className="text-sm md:text-base lg:text-lg xl:text-xl text-[#2D488F]/75 leading-relaxed max-w-md lg:max-w-lg mx-auto lg:mx-0">
                  Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
                </p>
              </div>
              
              {/* Illustration - Always second on mobile */}
              <div className="w-full flex justify-center lg:justify-end order-2">
                <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-md lg:max-w-lg xl:max-w-xl">
                  <img 
                    src={PrivacyImg} 
                    alt="Contact illustration showing people collaborating"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="px-6 md:px-20 lg:px-40 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-8 md:p-10 space-y-0">
              
              {/* Section 1 */}
              <div className="py-8 border-b border-gray-200 group hover:bg-blue-50/50 transition-all duration-300 rounded-lg px-6 -mx-2">
                <h2 className="text-2xl md:text-3xl font-bold text-[#2D488F] mb-6 flex items-center">
                  <span className="bg-gradient-to-br from-[#2D488F] to-[#122350] text-white rounded-xl w-10 h-10 flex items-center justify-center text-lg font-bold mr-4 transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    1
                  </span>
                  Who This Applies To
                </h2>
                <div className="text-base text-gray-700 space-y-4 leading-relaxed">
                  <p className="font-semibold text-[#2D488F] text-lg">This policy applies to:</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {['Users who receive coaching via Koach.live', 'Coaches and partners', 'Website visitors', 'Contributors (e.g. feedback providers)', 'Job applicants'].map((item, index) => (
                      <div key={index} className="flex items-start space-x-3 group/item p-3 rounded-lg hover:bg-white transition-all duration-200">
                        <div className="w-2 h-2 bg-[#2D488F] rounded-full mt-2 transform group-hover/item:scale-150 transition-transform duration-300 flex-shrink-0"></div>
                        <span className="text-gray-700 text-base">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div className="py-8 border-b border-gray-200 group hover:bg-blue-50/50 transition-all duration-300 rounded-lg px-6 -mx-2">
                <h2 className="text-2xl md:text-3xl font-bold text-[#2D488F] mb-6 flex items-center">
                  <span className="bg-gradient-to-br from-[#2D488F] to-[#122350] text-white rounded-xl w-10 h-10 flex items-center justify-center text-lg font-bold mr-4 transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    2
                  </span>
                  What We Collect
                </h2>
                <div className="text-base text-gray-700 space-y-6 leading-relaxed">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 transform transition-all duration-300 hover:scale-[1.02]">
                    <p className="font-semibold text-[#2D488F] text-lg mb-4">Info you give us:</p>
                    <div className="space-y-3">
                      {['Name, email, phone, job title', 'Responses to assessments, feedback forms, messages', 'Billing and payment details (if applicable)'].map((item, index) => (
                        <div key={index} className="flex items-start space-x-3 group/item">
                          <div className="w-2 h-2 bg-[#2D488F] rounded-full mt-2 transform group-hover/item:scale-150 transition-transform duration-300 flex-shrink-0"></div>
                          <span className="text-gray-700 text-base">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-xl border border-gray-200 transform transition-all duration-300 hover:scale-[1.02]">
                    <p className="font-semibold text-[#122350] text-lg mb-4">Info we collect automatically:</p>
                    <div className="space-y-3">
                      {['Device/browser type, IP address', 'How you use the platform'].map((item, index) => (
                        <div key={index} className="flex items-start space-x-3 group/item">
                          <div className="w-2 h-2 bg-[#122350] rounded-full mt-2 transform group-hover/item:scale-150 transition-transform duration-300 flex-shrink-0"></div>
                          <span className="text-gray-700 text-base">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div className="py-8 border-b border-gray-200 group hover:bg-blue-50/50 transition-all duration-300 rounded-lg px-6 -mx-2">
                <h2 className="text-2xl md:text-3xl font-bold text-[#2D488F] mb-6 flex items-center">
                  <span className="bg-gradient-to-br from-[#2D488F] to-[#122350] text-white rounded-xl w-10 h-10 flex items-center justify-center text-lg font-bold mr-4 transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    3
                  </span>
                  How We Use Your Info
                </h2>
                <div className="text-base text-gray-700 space-y-4 leading-relaxed">
                  <p className="font-semibold text-[#2D488F] text-lg">We use your information to:</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      'Provide and personalize your coaching experience',
                      'Communicate with you (service updates, support, optional marketing)',
                      'Improve the platform through data insights',
                      'Ensure security and prevent fraud'
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg transform transition-all duration-300 hover:translate-y-1 hover:shadow-md">
                        <div className="w-2 h-2 bg-[#2D488F] rounded-full mt-2 transform group-hover:scale-150 transition-transform duration-300 flex-shrink-0"></div>
                        <span className="text-gray-700 text-base">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section 4 */}
              <div className="py-8 border-b border-gray-200 group hover:bg-blue-50/50 transition-all duration-300 rounded-lg px-6 -mx-2">
                <h2 className="text-2xl md:text-3xl font-bold text-[#2D488F] mb-6 flex items-center">
                  <span className="bg-gradient-to-br from-[#2D488F] to-[#122350] text-white rounded-xl w-10 h-10 flex items-center justify-center text-lg font-bold mr-4 transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    4
                  </span>
                  How We Share Your Info
                </h2>
                <div className="text-base text-gray-700 space-y-6 leading-relaxed">
                  <div className="bg-red-50 border border-red-200 p-6 rounded-xl transform transition-all duration-300 hover:scale-[1.02]">
                    <p className="font-bold text-red-700 text-lg">We do NOT sell your personal data.</p>
                  </div>
                  <p className="font-semibold text-[#2D488F] text-lg">We may share data with:</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      'Your coach or employer (if you\'re using Koach through work)',
                      'Service providers (e.g. payment, analytics, support tools)',
                      'Legal authorities, if required by law',
                      'With your consent, in other cases'
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg transform transition-all duration-300 hover:translate-y-1">
                        <div className="w-2 h-2 bg-[#2D488F] rounded-full mt-2 transform group-hover:scale-150 transition-transform duration-300 flex-shrink-0"></div>
                        <span className="text-gray-700 text-base">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section 5 */}
              <div className="py-8 border-b border-gray-200 group hover:bg-blue-50/50 transition-all duration-300 rounded-lg px-6 -mx-2">
                <h2 className="text-2xl md:text-3xl font-bold text-[#2D488F] mb-6 flex items-center">
                  <span className="bg-gradient-to-br from-[#2D488F] to-[#122350] text-white rounded-xl w-10 h-10 flex items-center justify-center text-lg font-bold mr-4 transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    5
                  </span>
                  Your Rights
                </h2>
                <div className="text-base text-gray-700 space-y-6 leading-relaxed">
                  <p className="font-semibold text-[#2D488F] text-lg">Depending on your location (e.g., EU or California), you have rights to:</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      'Access, correct, or delete your data',
                      'Ask us to stop processing your data',
                      'Withdraw consent anytime',
                      'Opt out of marketing emails'
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-200 transform transition-all duration-300 hover:translate-y-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 transform group-hover:scale-150 transition-transform duration-300 flex-shrink-0"></div>
                        <span className="text-gray-700 text-base">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-blue-100 border border-blue-300 p-6 rounded-xl transform transition-all duration-300 hover:scale-[1.02]">
                    <p className="font-semibold text-[#2D488F] text-base">To make a request: [insert contact email or form]</p>
                  </div>
                </div>
              </div>

              {/* Section 6 */}
              <div className="py-8 border-b border-gray-200 group hover:bg-blue-50/50 transition-all duration-300 rounded-lg px-6 -mx-2">
                <h2 className="text-2xl md:text-3xl font-bold text-[#2D488F] mb-6 flex items-center">
                  <span className="bg-gradient-to-br from-[#2D488F] to-[#122350] text-white rounded-xl w-10 h-10 flex items-center justify-center text-lg font-bold mr-4 transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    6
                  </span>
                  Cookies & Tracking
                </h2>
                <div className="text-base text-gray-700 space-y-6 leading-relaxed">
                  <p className="font-semibold text-[#2D488F] text-lg">We use cookies and similar tools to:</p>
                  <div className="grid md:grid-cols-3 gap-4">
                    {['Analyze traffic', 'Remember your preferences', 'Improve your experience'].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200 transform transition-all duration-300 hover:translate-y-1">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full transform group-hover:scale-150 transition-transform duration-300 flex-shrink-0"></div>
                        <span className="text-gray-700 text-base">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gray-100 border border-gray-300 p-6 rounded-xl transform transition-all duration-300 hover:scale-[1.02]">
                    <p className="text-gray-700 text-base">You can manage cookie settings via your browser or [insert Cookie Settings Link]</p>
                  </div>
                </div>
              </div>

              {/* Section 7 */}
              <div className="py-8 border-b border-gray-200 group hover:bg-blue-50/50 transition-all duration-300 rounded-lg px-6 -mx-2">
                <h2 className="text-2xl md:text-3xl font-bold text-[#2D488F] mb-6 flex items-center">
                  <span className="bg-gradient-to-br from-[#2D488F] to-[#122350] text-white rounded-xl w-10 h-10 flex items-center justify-center text-lg font-bold mr-4 transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    7
                  </span>
                  Data Security
                </h2>
                <div className="text-base text-gray-700 space-y-6 leading-relaxed">
                  <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl transform transition-all duration-300 hover:scale-[1.02]">
                    <p className="text-base text-gray-700">We use encryption and best practices to protect your data. While no system is 100% secure, we work hard to keep your information safe.</p>
                  </div>
                  <p className="font-semibold text-[#2D488F] text-lg">We comply with:</p>
                  <div className="grid md:grid-cols-3 gap-4">
                    {['GDPR (for EU users)', 'CCPA (for California users)', 'Other applicable international laws'].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg border border-purple-200 transform transition-all duration-300 hover:translate-y-1">
                        <div className="w-2 h-2 bg-purple-500 rounded-full transform group-hover:scale-150 transition-transform duration-300 flex-shrink-0"></div>
                        <span className="text-gray-700 text-base">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section 8 */}
              <div className="py-8 border-b border-gray-200 group hover:bg-blue-50/50 transition-all duration-300 rounded-lg px-6 -mx-2">
                <h2 className="text-2xl md:text-3xl font-bold text-[#2D488F] mb-6 flex items-center">
                  <span className="bg-gradient-to-br from-[#2D488F] to-[#122350] text-white rounded-xl w-10 h-10 flex items-center justify-center text-lg font-bold mr-4 transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    8
                  </span>
                  Data Transfers
                </h2>
                <div className="text-base text-gray-700 space-y-4 leading-relaxed">
                  <div className="bg-orange-50 border border-orange-200 p-6 rounded-xl transform transition-all duration-300 hover:scale-[1.02]">
                    <p className="text-base text-gray-700">If you're outside the U.S., your data may be transferred to and processed in the U.S. We use lawful safeguards like Standard Contractual Clauses (SCCs) for EU/UK/Swiss transfers.</p>
                  </div>
                </div>
              </div>

              {/* Section 9 */}
              <div className="py-8 border-b border-gray-200 group hover:bg-blue-50/50 transition-all duration-300 rounded-lg px-6 -mx-2">
                <h2 className="text-2xl md:text-3xl font-bold text-[#2D488F] mb-6 flex items-center">
                  <span className="bg-gradient-to-br from-[#2D488F] to-[#122350] text-white rounded-xl w-10 h-10 flex items-center justify-center text-lg font-bold mr-4 transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    9
                  </span>
                  Updates to This Policy
                </h2>
                <div className="text-base text-gray-700 space-y-4 leading-relaxed">
                  <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-xl transform transition-all duration-300 hover:scale-[1.02]">
                    <p className="text-base text-gray-700">We may update this policy. If changes are significant, we'll notify you via email or the site. Check this page regularly for updates.</p>
                  </div>
                </div>
              </div>

              {/* Contact Section */}
              <div className="py-8 group hover:bg-blue-50/50 transition-all duration-300 rounded-lg px-6 -mx-2">
                <h2 className="text-2xl md:text-3xl font-bold text-[#2D488F] mb-6 flex items-center">
                  <span className="bg-gradient-to-br from-[#2D488F] to-[#122350] text-white rounded-xl w-10 h-10 flex items-center justify-center text-lg font-bold mr-4 transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    10
                  </span>
                  Contact Us
                </h2>
                <div className="text-base text-gray-700 space-y-4 leading-relaxed">
                  <div className="bg-gradient-to-r from-[#2D488F] to-[#122350] p-8 rounded-2xl text-white transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
                    <p className="font-medium mb-4">Have questions? Want to exercise your rights?</p>
                    <div className="flex items-center space-x-4 transform transition-all duration-300 hover:translate-x-2">
                      <span className="text-3xl">✉️</span>
                      <div>
                        <p className="font-bold">support@koach.live</p>
                        <p className="text-blue-100 mt-1 text-base">We're here to help</p>
                      </div>
                    </div>
                  </div>
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

export default Privacy;