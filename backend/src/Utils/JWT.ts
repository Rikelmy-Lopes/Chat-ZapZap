import jwt from 'jsonwebtoken';

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

export {
  createToken,
  validateToken,
};