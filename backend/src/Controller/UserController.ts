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
    const result  = await this.service.validateUser(phoneNumber, password);
    if (result === 'User not Found') {
      return this.response.status(404).json({ message: result });
    }
    if (result === 'Password not Correct') {
      return this.response.status(401).json({ message: result });
    }
    return this.response.status(200).json(result);
  }

  public validateToken() {
    const { token } = this.request.body;
    const { error, result } = this.service.validateToken(token);
    if (error) return this.response.status(403).json({ message: error });
    return this.response.status(200).json({ message: result });
  }

  public async save() {
    const user = this.request.body as IUser;
    const { error, result } = await this.service.save(user);
    if (error) return this.response.status(409).json({ message: error });
    return this.response.status(201).json({ token: result });
  }

  public async getUser() {
    const { phoneNumber } = this.request.params;
    const { error, result } = await this.service.getUser(phoneNumber);
    if (error) return this.response.status(404).json({ message: error });
    return this.response.status(200).json({ message: result });
  }

}

export default UserController;