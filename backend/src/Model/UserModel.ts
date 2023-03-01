import { IUser } from '../Interface/UserInterface';
import Users from '../database/model/Users';
import { encryptPassword } from '../Utils/BCrypt';


class UserModel {
  private model: typeof Users;

  constructor() {
    this.model = Users;
  }

  public async getUserByPhone(phoneNumber: string): Promise<Users | null> {
    const result = await this.model.findOne({ where: { phoneNumber }});

    return result;
  }

  public async save(user: IUser): Promise<Users> {
    const result = await this.model.create({
      name: user.name,
      password: await encryptPassword(user.password),
      phoneNumber: user.phoneNumber
    });
    return result;
  }
}

export default UserModel;