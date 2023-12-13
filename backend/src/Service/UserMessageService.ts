import { IUserMessageRepository } from '../Interface/Repository/IUserMessageRepository';
import { IUserMessageService } from '../Interface/Service/IUserMessageService';
import { ICryptoHandler } from '../Interface/Utils/ICryptoHandler';

export class UserMessageService implements IUserMessageService {
  private userMessageRepository: IUserMessageRepository;
  private cryptoHandler: ICryptoHandler;

  constructor(userMessageRepository: IUserMessageRepository, cryptoHandler: ICryptoHandler) {
    this.userMessageRepository = userMessageRepository;
    this.cryptoHandler = cryptoHandler;
  }

  public async getMessages(encryptedRoomId: string): Promise<unknown> {
    const roomId = this.cryptoHandler.decrypt(encryptedRoomId);
    const messages = await this.userMessageRepository.findAllByRoomId(roomId);
    return messages;
  }
}