import React, { useState } from 'react';
import { Search, Plus, Phone, Video, MoreHorizontal, Send, Paperclip, Smile, MessageCircle } from 'lucide-react';
import Navigation from '../Navigation';
import Sidenav from './Sidenav';
import Footer from '../Footer';

const Messages = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(0);
  const [message, setMessage] = useState('');

  const contacts = [
    { 
      name: "Andrea Watson", 
      role: "Software Engineer",
      company: "5 Years with Product Companies",
      time: "9:41 AM", 
      unread: 0,
      avatar: "",
      bgColor: "bg-blue-500"
    },
    { 
      name: "Andrea Watson", 
      role: "Software Engineer",
      company: "5 Years with Product Companies",
      time: "9:41 AM", 
      unread: 0,
      avatar: "",
      bgColor: "bg-green-500"
    },
    { 
      name: "Andrea Watson", 
      role: "Software Engineer",
      company: "5 Years with Product Companies",
      time: "Yesterday", 
      unread: 0,
      avatar: "",
      bgColor: "bg-purple-500"
    },
    { 
      name: "Andrea Watson", 
      role: "Software Engineer",
      company: "5 Years with Product Companies",
      time: "Yesterday", 
      unread: 0,
      avatar: "",
      bgColor: "bg-orange-500"
    },
    { 
      name: "Andrea Watson", 
      role: "Software Engineer",
      company: "5 Years with Product Companies",
      time: "2 days ago", 
      unread: 0,
      avatar: "",
      bgColor: "bg-pink-500"
    },
    { 
      name: "Andrea Watson", 
      role: "Software Engineer",
      company: "5 Years with Product Companies",
      time: "3 days ago", 
      unread: 0,
      avatar: "",
      bgColor: "bg-indigo-500"
    }
  ];

  const currentChat = [
    {
      sender: "them",
      message: "Hey Andrea, I have a question, could you provide me the next information",
      time: "9:41 AM"
    },
    {
      sender: "them",
      message: "Yes of course here are some tips I found online, the if you like my offer I will contact you soon",
      time: "9:42 AM"
    },
    {
      sender: "me",
      message: "Calendar invite for Wednesday Rescheduled",
      time: "Wed, May 5th, 2024 2:00 pm",
      isSystemMessage: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation/>
      <Sidenav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} currentRoute="/dashboard/messages" />

      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-20 left-4 z-30 lg:hidden bg-white p-2 rounded-xl shadow-lg border"
      >
      </button>

      {/* Main Content */}
      <div className={`pt-16 transition-all duration-300`}>
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            
            {/* Header with Messages title */}
            <div className="pt-9 mb-8">
              <div className="bg-blue-600 text-white px-8 py-6 rounded-2xl flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-wide">Messages</h1>
                <MessageCircle className="w-8 h-8" />
              </div>
            </div>

            {/* Messages Container */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border-0 overflow-hidden" style={{height: 'calc(100vh - 180px)'}}>
              <div className="flex h-full">
                
                {/* Left Sidebar - Contacts */}
                <div className={`${selectedContact !== null ? 'hidden md:flex' : 'flex'} w-full md:w-80 lg:w-96 flex-col bg-gray-50`}>
                  {/* Contacts Header */}
                  <div className="p-3 sm:p-4 bg-white border-b border-gray-200">
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <h2 className="text-base sm:text-lg font-semibold text-gray-900">My Contacts</h2>
                      <span className="text-xs sm:text-sm text-blue-600 font-medium cursor-pointer">Search Contacts</span>
                    </div>
                  </div>

                  {/* Contacts List */}
                  <div className="flex-1 overflow-y-auto">
                    {contacts.map((contact, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedContact(index)}
                        className={`p-3 sm:p-4 cursor-pointer transition-all duration-200 border-b border-gray-100 hover:bg-white ${
                          selectedContact === index ? 'bg-white shadow-sm' : 'bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-400 rounded-full flex-shrink-0"></div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-1 sm:mb-2">
                              <h3 className="font-semibold text-gray-900 text-sm">{contact.name}</h3>
                            </div>
                            <div className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-md text-xs font-medium mb-1 sm:mb-2 inline-block">
                              {contact.role}
                            </div>
                            <p className="text-xs text-gray-600 mb-1">{contact.company}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side - Chat Area (Desktop) */}
                <div className="hidden md:flex flex-1 flex-col border-l border-gray-200">
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 bg-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-400 rounded-full flex-shrink-0"></div>
                        <div>
                          <h2 className="font-semibold text-gray-900">{contacts[selectedContact].name}</h2>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-all">
                          <Phone className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-all">
                          <Video className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-all">
                          <MoreHorizontal className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="flex-1 p-4 overflow-y-auto space-y-4" style={{backgroundColor: '#f8fafc'}}>
                    {currentChat.map((chat, index) => (
                      <div key={index}>
                        {chat.isSystemMessage ? (
                          <div className="flex justify-center">
                            <div className="bg-blue-100 text-blue-800 px-4 py-3 rounded-2xl text-sm max-w-md text-center shadow-sm">
                              <div className="font-medium">{chat.message}</div>
                              <div className="text-xs mt-1 text-blue-600">{chat.time}</div>
                              <div className="flex justify-center space-x-2 mt-3">
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors">
                                  Accept
                                </button>
                                <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-xs font-medium hover:bg-gray-400 transition-colors">
                                  Decline
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className={`flex ${chat.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${chat.sender === 'me' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                              <div className="w-8 h-8 bg-gray-400 rounded-full flex-shrink-0"></div>
                              <div
                                className={`px-4 py-3 rounded-2xl shadow-sm ${
                                  chat.sender === 'me'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-800 border border-gray-100'
                                }`}
                              >
                                <p className="text-sm leading-relaxed">{chat.message}</p>
                                <div className={`text-xs mt-2 ${chat.sender === 'me' ? 'text-blue-100' : 'text-gray-500'}`}>
                                  {chat.time}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <div className="flex items-center space-x-3">
                      <button className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-all">
                        <Paperclip className="w-5 h-5 text-gray-600" />
                      </button>
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Type Something..."
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-12"
                        />
                        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-all">
                          <Smile className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                      <button className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-all shadow-md">
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Mobile Chat View */}
                <div className={`md:hidden ${selectedContact !== null ? 'flex' : 'hidden'} flex-1 flex-col`}>
                  {/* Mobile Chat Header */}
                  <div className="p-3 sm:p-4 border-b border-gray-200 bg-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={() => setSelectedContact(null)}
                          className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-all md:hidden"
                        >
                          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-400 rounded-full flex-shrink-0"></div>
                        <div>
                          <h2 className="font-semibold text-gray-900 text-sm sm:text-base">{contacts[selectedContact].name}</h2>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-all">
                          <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                        </button>
                        <button className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-all">
                          <Video className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Chat Messages */}
                  <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3 sm:space-y-4" style={{backgroundColor: '#f8fafc'}}>
                    {currentChat.map((chat, index) => (
                      <div key={index}>
                        {chat.isSystemMessage ? (
                          <div className="flex justify-center">
                            <div className="bg-blue-100 text-blue-800 px-3 py-2 rounded-2xl text-sm max-w-sm text-center shadow-sm">
                              <div className="font-medium">{chat.message}</div>
                              <div className="text-xs mt-1 text-blue-600">{chat.time}</div>
                              <div className="flex justify-center space-x-2 mt-2">
                                <button className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-medium">
                                  Accept
                                </button>
                                <button className="bg-gray-300 text-gray-700 px-3 py-1 rounded-lg text-xs font-medium">
                                  Decline
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className={`flex ${chat.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`flex items-start space-x-2 max-w-xs ${chat.sender === 'me' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-400 rounded-full flex-shrink-0"></div>
                              <div
                                className={`px-3 py-2 rounded-2xl shadow-sm ${
                                  chat.sender === 'me'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-800 border border-gray-100'
                                }`}
                              >
                                <p className="text-sm leading-relaxed">{chat.message}</p>
                                <div className={`text-xs mt-1 ${chat.sender === 'me' ? 'text-blue-100' : 'text-gray-500'}`}>
                                  {chat.time}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Mobile Message Input */}
                  <div className="p-3 sm:p-4 border-t border-gray-200 bg-white">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Type Something..."
                          className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                      </div>
                      <button className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-all shadow-md">
                        <Send className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Messages;