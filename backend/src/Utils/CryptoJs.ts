import CryptoJS from 'crypto-js';
import { config } from '../config/config';


const encryptRoomId = (roomId: string): string => {
  const key = CryptoJS.enc.Hex.parse(config.security.bcryptKey);
  const encrypted = CryptoJS.AES.encrypt(roomId, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
};

const decryptRoomId = (hashRoomId: string): string => {
  const key = CryptoJS.enc.Hex.parse(config.security.bcryptKey);
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