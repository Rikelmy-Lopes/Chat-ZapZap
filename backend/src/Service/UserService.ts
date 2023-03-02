import { IUser, IResult, IUserResponse } from './../Interface/UserInterface';
import * as jwt from '../Utils/JWT';
import UserModel from '../Model/UserModel';
import { checkPassword } from '../Utils/BCrypt';

class UserService {
  private model: UserModel;

  constructor() {
    this.model = new UserModel();
  }

  public async validateUser(phoneNumber: string, password: string): Promise<string | IUserResponse> {
    const result = await this.model.getUserByPhone(phoneNumber);
    if (!result) {
      return 'User not Found';
    }
    if (await checkPassword(password, result.password)) {
      const { id, name, phoneNumber } = result;
      return { name, phoneNumber, token: jwt.createToken(id, name, phoneNumber), };
    } else {
      return 'Password not Correct';
    }
  }

  public validateToken(token: string): IResult {
    const response = jwt.validateToken(token);
    if (response) return { error: null, result: 'Token Valid' };
    return { error: 'Invalid Token', result: null };
  }

  public async save(user: IUser): Promise<IResult> {
    const userAlreadyExist = await this.model.getUserByPhone(user.phoneNumber);

    if (userAlreadyExist) return { error: 'User already Exist', result: null };
    const { id, name, phoneNumber } = await this.model.save(user);
    return { error: null, result: jwt.createToken(id, name, phoneNumber) };
  }

  public async getUser(phoneNumber: string): Promise<IResult> {
    const result = await this.model.getUserByPhone(phoneNumber);

    if (result) return { error: null, result: 'User Found' };
    return { error: 'User not Found', result: null };
  }
}

export default UserService;