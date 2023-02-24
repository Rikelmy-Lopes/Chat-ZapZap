import * as jwt from '../Utils/JWT';
import UserModel from '../Model/UserModel';
import { IResult } from '../Interface/UserInterface';

class UserService {
  private model: UserModel;

  constructor() {
    this.model = new UserModel();
  }

  public async validateUser(phoneNumber: string, password: string): Promise<IResult> {
    const result = await this.model.getUserByPhone(phoneNumber);
    if (result) {
      if (result.password === password) {
        const { id, name, phoneNumber } = result;
        return { error: null, result: jwt.createToken(id, name, phoneNumber) };
      } else {
        return { error: 'Password not correct', result: null };
      }
    }
    return { error: 'User not found', result: null };
  }

  public validateToken(token: string): IResult {
    const response = jwt.validateToken(token);
    if (response) return { error: null, result: 'Token Valid' };
    return { error: 'Invalid Token', result: null };
  }
}

export default UserService;