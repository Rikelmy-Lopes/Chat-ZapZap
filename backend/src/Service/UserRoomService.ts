import UserRoomModel from '../Model/UserRoomModel';
import { IServiceResponse } from '../Interface/UserInterface';

class UserRoomService {
  private model: UserRoomModel;

  constructor() {
    this.model = new  UserRoomModel();
  }

  public async getAllRooms(phoneNumber: string): Promise<IServiceResponse> {
    const rooms = await this.model.getAllRooms(phoneNumber);

    // pega todos os contatos de dentro da room, exceto o próprio "phoneNumber"
    const filteredRoom = rooms.map(({ user1, user2 }) => {
      if (user1.phoneNumber !== phoneNumber){ 
        return user1;
      }
      return user2;
    });

    return { success: true, message: 'Success', data: filteredRoom };
  }
}

export default UserRoomService;