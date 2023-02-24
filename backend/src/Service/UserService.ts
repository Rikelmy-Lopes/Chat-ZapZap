import UserModel from '../Model/UserModel';

class UserService {
  private model: UserModel;

  constructor() {
    this.model = new UserModel();
  }

  public async isUserExist(phoneNumber: string, password: string): Promise<boolean> {
    const result = await this.model.getUSer(phoneNumber, password);
    
    if(result) return true;

    return false;
  }
}

export default UserService;