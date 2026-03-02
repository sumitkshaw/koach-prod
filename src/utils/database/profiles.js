import { ID, Query } from 'appwrite';
import { databases, DATABASE_ID, USER_PROFILES_COLLECTION_ID } from '../appwrite';

const COLLECTION_ID = USER_PROFILES_COLLECTION_ID;

export const getUserProfile = async (userId) => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [Query.equal('userId', userId)]
    );
    
    if (response.documents.length > 0) {
      return response.documents[0];
    }
    return null;
  } catch (error) {
    // Don't throw for "not found" scenarios
    if (error.code === 404 || error.message?.includes('not found')) {
      return null;
    }
    console.error('Error fetching user profile:', error);
    throw new Error('Failed to fetch user profile');
  }
};
/**
 * Create a new user profile
 * @param {Object} profileData - Profile data including userId and userType
 * @returns {Promise<Object>} Created profile document
 */
export const createUserProfile = async (profileData) => {
  try {
    // 1. FIRST ALWAYS CHECK IF EXISTS
    const existingProfile = await getUserProfile(profileData.userId);
    if (existingProfile) {
      console.log('✅ Profile already exists, returning it');
      return existingProfile;
    }
    
    // 2. Generate document ID using userId + timestamp to avoid collisions
    const documentId = ID.unique();
    // Alternative: Use consistent ID based on userId
    // const documentId = `profile_${profileData.userId}`;
    
    const profile = {
      userId: profileData.userId,
      userType: profileData.userType || 'mentee',
      onboardingComplete: profileData.onboardingComplete || false,
      profileComplete: profileData.profileComplete || false,
      currentOnboardingStep: profileData.currentOnboardingStep || 1,
      onboardingData: profileData.onboardingData || '{}',
      profileData: profileData.profileData || '{}',
    };
    
    // 3. Try to create with retry logic
    let retries = 3;
    while (retries > 0) {
      try {
        const response = await databases.createDocument(
          DATABASE_ID,
          COLLECTION_ID,
          documentId,
          profile
        );
        console.log('✅ Profile created successfully');
        return response;
      } catch (createError) {
        retries--;
        
        // If conflict, check if it was created by another process
        if (createError.code === 409 || createError.message?.includes('already exists')) {
          console.log('🔄 Document conflict, checking if exists now...');
          const existing = await getUserProfile(profileData.userId);
          if (existing) {
            console.log('✅ Found existing document after conflict');
            return existing;
          }
          
          if (retries > 0) {
            console.log(`🔄 Retrying... ${retries} attempts left`);
            // Wait a bit before retry
            await new Promise(resolve => setTimeout(resolve, 300));
            continue;
          }
        }
        
        // If other error or no retries left
        throw createError;
      }
    }
    
  } catch (error) {
    console.error('❌ Error in createUserProfile:', error);
    
    // Final fallback: try to get existing
    try {
      const existing = await getUserProfile(profileData.userId);
      if (existing) {
        console.log('✅ Recovered existing profile after error');
        return existing;
      }
    } catch (fallbackError) {
      // Ignore fallback error
    }
    
    throw new Error(`Failed to create user profile: ${error.message}`);
  }
};


/**
 * Update an existing user profile
 * @param {string} documentId - The profile document ID ($id)
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Updated profile document
 */
export const updateUserProfile = async (documentId, updates) => {
  try {
    const response = await databases.updateDocument(
      DATABASE_ID,
      COLLECTION_ID,
      documentId,
      {
        ...updates,
        $updatedAt: new Date().toISOString(),
      }
    );
    
    return response;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw new Error('Failed to update user profile');
  }
};

/**
 * Update user profile by userId (finds and updates)
 * @param {string} userId - The user's AppWrite ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Updated profile document
 */
