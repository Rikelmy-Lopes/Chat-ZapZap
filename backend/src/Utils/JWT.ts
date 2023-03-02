import jwt from 'jsonwebtoken';
import { IUserJWT } from '../Interface/UserInterface';

const createToken = (id: number, name: string, phoneNumber: string): string => {
  const secret = String(process.env.SECRET_KEY);
  const token = jwt.sign({ id, name, phoneNumber }, secret);
  return token;
};

const validateToken = (token: string): boolean => {
  const secret = String(process.env.SECRET_KEY);
  try {
    jwt.verify(token, secret);
    return true;
  } catch (_error) {
    return false;
  }
};

// const getInfoFromToken = (token: string): string | undefined => {
//   try {
//     const { phoneNumber } = jwt.decode(token) as IUserJWT;
//     return phoneNumber;
//   } catch (error) {
//     console.log(error);
//     return;
//   }
// };

export {
  createToken,
  validateToken,
  // getInfoFromToken
};