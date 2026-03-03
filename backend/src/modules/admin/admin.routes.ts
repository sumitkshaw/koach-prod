import { Router } from 'express';
import { requireAdmin } from '../../middleware/adminAuth';
import { adminLogin, getAllUsers, getAllMentors, approveMentor, rejectMentor } from './admin.controller';

const router = Router();

router.post('/login', adminLogin);
router.get('/users', requireAdmin, getAllUsers);
router.get('/mentors', requireAdmin, getAllMentors);
router.patch('/mentors/:id/approve', requireAdmin, approveMentor);
router.patch('/mentors/:id/reject', requireAdmin, rejectMentor);

export default router;
