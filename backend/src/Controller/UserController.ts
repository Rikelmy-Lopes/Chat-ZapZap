import { IUserService } from '../Interface/Service/IUserService';
import { NextFunction, Request, Response } from 'express';

export class UserController {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
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