import { Response, Request } from 'express';
import UserRoomService from '../Service/UserRoomService';

class UserRoomController {
  private response: Response;
  private request: Request;
  private service: UserRoomService;

  constructor(request: Request, response: Response) {
    this.service = new UserRoomService();
    this.request = request;
    this.response = response;
  }

  public async getAllRooms() {
    const { phonenumber: phoneNumber } = this.request.headers;

    const { success, data } = await this.service.getAllRooms(String(phoneNumber));
    if (success) {
      return this.response.status(200).json(data);
    } 
  }
}

export default UserRoomController;