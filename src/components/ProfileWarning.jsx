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
    currentLevel: '',
    learningStyle: '',
    timeCommitment: '',
    interests: '',
  });

  if (!user) return null;

  const handleOpenModal = async () => {
    // Try to load existing profile data
    try {
      const profile = await getUserProfile(user.$id);
      if (profile?.profileData && profile.profileData !== '{}') {
        const savedData = JSON.parse(profile.profileData);
        setFormData(prev => ({ ...prev, ...savedData }));
      }
    } catch (error) {
      console.log('No saved profile data found');
    }
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!user?.$id) return;
    
    setLoading(true);
    try {
      await updateUserProfileByUserId(user.$id, {
        profileComplete: true,
        profileData: JSON.stringify(formData),
      });
      
      setShowModal(false);
      // Optional: Refresh page or show success message
      window.location.reload();
    } catch (error) {
      console.error('Failed to save profile:', error);
      alert('Failed to save. Please try again.');
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
                    Current Skill Level
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, currentLevel: level }))}
                        className={`py-2 rounded-lg text-sm font-medium transition-colors ${
                          formData.currentLevel === level
                            ? 'bg-green-100 text-green-700 border-2 border-green-500'
                            : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Learning Style
                  </label>
                  <select
                    value={formData.learningStyle}
                    onChange={(e) => setFormData(prev => ({ ...prev, learningStyle: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select...</option>
                    <option value="Visual">Visual (Diagrams, Videos)</option>
                    <option value="Auditory">Auditory (Discussions, Podcasts)</option>
                    <option value="Kinesthetic">Hands-on (Practice, Projects)</option>
                    <option value="Reading/Writing">Reading & Writing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Weekly Time Commitment
                  </label>
                  <select
                    value={formData.timeCommitment}
                    onChange={(e) => setFormData(prev => ({ ...prev, timeCommitment: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select...</option>
                    <option value="1-3 hours">1-3 hours</option>
                    <option value="3-5 hours">3-5 hours</option>
                    <option value="5-10 hours">5-10 hours</option>
                    <option value="10+ hours">10+ hours</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Specific Interests or Topics
                  </label>
                  <textarea
                    value={formData.interests}
                    onChange={(e) => setFormData(prev => ({ ...prev, interests: e.target.value }))}
                    placeholder="e.g., React development, product management, UX design..."
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
                  disabled={loading || !formData.currentLevel || formData.goals.length === 0}
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