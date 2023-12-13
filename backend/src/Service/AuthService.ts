import { IAuthService } from '../Interface/Service/IAuthService';
import { IUser } from '../Interface/UserInterface';
import { IUserRepository } from '../Interface/Repository/IUserRepository';
import { NotFoundException } from '../exception/http/NotFoundException';
import { IBCrypt } from '../Interface/Utils/IBCrypt';
import { UnauthorizedException } from '../exception/http/UnauthorizedException';
import { IJwt } from '../Interface/Utils/IJwt';
import { ConflictException } from '../exception/http/ConflictException';


export class AuthService implements IAuthService {
  private userRepository: IUserRepository;
  private bcrypt: IBCrypt;
  private jwt: IJwt;

  constructor(userRepository: IUserRepository, bcrypt: IBCrypt, jwt: IJwt) {
    this.userRepository = userRepository;
    this.bcrypt = bcrypt;
    this.jwt = jwt;
  }
    
  async login(phoneNumber: string, password: string): Promise<unknown> {
    const user = await this.userRepository.findByPhoneNumber(phoneNumber);
    if (!user) {
      throw new NotFoundException('User not Found');
    }
    if (!(await this.bcrypt.validate(password, user.password))) { 
      throw new UnauthorizedException('Password is not Correct');
    }
    const { name } = user;
    const token = this.jwt.create({ name, phoneNumber });
    return { name, phoneNumber, token };
  }

  async register(user: IUser): Promise<unknown> {
    const retrievedUser = await this.userRepository.findByPhoneNumber(user.phoneNumber);

    if (retrievedUser) {
      throw new ConflictException('User already Exist');
    }
    
    const { name, phoneNumber } = await this.userRepository.save(user);
    const token = this.jwt.create({ name, phoneNumber });
    return { name, phoneNumber, token };
  }

  validateToken(authorization: string): void {
    const token = authorization.replace('Bearer ', '');
    
    if (this.jwt.verify(token)) {
      return;
    }

    throw new UnauthorizedException('Token is not valid');
  }
    
}