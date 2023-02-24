import jwt from 'jsonwebtoken';

const createToken = (id: number, name: string, phoneNumber: string): string => {
  const secret = String(process.env.SECRET_KEY);
  const token = jwt.sign({ id, name, phoneNumber }, secret);
  return token;
};

export {
  createToken
};