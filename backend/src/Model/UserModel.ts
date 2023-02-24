import Users from '../database/model/Users';


class UserModel {
  private model: typeof Users;

  constructor() {
    this.model = Users;
  }

  public async getUSer(phoneNumber: string, password: string): Promise<Users | null> {
    const result = await this.model.findOne({ where: { phoneNumber, password }});

    return result;
  }
}

export default UserModel;