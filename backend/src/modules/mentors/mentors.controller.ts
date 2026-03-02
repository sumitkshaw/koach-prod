import { Request, Response, NextFunction } from 'express';
import { ID, Query } from 'node-appwrite';
import {
    databases,
    DATABASE_ID,
    MENTORS_COLLECTION_ID,
} from '../../config/appwrite';

// ── GET /api/mentors ─────────────────────────────────────────────────────────
export const getMentors = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { skill, minRating, maxRate, search } = req.query;
        const queries: string[] = [Query.equal('isActive', true)];

        if (skill) queries.push(Query.search('skills', String(skill)));
        if (minRating) queries.push(Query.greaterThanEqual('rating', Number(minRating)));
        if (maxRate) queries.push(Query.lessThanEqual('hourlyRate', Number(maxRate)));
        if (search) queries.push(Query.search('name', String(search)));

        queries.push(Query.orderDesc('rating'));
        queries.push(Query.limit(50));

        const result = await databases.listDocuments(DATABASE_ID, MENTORS_COLLECTION_ID, queries);
        res.status(200).json(result);
    } catch (err: unknown) {
        next(err);
    }
};

// ── GET /api/mentors/:id ─────────────────────────────────────────────────────
export const getMentorById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const mentor = await databases.getDocument(DATABASE_ID, MENTORS_COLLECTION_ID, id);
        res.status(200).json(mentor);
    } catch (err: unknown) {
        next(err);
    }
};

// ── POST /api/mentors (protected) ────────────────────────────────────────────
export const createMentor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = req.currentUser!;
        const {
            title,
            bio,
            skills = [],
            hourlyRate,
            availability,
        } = req.body;

        if (!title || !bio) {
            res.status(400).json({ error: 'title and bio are required' });
            return;
        }

        const mentor = await databases.createDocument(
            DATABASE_ID,
            MENTORS_COLLECTION_ID,
            ID.unique(),
            {
                userId: user.$id,
                name: user.name,
                email: user.email,
                title,
                bio,
                skills,
                hourlyRate: Number(hourlyRate) || 0,
                availability: availability || '',
                rating: 0,
                reviewCount: 0,
                isActive: true,
                createdAt: new Date().toISOString(),
            }
        );

        res.status(201).json(mentor);
    } catch (err: unknown) {
        next(err);
    }
};

// ── PATCH /api/mentors/:id (protected) ───────────────────────────────────────
export const updateMentor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const user = req.currentUser!;

        // Verify ownership
        const existing = await databases.getDocument(DATABASE_ID, MENTORS_COLLECTION_ID, id);
        if ((existing as Record<string, string>).userId !== user.$id) {
            res.status(403).json({ error: 'Forbidden — you can only edit your own mentor profile' });
            return;
        }

        const allowedFields = ['title', 'bio', 'skills', 'hourlyRate', 'availability', 'isActive'];
        const updates: Record<string, unknown> = {};
        for (const field of allowedFields) {
            if (req.body[field] !== undefined) updates[field] = req.body[field];
        }

        const updated = await databases.updateDocument(DATABASE_ID, MENTORS_COLLECTION_ID, id, updates);
        res.status(200).json(updated);
    } catch (err: unknown) {
        next(err);
    }
};
