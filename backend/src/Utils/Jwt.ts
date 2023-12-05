import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { IJwt } from '../Interface/Utils/IJwt';


export class Jwt implements IJwt {
  
  create(data: object) {
    const secret = config.security.jwtSecret;
    return jwt.sign(data, secret);
  }

  verify(token: string) {
    const secret = config.security.jwtSecret;
    try {
      jwt.verify(token, secret);
      return true;
    } catch (_error) {
      return false;
    }
  }
}

