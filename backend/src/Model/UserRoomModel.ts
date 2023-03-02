import UsersRoomModel from '../database/model/UsersRoom';
import UserModel from './UserModel';
import { Op } from 'sequelize';
import UsersModel from '../database/model/Users';

class UserRoomModel {
  private model: typeof UsersRoomModel;
  private userModel: UserModel;

  constructor () {
    this.model = UsersRoomModel;
    this.userModel = new UserModel();
  }

  public async getRoom(phoneNumber1: string, phoneNumber2: string): Promise<string | undefined> {
    const room = await UsersRoomModel.findOne({
      include: [
        { model: UsersModel, 
          as: 'user1', 
          attributes: ['phoneNumber'],
          where: {
            phoneNumber: {
              [Op.or]: [phoneNumber1, phoneNumber2]
            }
          } },
        { model: UsersModel, 
          as: 'user2', 
          attributes: ['phoneNumber'],
          where: {
            phoneNumber: {
              [Op.or]: [phoneNumber1, phoneNumber2]
            }
          } },
      ],
    },
    );
    return room?.roomId ? String(room.roomId) : undefined;
  }

  public async createRoom(phoneNumber1: string, phoneNumber2: string): Promise<string | undefined> {
    const user1: UsersModel | null = await this.userModel.getUserByPhone(phoneNumber1);
    const user2:UsersModel | null = await this.userModel.getUserByPhone(phoneNumber2);

    if (user1 && user2) {
      const { roomId }: UsersRoomModel = await this.model.create({ userId1: user1.id, userId2: user2.id });
      return String(roomId);
    }
    return;
  }
}


export default UserRoomModel;