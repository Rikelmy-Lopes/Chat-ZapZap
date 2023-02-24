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

  public async validateUser() {
    const { phoneNumber, password } = this.request.body;
    const { error, result }  = await this.service.validateUser(phoneNumber, password);
    if (error === 'User not found') {
      return this.response.status(404).json({ message: error });
    }
    if (error === 'Password not correct') {
      return this.response.status(401).json({ message: error });
    }
    return this.response.status(200).json(result);
  }

  

}

export default UserController;