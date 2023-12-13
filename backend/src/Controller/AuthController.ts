import { NextFunction, Request, Response } from 'express';
import { IJwt } from '../Interface/Utils/IJwt';
import { IAuthService } from '../Interface/Service/IAuthService';
import { IUser } from '../Interface/UserInterface';

export class AuthController {
  private authService: IAuthService;
  private jwt: IJwt;
    
  constructor(authService: IAuthService, jwt: IJwt) {
    this.authService = authService;
    this.jwt = jwt;
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {

      const { phoneNumber, password } = req.body;
      const data = await this.authService.login(phoneNumber, password);
      return res.status(200).json(data);

    } catch (error) {
      next(error);
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {

      const user = req.body as IUser;
      const data = await this.authService.register(user);
      return res.status(201).json(data);

    } catch (error) {
      next(error);
    }
  }
    

  async validateToken(req: Request, res: Response, next: NextFunction) {
    try {
      const authorization = req.headers.authorization as string;

      this.authService.validateToken(authorization);

      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  }

}