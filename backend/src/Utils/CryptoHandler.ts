import CryptoJS from 'crypto-js';
import { config } from '../config/config';
import { ICryptoHandler } from '../Interface/Utils/ICryptoHandler';

export class CryptoHandler implements ICryptoHandler {

  encrypt(data: string) {
    const key = CryptoJS.enc.Hex.parse(config.security.bcryptKey);
    const encrypted = CryptoJS.AES.encrypt(data, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  }

  decrypt(encryptedData: string) {
    const key = CryptoJS.enc.Hex.parse(config.security.bcryptKey);
    const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Utf8.stringify(decrypted);
  }
}
