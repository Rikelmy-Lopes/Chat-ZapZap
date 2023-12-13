import { BadRequestException } from './../exception/http/BadRequestException';
import { Response, Request, NextFunction } from 'express';
import { ZodError, z } from 'zod';
import { IAuthMiddleware } from '../Interface/Middleware/IAuthMiddleware';

export class AuthMiddleware implements IAuthMiddleware {

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.body;
      const loginSchema = z.object({
        phoneNumber: z.string().min(9),
        password: z.string().min(4),
      });

      await loginSchema.parseAsync(user);

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessage = JSON.parse(error.message);
        next(new BadRequestException(errorMessage));
      }
      next(error);
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.body;
      const userSchema = z.object({
        name: z.string(),
        password: z.string().min(4),
        phoneNumber: z.string().min(9),
      });

      await userSchema.parseAsync(user);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessage = JSON.parse(error.message);
        next(new BadRequestException(errorMessage));
      }
      next(error);
    }
  }

  async validateToken(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers;
    try {
      const authSchema = z.object({
        authorization: z.string(),
      });
  
      await authSchema.parseAsync(headers);

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessage = JSON.parse(error.message);
        return next(new BadRequestException(errorMessage));
      }
      next(error);
    }

  }
}
