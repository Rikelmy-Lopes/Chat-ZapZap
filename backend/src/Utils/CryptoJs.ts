import CryptoJS from 'crypto-js';
import 'dotenv';

const encryptRoomId = (roomId: string): string => {
  const key = CryptoJS.enc.Hex.parse(String(process.env.BCRYPT_KEY));
  const encrypted = CryptoJS.AES.encrypt(roomId, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
};

const decryptRoomId = (hashRoomId: string): string => {
  const key = CryptoJS.enc.Hex.parse(process.env.BCRYPT_KEY as string);
  const decrypted = CryptoJS.AES.decrypt(hashRoomId, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return CryptoJS.enc.Utf8.stringify(decrypted);
};

export {
  encryptRoomId,
  decryptRoomId,
};