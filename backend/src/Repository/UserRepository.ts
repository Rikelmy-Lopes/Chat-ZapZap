import { IUserRepository } from '../Interface/Repository/IUserRepository';
import { IUser } from '../Interface/UserInterface';
import { encryptPassword } from '../Utils/BCrypt';
import { UserModel } from '../database/SQL/model/UserModel';


export class UserRepository implements IUserRepository {
  private userModel: typeof UserModel;

  constructor(userModel: typeof UserModel) {
    this.userModel = userModel;
  }

  public async findByPhoneNumber(phoneNumber: string): Promise<UserModel | null> {
    const result = await this.userModel.findOne({
      where: { phoneNumber },
      raw: true
    });

    return result;
  }

  public async save(user: IUser): Promise<UserModel> {
    const result = await this.userModel.create({
      phoneNumber: user.phoneNumber,
      name: user.name,
      password: await encryptPassword(user.password),
    },
    {
      raw: true
    });
    
    return result;
  }
}