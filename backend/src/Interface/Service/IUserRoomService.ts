import { IServiceResponse } from '../UserInterface';


export interface IUserRoomService {
    findAllByPhoneNumber(phoneNumber: string): Promise<IServiceResponse>
}