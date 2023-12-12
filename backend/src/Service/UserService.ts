import { IUser, IServiceResponse } from './../Interface/UserInterface';
import { IUserRepository } from '../Interface/Repository/IUserRepository';
import { IUserService } from '../Interface/Service/IUserService';
import { IBCrypt } from '../Interface/Utils/IBCrypt';
import { IJwt } from '../Interface/Utils/IJwt';
import { NotFoundException } from '../exception/http/NotFoundException';
import { UnauthorizedException } from '../exception/http/UnauthorizedException';
import { ConflictException } from '../exception/http/ConflictException';

export class UserService implements IUserService {
  private userRepository: IUserRepository;
  private bcrypt: IBCrypt;
  private jwt: IJwt;

  constructor(userRepository: IUserRepository, bcrypt: IBCrypt, jwt: IJwt) {
    this.userRepository = userRepository;
    this.bcrypt = bcrypt;
    this.jwt = jwt;
  }

  public async login(phoneNumber: string, password: string): Promise<unknown> {
    const result = await this.userRepository.findByPhoneNumber(phoneNumber);
    if (!result) {
      throw new NotFoundException('User not Found');
    }
    if (!(await this.bcrypt.validate(password, result.password))) { 
      throw new UnauthorizedException('Password is not Correct');
    }
    const { name } = result;
    const token = this.jwt.create({ name, phoneNumber });
    return { name, phoneNumber, token };
  }

  public validateToken(token: string): IServiceResponse {
    const isValid = this.jwt.verify(token.replace('Bearer ', ''));
    if (isValid) return {success: true, message: 'Token Valid'};
    return { success: false, message: 'Invalid Token' };
  }

  public async register(user: IUser): Promise<unknown> {
    const retrievedUser = await this.userRepository.findByPhoneNumber(user.phoneNumber);

    if (retrievedUser) {
      throw new ConflictException('User already Exist');
    }
    const { name, phoneNumber } = await this.userRepository.save(user);
    const token = this.jwt.create({ name, phoneNumber });
    return { name, phoneNumber, token };
  }

  public async findByPhoneNumber(phoneNumber: string): Promise<unknown> {
    const user = await this.userRepository.findByPhoneNumber(phoneNumber);
    if (!user) {
      throw new NotFoundException('User not Found');
    }
    const { name } = user;
    
    return  { name, phoneNumber };
  }
}
