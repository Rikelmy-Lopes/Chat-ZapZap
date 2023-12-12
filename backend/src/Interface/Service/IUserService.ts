import { IServiceResponse, IUser } from '../UserInterface';

export interface IUserService {
    login(phoneNumber: string, password: string): Promise<unknown>
    validateToken(token: string): IServiceResponse
    register(user: IUser): Promise<unknown>
    findByPhoneNumber(phoneNumber: string): Promise<unknown>
}