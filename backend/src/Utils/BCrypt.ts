import bcrypt from 'bcrypt';
import { IBCrypt } from '../Interface/Utils/IBCrypt';


export class BCrypt implements IBCrypt {

  async encrypt(data: string): Promise<string> {
    return await bcrypt.hash(data, 12);
  }

  async validate(data: string, hashedData: string): Promise<boolean> {
    return await bcrypt.compare(data, hashedData);
  }

}
