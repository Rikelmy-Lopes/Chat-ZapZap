import { Response, Request, NextFunction } from 'express';
import * as jwt from '../Utils/JWT';

class AuthMiddleware {
  private response: Response;
  private request: Request;
  private next: NextFunction;
  private ERROR_MESSAGE_TOKEN: string;

  constructor(request: Request, response: Response, next: NextFunction) {
    this.request = request;
    this.response = response;
    this.next = next;
    this.ERROR_MESSAGE_TOKEN = 'The token must be filled out';
  }

  public isTokenValid() {
    const { authorization } = this.request.headers;
    const isValid = jwt.validateToken(String(authorization).replace('Bearer ', ''));
    if (isValid) return this.response.status(200).json({ message: 'Success' });
    return this.response.status(401).json({ message: 'Failed' });
  }

  public validateToken() {
    const { authorization } = this.request.headers;
    const isValid = jwt.validateToken(String(authorization).replace('Bearer ', ''));
    if(isValid) return this.next();
    return this.response.status(401).json({ message: 'Unauthorized'});
  }

  public isTokenAvailable() {
    const { authorization } = this.request.headers;
    if (!authorization) {
      return this.response.status(400).json({ message: this.ERROR_MESSAGE_TOKEN });
    }
    
    this.next();
  }
}

export default AuthMiddleware;