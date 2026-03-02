import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { useAuth } from '../utils/AuthContext';
import { getUserProfile, updateUserProfileByUserId } from '../utils/database/profiles';

export default function ProfileWarning() {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    goals: [],
    currentRole: '',
    preferredSessionTypes: [],
    idealSessionFrequency: '',
    pastExperiences: '',
  });

  if (!user) return null;

  const handleOpenModal = async () => {
    try {
      const profile = await getUserProfile(user.$id);
      if (profile) {
        setFormData(prev => ({
          ...prev,
          goals: profile.goals || [],
          currentRole: profile.currentRole || '',
          preferredSessionTypes: profile.preferredSessionTypes || [],
          idealSessionFrequency: profile.idealSessionFrequency || '',
          pastExperiences: profile.pastExperiences || '',
        }));
      }
    } catch (error) {
      console.log('Could not load existing profile data:', error.message);
    }
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!user?.$id) return;
    setLoading(true);
    try {
      // PATCH /api/users/profile with MongoDB UserProfile field names
      await updateUserProfileByUserId(user.$id, {
        goals: formData.goals,
        currentRole: formData.currentRole,
        preferredSessionTypes: formData.preferredSessionTypes,
        idealSessionFrequency: formData.idealSessionFrequency,
        pastExperiences: formData.pastExperiences,
        onboardingComplete: true,
        onboardingStep: 99,
      });
      setShowModal(false);
      window.location.reload();
    } catch (error) {
      console.error('Failed to save profile:', error);
      alert(`Failed to save: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Warning Button/Triangle */}
      <button
        onClick={handleOpenModal}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-3 rounded-xl shadow-lg hover:bg-yellow-200 transition-colors group animate-pulse"
      >
        <AlertTriangle className="w-5 h-5" />
        <span className="font-medium">Complete your profile</span>
        <span className="text-yellow-600 group-hover:translate-x-1 transition-transform">→</span>
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Complete Your Profile
                  </h3>
                  <p className="text-sm text-gray-600">
                    Help us match you with better mentors
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    What are your main goals?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['Career Growth', 'Skill Development', 'Networking', 'Project Guidance', 'Career Switch', 'Leadership Skills'].map((goal) => (
                      <button
                        key={goal}
                        type="button"
                        onClick={() => {
                          const newGoals = formData.goals.includes(goal)
                            ? formData.goals.filter(g => g !== goal)
                            : [...formData.goals, goal];
                          setFormData(prev => ({ ...prev, goals: newGoals }));
                        }}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                          formData.goals.includes(goal)
                            ? 'bg-blue-100 text-blue-700 border border-blue-300'
                            : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                        }`}
                      >
                        {goal}
                        {formData.goals.includes(goal) && ' ✓'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Role
                  </label>
                  <select
                    value={formData.currentRole}
                    onChange={(e) => setFormData(prev => ({ ...prev, currentRole: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select your role...</option>
                    <option value="student">Student</option>
                    <option value="recent_graduate">Recent Graduate</option>
                    <option value="junior_professional">Junior Professional (0–3 yrs)</option>
                    <option value="mid_professional">Mid-level Professional (3–8 yrs)</option>
                    <option value="senior_professional">Senior Professional (8+ yrs)</option>
                    <option value="entrepreneur">Entrepreneur / Founder</option>
                    <option value="career_changer">Career Changer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Session Types
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['1-on-1 Video Calls', 'Text / Chat', 'Voice Calls', 'Async feedback'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          const arr = formData.preferredSessionTypes.includes(type)
                            ? formData.preferredSessionTypes.filter(t => t !== type)
                            : [...formData.preferredSessionTypes, type];
                          setFormData(prev => ({ ...prev, preferredSessionTypes: arr }));
                        }}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                          formData.preferredSessionTypes.includes(type)
                            ? 'bg-blue-100 text-blue-700 border border-blue-300'
                            : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                        }`}
                      >
                        {type}{formData.preferredSessionTypes.includes(type) && ' ✓'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Session Frequency
                  </label>
                  <select
                    value={formData.idealSessionFrequency}
                    onChange={(e) => setFormData(prev => ({ ...prev, idealSessionFrequency: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select frequency...</option>
                    <option value="Once a week">Once a week</option>
                    <option value="Twice a month">Twice a month</option>
                    <option value="Once a month">Once a month</option>
                    <option value="As needed">As needed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Past Experiences / Background
                  </label>
                  <textarea
                    value={formData.pastExperiences}
                    onChange={(e) => setFormData(prev => ({ ...prev, pastExperiences: e.target.value }))}
                    placeholder="Share your background, past experiences, what you've worked on..."
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Skip for now
                </button>
                <button
                  onClick={handleSave}
                  disabled={loading || !formData.currentRole || formData.goals.length === 0}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Saving...' : 'Save & Complete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}