
export interface IUserMessageService {
    getMessages(hashRoomId: string): Promise<unknown>
}