// src/components/ProtectedRoute.jsx
// Wraps routes that require authentication, and optionally a specific userType.
// Usage:
//   <ProtectedRoute>              — requires any logged-in user
//   <ProtectedRoute role="mentor"> — requires mentor profile
//   <ProtectedRoute role="mentee"> — requires mentee profile

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Still loading Firebase session — render nothing
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Not logged in → redirect to login modal
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role guard — check localStorage for dashboard type
  // Populated when user reaches the dashboard after signup
  if (role) {
    const storedType = localStorage.getItem('dashboardType') || 'mentee';
    if (role === 'mentor' && storedType !== 'mentor') {
      return <Navigate to="/dashboard" replace />;
    }
    if (role === 'mentee' && storedType !== 'mentee') {
      return <Navigate to="/dashboard_mentor" replace />;
    }
  }

  return children;
}
