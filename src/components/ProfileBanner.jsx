import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '../utils/AuthContext';

/**
 * ProfileBanner
 * Shows a solid (non-blinking) yellow banner when the user's profile is incomplete.
 * Clicking it navigates to /dashboard/settings to complete it.
 */
export default function ProfileBanner() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Only show when logged in — onboarding completion check handled in Settings page
  if (!user) return null;

  return (
    <div
      onClick={() => navigate('/dashboard/settings')}
      className="fixed bottom-5 right-5 z-40 flex items-center gap-3 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 px-5 py-3 rounded-2xl shadow-lg cursor-pointer transition-all hover:-translate-y-0.5 select-none"
      role="button"
      aria-label="Complete your profile"
    >
      <AlertCircle className="w-5 h-5 flex-shrink-0" />
      <span className="text-sm font-bold">Complete your profile</span>
      <span className="text-yellow-700 font-bold">→</span>
    </div>
  );
}
