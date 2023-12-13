import { IUser } from '../UserInterface';

export interface IUserService {
    login(phoneNumber: string, password: string): Promise<unknown>
    register(user: IUser): Promise<unknown>
    findByPhoneNumber(phoneNumber: string): Promise<unknown>
}