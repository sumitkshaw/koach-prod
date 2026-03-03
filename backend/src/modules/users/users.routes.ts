import { Router } from 'express';
import { requireAuth } from '../../middleware/auth';
import {
    getMyProfile,
    upsertProfile,
    updateProfile,
    completeMenteeOnboarding,
    completeMentorOnboarding,
    getOnboardingStatus,
    checkPhoneAvailability,
} from './users.controller';

const router = Router();

router.get('/me', requireAuth, getMyProfile);
router.get('/onboarding-status', requireAuth, getOnboardingStatus);
router.post('/profile', requireAuth, upsertProfile);
router.patch('/profile', requireAuth, updateProfile);
router.post('/complete-mentee-onboarding', requireAuth, completeMenteeOnboarding);
router.post('/complete-mentor-onboarding', requireAuth, completeMentorOnboarding);
// No auth required — this is checked before the account exists
router.post('/check-phone', checkPhoneAvailability);

export default router;
