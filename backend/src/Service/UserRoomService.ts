import { IUserRoomRepository } from '../Interface/Repository/IUserRoomRepository';
import { IUserRoomService } from '../Interface/Service/IUserRoomService';

export class UserRoomService implements IUserRoomService {
  private userRoomRepository: IUserRoomRepository;

  constructor(userRoomRepository: IUserRoomRepository) {
    this.userRoomRepository = userRoomRepository;
  }

  public async findAllByPhoneNumber(phoneNumber: string): Promise<unknown> {
    const rooms = await this.userRoomRepository.findAllByPhoneNumber(phoneNumber);

    // pega todos os contatos de dentro da room, exceto o próprio "phoneNumber"
    const filteredRoom = rooms.map(({ user1, user2 }) => {
      if (user1.phoneNumber !== phoneNumber){ 
        return user1;
      }
      return user2;
    });

    return filteredRoom;
  }
}