// src/utils/featureFlags.js
export const FEATURE_FLAGS = {
  // Enable/disable role-based onboarding system
  ENABLE_ROLE_BASED_ONBOARDING: true,
  
  // Use new profile system (set to false to fallback to old system)
  USE_NEW_PROFILE_SYSTEM: true,
  
  // Force existing users to complete onboarding (start with false)
  FORCE_ONBOARDING_EXISTING_USERS: false,
  
  // Auto-save onboarding progress
  ENABLE_AUTO_SAVE: true,
  
  // Show profile completion warnings
  SHOW_PROFILE_WARNINGS: true,
};

// Helper function to check if feature is enabled
export const isFeatureEnabled = (feature) => {
  return FEATURE_FLAGS[feature] === true;
};

// Helper to get feature flag with fallback
export const getFeatureFlag = (feature, defaultValue = false) => {
  return FEATURE_FLAGS[feature] ?? defaultValue;
};