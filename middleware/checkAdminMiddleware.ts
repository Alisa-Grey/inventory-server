import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import ErrorHandler from './errorMiddleware';

declare module 'jsonwebtoken' {
    export interface RoleJwtPayload extends jwt.JwtPayload {
        isAdmin: boolean
    }
}

export default function(param: boolean) {
    return function (req: Request, res: Response, next: NextFunction) {
        try {
            const token = <string>req.headers.authorization
            const tokenDecoded = jwt.verify(token, process.env.SECRET_KEY as string);
            res.locals.tokenDecoded = tokenDecoded
            const isAdmin = res.locals.tokenDecoded.data;
            if (isAdmin !== param) {
                return res.status(403).json({message: 'Forbidden'});
            }
            next();
        } catch(err) {
            return next(ErrorHandler.unauthorized((err as Error).message));
        }
    }
}
