export interface IMessage {
    userName: string,
    message: string
    createdAt: string
}

export interface IUsersMessage {
    roomId: string,
    messages: IMessage[]
}