import { IUser, IServiceResponse, IUserResponse } from './../Interface/UserInterface';
import * as jwt from '../Utils/JWT';
import UserModel from '../Model/UserModel';
import { checkPassword } from '../Utils/BCrypt';
import UsersModel from '../database/model/User';

class UserService {
  private model: UserModel;

  constructor() {
    this.model = new UserModel();
  }

  public async validateUser(phoneNumber: string, password: string): Promise<IServiceResponse> {
    const result: UsersModel | null = await this.model.getUserByPhone(phoneNumber);
    if (!result) {
      return { success: false, message: 'User not Found'};
    }
    if (await checkPassword(password, result.password)) {
      const { id, name, phoneNumber } = result;
      const token = jwt.createToken(id, name, phoneNumber);
      return { success: true, message: 'Success', data: { name, phoneNumber, token }};
    } else {
      return { success: false, message: 'Password not Correct'};
    }
  }

  public validateToken(token: string): IServiceResponse {
    const response = jwt.validateToken(token);
    if (response) return {success: true, message: 'Token Valid'};
    return { success: false, message: 'Invalid Token' };
  }

  public async save(user: IUser): Promise<IServiceResponse> {
    const userAlreadyExist = await this.model.getUserByPhone(user.phoneNumber);

    if (userAlreadyExist) return { success: false, message: 'User already Exist' };
    const { id, name, phoneNumber } = await this.model.save(user);
    const result = { name, phoneNumber, token: jwt.createToken(id, name, phoneNumber)};
    return { success: true, message: 'Success', data: result };
  }

  public async getUser(phoneNumber: string): Promise<IServiceResponse> {
    const result = await this.model.getUserByPhone(phoneNumber);

    if (result) return { success: true, message: 'User Found' };
    return {  success: false,  message: 'User not Found' };
  }
}

export default UserService;