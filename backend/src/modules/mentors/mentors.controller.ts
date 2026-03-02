import { Request, Response, NextFunction } from 'express';
import { Mentor, IMentor } from '../../models/Mentor';
import mongoose from 'mongoose';

// ── GET /api/mentors ─────────────────────────────────────────────────────────
export const getMentors = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { skill, minRating, maxRate, search } = req.query;

        const filter: Record<string, any> = { isActive: true };

        if (skill) filter.skills = { $in: [new RegExp(String(skill), 'i')] };
        if (minRating) filter.rating = { $gte: Number(minRating) };
        if (maxRate) filter.hourlyRate = { ...filter.hourlyRate, $lte: Number(maxRate) };
        if (search) filter.$or = [
            { name: { $regex: String(search), $options: 'i' } },
            { title: { $regex: String(search), $options: 'i' } },
            { bio: { $regex: String(search), $options: 'i' } },
        ];

        const mentors = await Mentor.find(filter)
            .sort({ rating: -1 })
            .limit(50)
            .lean();

        res.status(200).json({ total: mentors.length, documents: mentors });
    } catch (err) {
        next(err);
    }
};

// ── GET /api/mentors/:id ─────────────────────────────────────────────────────
export const getMentorById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ error: 'Invalid mentor ID' });
            return;
        }

        const mentor = await Mentor.findById(id).lean();
        if (!mentor) {
            res.status(404).json({ error: 'Mentor not found' });
            return;
        }

        res.status(200).json(mentor);
    } catch (err) {
        next(err);
    }
};

// ── POST /api/mentors (protected) ────────────────────────────────────────────
export const createMentor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const currentUser = req.currentUser!;
        const { title, bio, skills = [], hourlyRate, company, location, language, industry, avatarUrl } = req.body;

        if (!title || !bio) {
            res.status(400).json({ error: 'title and bio are required' });
            return;
        }

        const mentor = await Mentor.create({
            name: currentUser.name,
            appwriteUserId: currentUser.$id,
            title,
            bio,
            skills,
            hourlyRate: Number(hourlyRate) || 0,
            company: company || '',
            location: location || 'Remote',
            language: language || 'English',
            industry: industry || '',
            avatarUrl: avatarUrl || '',
            rating: 0,
            reviewCount: 0,
            isActive: true,
        });

        res.status(201).json(mentor);
    } catch (err) {
        next(err);
    }
};

// ── PATCH /api/mentors/:id (protected) ───────────────────────────────────────
export const updateMentor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const currentUser = req.currentUser!;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ error: 'Invalid mentor ID' });
            return;
        }

        const mentor = await Mentor.findById(id);
        if (!mentor) {
            res.status(404).json({ error: 'Mentor not found' });
            return;
        }

        if (mentor.appwriteUserId !== currentUser.$id) {
            res.status(403).json({ error: 'Forbidden — you can only edit your own mentor profile' });
            return;
        }

        const allowedFields = ['title', 'bio', 'skills', 'hourlyRate', 'location', 'language', 'industry', 'avatarUrl', 'isActive', 'experience', 'education'];
        const updates: Partial<IMentor> = {};
        for (const field of allowedFields) {
            if (req.body[field] !== undefined) (updates as any)[field] = req.body[field];
        }

        const updated = await Mentor.findByIdAndUpdate(id, updates, { new: true });
        res.status(200).json(updated);
    } catch (err) {
        next(err);
    }
};
