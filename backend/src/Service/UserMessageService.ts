import { IServiceResponse } from '../Interface/UserInterface';
import UserMessageModel from '../Model/UserMessageModel';
import { decryptRoomId } from '../Utils/CryptoJs';

class UserMessageService {
  private model: UserMessageModel;

  constructor() {
    this.model = new UserMessageModel();
  }

  public async getMessage(hashRoomId: string): Promise<IServiceResponse> {
    const roomId = decryptRoomId(hashRoomId);
    const messages = await this.model.getMessages(roomId);
    return { success: true, message: 'Success', data: messages };
  }
}

export default UserMessageService;