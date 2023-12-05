import { UserModel } from '../../database/SQL/model/UserModel';
import { IUser } from '../UserInterface';

export interface IUserRepository {
    findByPhoneNumber(phoneNumber: string): Promise<UserModel | null>
    save(user: IUser): Promise<UserModel>
}