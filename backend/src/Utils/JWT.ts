import jwt from 'jsonwebtoken';
import { config } from '../config/config';

const createToken = (name: string, phoneNumber: string): string => {
  const secret = config.security.jwtSecret;
  const token = jwt.sign({name, phoneNumber }, secret);
  return token;
};

const validateToken = (token: string): boolean => {
  const secret = config.security.jwtSecret;
  try {
    jwt.verify(token, secret);
    return true;
  } catch (_error) {
    return false;
  }
};

export {
  createToken,
  validateToken,
};