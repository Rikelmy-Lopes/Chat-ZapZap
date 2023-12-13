import { Request, Response, NextFunction } from 'express';
import { ZodError, z } from 'zod';
import { BadRequestException } from '../exception/http/BadRequestException';

export class UserMiddleware {

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