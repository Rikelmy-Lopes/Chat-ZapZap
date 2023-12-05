import { IServiceResponse } from '../Interface/UserInterface';
import { decryptRoomId } from '../Utils/CryptoJs';
import { IUserMessageRepository } from '../Interface/Repository/IUserMessageRepository';
import { IUserMessageService } from '../Interface/Service/IUserMessageService';

export class UserMessageService implements IUserMessageService {
  private userMessageRepository: IUserMessageRepository;

  constructor(userMessageRepository: IUserMessageRepository) {
    this.userMessageRepository = userMessageRepository;
  }

  public async getMessages(hashRoomId: string): Promise<IServiceResponse> {
    const roomId = decryptRoomId(hashRoomId);
    const messages = await this.userMessageRepository.findAllByRoomId(roomId);
    return { success: true, message: 'Success', data: messages };
  }
}