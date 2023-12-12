import { Request, Response, NextFunction } from 'express';
import { ZodError, z } from 'zod';
import { BadRequestException } from '../exception/http/BadRequestException';

export class UserMiddleware {


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
      // must return a http 400
      next(error);
    }
  }

  async validateGetUser(req: Request, res: Response, next: NextFunction) {
    try {
      const params = req.params;

      const phoneNumberSchema = z.object({
        phoneNumber: z.string().min(9)
      });

      await phoneNumberSchema.parse(params);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessage = JSON.parse((error as Error).message);
        return next(new BadRequestException(errorMessage));
      }
      next(error);
    }
  }
}