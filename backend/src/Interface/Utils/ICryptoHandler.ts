

export interface ICryptoHandler {
    encrypt(data: string): string
    decrypt(encryptedData: string): string
}