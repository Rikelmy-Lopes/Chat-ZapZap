import { Response, Request, NextFunction } from 'express';
import * as jwt from '../Utils/JWT';

export class AuthMiddleware {


  public isTokenValid(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    try {
      const isValid = jwt.validateToken(String(authorization).replace('Bearer ', ''));
      if (isValid) return res.status(200).json({ message: 'Success' });
      return res.status(401).json({ message: 'Failed' });
    } catch (error) {
      next(error);
    }
  }

  public validateToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    try {
      const isValid = jwt.validateToken(String(authorization).replace('Bearer ', ''));
      if(isValid) return next();
      return res.status(401).json({ message: 'Unauthorized'});
    } catch (error) {
      next(error);
    }
  }

  public isTokenAvailable(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    try {
      if (!authorization) {
        return res.status(400).json({ message: 'message' });
      }
      
      next();
    } catch (error) {
      next(error);
    }
  }
}
