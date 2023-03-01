import UsersRoomModel from '../database/model/UsersRoom';
import UserModel from './UserModel';
import { Op, Sequelize } from 'sequelize';
import UsersModel from '../database/model/Users';

class UserRoomModel {
  private model: typeof UsersRoomModel;
  private userModel: UserModel;

  constructor () {
    this.model = UsersRoomModel;
    this.userModel = new UserModel();
  }

  public async getRoom(phoneNumber1: string, phoneNumber2: string): Promise<number | undefined> {
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
    return room?.roomId;
  }

  public async createRoom(phoneNumber1: string, phoneNumber2: string) {
    const user1 = await this.userModel.getUserByPhone(phoneNumber1);
    const user2 = await this.userModel.getUserByPhone(phoneNumber2);

    if (user1 && user2) {
      const { roomId } = await this.model.create({ userId1: user1.id, userId2: user2.id });
      return String(roomId);
    }

  }
}


export default UserRoomModel;