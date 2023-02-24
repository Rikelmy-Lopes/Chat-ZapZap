import { Response, Request } from 'express';
import UserService from '../Service/UserService';

class UserController {
  private response: Response;
  private request: Request;
  private service: UserService;

  constructor(request: Request, response: Response) {
    this.service = new UserService();
    this.request = request;
    this.response = response;
  }

  public async isUserExist() {
    const { phoneNumber, password } = this.request.body;
    const result  = await this.service.isUserExist(phoneNumber, password);
    if (result) return this.response.status(200).json({ message: 'User Exist'});
    return this.response.status(404).json({ message: 'User not Found'});
  }

}

export default UserController;