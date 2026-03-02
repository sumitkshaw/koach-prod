import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import OnboardingNav from '../components/OnboardingNav';
import { saveOnboardingProgress, completeMentorOnboarding } from '../utils/database/profiles';

export default function MentorOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    // Step 1: Expertise
    expertise: [],
    primaryField: '',
    technicalSpecialties: [], // Added new field for sub-specialties
    yearsOfExperience: 0,
    
    // Step 2: Credentials
    education: [],
    certifications: [],
    notableAchievements: '',
    location: { continent: '', state: '' },
    
    // Step 3: Teaching Style
    teachingStyle: [],
    availabilityHours: '',
    communicationPreferences: [],
    
    // Step 4: Professional Details
    hourlyRate: '',
    pricingTiers: [],
    bio: '',
    linkedinProfile: '',
    portfolioUrl: '',
  });
  
  const { user } = useAuth();
  const navigate = useNavigate();

  // Auto-save progress on step change
  useEffect(() => {
    const autoSave = async () => {
      if (user?.$id && currentStep > 1) {
        try {
          await saveOnboardingProgress(user.$id, currentStep - 1, formData);
          console.log(`✅ Auto-saved step ${currentStep - 1}`);
        } catch (error) {
          console.warn('Auto-save failed:', error);
        }
      }
    };
    
    autoSave();
  }, [currentStep, formData, user]);

  // Load saved progress on mount
  useEffect(() => {
    const loadProgress = async () => {
      // TODO: Load saved data from database
    };
    if (user?.$id) loadProgress();
  }, [user]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error for this field when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleArrayToggle = (field, value) => {
    setFormData(prev => {
      const currentArray = prev[field] || [];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      return { ...prev, [field]: newArray };
    });
    // Clear error for this field when user selects something
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleLocationChange = (type, value) => {
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        [type]: value
      }
    }));
  };

  // Expertise categories with sub-specialties
  const expertiseCategories = {
    "Technology": ["Software Development", "Web Development", "Mobile Development", "DevOps", "Cloud Computing", "Cybersecurity", "Data Engineering", "AI/ML"],
    "Business": ["Product Management", "Marketing", "Sales", "Finance", "Consulting", "Entrepreneurship", "Strategy", "Operations"],
    "Design": ["UX/UI Design", "Graphic Design", "Product Design", "Motion Graphics", "3D Modeling", "Brand Identity"],
    "Science": ["Data Science", "Research", "Biotechnology", "Engineering", "Physics", "Chemistry", "Environmental Science"],
    "Arts": ["Writing", "Music", "Visual Arts", "Film", "Photography", "Performing Arts"],
    "Education": ["Career Coaching", "Academic Tutoring", "Corporate Training", "Curriculum Development", "Educational Technology"]
  };

  // Sub-specialties for expertise areas
  const subSpecialties = {
    "Software Development": ["Java", "Python", "JavaScript", "Node.js", "C#", "C++", "Go", "Rust", "PHP", "Ruby"],
    "Web Development": ["Frontend", "Backend", "Full Stack", "React", "Vue", "Angular", "Next.js", "Django", "Spring Boot"],
    "Product Management": ["Agile", "Scrum", "Product Strategy", "User Research", "Roadmapping", "Metrics & Analytics"],
    "Data Science": ["Machine Learning", "Deep Learning", "NLP", "Computer Vision", "Statistical Analysis", "Data Visualization"],
    "UX/UI Design": ["User Research", "Wireframing", "Prototyping", "Interaction Design", "Visual Design", "Design Systems"],
    "Career Coaching": ["Resume Review", "Interview Prep", "Career Transition", "Networking", "Salary Negotiation", "Personal Branding"]
  };

  // Get available sub-specialties based on selected expertise
  const getAvailableSubSpecialties = () => {
    const specialties = [];
    formData.expertise.forEach(exp => {
      if (subSpecialties[exp]) {
        specialties.push(...subSpecialties[exp]);
      }
    });
    return [...new Set(specialties)]; // Remove duplicates
  };

  // Continents and states data
  const continents = {
    "North America": ["United States", "Canada", "Mexico"],
    "Europe": ["United Kingdom", "Germany", "France", "Spain", "Italy", "Netherlands", "Sweden"],
    "Asia": ["India", "China", "Japan", "South Korea", "Singapore", "Australia"],
    "Africa": ["South Africa", "Nigeria", "Kenya", "Egypt", "Ghana"],
    "South America": ["Brazil", "Argentina", "Colombia", "Chile"],
    "Oceania": ["Australia", "New Zealand", "Fiji"]
  };

  // Pricing tiers structure
  const pricingTiers = [
    { id: "basic", label: "Basic Mentoring", description: "General guidance & advice", price: "$20", value: "basic_20" },
    { id: "interview", label: "Interview Prep", description: "Includes mock interviews", price: "$50", value: "interview_50" },
    { id: "resume", label: "Resume Review", description: "Detailed resume analysis", price: "$30", value: "resume_30" },
    { id: "comprehensive", label: "Comprehensive Package", description: "All services combined", price: "$80", value: "comprehensive_80" },
    { id: "premium", label: "Premium Coaching", description: "Weekly sessions + all services", price: "$100+", value: "premium_100" }
  ];

  // Validate current step before proceeding
  const validateCurrentStep = () => {
    const currentStepConfig = steps[currentStep - 1];
    const errors = {};
    
    currentStepConfig.fields.forEach(field => {
      if (field.required) {
        const value = formData[field.field];
        
        if (field.type === 'multiselect') {
          if (!value || value.length === 0) {
            errors[field.field] = `Please select at least one ${field.label.toLowerCase()}`;
          }
        } else if (field.type === 'select' || field.type === 'number') {
          if (!value && value !== 0) {
            errors[field.field] = `Please select a ${field.label.toLowerCase()}`;
          }
        } else if (field.type === 'textarea' || field.type === 'text') {
          if (!value || value.trim() === '') {
            errors[field.field] = `Please fill in ${field.label.toLowerCase()}`;
          }
        } else if (field.type === 'location') {
          if (!formData.location.continent || !formData.location.state) {
            errors.location = 'Please select both continent and state';
          }
        } else if (field.type === 'pricing') {
          if (formData.pricingTiers.length === 0) {
            errors.pricingTiers = 'Please select at least one pricing tier';
          }
        }
      }
    });

    // Special validation for Step 4 bio
    if (currentStep === 4) {
      const bio = formData.bio || '';
      if (bio.trim().split(/\s+/).length < 50) {
        errors.bio = 'Bio must be at least 50 words';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleComplete = async () => {
  if (!user?.$id) return;
  
  // Validate all steps before completion
  const allStepsValid = steps.every((step) => {
    return step.fields.every(field => {
      if (!field.required) return true;
      const value = formData[field.field];
      if (field.type === 'pricing') return value && value.length > 0;
      if (field.type === 'location') return formData.location.continent && formData.location.state;
      if (field.type === 'multiselect' || field.type === 'expertise') return value && value.length > 0;
      if (field.type === 'select') return value !== undefined && value !== null && value !== '';
      if (field.type === 'number') return value !== undefined && value !== null && value !== '' && value > 0;
      if (field.type === 'textarea' || field.type === 'text') return value && typeof value === 'string' && value.trim() !== '';
      return !!value;
    });
  });
  
  if (!allStepsValid) {
    alert('Please complete all required fields before finishing.');
    return;
  }

  // Bio word count check
  const bioWords = (formData.bio || '').trim().split(/\s+/).length;
  if (bioWords < 50) {
    alert('Your bio must be at least 50 words.');
    return;
  }
  
  setLoading(true);
  try {
    // Parse hourly rate from the selected pricing tier string (e.g. "basic_20" → 20)
    let parsedRate = 0;
    if (formData.pricingTiers && formData.pricingTiers.length > 0) {
      const match = formData.pricingTiers[0].match(/\d+/);
      if (match) parsedRate = parseInt(match[0]);
    }
    
    // Build the payload that maps to the Mentor MongoDB schema
    const mentorPayload = {
      // Identity
      firstName: user?.name?.split(' ')[0] || '',
      lastName: user?.name?.split(' ').slice(1).join(' ') || '',
      // Expertise (Step 1)
      primaryField: formData.primaryField,
      expertise: formData.expertise,
      technicalSpecialties: formData.technicalSpecialties,
      yearsOfExperience: formData.yearsOfExperience,
      // Credentials (Step 2)
      education: formData.education,
      certifications: formData.certifications,
      notableAchievements: formData.notableAchievements,
      location: formData.location,
      // Teaching Style (Step 3)
      teachingStyle: formData.teachingStyle,
      availabilityHours: formData.availabilityHours,
      communicationPreferences: formData.communicationPreferences,
      // Professional Details (Step 4)
      hourlyRate: parsedRate,
      pricingTiers: formData.pricingTiers,
      bio: formData.bio,
      linkedinProfile: formData.linkedinProfile,
      portfolioUrl: formData.portfolioUrl,
      language: 'English',
    };

    // This hits /api/users/complete-mentor-onboarding which creates a Mentor doc in MongoDB
    await completeMentorOnboarding(user.$id, mentorPayload);
    
    navigate('/dashboard_mentor');
  } catch (error) {
    console.error('Failed to complete onboarding:', error);
    alert(`Failed to save: ${error.message}`);
  } finally {
    setLoading(false);
  }
};

  // Step configurations - Fixed: Each field has unique field name
  const steps = [
    {
      title: "Your Expertise",
      description: "Tell us about your skills and experience",
      fields: [
        {
          type: "category",
          label: "Primary Field",
          field: "primaryField",
          required: true
        },
        {
          type: "expertise",
          label: "Areas of Expertise",
          field: "expertise",
          required: true
        },
        {
          type: "subspecialty",
          label: "Technical Specialties",
          field: "technicalSpecialties", // Changed from "expertise" to avoid duplicate key
          required: false
        },
        {
          type: "number",
          label: "Years of Professional Experience",
          field: "yearsOfExperience",
          min: 1,
          max: 50,
          required: true
        }
      ]
    },
    {
      title: "Credentials & Location",
      description: "Share your background and location",
      fields: [
        {
          type: "multiselect",
          label: "Highest Level of Education",
          field: "education",
          options: ["High School", "Bachelor's", "Master's", "PhD", "Other"],
          required: true
        },
        {
          type: "text",
          label: "Certifications (comma separated)",
          field: "certifications",
          placeholder: "e.g., PMP, AWS Certified, Google Analytics"
        },
        {
          type: "textarea",
          label: "Notable Achievements",
          field: "notableAchievements",
          placeholder: "Awards, publications, or significant projects",
          rows: 4
        },
        {
          type: "location",
          label: "Location",
          field: "location",
          required: true
        }
      ]
    },
    {
      title: "Teaching Style & Availability",
      description: "How do you prefer to mentor?",
      fields: [
        {
          type: "multiselect",
          label: "Preferred Teaching Styles",
          field: "teachingStyle",
          options: ["Structured", "Casual", "Project-based", "Q&A focused", "Hands-on", "Theory-focused", "Mixed"],
          required: true
        },
        {
          type: "select",
          label: "Weekly Availability",
          field: "availabilityHours",
          options: ["1-5 hours", "5-10 hours", "10-20 hours", "20+ hours"],
          required: true
        },
        {
          type: "multiselect",
          label: "Communication Preferences",
          field: "communicationPreferences",
          options: ["Video Calls", "Voice Calls", "Text Chat", "Email", "In-person"],
          required: true
        }
      ]
    },
    {
      title: "Professional Details",
      description: "Finalize your mentor profile",
      fields: [
        {
          type: "pricing",
          label: "Mentoring Services & Pricing",
          field: "pricingTiers",
          required: true
        },
        {
          type: "textarea",
          label: "Professional Bio",
          field: "bio",
          placeholder: "Tell mentees about your background and approach... (Minimum 50 words)",
          rows: 6,
          required: true,
          minWords: 50
        },
        {
          type: "text",
          label: "LinkedIn Profile URL",
          field: "linkedinProfile",
          placeholder: "https://linkedin.com/in/yourprofile"
        },
        {
          type: "text",
          label: "Portfolio/Website",
          field: "portfolioUrl",
          placeholder: "https://yourwebsite.com"
        }
      ]
    }
  ];

  const currentStepConfig = steps[currentStep - 1];

  // Calculate bio word count
  const bioWordCount = formData.bio ? formData.bio.trim().split(/\s+/).length : 0;
  const minBioWords = 50;

  return (
    <div className="min-h-screen bg-gray-50">
      <OnboardingNav />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8 pt-20 sm:pt-20">
        {/* Progress Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Complete Your Mentor Profile
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
            {currentStepConfig.description}
          </p>
          
          {/* Step Indicator - Without dashes */}
          <div className="mb-6 sm:mb-8">
            {/* Mobile Step Indicator */}
            <div className="block sm:hidden text-center mb-4">
              <div className="flex justify-center items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">
                  {currentStep}
                </div>
                <span className="text-sm font-medium">
                  Step {currentStep} of {steps.length}: {currentStepConfig.title}
                </span>
              </div>
            </div>
            
            {/* Desktop Step Indicator - No dashes */}
            <div className="hidden sm:flex items-center justify-center space-x-8">
              {steps.map((step, index) => {
                const stepNumber = index + 1;
                const isActive = stepNumber === currentStep;
                const isCompleted = stepNumber < currentStep;
                
                return (
                  <div key={stepNumber} className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-200 ${
                      isActive 
                        ? 'bg-blue-600 text-white border-2 border-blue-600 transform scale-105' 
                        : isCompleted 
                        ? 'bg-green-500 text-white hover:bg-green-600' 
                        : 'bg-white text-gray-400 border-2 border-gray-300 hover:border-gray-400'
                    }`}>
                      {isCompleted ? (
                        <span className="font-medium">✓</span>
                      ) : (
                        <span className={`font-medium ${isActive ? 'text-white' : 'text-current'}`}>
                          {stepNumber}
                        </span>
                      )}
                    </div>
                    <span className={`text-sm font-medium text-center ${
                      isActive 
                        ? 'text-blue-600 font-semibold' 
                        : isCompleted 
                        ? 'text-green-600' 
                        : 'text-gray-500'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Form Content */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">
            {currentStep === 1 ? '' : `Step ${currentStep}: `}{currentStepConfig.title}
          </h2>
          
          <div className="space-y-4 sm:space-y-6">
            {currentStepConfig.fields.map((field) => {
              // Generate unique key using field name and type
              const fieldKey = `${field.field}_${field.type}`;
              
              return (
                <div key={fieldKey} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  
                  {field.type === 'category' && (
                    <div className="space-y-3">
                      <select
                        value={formData[field.field] || ''}
                        onChange={(e) => handleInputChange(field.field, e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base transition-colors duration-200 hover:border-gray-400"
                        required={field.required}
                      >
                        <option value="">Select a primary field</option>
                        {Object.keys(expertiseCategories).map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                      {formErrors[field.field] && (
                        <p className="text-sm text-red-500 mt-1">{formErrors[field.field]}</p>
                      )}
                    </div>
                  )}
                  
                  {field.type === 'expertise' && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {(expertiseCategories[formData.primaryField] || []).map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => handleArrayToggle(field.field, option)}
                            className={`p-4 border rounded-lg text-left transition-all duration-200 ${
                              formData[field.field]?.includes(option)
                                ? 'bg-blue-50 border-blue-300 text-blue-700 shadow-sm'
                                : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{option}</span>
                              {formData[field.field]?.includes(option) && (
                                <span className="text-blue-600">✓</span>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                      {formErrors[field.field] && (
                        <p className="text-sm text-red-500 mt-1">{formErrors[field.field]}</p>
                      )}
                    </div>
                  )}
                  
                  {field.type === 'subspecialty' && formData.expertise.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600">Select your technical specialties:</p>
                      <div className="flex flex-wrap gap-2">
                        {getAvailableSubSpecialties().map((specialty) => (
                          <button
                            key={specialty}
                            type="button"
                            onClick={() => handleArrayToggle(field.field, specialty)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                              formData[field.field]?.includes(specialty)
                                ? 'bg-purple-100 text-purple-700 border border-purple-300'
                                : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                            }`}
                          >
                            {specialty}
                            {formData[field.field]?.includes(specialty) && ' ✓'}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {field.type === 'multiselect' && field.options && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {field.options.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => handleArrayToggle(field.field, option)}
                            className={`p-4 border rounded-lg text-left transition-all duration-200 ${
                              formData[field.field]?.includes(option)
                                ? 'bg-blue-50 border-blue-300 text-blue-700 shadow-sm'
                                : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400'
                          }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{option}</span>
                              {formData[field.field]?.includes(option) && (
                                <span className="text-blue-600">✓</span>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                      {formErrors[field.field] && (
                        <p className="text-sm text-red-500 mt-1">{formErrors[field.field]}</p>
                      )}
                    </div>
                  )}
                  
                  {field.type === 'select' && field.options && (
                    <div className="relative">
                      <select
                        value={formData[field.field] || ''}
                        onChange={(e) => handleInputChange(field.field, e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base transition-colors duration-200 ${
                          formErrors[field.field] 
                            ? 'border-red-300 bg-red-50' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        required={field.required}
                      >
                        <option value="">Select an option</option>
                        {field.options.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                      {formErrors[field.field] && (
                        <p className="text-sm text-red-500 mt-1">{formErrors[field.field]}</p>
                      )}
                    </div>
                  )}
                  
                  {field.type === 'textarea' && (
                    <div className="space-y-3">
                      <textarea
                        value={formData[field.field] || ''}
                        onChange={(e) => handleInputChange(field.field, e.target.value)}
                        rows={field.rows || 4}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base transition-colors duration-200 ${
                          formErrors[field.field] 
                            ? 'border-red-300 bg-red-50' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        placeholder={field.placeholder}
                        required={field.required}
                      />
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                          {field.field === 'bio' ? bioWordCount : 0} word{field.field === 'bio' && bioWordCount !== 1 ? 's' : ''}
                          {field.minWords && (
                            <span className={bioWordCount < field.minWords ? 'text-red-500' : 'text-green-600'}>
                              {' '}(minimum {field.minWords})
                            </span>
                          )}
                        </div>
                        {formErrors[field.field] && (
                          <p className="text-sm text-red-500">{formErrors[field.field]}</p>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {field.type === 'number' && (
                    <div>
                      <input
                        type="number"
                        value={formData[field.field] || ''}
                        onChange={(e) => handleInputChange(field.field, parseInt(e.target.value) || 0)}
                        min={field.min}
                        max={field.max}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base transition-colors duration-200 ${
                          formErrors[field.field] 
                            ? 'border-red-300 bg-red-50' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        required={field.required}
                      />
                      {field.min && field.max && (
                        <p className="text-xs text-gray-500 mt-1">
                          Range: {field.min} - {field.max} years
                        </p>
                      )}
                      {formErrors[field.field] && (
                        <p className="text-sm text-red-500 mt-1">{formErrors[field.field]}</p>
                      )}
                    </div>
                  )}
                  
                  {field.type === 'text' && (
                    <div className="relative">
                      <input
                        type="text"
                        value={formData[field.field] || ''}
                        onChange={(e) => handleInputChange(field.field, e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base transition-colors duration-200 ${
                          formErrors[field.field] 
                            ? 'border-red-300 bg-red-50' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        placeholder={field.placeholder}
                        required={field.required}
                      />
                      {formErrors[field.field] && (
                        <p className="text-sm text-red-500 mt-1">{formErrors[field.field]}</p>
                      )}
                    </div>
                  )}
                  
                  {field.type === 'location' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Continent
                          </label>
                          <select
                            value={formData.location.continent || ''}
                            onChange={(e) => handleLocationChange('continent', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base transition-colors duration-200 hover:border-gray-400"
                            required={field.required}
                          >
                            <option value="">Select continent</option>
                            {Object.keys(continents).map((continent) => (
                              <option key={continent} value={continent}>{continent}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            State/Country
                          </label>
                          <select
                            value={formData.location.state || ''}
                            onChange={(e) => handleLocationChange('state', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base transition-colors duration-200 hover:border-gray-400"
                            required={field.required}
                            disabled={!formData.location.continent}
                          >
                            <option value="">Select state/country</option>
                            {formData.location.continent && continents[formData.location.continent]?.map((state) => (
                              <option key={state} value={state}>{state}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {formErrors.location && (
                        <p className="text-sm text-red-500 mt-1">{formErrors.location}</p>
                      )}
                    </div>
                  )}
                  
                  {field.type === 'pricing' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {pricingTiers.map((tier) => (
                          <button
                            key={tier.id}
                            type="button"
                            onClick={() => handleArrayToggle('pricingTiers', tier.value)}
                            className={`p-4 border rounded-lg text-left transition-all duration-200 ${
                              formData.pricingTiers?.includes(tier.value)
                                ? 'bg-green-50 border-green-300 shadow-sm'
                                : 'bg-gray-50 border-gray-300 hover:bg-gray-100 hover:border-gray-400'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <span className={`font-semibold ${
                                    formData.pricingTiers?.includes(tier.value) 
                                      ? 'text-green-700' 
                                      : 'text-gray-700'
                                  }`}>
                                    {tier.label}
                                  </span>
                                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    formData.pricingTiers?.includes(tier.value)
                                      ? 'bg-green-100 text-green-700'
                                      : 'bg-gray-100 text-gray-700'
                                  }`}>
                                    {tier.price}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600">{tier.description}</p>
                              </div>
                              {formData.pricingTiers?.includes(tier.value) && (
                                <span className="ml-3 text-green-600 text-xl">✓</span>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                      {formErrors.pricingTiers && (
                        <p className="text-sm text-red-500 mt-1">{formErrors.pricingTiers}</p>
                      )}
                      <p className="text-sm text-gray-500">
                        Select one or more pricing tiers. Mentees will see these as available services.
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`w-full sm:w-auto px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-sm'
            }`}
          >
            ← Back
          </button>
          
          <div className="text-sm text-gray-500 order-first sm:order-none">
            Step {currentStep} of {steps.length}
          </div>
          
          {currentStep < steps.length ? (
            <button
              onClick={handleNext}
              className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 hover:shadow-md transition-all duration-200"
            >
              Continue →
            </button>
          ) : (
            <button
              onClick={handleComplete}
              disabled={loading}
              className="w-full sm:w-auto px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : 'Complete Onboarding'}
            </button>
          )}
        </div>
        
        {/* Save Status */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Your progress is automatically saved. You can close and return anytime.
          </p>
        </div>
      </div>
    </div>
  );
}