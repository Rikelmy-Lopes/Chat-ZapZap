import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../exception/http/AbstractHttpException';


export class ErrorMiddleware {

  async handler(error: HttpException, _req: Request, res: Response, _next: NextFunction) {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Something went wrong!';

    return res.status(statusCode).json({ success: false, message });
  }
}