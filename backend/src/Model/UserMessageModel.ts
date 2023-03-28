import UserMessage from '../database/SQL/model/UserMessage';
import User from '../database/SQL/model/User';
import UserModel from './UserModel';
import { IMessage } from '../Interface/UserInterface';

class UserMessageModel {
  private model: typeof UserMessage;
  private userModel: UserModel;

  constructor(){
    this.model = UserMessage;
    this.userModel = new UserModel();
  }

  public async saveMessage(message: string, roomId: string, phoneNumber: string): Promise<void> {
    const { id } = await this.userModel.getUserByPhone(phoneNumber) as User;
    this.model.create({ userId: id, roomId, message });
  }

  public async getMessages(roomId: string): Promise<IMessage[]> {
    const messages = await this.model.findAll({
      where: { roomId },
      order: [
        ['createdAt', 'ASC']
      ],
      attributes: { exclude: ['userId', 'roomId', ] },
      include: [
        { model: User, as: 'user', attributes: ['name']}
      ]
    }) as unknown;
    return messages as IMessage[];
  }
}

export default UserMessageModel;