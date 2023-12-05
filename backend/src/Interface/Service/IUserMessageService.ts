import { IServiceResponse } from '../UserInterface';


export interface IUserMessageService {
    getMessages(hashRoomId: string): Promise<IServiceResponse>
}