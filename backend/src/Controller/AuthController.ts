import { BadRequestException } from './../exception/http/BadRequestException';
import { NextFunction, Request, Response } from 'express';
import { ZodError, z } from 'zod';
import { IJwt } from '../Interface/Utils/IJwt';
import { UnauthorizedException } from '../exception/http/UnauthorizedException';

export class AuthController {
  private jwt: IJwt;
    
  constructor(jwt: IJwt) {
    this.jwt = jwt;
  }
    

  async validateToken(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers;
    try {

      const authSchema = z.object({
        authorization: z.string(),
      });
  
      await authSchema.parseAsync(headers);

      const token = (headers.authorization as string).replace('Bearer ', '');

      if(this.jwt.verify(token)) {
        return res.status(200).json({ success: true });
      }

      throw new UnauthorizedException('Token is invalid');
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessage = JSON.parse(error.message);
        return next(new BadRequestException(errorMessage));
      }
      next(error);
    }
        
  }
}