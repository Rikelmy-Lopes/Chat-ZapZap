import { Response, Request, NextFunction } from 'express';
import { IUserRoomService } from '../Interface/Service/IUserRoomService';

export class UserRoomController {
  private userRoomService: IUserRoomService;

  constructor(userRoomService: IUserRoomService) {
    this.userRoomService = userRoomService;
  }

  public async getAllRooms(req: Request, res: Response, next: NextFunction) {
    try {
      const { phonenumber: phoneNumber } = req.headers;

      const data = await this.userRoomService.findAllByPhoneNumber(String(phoneNumber));
      
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}