import { IServiceResponse, IUser } from '../UserInterface';

export interface IUserService {
    validateUser(phoneNumber: string, password: string): Promise<IServiceResponse>
    validateToken(token: string): IServiceResponse
    save(user: IUser): Promise<IServiceResponse>
    findByPhoneNumber(phoneNumber: string): Promise<IServiceResponse>
}