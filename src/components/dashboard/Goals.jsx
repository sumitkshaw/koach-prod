import React, { useState } from 'react';
import { Plus, Calendar, Target, TrendingUp, Clock, CheckCircle, AlertCircle, Filter, ChevronDown, Trophy } from 'lucide-react';
import Navigation from '../Navigation';
import Sidenav from './Sidenav';
import Footer from '../Footer';

const Goals = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const progressGoals = [
    { 
      title: "Front End Development",
      subtitle: "Leadership",
      color: "blue"
    },
    { 
      title: "Leadership",
      subtitle: "Web Development",
      color: "blue"
    },
    { 
      title: "Project Management",
      subtitle: "Project Management",
      color: "blue"
    }
  ];

  const weekActivities = [
    {
      name: "Andrea Watson",
      description: "Watch Figma Tutorial on Auto Layout",
      category: "Front End Development",
      due: "Due May 26",
      color: "blue"
    },
    {
      name: "Andrea Watson",
      description: "Watch Figma Tutorial on Auto Layout",
      category: "Front End Development", 
      due: "Due May 26",
      color: "blue"
    },
    {
      name: "Andrea Watson",
      description: "Watch Figma Tutorial on Auto Layout",
      category: "Front End Development",
      due: "Due May 26", 
      color: "blue"
    }
  ];

  const allActivities = {
    notStarted: [
      {
        name: "Andrea Watson",
        description: "Watch Figma Tutorial on Auto Layout",
        category: "Front End Development",
        due: "Due May 26"
      },
      {
        name: "Andrea Watson", 
        description: "Watch Figma Tutorial on Auto Layout",
        category: "Front End Development",
        due: "Due May 26"
      },
      {
        name: "Andrea Watson",
        description: "Watch Figma Tutorial on Auto Layout", 
        category: "Front End Development",
        due: "Due May 26"
      }
    ],
    inProgress: [
      {
        name: "Andrea Watson",
        description: "Watch Figma Tutorial on Auto Layout",
        category: "Front End Development", 
        due: "Due May 26"
      },
      {
        name: "Andrea Watson",
        description: "Watch Figma Tutorial on Auto Layout",
        category: "Front End Development",
        due: "Due May 26"
      }
    ],
    complete: [
      {
        name: "Andrea Watson",
        description: "Watch Figma Tutorial on Auto Layout",
        category: "Front End Development",
        due: "Due May 26"
      },
      {
        name: "Andrea Watson", 
        description: "Watch Figma Tutorial on Auto Layout",
        category: "Front End Development",
        due: "Due May 26"
      }
    ]
  };

  const getColorClasses = (color) => {
    switch(color) {
      case 'blue': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'green': return 'text-green-600 bg-green-50 border-green-200';
      case 'purple': return 'text-purple-600 bg-purple-50 border-purple-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#EDF0F6' }}>
      <Navigation/>
      <Sidenav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} currentRoute="/dashboard/goals" />

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
            {/* Header */}
            <div className="pt-9 mb-8">
              <div className="bg-blue-600 text-white px-8 py-6 rounded-2xl flex items-center justify-between shadow-lg">
                <h1 className="text-2xl font-bold tracking-wide">Goals and Activities</h1>
                <Trophy className="w-8 h-8" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Progress towards Goals */}
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">⭐</span>
                  <h2 className="text-lg font-semibold text-gray-900">Progress towards Goals</h2>
                </div>
                
                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>0%</span>
                    <span>34%</span>
                    <span>100%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '34%' }}></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <p className="text-base text-gray-700 font-medium">Your Goals for the <span className="font-semibold text-blue-600">Next 30 Days</span></p>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-base">Add Goal</button>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors">
                    Front End Development
                  </button>
                  <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors">
                    Leadership
                  </button>
                  <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors">
                    Leadership
                  </button>
                  <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors">
                    Web Development
                  </button>
                  <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors">
                    Project Management
                  </button>
                  <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors">
                    Project Management
                  </button>
                </div>
              </div>

              {/* This Week's Activities */}
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-xl">📅</span>
                  <h2 className="text-lg font-semibold text-gray-900">This Week's Activities</h2>
                </div>
                <div className="space-y-4">
                  {weekActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-semibold">A</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-gray-900">{activity.name}</div>
                        <div className="text-sm text-gray-600">{activity.description}</div>
                        <div className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded mt-1 inline-block">
                          {activity.category}
                        </div>
                      </div>
                      <span className="text-xs text-gray-500 flex-shrink-0">{activity.due}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* All Activities Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">All Activities</h2>
                <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 border rounded-lg text-sm">
                  Filter
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Not Started */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <h3 className="font-semibold text-gray-900">Not Started</h3>
                  </div>
                  <div className="space-y-3">
                    {allActivities.notStarted.map((activity, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg border">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-xs font-semibold">A</span>
                            </div>
                            <span className="text-sm font-semibold text-gray-900">{activity.name}</span>
                          </div>
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="text-sm text-gray-600 mb-2">{activity.description}</div>
                        <div className="text-xs text-gray-500 mb-2">{activity.due}</div>
                        <div className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded inline-block">
                          {activity.category}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* In Progress */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <h3 className="font-semibold text-gray-900">In Progress</h3>
                  </div>
                  <div className="space-y-3">
                    {allActivities.inProgress.map((activity, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg border">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-xs font-semibold">A</span>
                            </div>
                            <span className="text-sm font-semibold text-gray-900">{activity.name}</span>
                          </div>
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="text-sm text-gray-600 mb-2">{activity.description}</div>
                        <div className="text-xs text-gray-500 mb-2">{activity.due}</div>
                        <div className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded inline-block">
                          {activity.category}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Complete */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <h3 className="font-semibold text-gray-900">Complete</h3>
                  </div>
                  <div className="space-y-3">
                    {allActivities.complete.map((activity, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg border">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-xs font-semibold">A</span>
                            </div>
                            <span className="text-sm font-semibold text-gray-900">{activity.name}</span>
                          </div>
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="text-sm text-gray-600 mb-2">{activity.description}</div>
                        <div className="text-xs text-gray-500 mb-2">{activity.due}</div>
                        <div className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded inline-block">
                          {activity.category}
                        </div>
                      </div>
                    ))}
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

export default Goals;