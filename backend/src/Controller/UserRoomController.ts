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

      const { success, data } = await this.userRoomService.findAllByPhoneNumber(String(phoneNumber));
      if (success) {
        return res.status(200).json(data);
      } 
    } catch (error) {
      next(error);
    }
  }
}