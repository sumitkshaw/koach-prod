import { Request, Response, NextFunction } from 'express';
import { Circle } from '../../models/Circle';
import { Post } from '../../models/Post';
import { Comment } from '../../models/Comment';
import mongoose from 'mongoose';

// ── GET /api/circles ─────────────────────────────────────────────────────────
// List all circles (filterable by category or search)
export const getCircles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { category, search } = req.query;
        const filter: Record<string, any> = { isActive: true };
        if (category) filter.category = category;
        if (search) filter.$or = [
            { name: { $regex: String(search), $options: 'i' } },
            { description: { $regex: String(search), $options: 'i' } },
            { tags: { $regex: String(search), $options: 'i' } },
        ];
        const circles = await Circle.find(filter).sort({ memberCount: -1 }).lean();
        res.json(circles);
    } catch (err) { next(err); }
};

// ── GET /api/circles/:slug ───────────────────────────────────────────────────
export const getCircleBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const circle = await Circle.findOne({ slug: req.params.slug, isActive: true }).lean();
        if (!circle) { res.status(404).json({ error: 'Circle not found' }); return; }
        res.json(circle);
    } catch (err) { next(err); }
};

// ── POST /api/circles/:slug/join (auth required) ─────────────────────────────
export const joinCircle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.currentUser!.$id;
        const circle = await Circle.findOne({ slug: req.params.slug });
        if (!circle) { res.status(404).json({ error: 'Circle not found' }); return; }
        if (circle.memberIds.includes(userId)) {
            res.json({ message: 'Already a member', memberCount: circle.memberCount }); return;
        }
        circle.memberIds.push(userId);
        circle.memberCount += 1;
        await circle.save();
        res.json({ message: 'Joined', memberCount: circle.memberCount });
    } catch (err) { next(err); }
};

// ── POST /api/circles/:slug/leave (auth required) ────────────────────────────
export const leaveCircle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.currentUser!.$id;
        const circle = await Circle.findOne({ slug: req.params.slug });
        if (!circle) { res.status(404).json({ error: 'Circle not found' }); return; }
        const idx = circle.memberIds.indexOf(userId);
        if (idx === -1) { res.json({ message: 'Not a member' }); return; }
        circle.memberIds.splice(idx, 1);
        circle.memberCount = Math.max(0, circle.memberCount - 1);
        await circle.save();
        res.json({ message: 'Left', memberCount: circle.memberCount });
    } catch (err) { next(err); }
};

// ── GET /api/circles/:slug/posts ─────────────────────────────────────────────
export const getPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { sort = 'new', page = '1' } = req.query;
        const limit = 10;
        const skip = (parseInt(String(page)) - 1) * limit;
        const sortField: Record<string, 1 | -1> = sort === 'top'
            ? { upvoteCount: -1 }
            : { createdAt: -1 };
        const posts = await Post.find({ circleSlug: req.params.slug })
            .sort(sortField).skip(skip).limit(limit).lean();
        const total = await Post.countDocuments({ circleSlug: req.params.slug });
        res.json({ posts, total, page: parseInt(String(page)), hasMore: skip + limit < total });
    } catch (err) { next(err); }
};

// ── POST /api/circles/:slug/posts (auth required, must be member) ─────────────
export const createPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.currentUser!.$id;
        const { title, body } = req.body;
        if (!title?.trim()) { res.status(400).json({ error: 'Title is required' }); return; }

        const circle = await Circle.findOne({ slug: req.params.slug });
        if (!circle) { res.status(404).json({ error: 'Circle not found' }); return; }
        if (!circle.memberIds.includes(userId)) {
            res.status(403).json({ error: 'Join the circle first to post' }); return;
        }

        const post = await Post.create({
            circleId: circle._id,
            circleSlug: circle.slug,
            authorId: userId,
            authorName: req.currentUser!.name || 'Anonymous',
            title: title.trim(),
            body: body?.trim() || '',
        });
        await Circle.findByIdAndUpdate(circle._id, { $inc: { postCount: 1 } });
        res.status(201).json(post);
    } catch (err) { next(err); }
};

// ── POST /api/circles/posts/:postId/upvote (auth required) ───────────────────
export const upvotePost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.currentUser!.$id;
        const post = await Post.findById(req.params.postId);
        if (!post) { res.status(404).json({ error: 'Post not found' }); return; }
        const idx = post.upvotes.indexOf(userId);
        if (idx === -1) {
            post.upvotes.push(userId);
            post.upvoteCount += 1;
        } else {
            post.upvotes.splice(idx, 1);
            post.upvoteCount = Math.max(0, post.upvoteCount - 1);
        }
        await post.save();
        res.json({ upvoteCount: post.upvoteCount, upvoted: idx === -1 });
    } catch (err) { next(err); }
};

