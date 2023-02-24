import Users from '../database/model/Users';


class UserModel {
  private model: typeof Users;

  constructor() {
    this.model = Users;
  }

  public async getUserByPhone(phoneNumber: string): Promise<Users | null> {
    const result = await this.model.findOne({ where: { phoneNumber }});

    return result;
  }
}

export default UserModel;