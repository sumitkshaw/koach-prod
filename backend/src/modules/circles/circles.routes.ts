import { Router } from 'express';
import { requireAuth } from '../../middleware/auth';
import {
    getCircles, getCircleBySlug,
    joinCircle, leaveCircle,
    getPosts, createPost, upvotePost,
    getComments, createComment, upvoteComment,
    seedCircles,
} from './circles.controller';

const router = Router();

// ── Circles ──────────────────────────────────────────────────────────────────
router.get('/', getCircles);
router.get('/:slug', getCircleBySlug);
router.post('/:slug/join', requireAuth, joinCircle);
router.post('/:slug/leave', requireAuth, leaveCircle);

// ── Posts ────────────────────────────────────────────────────────────────────
router.get('/:slug/posts', getPosts);
router.post('/:slug/posts', requireAuth, createPost);

// ── Post votes & comments ─────────────────────────────────────────────────────
router.post('/posts/:postId/upvote', requireAuth, upvotePost);
router.get('/posts/:postId/comments', getComments);
router.post('/posts/:postId/comments', requireAuth, createComment);
router.post('/posts/:postId/comments/:commentId/upvote', requireAuth, upvoteComment);

// ── Dev seed ──────────────────────────────────────────────────────────────────
router.post('/seed', seedCircles);

export default router;
