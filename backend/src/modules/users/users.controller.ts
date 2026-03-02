import { Request, Response, NextFunction } from 'express';
import { UserProfile } from '../../models/UserProfile';
import { Mentor } from '../../models/Mentor';

// ── GET /api/users/me ────────────────────────────────────────────────────────
// Get the logged-in user's profile from MongoDB
export const getMyProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.currentUser!.$id;
        const profile = await UserProfile.findOne({ appwriteUserId: userId }).lean();

        if (!profile) {
            res.status(404).json({ error: 'Profile not found' });
            return;
        }

        res.status(200).json(profile);
    } catch (err) {
        next(err);
    }
};

// ── POST /api/users/profile ──────────────────────────────────────────────────
// Create or update a user profile (upsert)
export const upsertProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.currentUser!.$id;
        const body = req.body;

        const profile = await UserProfile.findOneAndUpdate(
            { appwriteUserId: userId },
            {
                appwriteUserId: userId,
                userType: body.userType || 'mentee',
                ...body,
            },
            { upsert: true, new: true, runValidators: true }
        );

        res.status(200).json(profile);
    } catch (err) {
        next(err);
    }
};

// ── PATCH /api/users/profile ─────────────────────────────────────────────────
// Partially update user profile fields
export const updateProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.currentUser!.$id;

        const profile = await UserProfile.findOneAndUpdate(
            { appwriteUserId: userId },
            { $set: req.body },
            { new: true }
        );

        if (!profile) {
            res.status(404).json({ error: 'Profile not found' });
            return;
        }

        res.status(200).json(profile);
    } catch (err) {
        next(err);
    }
};

// ── POST /api/users/complete-mentee-onboarding ───────────────────────────────
// Final step: mark mentee onboarding as done with all data
export const completeMenteeOnboarding = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.currentUser!.$id;
        const userName = req.currentUser!.name || '';
        const {
            firstName, lastName, email, location, country,
            institution, currentRole, goals, reasons,
            pastExperiences, idealSessionFrequency,
            preferredSessionTypes, timeline, qualities, bio
        } = req.body;

        const profile = await UserProfile.findOneAndUpdate(
            { appwriteUserId: userId },
            {
                appwriteUserId: userId,
                userType: 'mentee',
                firstName: firstName || userName.split(' ')[0] || '',
                lastName: lastName || userName.split(' ')[1] || '',
                email,
                location,
                country: country || '',
                institution,
                currentRole,
                goals: goals || [],
                reasons: reasons || [],
                pastExperiences: pastExperiences || '',
                idealSessionFrequency: idealSessionFrequency || '',
                preferredSessionTypes: preferredSessionTypes || [],
                timeline: timeline || '',
                qualities: qualities || [],
                bio: bio || '',
                onboardingComplete: true,
                onboardingStep: 99,
            },
            { upsert: true, new: true }
        );

        res.status(200).json({ success: true, profile });
    } catch (err) {
        next(err);
    }
};

// ── POST /api/users/complete-mentor-onboarding ───────────────────────────────
// Final step: create a full Mentor document from onboarding data
export const completeMentorOnboarding = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.currentUser!.$id;
        const userName = req.currentUser!.name || '';
        const {
            // Step 1 — Expertise
            primaryField, expertise, technicalSpecialties, yearsOfExperience,
            // Step 2 — Credentials
            education, certifications, notableAchievements,
            location, country,
            // Step 3 — Teaching Style
            teachingStyle, availabilityHours, communicationPreferences,
            // Step 4 — Professional Detail
            hourlyRate, bio,
            linkedinProfile, portfolioUrl,
            // Name fields (from Bio-Step1.jsx if used)
            firstName, lastName, company, title, language,
        } = req.body;

        const fullName = `${firstName || ''} ${lastName || ''}`.trim() || userName;

        // Parse hourly rate — could be a value like "basic_20" from pricingTiers or a plain number
        let parsedRate = 0;
        if (typeof hourlyRate === 'number') {
            parsedRate = hourlyRate;
        } else if (typeof hourlyRate === 'string') {
            const match = hourlyRate.match(/\d+/);
            if (match) parsedRate = parseInt(match[0]);
        }

        // Upsert mentor doc
        const mentor = await Mentor.findOneAndUpdate(
            { appwriteUserId: userId },
            {
                appwriteUserId: userId,
                name: fullName,
                title: title || `${primaryField || ''} Expert`,
                company: company || '',
                bio: bio || '',
                location: typeof location === 'object'
                    ? `${location.state || ''}, ${location.continent || ''}`.trim().replace(/^,\s*/, '')
                    : location || '',
                country: country || '',
                language: language || 'English',
                industry: primaryField || '',
                skills: [
                    ...(expertise || []),
                    ...(technicalSpecialties || []),
                ].filter(Boolean),
                yearsOfExperience: Number(yearsOfExperience) || 0,
                hourlyRate: parsedRate,
                rating: 0,
                reviewCount: 0,
                badge: 'New',
                badgeType: 'default',
                isActive: true,
                linkedIn: linkedinProfile || '',
                education: Array.isArray(education) && education.length > 0
                    ? { degree: education[0], institution: notableAchievements || '' }
                    : { degree: '', institution: '' },
                // Certifications go into bio context or a future attribute
            },
            { upsert: true, new: true }
        );

        // Also mark UserProfile as onboarded
        await UserProfile.findOneAndUpdate(
            { appwriteUserId: userId },
            {
                appwriteUserId: userId,
                userType: 'mentor',
                firstName: firstName || '',
                lastName: lastName || '',
                onboardingComplete: true,
                onboardingStep: 99,
            },
            { upsert: true }
        );

        res.status(200).json({ success: true, mentor });
    } catch (err) {
        next(err);
    }
};

// ── GET /api/users/onboarding-status ────────────────────────────────────────
export const getOnboardingStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.currentUser!.$id;
        const profile = await UserProfile.findOne({ appwriteUserId: userId }).lean();

        if (!profile) {
            res.status(200).json({ hasProfile: false, onboardingComplete: false, userType: null });
            return;
        }

        res.status(200).json({
            hasProfile: true,
            onboardingComplete: profile.onboardingComplete,
            userType: profile.userType,
            currentStep: profile.onboardingStep,
        });
    } catch (err) {
        next(err);
    }
};
