import { Response, Request } from 'express';
import { IUser } from '../Interface/UserInterface';
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

  public async validateLogin() {
    const { phoneNumber, password } = this.request.body;
    const { success, message, data }  = await this.service.validateUser(phoneNumber, password);
    if (success) return this.response.status(200).json(data);
    if (message === 'User not Found') {
      return this.response.status(404).json({ message });
    }
    if (message === 'Password not Correct') {
      return this.response.status(401).json({ message });
    }
  }

  public validateToken() {
    const { authorization } = this.request.headers;
    const { success, message } = this.service.validateToken(String(authorization));
    if (success) return this.response.status(200).json({ message });
    return this.response.status(403).json({ message });
  }

  public async save() {
    const user = this.request.body as IUser;
    const { success, data, message } = await this.service.save(user);
    if (success) return this.response.status(201).json(data);
    return this.response.status(409).json({ message });
  }

  public async getUser() {
    const { phoneNumber } = this.request.params;
    const { success, message, data } = await this.service.getUser(phoneNumber);
    if (success) return this.response.status(200).json(data);
    return this.response.status(404).json({ message });
  }

}

export default UserController;