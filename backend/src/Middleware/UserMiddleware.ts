import { IUser } from './../Interface/UserInterface';
import { Response, Request, NextFunction } from 'express';

class UserMiddleware {
  private response: Response;
  private request: Request;
  private next: NextFunction;
  private ERROR_MESSAGE_FIELDS: string;
  private ERROR_MESSAGE_TOKEN: string;
  
  constructor(request: Request, response: Response, next: NextFunction) {
    this.request = request;
    this.response = response;
    this.next = next;
    this.ERROR_MESSAGE_FIELDS = 'All fields must be filled out';
    this.ERROR_MESSAGE_TOKEN = 'The token must be filled out';
  }

  public validateLogin() {
    const { phoneNumber, password } = this.request.body;
    if (!phoneNumber || !password) {
      return this.response.status(400).json({ message: this.ERROR_MESSAGE_FIELDS});
    }

    this.next();
  }

  public validateToken() {
    const { authorization } = this.request.headers;
    if (!authorization) {
      return this.response.status(400).json({ message: this.ERROR_MESSAGE_TOKEN });
    }
    
    this.next();
  }

  public validateUser() {
    const user = this.request.body as IUser;
    if (!user.name || !user.password || !user.phoneNumber) {
      return this.response.status(400).json({ message: this.ERROR_MESSAGE_FIELDS });
    }

    this.next();
  }

  public validateGetUser() {
    const { phoneNumber } = this.request.params;
    if (!phoneNumber) {
      return this.response.status(400).json({ message: this.ERROR_MESSAGE_FIELDS});
    }

    this.next();
  }
}

export default UserMiddleware;