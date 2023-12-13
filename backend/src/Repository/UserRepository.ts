import { IUserRepository } from '../Interface/Repository/IUserRepository';
import { IUser } from '../Interface/UserInterface';
import { IBCrypt } from '../Interface/Utils/IBCrypt';
import { UserModel } from '../database/SQL/model/UserModel';


export class UserRepository implements IUserRepository {
  private userModel: typeof UserModel;
  private bcrypt: IBCrypt;

  constructor(userModel: typeof UserModel, bcrypt: IBCrypt) {
    this.userModel = userModel;
    this.bcrypt = bcrypt;
  }

  public async findByPhoneNumber(phoneNumber: string): Promise<UserModel | null> {
    const result = await this.userModel.findOne({
      where: { phoneNumber },
      raw: true
    });

    return result;
  }

  public async save(user: IUser): Promise<UserModel> {
    const createdUser = await this.userModel.create({
      phoneNumber: user.phoneNumber,
      name: user.name,
      password: await this.bcrypt.encrypt(user.password),
    },
    {
      raw: true
    });
    
    return createdUser;
  }
}