
import { Express, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import ErrorHandler from './errorMiddleware';

export default function (req: Request, res: Response, next: NextFunction) {
    try {
        const token: string | undefined = req.headers.authorization;
        if (!token) {
            return next(ErrorHandler.unauthorized('Unauthorized'));
        }
        const tokenDecoded = jwt.verify(token, process.env.SECRET_KEY as string);
        req.user = tokenDecoded;
        next();
    } catch(err) {
        return next(ErrorHandler.unauthorized((err as Error).message));
    }
}