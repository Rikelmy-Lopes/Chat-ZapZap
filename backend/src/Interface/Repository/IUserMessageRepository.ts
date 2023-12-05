import { IMessage, IUsersMessage } from '../MessageODM';


export interface IUserMessageRepository {
    save(userMessage: IUsersMessage): Promise<void>
    findAllByRoomId(roomId: string): Promise<IMessage | never[]>
}