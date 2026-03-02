import { Router } from 'express';
import {
    getMentors,
    getMentorById,
    createMentor,
    updateMentor,
} from './mentors.controller';
import { requireAuth } from '../../middleware/auth';

const router = Router();

router.get('/', getMentors);
router.get('/:id', getMentorById);
router.post('/', requireAuth, createMentor);
router.patch('/:id', requireAuth, updateMentor);

export default router;
