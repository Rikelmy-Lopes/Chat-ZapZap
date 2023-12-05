import { IUser, IServiceResponse } from './../Interface/UserInterface';
import * as jwt from '../Utils/JWT';
import { checkPassword } from '../Utils/BCrypt';
import { IUserRepository } from '../Interface/Repository/IUserRepository';
import { IUserService } from '../Interface/Service/IUserService';

export class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async validateUser(phoneNumber: string, password: string): Promise<IServiceResponse> {
    const result = await this.userRepository.findByPhoneNumber(phoneNumber);
    if (!result) {
      return { success: false, message: 'User not Found'};
    }
    if (await checkPassword(password, result.password)) {
      const { name, phoneNumber } = result;
      const token = jwt.createToken(name, phoneNumber);
      return { success: true, message: 'Success', data: { name, phoneNumber, token }};
    } else {
      return { success: false, message: 'Password not Correct'};
    }
  }

  public validateToken(token: string): IServiceResponse {
    const isValid = jwt.validateToken(token.replace('Bearer ', ''));
    if (isValid) return {success: true, message: 'Token Valid'};
    return { success: false, message: 'Invalid Token' };
  }

  public async save(user: IUser): Promise<IServiceResponse> {
    const userAlreadyExist = await this.userRepository.findByPhoneNumber(user.phoneNumber);

    if (userAlreadyExist) return { success: false, message: 'User already Exist' };
    const { name, phoneNumber } = await this.userRepository.save(user);
    const result = { name, phoneNumber, token: jwt.createToken( name, phoneNumber)};
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
