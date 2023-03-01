import { Response, Request } from 'express';
import UserRoomModel from '../Model/UserRoomModel';
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

  public async validateUser() {
    const { phoneNumber, password } = this.request.body;
    const { error, result }  = await this.service.validateUser(phoneNumber, password);
    if (error === 'User not found') {
      return this.response.status(404).json({ message: error });
    }
    if (error === 'Password not correct') {
      return this.response.status(401).json({ message: error });
    }
    return this.response.status(200).json({ token: result });
  }

  public validateToken() {
    const { token } = this.request.body;
    const { error, result } = this.service.validateToken(token);
    if (error) return this.response.status(403).json({ message: error });
    return this.response.status(200).json({ message: result });
  }

  public async addUser() {
    const user = this.request.body as IUser;
    const { error, result } = await this.service.addUser(user);
    if (error) return this.response.status(409).json({ message: error });
    return this.response.status(201).json({ token: result });
  }

  async testTest() {
    const { phoneNumber1, phoneNumber2 } = this.request.body;
    const result = await new UserRoomModel().getRoom(phoneNumber1, phoneNumber2);

    this.response.status(200).json({ result });
  }

}

export default UserController;