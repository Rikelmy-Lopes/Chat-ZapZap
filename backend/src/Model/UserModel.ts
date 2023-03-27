import User from '../database/SQL/model/User';
import { IUser } from '../Interface/UserInterface';
import { encryptPassword } from '../Utils/BCrypt';


class UserModel {
  private model: typeof User;

  constructor() {
    this.model = User;
  }

  public async getUserByPhone(phoneNumber: string): Promise<User | null> {
    const result: User | null = await this.model.findOne({ where: { phoneNumber }});

    return result;
  }

  public async save(user: IUser): Promise<User> {
    const result: User = await this.model.create({
      name: user.name,
      password: await encryptPassword(user.password),
      phoneNumber: user.phoneNumber
    });
    
    return result;
  }
}

export default UserModel;