import { IUser } from '../UserInterface';


export interface IAuthService {
    login(phoneNumber: string, password: string): Promise<unknown>
    register(user: IUser): Promise<unknown>
    validateToken(token: string): void
}