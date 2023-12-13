import { NextFunction, Request, Response } from 'express';


export interface IAuthMiddleware {
    validateToken(req: Request, res: Response, next: NextFunction): Promise<unknown>
    login(req: Request, res: Response, next: NextFunction): Promise<unknown>
    register(req: Request, res: Response, next: NextFunction): Promise<unknown>
}