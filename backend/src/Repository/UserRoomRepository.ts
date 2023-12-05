import { UserModel } from '../database/SQL/model/UserModel';
import { UserRoomModel } from '../database/SQL/model/UserRoomModel';
import { Op } from 'sequelize';
import { UserRepository } from './UserRepository';
import { v4 as uuidv4 } from 'uuid';
import { IAllRooms, IUserRoomRepository } from '../Interface/Repository/IUserRoomRepository';


export class UserRoomRepository implements IUserRoomRepository {
  private userRoomModel: typeof UserRoomModel;
  private userRepository: UserRepository;

  constructor(userRoomModel: typeof UserRoomModel, userRepository: UserRepository) {
    this.userRoomModel = userRoomModel;
    this.userRepository = userRepository;
  }

  public async findAllByPhoneNumber(phoneNumber: string): Promise<IAllRooms[]> {
    const rooms = this.userRoomModel.findAll({
      attributes: { exclude: ['roomId', 'phoneNumber1', 'phoneNumber2']},
      where: {
        [Op.or]: [
          { '$user1.phone_number$': phoneNumber }, 
          { '$user2.phone_number$': phoneNumber },
        ]
      },
      include: [
        { 
          model: UserModel, 
          as: 'user1',
          attributes: { exclude: ['password' ]}
        },
        { model: UserModel, 
          as: 'user2',
          attributes: { exclude: ['password' ]}
        }
      ]}) as unknown;

    return rooms as IAllRooms[];
  }

  public async findOne(phoneNumber1: string, phoneNumber2: string): Promise<string | null> {
    const room = await this.userRoomModel.findOne({
      where: {
        [Op.or]: [
          { '$user1.phone_number$': phoneNumber1, '$user2.phone_number$': phoneNumber2 },
          { '$user1.phone_number$': phoneNumber2, '$user2.phone_number$': phoneNumber1 }
        ]
      },
      include: [
        { model: UserModel, 
          as: 'user1', 
          attributes: ['phoneNumber'] 
        },
        { model: UserModel, 
          as: 'user2', 
          attributes: ['phoneNumber'] 
        },
      ],
    },
    );
    return room?.roomId ? String(room.roomId) : null;
  }

  public async save(phoneNumber1: string, phoneNumber2: string): Promise<string | null> {
    const [ user1, user2 ] = await  Promise.all([
      this.userRepository.findByPhoneNumber(phoneNumber1),
      this.userRepository.findByPhoneNumber(phoneNumber2),
    ]);

    if (!user1 || !user2) {
      return null;
    }

    const { roomId } = await this.userRoomModel.create({ 
      roomId: uuidv4(), 
      phoneNumber1: user1.phoneNumber, 
      phoneNumber2: user2.phoneNumber 
    });

    return String(roomId);
  }
}