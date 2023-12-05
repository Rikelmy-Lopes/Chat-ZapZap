
export interface IBCrypt {
    encrypt(data: string): Promise<string>
    validate(data: string, hashedData: string): Promise<boolean>
}