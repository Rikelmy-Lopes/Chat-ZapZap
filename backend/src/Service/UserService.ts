import { createToken } from '../Utils/JWT';
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
        return { error: null, result: createToken(id, name, phoneNumber) };
      } else {
        return { error: 'Password not correct', result: null };
      }
    }
    return { error: 'User not found', result: null };
  }
}

export default UserService;