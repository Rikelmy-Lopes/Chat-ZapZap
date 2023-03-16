import UserMessage from '../database/model/UserMessage';
import User from '../database/model/User';
import UserModel from './UserModel';

class UserMessageModel {
  private model: typeof UserMessage;
  private userModel: UserModel;

  constructor(){
    this.model = UserMessage;
    this.userModel = new UserModel();
  }

  public async saveMessage(message: string, roomId: string, phoneNumber: string) {
    const { id } = await this.userModel.getUserByPhone(phoneNumber) as User;
    this.model.create({ userId: id, roomId, message });
  }
}

export default UserMessageModel;