export const updateUserProfileByUserId = async (userId, updates) => {
  try {
    const profile = await getUserProfile(userId);
    if (!profile) {
      throw new Error('User profile not found');
    }
    
    return await updateUserProfile(profile.$id, updates);
  } catch (error) {
    console.error('Error updating user profile by userId:', error);
    throw error;
  }
};

/**
 * Check if user needs onboarding
 * @param {string} userId - The user's AppWrite ID
 * @returns {Promise<Object>} Onboarding status
 */
export const checkOnboardingStatus = async (userId) => {
  try {
    const profile = await getUserProfile(userId);
    
    if (!profile) {
      return {
        hasProfile: false,
        needsOnboarding: true,
        needsProfileCompletion: true,
        userType: null,
      };
    }
    
    return {
      hasProfile: true,
      needsOnboarding: profile.userType === 'mentor' && !profile.onboardingComplete,
      needsProfileCompletion: profile.userType === 'mentee' && !profile.profileComplete,
      userType: profile.userType,
      profile,
    };
  } catch (error) {
    console.error('Error checking onboarding status:', error);
    throw new Error('Failed to check onboarding status');
  }
};

/**
 * Mark mentor onboarding as complete
 * @param {string} userId - The user's AppWrite ID
 * @param {Object} onboardingData - Final onboarding data
 * @returns {Promise<Object>} Updated profile
 */
export const completeMentorOnboarding = async (userId, onboardingData = {}) => {
  return await updateUserProfileByUserId(userId, {
    onboardingComplete: true,
    onboardingData: JSON.stringify(onboardingData),
    currentOnboardingStep: 1, // Reset for future use
  });
};

/**
 * Mark mentee profile as complete
 * @param {string} userId - The user's AppWrite ID
 * @param {Object} profileData - Final profile data
 * @returns {Promise<Object>} Updated profile
 */
export const completeMenteeProfile = async (userId, profileData = {}) => {
  return await updateUserProfileByUserId(userId, {
    profileComplete: true,
    profileData: JSON.stringify(profileData),
  });
};

/**
 * Save onboarding progress (for multi-step forms)
 * @param {string} userId - The user's AppWrite ID
 * @param {number} step - Current step number
 * @param {Object} data - Step data to save
 * @returns {Promise<Object>} Updated profile
 */
export const saveOnboardingProgress = async (userId, step, data) => {
  const profile = await getUserProfile(userId);
  if (!profile) {
    throw new Error('Profile not found');
  }
  
  // Parse existing data
  const existingData = profile.onboardingData ? JSON.parse(profile.onboardingData) : {};
  
  // Merge with new data
  const updatedData = {
    ...existingData,
    [`step${step}`]: data,
    lastSaved: new Date().toISOString(),
  };
  
  return await updateUserProfileByUserId(userId, {
    currentOnboardingStep: step,
    onboardingData: JSON.stringify(updatedData),
  });
};

/**
 * Get incomplete profiles (for admin or reminders)
 * @param {string} userType - Optional filter by userType
 * @returns {Promise<Array>} List of incomplete profiles
 */
export const getIncompleteProfiles = async (userType = null) => {
  try {
    let queries = [];
    
    if (userType === 'mentor') {
      queries.push(Query.equal('userType', 'mentor'));
      queries.push(Query.equal('onboardingComplete', false));
    } else if (userType === 'mentee') {
      queries.push(Query.equal('userType', 'mentee'));
      queries.push(Query.equal('profileComplete', false));
    } else {
      // Get all incomplete profiles
      queries.push(Query.or([
        Query.and([
          Query.equal('userType', 'mentor'),
          Query.equal('onboardingComplete', false),
        ]),
        Query.and([
          Query.equal('userType', 'mentee'),
          Query.equal('profileComplete', false),
        ]),
      ]));
    }
    
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      queries
    );
    
    return response.documents;
  } catch (error) {
    console.error('Error fetching incomplete profiles:', error);
    throw new Error('Failed to fetch incomplete profiles');
  }
};