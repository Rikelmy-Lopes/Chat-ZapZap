import { IUser } from '../Interface/UserInterface';
import { IUserService } from '../Interface/Service/IUserService';
import { NextFunction, Request, Response } from 'express';

export class UserController {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { phoneNumber, password } = req.body;
      const data = await this.userService.login(phoneNumber, password);
      return res.status(200).json(data);

    } catch (error) {
      next(error);
    }
  }

  public validateToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;
      const { success, message } = this.userService.validateToken(String(authorization));
      if (success) return res.status(200).json({ message });
      return res.status(403).json({ message });
    } catch (error) {
      next(error);
    }
  }

  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      
      const user = req.body as IUser;
      const data = await this.userService.register(user);
      return res.status(201).json(data);

    } catch (error) {
      next(error);
    }
  }

  public async getUser(req: Request, res: Response, next: NextFunction) {
    try {

      const { phoneNumber } = req.params;
      const data = await this.userService.findByPhoneNumber(phoneNumber);
      return res.status(200).json(data);
      
    } catch (error) {
      next(error);
    }
  }

}