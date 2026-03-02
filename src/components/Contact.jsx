import { Phone, Mail, MapPin, Globe, Linkedin, Instagram, MessageSquareText, Twitter, BookOpen, Video, CheckCircle, Send, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Footer from '../components/Footer';
import contactImage from '../assets/contact123.svg';
import Navigation from '../components/Navigation';

function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formSubmitData = new FormData();
    formSubmitData.append('name', `${formData.firstName} ${formData.lastName}`);
    formSubmitData.append('email', formData.email);
    formSubmitData.append('subject', formData.subject);
    formSubmitData.append('message', formData.message);

    // FormSubmit configuration
    formSubmitData.append('_cc', 'yukti@koach.live,raj@koach.live,sumitgreat2705@gmail.com');
    formSubmitData.append('_captcha', 'false');
    formSubmitData.append('_template', 'table');
    formSubmitData.append('_next', window.location.origin + '/contact');

    try {
      await fetch('https://formsubmit.co/shawsumit6286@gmail.com', {
        method: 'POST',
        body: formSubmitData,
      });
      setShowSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      });
      setTimeout(() => {
        setShowSuccess(false);
      }, 4000);
    } catch (error) {
      setShowSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      });
      setTimeout(() => {
        setShowSuccess(false);
      }, 4000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSupportEmailClick = () => {
    window.open('mailto:support@koach.live', '_self');
  };

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
                <div className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-bold uppercase tracking-wider">Contact Us</div>
                <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
                  Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">touch.</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-500 leading-relaxed font-medium">
                  We'd love to hear from you. Here's how you can reach us.
                </p>
              </div>
              <div className="order-1 lg:order-2 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-indigo-100 rounded-full blur-3xl opacity-30"></div>
                  <img src={contactImage} alt="Contact Us" className="relative z-10 w-full max-w-md object-contain hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Cards */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Email Card */}
            <div
              onClick={handleSupportEmailClick}
              className="bg-white rounded-[2.5rem] p-8 flex flex-col items-center text-center border border-slate-100 shadow-xl shadow-slate-200/10 cursor-pointer hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Email Us</h3>
              <p className="text-lg text-slate-500 font-medium group-hover:text-blue-600 transition-colors">support@koach.live</p>
            </div>

            {/* Help Center Card */}
            <a href="/faq" className="bg-white rounded-[2.5rem] p-8 flex flex-col items-center text-center border border-slate-100 shadow-xl shadow-slate-200/10 hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Help Center</h3>
              <div className="flex items-center gap-1 text-lg text-slate-500 font-medium group-hover:text-indigo-600 transition-colors">
                <span>Read FAQ</span>
                <ArrowRight className="w-4 h-4 mt-1" />
              </div>
            </a>
          </div>
        </section>

        {/* Message Form */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pb-20">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-14 border border-slate-100 shadow-xl shadow-slate-200/20 relative overflow-hidden">
            <div className="relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Send us a Message</h2>
                <p className="text-slate-500 font-medium text-lg">Ready to start your coaching journey? We're here to help.</p>
              </div>

              <form onSubmit={handleSendMessage} className="space-y-8">
                {/* Hidden Netlify form */}
                <form name="contact" netlify="true" hidden>
                  <input type="text" name="firstName" />
                  <input type="text" name="lastName" />
                  <input type="email" name="email" />
                  <input type="text" name="subject" />
                  <textarea name="message"></textarea>
                  <input type="text" name="recipients" />
                </form>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Jane"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="jane@example.com"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="How can we help?"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us more details..."
                    rows="5"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                    required
                    disabled={isLoading}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all ${isLoading ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:-translate-y-1'}`}
                >
                  {isLoading ? 'Sending Message...' : 'Send Message'}
                </button>
              </form>

              {showSuccess && (
                <div className="mt-8 bg-green-50 border border-green-200 rounded-2xl p-6 flex flex-col items-center text-center animate-in slide-in-from-bottom-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-green-800 mb-1">Message Sent!</h3>
                  <p className="text-green-700 font-medium text-sm">We'll get back to you shortly.</p>
                </div>
              )}
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </div>
  );
}

export default Contact;