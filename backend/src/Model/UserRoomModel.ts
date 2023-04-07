import UserRoom from '../database/SQL/model/UserRoom';
import User from '../database/SQL/model/User';
import UserModel from './UserModel';
import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

class UserRoomModel {
  private model: typeof UserRoom;
  private userModel: UserModel;

  constructor () {
    this.model = UserRoom;
    this.userModel = new UserModel();
  }

  public async getRoom(phoneNumber1: string, phoneNumber2: string): Promise<string | undefined> {
    const room = await UserRoom.findOne({
      where: {
        [Op.or]: [
          { '$user1.phone_number$': phoneNumber1, '$user2.phone_number$': phoneNumber2 },
          { '$user1.phone_number$': phoneNumber2, '$user2.phone_number$': phoneNumber1 }
        ]
      },
      include: [
        { model: User, 
          as: 'user1', 
          attributes: ['phoneNumber'] 
        },
        { model: User, 
          as: 'user2', 
          attributes: ['phoneNumber'] 
        },
      ],
    },
    );
    return room?.roomId ? String(room.roomId) : undefined;
  }

  public async createRoom(phoneNumber1: string, phoneNumber2: string): Promise<string | undefined> {
    const [ user1, user2 ] = await  Promise.all([
      this.userModel.getUserByPhone(phoneNumber1),
      this.userModel.getUserByPhone(phoneNumber2),
    ]);
    if (user1 && user2) {
      const { roomId }: UserRoom = await this.model.create({ 
        roomId: uuidv4(), 
        userId1: user1.id, 
        userId2: user2.id });

      return String(roomId);
    }
    return;
  }
}


export default UserRoomModel;