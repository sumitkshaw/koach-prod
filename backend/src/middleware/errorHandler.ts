import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
    statusCode?: number;
    code?: number;
    type?: string;
}

export const errorHandler = (
    err: AppError,
    _req: Request,
    res: Response,
    _next: NextFunction
): void => {
    const statusCode = err.statusCode || (err.code && err.code >= 400 && err.code < 600 ? err.code : 500);
    const message = err.message || 'Internal Server Error';

    console.error(`[Error] ${statusCode} — ${message}`, {
        type: err.type,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });

    res.status(statusCode).json({
        error: message,
        type: err.type,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};
