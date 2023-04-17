import UserRoom from '../database/SQL/model/UserRoom';
import User from '../database/SQL/model/User';
import UserModel from './UserModel';
import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

interface IAllRooms {
  user1: {
    phoneNumber: string,
    name: string,
  }
  user2: {
    phoneNumber: string,
    name: string,
  }
}

class UserRoomModel {
  private model: typeof UserRoom;
  private userModel: UserModel;

  constructor () {
    this.model = UserRoom;
    this.userModel = new UserModel();
  }

  public async getAllRooms(phoneNumber: string): Promise<IAllRooms[]> {
    const rooms = this.model.findAll({
      attributes: { exclude: ['roomId', 'phoneNumber1', 'phoneNumber2']},
      where: {
        [Op.or]: [
          { '$user1.phone_number$': phoneNumber }, 
          { '$user2.phone_number$': phoneNumber },
        ]
      },
      include: [
        { 
          model: User, 
          as: 'user1',
          attributes: { exclude: ['password' ]}
        },
        { model: User, 
          as: 'user2',
          attributes: { exclude: ['password' ]}
        }
      ]}) as unknown;

    return rooms as IAllRooms[];
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
        phoneNumber1: user1.phoneNumber, 
        phoneNumber2: user2.phoneNumber });

      return String(roomId);
    }
    return;
  }
}


export default UserRoomModel;