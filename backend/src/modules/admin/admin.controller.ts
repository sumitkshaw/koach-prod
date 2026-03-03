import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { AdminUser } from '../../models/AdminUser';
import { signAdminToken } from '../../middleware/adminAuth';
import { Mentor } from '../../models/Mentor';
import { UserProfile } from '../../models/UserProfile';

// ── POST /api/admin/login ────────────────────────────────────────────────────
export const adminLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: 'Email and password required' });
            return;
        }
        const admin = await AdminUser.findOne({ email: email.toLowerCase().trim() });
        if (!admin) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        const match = await bcrypt.compare(password, admin.passwordHash);
        if (!match) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        const token = signAdminToken(admin.email);
        res.json({ token, email: admin.email });
    } catch (err) { next(err); }
};

// ── GET /api/admin/users ─────────────────────────────────────────────────────
export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const users = await UserProfile.find({}).sort({ createdAt: -1 }).lean();
        res.json({ total: users.length, users });
    } catch (err) { next(err); }
};

// ── GET /api/admin/mentors ───────────────────────────────────────────────────
export const getAllMentors = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const mentors = await Mentor.find({}).sort({ createdAt: -1 }).lean();
        res.json({ total: mentors.length, mentors });
    } catch (err) { next(err); }
};

// ── PATCH /api/admin/mentors/:id/approve ────────────────────────────────────
// Sets isActive = true → mentor appears on the listing page
export const approveMentor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const mentor = await Mentor.findByIdAndUpdate(
            req.params.id,
            { isActive: true },
            { new: true }
        );
        if (!mentor) { res.status(404).json({ error: 'Mentor not found' }); return; }
        res.json({ message: 'Mentor approved and now listed', mentor });
    } catch (err) { next(err); }
};

// ── PATCH /api/admin/mentors/:id/reject ─────────────────────────────────────
export const rejectMentor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const mentor = await Mentor.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { new: true }
        );
        if (!mentor) { res.status(404).json({ error: 'Mentor not found' }); return; }
        res.json({ message: 'Mentor rejected / unlisted', mentor });
    } catch (err) { next(err); }
};