// ── GET /api/circles/posts/:postId/comments ───────────────────────────────────
export const getComments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.postId)) {
            res.status(400).json({ error: 'Invalid post ID' }); return;
        }
        const comments = await Comment.find({ postId: req.params.postId })
            .sort({ createdAt: 1 }).lean();
        res.json(comments);
    } catch (err) { next(err); }
};

// ── POST /api/circles/posts/:postId/comments (auth required) ─────────────────
export const createComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.currentUser!.$id;
        const { body } = req.body;
        if (!body?.trim()) { res.status(400).json({ error: 'Comment body is required' }); return; }
        if (!mongoose.Types.ObjectId.isValid(req.params.postId)) {
            res.status(400).json({ error: 'Invalid post ID' }); return;
        }

        const comment = await Comment.create({
            postId: req.params.postId,
            authorId: userId,
            authorName: req.currentUser!.name || 'Anonymous',
            body: body.trim(),
        });
        await Post.findByIdAndUpdate(req.params.postId, { $inc: { commentCount: 1 } });
        res.status(201).json(comment);
    } catch (err) { next(err); }
};

// ── POST /api/circles/posts/:postId/comments/:commentId/upvote (auth) ────────
export const upvoteComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.currentUser!.$id;
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) { res.status(404).json({ error: 'Comment not found' }); return; }
        const idx = comment.upvotes.indexOf(userId);
        if (idx === -1) { comment.upvotes.push(userId); comment.upvoteCount += 1; }
        else { comment.upvotes.splice(idx, 1); comment.upvoteCount = Math.max(0, comment.upvoteCount - 1); }
        await comment.save();
        res.json({ upvoteCount: comment.upvoteCount, upvoted: idx === -1 });
    } catch (err) { next(err); }
};

// ── POST /api/circles/seed ───────────────────────────────────────────────────
// Dev-only: seed the circles collection with the static categories
export const seedCircles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const defaults = [
            { name: 'Research', slug: 'research', category: 'Marketing', description: 'Deep dives into market research, consumer insights, and data-driven decision making.', tags: ['research', 'analytics', 'marketing'], rules: ['Be respectful', 'Cite your sources', 'No self-promotion'] },
            { name: 'Promotion & Growth', slug: 'promotion', category: 'Marketing', description: 'Growth hacking, campaigns, and promotion strategies for modern businesses.', tags: ['growth', 'promotion', 'campaigns'], rules: ['No spam', 'Keep it relevant'] },
            { name: 'Finance & Budgeting', slug: 'finance-budgeting', category: 'Finance', description: 'Personal finance, budgeting, investing, and wealth management discussions.', tags: ['finance', 'investing', 'budgeting'], rules: ['Not financial advice', 'Be respectful'] },
            { name: 'Design Thinking', slug: 'design-thinking', category: 'Design', description: 'Human-centered design, UX research, and creative problem solving.', tags: ['design', 'ux', 'creative'], rules: ['Share work respectfully', 'Constructive feedback only'] },
            { name: 'Innovation', slug: 'innovation', category: 'Technology', description: 'Emerging technologies, startups, and disruptive ideas shaping the future.', tags: ['innovation', 'startups', 'tech'], rules: ['Respect all ideas', 'No bashing'] },
            { name: 'Animation & Motion', slug: 'animation', category: 'Design', description: 'Motion design, animation tools, workflows, and showcase.', tags: ['animation', 'motion', 'after effects'], rules: ['Credit your sources', 'Keep it creative'] },
            { name: 'Software Development', slug: 'software-dev', category: 'Technology', description: 'Code, architecture, tools, and career for software engineers.', tags: ['code', 'engineering', 'dev'], rules: ['Be helpful', 'No gatekeeping'] },
            { name: 'Career & Mentorship', slug: 'career', category: 'Community', description: 'Job hunting, career advice, mentorship experiences, and professional growth.', tags: ['career', 'mentorship', 'jobs'], rules: ['Be supportive', 'No recruitment spam'] },
        ];
        let created = 0;
        for (const c of defaults) {
            const exists = await Circle.findOne({ slug: c.slug });
            if (!exists) { await Circle.create(c); created++; }
        }
        res.json({ message: `Seeded ${created} circles`, total: await Circle.countDocuments() });
    } catch (err) { next(err); }
};
