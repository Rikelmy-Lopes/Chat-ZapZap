import { IUser, IServiceResponse } from './../Interface/UserInterface';
import { IUserRepository } from '../Interface/Repository/IUserRepository';
import { IUserService } from '../Interface/Service/IUserService';
import { IBCrypt } from '../Interface/Utils/IBCrypt';
import { IJwt } from '../Interface/Utils/IJwt';

export class UserService implements IUserService {
  private userRepository: IUserRepository;
  private bcrypt: IBCrypt;
  private jwt: IJwt;

  constructor(userRepository: IUserRepository, bcrypt: IBCrypt, jwt: IJwt) {
    this.userRepository = userRepository;
    this.bcrypt = bcrypt;
    this.jwt = jwt;
  }

  public async validateUser(phoneNumber: string, password: string): Promise<IServiceResponse> {
    const result = await this.userRepository.findByPhoneNumber(phoneNumber);
    if (!result) {
      return { success: false, message: 'User not Found'};
    }
    if (await this.bcrypt.validate(password, result.password)) {
      const { name, phoneNumber } = result;
      const token = this.jwt.create({ name, phoneNumber });
      return { success: true, message: 'Success', data: { name, phoneNumber, token }};
    } else {
      return { success: false, message: 'Password not Correct'};
    }
  }

  public validateToken(token: string): IServiceResponse {
    const isValid = this.jwt.verify(token.replace('Bearer ', ''));
    if (isValid) return {success: true, message: 'Token Valid'};
    return { success: false, message: 'Invalid Token' };
  }

  public async save(user: IUser): Promise<IServiceResponse> {
    const userAlreadyExist = await this.userRepository.findByPhoneNumber(user.phoneNumber);

    if (userAlreadyExist) return { success: false, message: 'User already Exist' };
    const { name, phoneNumber } = await this.userRepository.save(user);
    const result = { name, phoneNumber, token: this.jwt.create({ name, phoneNumber })};
    return { success: true, message: 'Success', data: result };
  }

  public async findByPhoneNumber(phoneNumber: string): Promise<IServiceResponse> {
    const result = await this.userRepository.findByPhoneNumber(phoneNumber);

    if (result) return { success: true, message: 'User Found', data: {
      name: result.name,
      phoneNumber: result.phoneNumber
    } };
    return {  success: false,  message: 'User not Found' };
  }
}
