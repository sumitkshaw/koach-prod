import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'koach-admin-secret-2025';

export const requireAdmin = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers['x-admin-token'] as string | undefined;
    if (!token) {
        res.status(401).json({ error: 'Admin token required' });
        return;
    }
    try {
        jwt.verify(token, ADMIN_JWT_SECRET);
        next();
    } catch {
        res.status(401).json({ error: 'Invalid or expired admin token' });
    }
};

export const signAdminToken = (email: string): string =>
    jwt.sign({ email, role: 'admin' }, ADMIN_JWT_SECRET, { expiresIn: '12h' });
