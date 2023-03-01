import bcrypt from 'bcrypt';

const encryptPassword =  async (password: string): Promise<string> => {
  const hashPassword = await bcrypt.hash(password, 12);
  return hashPassword;
};

const checkPassword = async (password: string, hash: string): Promise<boolean> => {
  const result = await bcrypt.compare(password, hash);
  return result;
};

export {
  encryptPassword,
  checkPassword,
};